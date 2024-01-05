import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../Screens/RegisterScreen";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "../Screens/HomeScreen";
import GameScreen from "../Screens/GameScreen";





const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const Tab = createBottomTabNavigator();
  // function BottomTabs() {
  //   return (
  //     <Tab.Navigator>
  //       <Tab.Screen
  //         name="Home"
  //         component={Home}
  //         options={{
  //           tabBarLabel: "Home",
  //           tabBarLabelStyle: { color: "#FEBE10" },
  //           headerShown: false,
  //           tabBarIcon: ({ focused }) =>
  //             focused ? (
  //               <Entypo name="home" size={24} color="#00008b" />
  //             ) : (
  //               <AntDesign name="home" size={24} color="black" />
  //             ),
  //         }}
  //       />
  //        <Tab.Screen
  //         name="Booking & Plans"
  //         component={BookingScreen}
  //         options={{
  //           tabBarLabel: "Booking",
  //           tabBarLabelStyle: { color: "#FEBE10" },
  //           tabBarIcon: ({ focused }) =>
  //             focused ? (
  //               <MaterialCommunityIcons name="clipboard-text" size={24} color="#00008b" />
  //             ) : (
  //               <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="black" />
  //             ),
  //         }}
  //       />

  //       <Tab.Screen
  //         name="Profile"
  //         component={ProfileScreen}
  //         options={{
  //           tabBarLabel: "Profile",
  //           tabBarLabelStyle: { color: "#FEBE10" },
  //           tabBarIcon: ({ focused }) =>
  //             focused ? (
  //               <Ionicons name="person" size={24} color="#00008b" />
  //             ) : (
  //               <Ionicons name="person-outline" size={24} color="black" />
  //             ),
  //         }}
  //       />

       
  //       <Tab.Screen
  //         name="Cart"
  //         component={CartScreen}
  //         options={{
  //           tabBarLabel: "Cart",
  //           tabBarLabelStyle: { color: "#FEBE10" },
  //           tabBarIcon: ({ focused }) =>
  //             focused ? (
  //               <Entypo name="shopping-cart" size={24} color="#00008b" />
              
  //             ) : (
  //               <AntDesign name="shoppingcart" size={24} color="black" />
  //             ),
  //         }}
  //       />
  //     </Tab.Navigator>
  //   );
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
     
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});