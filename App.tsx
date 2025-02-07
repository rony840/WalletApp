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
//import { UserProvider } from './src/context/UserContext';
import { store, persistor} from './src/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* <UserProvider> */}
        <SafeAreaProvider >
          <NavigationContainer>
            <AppNavigation/>
          </NavigationContainer>
        </SafeAreaProvider>
      {/* </UserProvider> */}
      </PersistGate>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
});

export default App;
