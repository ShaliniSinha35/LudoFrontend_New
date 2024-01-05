
import { StyleSheet, Text, View,SafeAreaView, Platform, StatusBar } from "react-native";
import StackNavigator from "./navigation/stacknavigator";


export default function App() {
  return (
    <>
      
       <StackNavigator/>
       

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

