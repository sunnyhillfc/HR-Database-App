import * as React from 'react';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';
import { MyButton } from '../components/MyButton';

export default function HelpScreen(props) {

  const [fontSize, setFontSize] = React.useState(Settings.fontSizeModifier); 
  function changeFontSize(sizeModifer){
    Settings.fontSizeModifier += sizeModifer;
    setFontSize(Settings.fontSizeModifier);

  }
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

        <View>
          
          <TextH1 style={{marginTop:0}}>Help topics</TextH1>

          <TextH2>Font Settings</TextH2>

          <TextParagraph>Use the following buttons to reduce or increase the font size of the app</TextParagraph>
          <View style={Styles.helpbtnContainer}>
          <MyButton style={Styles.homeButton}
            text="+"
            type="major"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={()=> changeFontSize(0.1)}
          />
          <MyButton style={Styles.homeButton}
            text="-"
            type="minor"    // default*|major|minor
            size="medium"      // small|medium*|large
            onPress={()=> changeFontSize(-0.1)}
          />
        </View>
          <TextH2>About the Interface</TextH2>

          <TextParagraph>The ROI app has the following screens correlating to diffrent actions and features.</TextParagraph>

          <TextH3>Screens:</TextH3>
          <TextListItem>Home - the landing page of the app.</TextListItem>
          <TextListItem>View People - list all the staff members.</TextListItem>
          <TextListItem>Add Person - add a new staff member.</TextListItem>
          <TextListItem>Help - view this help content.</TextListItem>

          <TextH2>Contact Us</TextH2>
          <TextParagraph>02 9438 2478 - We're not gonna answer. Have you tried turning it off and on again?</TextParagraph>

          <TextH2>Elements in use</TextH2>

            <TextListItem>MonoText - Monospaced font (Space Mono)</TextListItem>
            <TextListItem>TextH1 - heading 1</TextListItem>
            <TextListItem>TextH2 - heading 2</TextListItem>
            <TextListItem>TextH3 - heading 3</TextListItem>
            <TextListItem>TextParagraph - paragraph</TextListItem> 
            <TextListItem>TextListItem - bullet list item</TextListItem>
            <TextListItem>TextLabel - form label (inline with input)</TextListItem>


          <TextH2>Wanna go home?</TextH2>

          <TouchableOpacity onPress={() => props.navigation.replace('Root')}>
            <TextParagraph style={{marginVertical: 10, color: Colours.tabLabelSelected}}>Click here to go home...</TextParagraph>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}