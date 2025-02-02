import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Logout, Login, Signup, Transaction, Sent, Profile, Received } from '../screens/Screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native';

// Stack Navigator for Login, Signup, and Welcome (Static Flow)
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LoggedIn"component={DrawerTab} />
    </Stack.Navigator>
  );
};

// Tab Navigator for Welcome and Main screens (Static Flow)
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Profile"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#e91e63', // Active tab color
      tabBarInactiveTintColor: 'gray', // Inactive tab color
    }}>
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/profile.png')} // Path to your icon
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'black' : 'gray', // Change color based on focus
              }}
            />
          ),
        }}/>
      <Tab.Screen name="Transactions" component={MyTopTabs} options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/icons/transaction.png')} // Path to your icon
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'black' : 'gray', // Change color based on focus
              }}
            />
          ),
        }}/>
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function DrawerTab() {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="User" component={MyTabs} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator();

function MyTopTabs() {
  return (
    <TopTab.Navigator initialRouteName="All"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#e91e63', // Active tab color
      tabBarInactiveTintColor: 'gray', // Inactive tab color
    }}>
      <TopTab.Screen name="All" component={Transaction} />
      <TopTab.Screen name="Sent" component={Sent} />
      <TopTab.Screen name="Received" component={Received} />
    </TopTab.Navigator>
  );
}


const AppNavigation = () => {
  return (
    
      <RootStack />
    
  );
};

export default AppNavigation;
