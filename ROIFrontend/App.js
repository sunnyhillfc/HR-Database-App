import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import helpers and navigation
import useCachedResources from './hooks/useCachedResources';
import RootNavigator from './navigation/RootNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer linking={LinkingConfiguration}>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }
}
