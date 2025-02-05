/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './src/context/UserContext';
import { store } from './src/store/store';
import { Provider } from 'react-redux';


function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <UserProvider>
        <SafeAreaProvider >
          <NavigationContainer>
            <AppNavigation/>
          </NavigationContainer>
        </SafeAreaProvider>
      </UserProvider>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
});

export default App;
