import { View, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ onRestartGame }) {
  return (
    <View>
      <Text>Game is over!</Text>
      <PrimaryButton onPress={onRestartGame}>Restart Game</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;
