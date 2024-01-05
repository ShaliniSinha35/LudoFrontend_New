import { View, Text, Dimensions, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client';
import { useNavigation, useRoute } from "@react-navigation/native";

const socket = io('http://192.168.0.110:5000');
const HomeScreen = ({navigation}) => {
    const route = useRoute();
    console.log(route.params.mobile)
    const [player1,setPlayer1] = useState([])
    const [player2, setPlayer2] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [oppName, setOpp]= useState('')
    const [flag,setFlag] = useState(false)


    useEffect(()=>{
        getPlayerDetails()
    },[])

    useEffect(() => {
    
      socket.on('updatePlayers', (data) => {
        console.log('Updated players:', data.allPlayers);
        setAllPlayers(data.allPlayers); 
        const foundObject = data.allPlayers.find(obj => obj.p1.p1name == `${route.params.mobile}` || obj.p2.p2name == `${route.params.mobile}`);
        foundObject.p1.p1name == `${route.params.mobile}` ? setOpp(foundObject.p2.p2name) : setOpp(foundObject.p1.p1name)
         console.log( foundObject.p1.p1name)
      });
  
      // Clean up the event listener on component unmount
      return () => {
        socket.off('updatePlayers');
      };
    }, []);

    const getPlayerDetails = async()=>{
          const res= await axios.get(`http://192.168.0.110:5000/getUserData?userId=${route.params.mobile}`)
          console.log(res.data)
          setPlayer1(res.data)
    }

    const handleTwoPlayer =()=>{
      setFlag(true)

      // Emit the mobile number to the backend
      socket.emit('find', { name: route.params.mobile });
    }
  return (
    <View style={{marginTop:50,height:Dimensions.get('screen').height,width:Dimensions.get('screen').width,alignItems:"center"}}>
        {
            player1.length != 0 && <Text style={{fontSize:20,fontWeight:500}}>{player1[0].uname}</Text>
        }

        <TouchableOpacity onPress={()=>handleTwoPlayer()} style={{padding:20,backgroundColor:"#FEBE10",width:170, marginTop:200, alignItems:"center"}}>
         <Text style={{color:"white",fontSize:18}}>Two Player</Text>
        </TouchableOpacity>

        {
          allPlayers.length != 0 ? navigation.navigate("Game",{player: route.params.mobile, opponent: oppName }) : 
          <>
          <Text>{flag && 'Searching for the player.....'}</Text>
          <ActivityIndicator></ActivityIndicator>
          </>
        }
      {/* <Text>HomeScreen</Text> */}
    </View>
  )
}

export default HomeScreen