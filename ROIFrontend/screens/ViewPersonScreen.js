import react, * as React from 'react';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import '../constants/Settings';
import { RoiGetPerson, RoiDeletePerson } from '../utils/WebService'
import { PopupOk, PopupOkCancel } from '../utils/Popup'

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';

export default function ViewPersonScreen(props) {

  //default person object
  const personTemplate = {
    Id: 0,
    Name: "",
    Phone: "",
    Department: null, 
    Address: null
  };
 
  //storePerson
  const [person, setPerson] = React.useState(personTemplate);

  //setup effect to retrive and store data
  React.useEffect(refreshPerson, []); 

    //refresh the list of people
    function refreshPerson() {
        // get an animal id passed to this screen as a param
        let personId = props.route.params.personId;
        //get data from the web service 
        RoiGetPerson(personId)
            //on success
            .then(data => {
              // store result in state variable (if data returned)
                  if (data) setPerson(data);
                }
            )
            //on failure
            .catch(error => {
              PopupOk('Error', error);
              props.navigation.navigate('ViewPeople');
            });

    }

    function showEditPerson(){
      props.navigation.navigate('EditPerson', {personId: person.Id});
    }

    function deletePerson(){
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
                      //go back to people screen
                      props.navigation.replace('Root', {screen: 'People'});
                    }
                )
                //on failure
                .catch(error => PopupOk('Error', error));
                },
        //cancel
        () => {}
      ); 

    }

    function displayAddress(){
      if (!person.Address){
        return <TextParagraph>No Address Found</TextParagraph>;
      } else{
        //Set Defaults
        let street = person.Address.Street || '<None>'; 
        let city = person.Address.City || '<None>'; 
        let state = person.Address.State || '<None>'; 
        let zip = person.Address.ZIP || '<None>'; 
        let country = person.Address.Country || '<None>'; 

        return(
          <View>
            <View style={Styles.formRow}>
            <TextLabel>Street:</TextLabel>
            <TextParagraph>{street}</TextParagraph>
          </View>
          <View style={Styles.formRow}>
            <TextLabel>City:</TextLabel>
            <TextParagraph>{city}</TextParagraph>
          </View>
          <View style={Styles.formRow}>
            <TextLabel>State:</TextLabel>
            <TextParagraph>{state}</TextParagraph>
          </View>
          <View style={Styles.formRow}>
            <TextLabel>Zip:</TextLabel>
            <TextParagraph>{zip}</TextParagraph>
          </View>
          <View style={Styles.formRow}>
            <TextLabel>Country</TextLabel>
            <TextParagraph>{country}</TextParagraph>
          </View>
          </View>
        );
      }
    }

    return (
      <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
      <TextH1 style={{marginTop:0}}>{person.Name}</TextH1>
      <View style={Styles.form}>
        <View style={Styles.fieldSet}>
          <TextParagraph style={Styles.legend}>Person Details</TextParagraph>
          <View style={Styles.formRow}>
            <TextLabel>Name:</TextLabel>
            <TextParagraph>{person.Name}</TextParagraph>
          </View>
          <View style={Styles.formRow}>
            <TextLabel>Phone:</TextLabel>
            <TextParagraph>{person.Phone}</TextParagraph>
          </View>
          <View style={Styles.formRow}>
            <TextLabel>Department:</TextLabel>
            <TextParagraph>{person.Department ? person.Department.Name: '<none>'}</TextParagraph>
          </View>
        </View>
        <View style={Styles.fieldSet}>
        <TextParagraph style={Styles.legend}>Addresss</TextParagraph>
        {displayAddress()}
        </View>

      </View>
      <View style={Styles.personbtnContainer}>
          <MyButton
              text="Edit"
              type="major"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={showEditPerson}
              buttonStyle={Styles.personListItemButton}
            />
            <MyButton
              text="Delete"
              type="minor"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={deletePerson}
              buttonStyle={Styles.personListItemButton}
            />
        </View>

      </ScrollView>
    </SafeAreaView>
    );
}