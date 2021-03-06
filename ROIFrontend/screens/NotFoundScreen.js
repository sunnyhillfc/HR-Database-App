import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import { TextParagraph, TextH1 } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';

export default function NotFoundScreen(props) {

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

        <View>
          
          <TextH1 style={{marginTop:0}}>Screen Not Found</TextH1>

          <TextParagraph>The screen you requested could not be found.</TextParagraph>

          <TextParagraph>Click the button to go back to the home screen and try again.</TextParagraph>

          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <MyButton
              text="Go home" 
              type="major"
              size="medium"
              onPress={()=>props.navigation.replace('Root')}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}