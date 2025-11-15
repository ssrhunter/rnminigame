import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
// expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/
import AppLoading from "expo-app-loading";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [roundCount, setRoundCount] = useState(0);
  const [gameIsOver, setGameIsOver] = useState(false);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickNumberHandler(enteredNumber) {
    var enteredNumberToInt = parseInt(enteredNumber);
    console.log(`User picked number: ${enteredNumberToInt}`);
    setUserNumber(enteredNumberToInt);
  }

  function handleRestartGame() {
    setUserNumber(undefined);
    setGameIsOver(false);
    setRoundCount(0);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setRoundCount(numberOfRounds);
  }

  var gameScreen =
    userNumber === undefined ? (
      <StartGameScreen onPickNumber={pickNumberHandler} />
    ) : (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );

  if (gameIsOver) {
    gameScreen = (
      <GameOverScreen
        roundCount={roundCount}
        userNumber={userNumber}
        onRestartGame={handleRestartGame}
      />
    );
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
