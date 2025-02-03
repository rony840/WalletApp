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
import { UserProvider } from './src/context/UserContext';


function App(): React.JSX.Element {

  return (
  <UserProvider>
    <SafeAreaProvider >
      <NavigationContainer>
      <AppNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  </UserProvider>
    
  );
}

const styles = StyleSheet.create({
});

export default App;
