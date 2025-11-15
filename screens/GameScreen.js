import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
// Ionicons documentation: https://icons.expo.fyi/Index
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

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
  const [roundStats, setRoundStats] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(roundStats.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setRoundStats((currentStats) => [newRandomNumber, ...currentStats]);
  }

  const roundListLength = roundStats.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <View>
        <NumberContainer>{currentGuess}</NumberContainer>
      </View>
      <Card>
        <View>
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
                <Ionicons name="add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Card>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={roundStats}
          renderItem={({ item, index }) => (
            <GuessLogItem roundNumber={roundListLength - index} guess={item} />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  roundText: {
    fontFamily: "open-sans",
    fontSize: 24,
    color: "white",
  },
  flatlistContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
