import react, * as React from 'react';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import '../constants/Settings';
import { RoiGetPeople, RoiDeletePerson, RoiEditPerson } from '../utils/WebService'
import { PopupOk, PopupOkCancel } from '../utils/Popup'

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';

export default function ViewPeopleScreen(props) {
  //manage the state for this screen 
  //date array - default to an empty list 
  const [people, setPeople] = React.useState([]);

  //setup effect to retrive and store data
  React.useEffect(refreshPersonList, []); 

    //refresh the list of people
    function refreshPersonList() {
        //get data from the web service 
        RoiGetPeople()
            //on success
            .then(data => {
                  setPeople(data);
                }
            )
            //on failure
            .catch(error => PopupOk('Error', error));

    }

    function showViewPerson(person){
      props.navigation.navigate('ViewPerson', {personId: person.Id})
    }

    function showAddPerson(person){
      props.navigation.navigate('Root', {screen: 'AddPerson'})
    }

    function showEditPerson(person){
      props.navigation.navigate('EditPerson', {personId: person.Id});
    }

    function deletePerson(person){
      //check delete with user
      PopupOkCancel(
        //Title 
        "Delete Person?",
        //Message
        `Are you sure you want to delete ${person.Name}`,
        //ok
        () => {
                  //get data from the web service 
                RoiDeletePerson(person.Id)
                //on success
                .then(data => {
                      //confirm has been deleted 
                      PopupOk("Person Deleted", `${person.Name} has been deleted`);
                      //refresh list
                      refreshPersonList();
                    }
                )
                //on failure
                .catch(error => PopupOk('Error', error));
                },
        //cancel
        () => {}
      ); 

    }

    //display tje list of people 
    function displayPeople(){
      // loop through each person and turn it into an approprate jsx output
      return people.map(p => {
        // for each person 
        return(
          <View key={p.Id} style={Styles.personListItem}>
            <View style={Styles.personListItemDetails}>
              {/* Details */}
              <TextParagraph style={Styles.personListItemName}>{p.Name}</TextParagraph>
              <TextParagraph>{p.Department.Name}</TextParagraph>
              <TextParagraph>{p.Phone}</TextParagraph>
              </View>
            <View style={Styles.personListItemButtons}>
              <MyButton
              text="Details"
              type="major"    // default*|major|minor
              size="small"      // small|medium*|large
              onPress={() => showViewPerson(p)}
              buttonStyle={Styles.personListItemButton}
            />
            <MyButton
              text="Edit"
              type="default"    // default*|major|minor
              size="small"      // small|medium*|large
              onPress={() => showEditPerson(p)}
              buttonStyle={Styles.personListItemButton}
            />
            <MyButton
              text="Delete"
              type="minor"    // default*|major|minor
              size="small"      // small|medium*|large
              onPress={() => deletePerson(p)}
              buttonStyle={Styles.personListItemButton}
            />
            </View>
          </View>
        )
      })
    }

    return (
      <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.personbtnContainer}>
          <MyButton
              text="+ Add Person"
              type="major"    // default*|major|minor
              size="small"      // small|medium*|large
              onPress={showAddPerson}
              buttonStyle={Styles.personListItemButton}
            />
            <MyButton
              text="Refresh"
              type="minor"    // default*|major|minor
              size="small"      // small|medium*|large
              onPress={refreshPersonList}
              buttonStyle={Styles.personListItemButton}
            />
        </View>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
      <TextH1 style={{marginTop:0}}>People List</TextH1>
      <View>
        {displayPeople()}
      </View>
      </ScrollView>
    </SafeAreaView>
    );
}