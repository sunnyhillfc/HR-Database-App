import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


// Import navigation and screens
import ViewPeopleScreen from '../screens/ViewPeopleScreen';
import ViewPersonScreen from '../screens/ViewPersonScreen';
import EditPersonScreen from '../screens/EditPersonScreen';

//import styles 
import Styles from "../styles/MainStyle";


const Stack = createStackNavigator();

export default function PersonNavigator({navigation, route}) {
    return (
    <Stack.Navigator 
    initialRouteName="ViewPeople"
    screenOptions={{ 
      headerBackTitle: "Back",
      headerStyle: Styles.headerBar,
      headerTitleStyle: Styles.headerBarTitle
      }}>
    <Stack.Screen
     name="ViewPeople" 
     component={ViewPeopleScreen} 
     options={{ title: 'View all people' }} 
     />
    <Stack.Screen
     name="ViewPerson" 
     component={ViewPersonScreen} 
     options={{ title: 'View Person' }} 
     />
         <Stack.Screen
     name="EditPerson" 
     component={EditPersonScreen} 
     options={{ title: 'Edit Person' }} 
     />
    </Stack.Navigator>
    );
}