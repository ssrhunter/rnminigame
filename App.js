import { StyleSheet, ImageBackground } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./constants/colors";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);

  function pickNumberHandler(enteredNumber) {
    var enteredNumberToInt = parseInt(enteredNumber);
    console.log(`User picked number: ${enteredNumberToInt}`);
    setUserNumber(enteredNumberToInt);
  }

  function handleRestartGame() {
    setUserNumber(undefined);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  var gameScreen =
    userNumber === undefined ? (
      <StartGameScreen onPickNumber={pickNumberHandler} />
    ) : (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );

  if (gameIsOver) {
    gameScreen = <GameOverScreen onRestartGame={handleRestartGame} />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootBackground}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootBackground}
        imageStyle={styles.imageBackground}
      >
        <SafeAreaView style={styles.rootBackground}>{gameScreen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootBackground: {
    flex: 1,
  },
  imageBackground: {
    opacity: 0.15,
  },
});
