import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';
import { TextH1, TextParagraph } from "../components/StyledText";
import { PopupOk } from '../utils/Popup';


export default function HomeScreen(props) {

  const [logoColour, setLogocolour] = React.useState(true);

  function showHelp() {
    props.navigation.replace('Root', {screen: 'Help'});
  }

  function showView() {
    props.navigation.replace('Root', {screen: 'People'});
  }

  function logoToggle(){
    setLogocolour(!logoColour);
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
        <View style={Styles.homeLogoContainer}>
          <TouchableOpacity onPress={logoToggle}>
          <Image 
          source={logoColour
           ? require('../assets/images/roi-logo.jpg')
           : require('../assets/images/roi-logo-monochrome.jpg')
          }
          style={Styles.homeLogo}
          />
          </TouchableOpacity>
        </View>
        <View style={Styles.homeText}>
        <TextH1>ROI HR Management System</TextH1>
        </View>
        {/* <TextH1>ROI HR Management System</TextH1>

        <TextParagraph>Here is some sample text for the home screen.</TextParagraph>

        <TextParagraph>There is no place like 127.0.0.1</TextParagraph> */}
        
        <View style={Styles.homeButtonContainer}>
          <MyButton style={Styles.homeButton}
            text="View People"
            type="major"    // default*|major|minor
            size="large"      // small|medium*|large
            onPress={showView}
          />
          <MyButton style={Styles.homeButton}
            text="Help"
            type="minor"    // default*|major|minor
            size="large"      // small|medium*|large
            onPress={showHelp}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}