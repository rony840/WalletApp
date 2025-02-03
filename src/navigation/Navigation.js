import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Logout, Login, Signup, Transaction, Sent, Profile, Received } from '../screens/Screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, SafeAreaView } from 'react-native';
import EditProfile from '../screens/EditProfile';
import Heading from '../components/Heading'; // Custom Heading component
import { UserContext } from '../context/UserContext';
import DeleteAcc from '../screens/DeleteAcc';

// Stack Navigator for Login, Signup, and Welcome (Static Flow)
const Stack = createNativeStackNavigator();

// Root Stack with Login, Signup, and Drawer Navigation
const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LoggedIn" component={DrawerTab} />
    </Stack.Navigator>
  );
};

// Tab Navigator for Welcome and Main screens (Static Flow)
const Tab = createBottomTabNavigator();

// Tabs for Profile and Transactions
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e91e63', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
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
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={MyTopTabs}
        options={{
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
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigation
const Drawer = createDrawerNavigator();

// Drawer Navigation
function DrawerTab() {
  const { user } = useContext(UserContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // Show header
        header: ({ route }) => {
          // Dynamically change the header based on the screen name
          const { name } = route;
          let headingText = '';
          let iconClickEnabled = true;

          if (name === 'User') {
            headingText = 'Welcome';
          } else if (['All', 'Sent', 'Received'].includes(name)) {
            headingText = 'Balance'; // If the screen name is one of these, set the heading to 'Balance'
          } else if (name === 'Edit Profile') {
            headingText = 'Edit Profile';
            iconClickEnabled = false; // Disable icon click on Edit Profile screen
          } else if (name === 'Logout') {
            headingText = 'Logout';
            iconClickEnabled = false; // Disable icon click on Edit Profile screen
          }

          return (<SafeAreaView>
          <Heading 
          heading={headingText}
          type={'Profile'}
          name1={user?.firstName || 'Guest'}
          name2={user?.lastName || 'User'}
          iconClickEnabled={iconClickEnabled} />
          </SafeAreaView>);
        },
      }}
    >
      <Drawer.Screen name="User" component={MyTabs} />
      <Drawer.Screen name="Edit Profile" component={EditProfile} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Delete Account" component={DeleteAcc} />
    </Drawer.Navigator>
  );
}


// Top Tab Navigator for Transactions
const TopTab = createMaterialTopTabNavigator();

function MyTopTabs() {
  return (
    <TopTab.Navigator
      initialRouteName="All"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        tabBarPosition: 'bottom', // Move tab bar to the bottom
        headerShown: true
      }}
    >
      <TopTab.Screen
        name="All"
        component={Transaction}
      />
      <TopTab.Screen
        name="Sent"
        component={Sent}
      />
      <TopTab.Screen
        name="Received"
        component={Received}
      />
    </TopTab.Navigator>
  );
}

// App Navigation Component
const AppNavigation = () => {
  return <RootStack />;
};

export default AppNavigation;
