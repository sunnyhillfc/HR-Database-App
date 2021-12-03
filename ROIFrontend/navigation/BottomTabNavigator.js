import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

// Import styling and components
import TabBarIcon from '../components/TabBarIcon';
import Colours from "../constants/Colours";
import Styles from "../styles/MainStyle";

// Import navigators & screens
import HomeScreen from '../screens/HomeScreen';
import HelpScreen from '../screens/HelpScreen';
import PersonNavigator from './PersonNavigator';
import AddPersonScreen from '../screens/AddPersonScreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerShown: false,  // hide header bar on "main" tab pages
  });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colours.tabLabelSelected,
        inactiveTintColor: Colours.tabLabel,
        style: Styles.navBar,
        labelStyle: Styles.navBarLabel,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
        }}
      />
      <BottomTab.Screen
        name="People"
        component={PersonNavigator}
        options={{
          title: 'View People',
          unmountOnBlur: true, 
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />
        }}
      />
      <BottomTab.Screen
        name="AddPerson"
        component={AddPersonScreen}
        options={{
          title: 'Add People',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />
        }}
      />
      <BottomTab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: 'Help',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-help-circle" />,
        }}
      />
    </BottomTab.Navigator>
  );
}