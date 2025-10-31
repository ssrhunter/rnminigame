import { View, Text, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const INITIAL_MIN = 1;
const INITIAL_MAX = 100;
let minBoundary = INITIAL_MIN;
let maxBoundary = INITIAL_MAX;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(
    INITIAL_MIN,
    INITIAL_MAX,
    userNumber
  );

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      minBoundary = 1;
      maxBoundary = 100;
      onGameOver();
    }
  }),
    [currentGuess, userNumber, onGameOver];

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "Don't lie to the computer! Tell the truth!", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(
      `Current Max Boundary: ${maxBoundary}, Current Min Boundary: ${minBoundary}`
    );
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <View>
        <NumberContainer>{currentGuess}</NumberContainer>
      </View>
      <Card>
        <View>
          <InstructionText>Higher or lower?</InstructionText>
          <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              -
            </PrimaryButton>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              +
            </PrimaryButton>
          </View>
        </View>
        <View>
          <Text>LOG ROUNDS</Text>
        </View>
      </Card>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
