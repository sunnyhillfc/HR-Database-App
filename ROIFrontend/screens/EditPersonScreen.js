import react, * as React from 'react';
import { TextInput, View, KeyboardAvoidingView, Picker} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import '../constants/Settings';
import { RoiGetDepartments, RoiGetPerson, RoiUpdatePerson} from '../utils/WebService'
import { PopupOk, PopupOkCancel } from '../utils/Popup'

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';

export default function EditPersonScreen(props) {
 
  //storePerson
  const [personId, setPersonId] = React.useState(-1)
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [departmentId, setDepartmenId] = React.useState(0);
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [country, setCountry] = React.useState('Australia');

  //store a list of departments - dropdownlist
  const [department, setDepartments] = react.useState([]);

    //setup effect to retrive and store data
    React.useEffect(refreshDepartments, []); 
    //setup effect to retrive and store data
    React.useEffect(refreshPerson, []); 

  //refresh the list of people
  function refreshPerson() {
      // get an animal id passed to this screen as a param
      let personId = props.route.params.personId;
      //get data from the web service 
      RoiGetPerson(personId)
          //on success
          .then(a => {
            // store result in state variable (if data returned)
                if (a) {
                   setPersonId(a.Id); 
                   setName(a.Name); 
                   setPhone(a.Phone); 
                   setDepartmenId(a.Department ? a.Department.Id: 0); 
                   if(a.Address){
                     setStreet(a.Address.Street);
                     setCity(a.Address.City);
                     setState(a.Address.State);
                     setZip(a.Address.ZIP);
                     setCountry(a.Address.Country);
                   }

                }
              }
          )
          //on failure
          .catch(error => {
            PopupOk('Error', error);
            props.navigation.navigate('ViewPeople');
          });

  }

    //refresh the list of people
    function refreshDepartments() {
        //get data from the web service 
        RoiGetDepartments()
            //on success
            .then(data => {
              // store result in state variable (if data returned)
                setDepartments(data);
                }
            )
            //on failure
            .catch(error => {
              PopupOk('Error', error);
            });

    }

  function showViewPeople(){
    props.navigation.replace('Root', {screen: 'People'});
  }


  function displayDepartmentListItems(){
    //loop through each item and turn into picker item
    return department.map(d => {
      return <Picker.Item key={d.Id} label={d.Name} value={d.Id}/>
    });
  }


  function editPerson() {
    //get data from the web service 
    RoiUpdatePerson(personId, name, phone, departmentId, street, city, state, zip, country)
        //on success
        .then(data => {
          //confirm the animal has been added
              PopupOk("Person Updated", `${name} has been edited`);

              //go back to the person list
              showViewPeople();
            }
        )
        //on failure
        .catch(error => {
          PopupOk('Error', error);
        });

}

      return (
      <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
        <KeyboardAvoidingView behavior="position" style={{flext: 1}}>
      <TextH1 style={{marginTop:0}}>Edit: {name}</TextH1>
      <View style={Styles.form}>
        <View style={Styles.fieldSet}>
          <TextParagraph style={Styles.legend}>Person Details</TextParagraph>
          <View style={Styles.formRow}>
            <TextLabel>Name:</TextLabel>
            <TextInput value={name} onChangeText={setName} style={Styles.textInput} />
          </View>
          <View style={Styles.formRow}>
            <TextLabel>Phone:</TextLabel>
            <TextInput value={phone} onChangeText={setPhone} style={Styles.textInput} />
          </View>
          <View style={Styles.formRow}>
            <TextLabel>Department:</TextLabel>
            <Picker 
            selectedValue={departmentId}
            onValueChange={v => setDepartmenId(v)}
            style={Styles.picker}
            itemStyle={Styles.pickerItem}
            >
              {displayDepartmentListItems()}
            </Picker>
          </View>
        </View>
        <View style={Styles.fieldSet}>
        <TextParagraph style={Styles.legend}>Addresss</TextParagraph>
        <View style={Styles.formRow}>
            <TextLabel>Street:</TextLabel>
            <TextInput value={street} onChangeText={setStreet} style={Styles.textInput} />
          </View>
          <View style={Styles.formRow}>
            <TextLabel>City:</TextLabel>
            <TextInput value={city} onChangeText={setCity} style={Styles.textInput} />
          </View>
          <View style={Styles.formRow}>
            <TextLabel>State:</TextLabel>
            <TextInput value={state} onChangeText={setState} style={Styles.textInput} />
          </View>
          <View style={Styles.formRow}>
            <TextLabel>ZIP:</TextLabel>
            <TextInput value={zip} onChangeText={setZip} style={Styles.textInput} />
          </View>
          <View style={Styles.formRow}>
            <TextLabel>Country:</TextLabel>
            <TextInput value={country} onChangeText={setCountry} style={Styles.textInput} />
          </View>
        </View>

      </View>
      <View style={Styles.personbtnContainer}>
          <MyButton
              text="Save"
              type="major"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={editPerson}
              buttonStyle={Styles.personListItemButton}
            />
            <MyButton
              text="Cancel"
              type="minor"    // default*|major|minor
              size="medium"      // small|medium*|large
              onPress={showViewPeople}
              buttonStyle={Styles.personListItemButton}
            />
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
    );
}