import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image, ImageBackground, ActivityIndicator} from 'react-native';
import NewGameModel from '../../components/NewGameModel/NewGameModel'
import TwoPlayerModal from '../../components/NewGameModel/TwoPlayerModal';
import ThreePlayerModal from '../../components/NewGameModel/ThreePlayerModal';
import FourPlayerModal from '../../components/NewGameModel/FourPlayerModal';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios'
import io from 'socket.io-client';

const socket = io('http://192.168.0.110:5000');
export default Home = ({
    isStartGameModalVisible,
    onNewGameButtonPress,
    onCancel,
    onRedInput,
    onYellowInput,
    onBlueInput,
    onGreenInput,
    red,
    yellow,
    green,
    blue,
    onStart,
    twoPlayer,threePlayer,fourPlayer, mobileNumber
}) => {

    const [selectedPlayers, setSelectedPlayers] = useState(null);
    const [number,setMobileNumber]= useState(mobileNumber)



    const [player1,setPlayer1] = useState([])
    const [player2, setPlayer2] = useState([])
    const [allPlayers, setAllPlayers] = useState([])
    const [oppName, setOpp]= useState('')
    const [flag,setFlag] = useState(false)


    // useEffect(()=>{
    //     getPlayerDetails()
    // },[])

    useEffect(() => {
    
        socket.on('find', (data) => {
        console.log('Updated players:', data.allPlayers);
        setAllPlayers(data.allPlayers); 
        const foundObject = data.allPlayers.find(obj => obj.p1.p1name == `${number}` || obj.p2.p2name == `${number}`);
        foundObject.p1.p1name == `${number}` ? setOpp(foundObject.p2.p2name) : setOpp(foundObject.p1.p1name)
        //  console.log("51", foundObject.p1.p1name)
         onBlueInput(foundObject.p1.p1name)
         onYellowInput(foundObject.p2.p2name)
         onStart()
      });
      // Clean up the event listener on component unmount
      return () => {
        socket.off('find');
    };
    }, []);



    const handleTwo =()=>{
      setFlag(true)
      socket.emit('find', { name: number });
    
    }

    // const handleTwo = () => {
    //   setSelectedPlayers(2);
    //   onBlueInput('Player 1')
    //   onYellowInput('Player 2')
  

    // onNewGameButtonPress()
 
    // };
  
    const handleThree = () => {
      setSelectedPlayers(3);
      onBlueInput('Player 1')
      onRedInput('Player 2')
      onYellowInput('Player 3')

      onNewGameButtonPress()
    };
  
    const handleFour = () => {
      setSelectedPlayers(4);
      onBlueInput('Player 1')
      onRedInput('Player 2')
      onYellowInput('Player 3')
      onGreenInput('Player 4')
 
      onNewGameButtonPress()
    };

    useEffect(()=>{

    }, [selectedPlayers])
    return (
        <ImageBackground source={require("../../../assets/bg.png")} style={styles.container}>
          <View style={{position:"absolute", top:10,right:20,justifyContent:"center",alignItems:"center"}}>
            <EvilIcons name="user" size={30} color="white" />

            <Text style={{color:"white",textAlign:"center",marginTop:5,fontSize:15}}>{number}</Text>
          
          </View>

          {
      
           flag && <>
          <Text style={{color:"white",fontSize:18}}>Searching for the player.....</Text>
          <ActivityIndicator></ActivityIndicator>
          </>
     
        
   
        }
          
            <Image source={require("../../../assets/applogo.png")} style={{height:180,width:170, resizeMode:"contain"}}></Image>
                
               
               <TouchableOpacity style={styles.newGameButton} onPress={handleTwo}>
               <Text style={{fontSize:18,color:"white"}}>2 Players</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.newGameButton} onPress={handleThree}>
               <Text style={{fontSize:18,color:"white"}}>3 Players</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newGameButton} onPress={handleFour}>
               <Text style={{fontSize:18,color:"white"}}>4 Players</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.newGameButton} onPress={onNewGameButtonPress}>
                <Text >New Game</Text>
            </TouchableOpacity> */}
            {/* <Image source={require('../../images/ludo.png')} style={styles.imageStyle} /> */}

           
            {/* {selectedPlayers !== null && (
        <NewGameModel
          isStartGameModalVisible={isStartGameModalVisible}
          onCancel={onCancel}
          onRedInput={onRedInput}
          onYellowInput={onYellowInput}
          onBlueInput={onBlueInput}
          onGreenInput={onGreenInput}
          red={red}
          yellow={yellow}
          green={green}
          blue={blue}
          onStart={onStart}
          playerCount={selectedPlayers}
        />
      )} */}
                  

      {/* <NewGameModel
      isStartGameModalVisible={isStartGameModalVisible}
      onCancel={onCancel}
      onRedInput={onRedInput}
      onYellowInput={onYellowInput}
      onBlueInput={onBlueInput}
      onGreenInput={onGreenInput}
      red={red}
      yellow={yellow}
      green={green}
      blue={blue}
      onStart={onStart}
      playerCount={selectedPlayers}
    /> */}

{selectedPlayers === 2 && (
        <TwoPlayerModal
          isStartGameModalVisible={isStartGameModalVisible}
          onCancel={onCancel}
          // onRedInput={onRedInput}
          onYellowInput={onYellowInput}
          onBlueInput={onBlueInput}
          // onGreenInput={onGreenInput}
          red={red}
          yellow={yellow}
          green={green}
          blue={blue}
          onStart={onStart}
          twoPlayer= {twoPlayer}
        />
      )}

      {selectedPlayers === 3 && (
        <ThreePlayerModal
          isStartGameModalVisible={isStartGameModalVisible}
          onCancel={onCancel}
          onRedInput={onRedInput}
          onYellowInput={onYellowInput}
          onBlueInput={onBlueInput}
          onGreenInput={onGreenInput}
          red={red}
          yellow={yellow}
          green={green}
          blue={blue}
          onStart={onStart}
          threePlayer={threePlayer}
        />
      )}

      {selectedPlayers === 4 && (
        <FourPlayerModal
          isStartGameModalVisible={isStartGameModalVisible}
          onCancel={onCancel}
          onRedInput={onRedInput}
          onYellowInput={onYellowInput}
          onBlueInput={onBlueInput}
          onGreenInput={onGreenInput}
          red={red}
          yellow={yellow}
          green={green}
          blue={blue}
          onStart={onStart}
          fourPlayer={fourPlayer}
        />
      )}
       
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffff',
        alignItems:"center",
        justifyContent:"center"
      
    },
    logoStyle:{
        color:'#f00',
        fontSize:40,
        alignSelf:'center',
        marginTop:100,
        fontWeight:'bold'
    },
    newGameButton:{
        backgroundColor:'#240046',
        width:200,
        padding:10,
        borderColor:'#ddd',
        borderWidth:2,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20,
        alignItems:'center',
        elevation:4,
    },
    imageStyle:{
        width:'70%',
        height:'70%',
        resizeMode:'contain',
        alignSelf:'center'
    }
})


















