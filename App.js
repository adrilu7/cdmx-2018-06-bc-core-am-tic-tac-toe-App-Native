import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons';


  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        gameState: [//Comienza en cero cada fila del juego
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
        currentPlayer: 1
      }
    }
  
    componentDidMount() { //  Se inicializa el juego
      this.initializeGame();
    }
  
    initializeGame = () => {
      this.setState({ // Cada arreglo es una fila del juego y comienza en cero
        gameState: [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ],
        currentPlayer: 1
      });
    }

    getWinner = () => {
      const NUM_TILES = 3;
      let arr = this.state.gameState;
      let sum;
      // Comprobamos filas
      for(let i = 0; i < NUM_TILES; i++) {
        sum = arr[i][0] + arr [i][1] + arr[i][2];
        if (sum == 3) {return 1;}
        else if (sum == -3) {return -1;}
      }
      // Comprobamos columnas
      for(let i = 0; i < NUM_TILES; i++) {
        sum = arr[0][i] + arr [1][i] + arr[2][i];
        if (sum == 3) {return 1;}
        else if (sum == -3) {return -1;}
      }
      // Comprobar diagonales
      sum = arr[0][0] + arr [1][1] + arr[2][2];
        if (sum == 3) {return 1;}
        else if (sum == -3) {return -1;}
  
      sum = arr[2][0] + arr [1][1] + arr[0][2];
      if (sum == 3) {return 1;}
      else if (sum == -3) {return -1;}

      // cuando no hay ganadores
      return 0;
    }
  
    onNewGamePress = () => {
      this.initializeGame ();
    }

    onTilePress = (row, col) => {
      // No permite marcar celda ya marcada
      let value = this.state.gameState[row][col];
       if (value != 0) {return;}
       
      // jugador actual
      let currentPlayer = this.state.currentPlayer;
  
      // Establece la casilla correcta
      let arr = this.state.gameState.slice();
      arr[row][col] = currentPlayer;
      this.setState({gameState: arr});
  
      // Cambiar de jugador
      let nextPlayer = (currentPlayer == 1) ? -1 : 1;
      this.setState({currentPlayer: nextPlayer});

      //comprobar ganadores
      let winner = this.getWinner();
    if(winner == 1) {
      Alert.alert("¡El jugador ☀ (1) es el ganador!");
      this.initializeGame(); // inicia nuevo juego automaticamente
    } else if (winner == -1) {
      Alert.alert("¡El jugador ☽ (2) es el ganador!");
      this.initializeGame();
    } 
}

  
    renderIcon = (row, col) => { // esta función mostrara los iconos la cual recibirá parámetros de donde se encuentran los iconos.
      let value = this.state.gameState[row][col];
      switch(value) { // switch recibe de parámetro el estado inicial de las filas y columnas
        case 1: return  <Icon name="brightness-5" style={styles.titleX}/>;
        case -1: return  <Icon name="brightness-2" style={styles.titleO}/>;
        default: return <View/>; // si no recibe algun valos saldrá celda en blanco
      }
    }


  render() {
    return (
      <View style={styles.container}>
            <Text style={{paddingBottom:30, color:'#c431f7', fontSize:45}}>Tic-Tac-Toe</Text>
            <Text style={{paddingBottom:10, color:'#a3f702', fontSize:25}}>Jugador ☀ (1) </Text>
            <Text style={{paddingBottom:10, color:'#a3f702', fontSize:25}}>Jugador ☽ (2) </Text>
         <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[styles.title, {borderLeftWidth:0, borderTopWidth:0}]}> 
            {this.renderIcon(0,0)} 
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.title, {borderTopWidth:0}]}>
            {this.renderIcon(0,1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.title, {borderRightWidth:0, borderTopWidth:0}]}>
            {this.renderIcon(0,2)}
            </TouchableOpacity>
         </View>
         
         <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.title, {borderLeftWidth:0}]}>
            {this.renderIcon(1,0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={styles.title}>
            {this.renderIcon(1,1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.title, {borderRightWidth:0}]}>
            {this.renderIcon(1,2)}
            </TouchableOpacity>
         </View>
         <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.title, {borderLeftWidth:0, borderBottomWidth:0}]}>
            {this.renderIcon(2,0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.title, {borderBottomWidth:0}]}>
            {this.renderIcon(2,1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.title, {borderBottomWidth:0, borderRightWidth:0}]}>
            {this.renderIcon(2,2)}
            </TouchableOpacity>
         </View>
         <View style={{paddingTop: 30}}/>
         
        <Button style={styles.btn} title="Nueva Partida" onPress={this.onNewGamePress}/>
        
    </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    borderWidth:5,
    width:100,
    height:100,
    borderColor: "#f70093",
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  titleX: {
    color: "#f5ff02",
    fontSize: 60,
    justifyContent:"center",

  },
  titleO: {
    color: "#02a3f7",
    fontSize: 60,
    justifyContent:"center",
  },

});