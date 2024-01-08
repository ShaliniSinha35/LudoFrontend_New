import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
const GameScreen = ({navigation}) => {
  const route = useRoute();
  return (
    <View style={{marginTop:60,alignItems:"center"}}>
      <Text>GameScreen</Text>
      <View style={{marginTop:80}}>
      <Text style={{fontSize:20, fontWeight:500}}>Your number:{route.params.player}</Text>
      <Text style={{fontSize:20, fontWeight:500}}>opponent: {route.params.opponent}</Text>
      </View>  
    </View>
  )
}

export default GameScreen