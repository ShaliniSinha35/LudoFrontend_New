import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import { CommonActions, useNavigation } from '@react-navigation/native';



const RegisterScreen = () => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");

  const [error, setErr] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState("");
  const [flag,setFlag]=useState(false)


  useEffect(() => {
    validateForm();
  }, [ mobileNumber, name]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = "Name is required.";
    }

 

    // Validate number field
    if (!mobileNumber) {
      errors.mobileNumber = "Mobile Number is required.";
    } else if (mobileNumber.length >= 10) {
      errors.mobileNumber = "Enter Valid Mobile Number";
    }

    // Set the errors and update form validity
    setErr(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async (name, mobileNumber) => {

      // console.log(name, mobileNumber);
        try {
            const response = await axios.post("http://192.168.0.110:5000/signup", {
                name: name,
                phone: mobileNumber,
            });
            console.log(response.data); // Log the response data
            // navigation.dispatch(
            //   CommonActions.reset({
            //     index: 0,
            //     routes: [{ 
            //       name: 'Home', 
            //       params: { 
            //         mobileNumber: mobileNumber
            //       } 
            //     }],
            //   })
            // );
            navigation.navigate("Home", {
                   
              mobile: mobileNumber
            })
          } 

          catch (error) {
            console.warn(error); // Log any errors
        }  
       

};

  return (
    <ScrollView style={{backgroundColor:"white"}}>
      <SafeAreaView style={styles.safeArea}>
   

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.heading}>Register here</Text>
          </View>
        

          <View style={{ marginTop: 40 }}>
            <View style={styles.inputBoxCont}>
              <Ionicons
                name="ios-person"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: name ? 16 : 16,
                }}
                placeholder="enter your name"
              />

            </View>

            {error.name  && flag && <Text style={{color:"red"}}>{error.name}</Text>}
            </View>

      
           

       

          <View>
            <View style={styles.inputBoxCont}>
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />

              <TextInput
                value={mobileNumber}
                keyboardType="numeric"
                onChangeText={(text) => setMobileNumber(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: mobileNumber ? 16 : 16,
                }}
                placeholder="enter your Number"
              />
            </View>
            {error.mobileNumber && flag && <Text style={{color:"red"}}>{error.mobileNumber}</Text>}
          </View>

      

          <View style={{ marginTop: 60 }} />

          <TouchableOpacity style={styles.button}
              
                onPress={()=>handleSubmit(name,mobileNumber)}
               
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

     
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 70,
  },
  img: {
    width: 150,
    height: 100,
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    color: "#041E42",
  },
  inputBoxCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 20,
  },
  forgotCont: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },
});
