/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';


function App(): React.JSX.Element {

  return (
    <SafeAreaProvider >
      <NavigationContainer>
      <AppNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
