import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  card: {
    //justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 35,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800, //"#4e0329",
    borderRadius: 8,
    elevation: 4, // Android
    shadowColor: "black", // iOS
    shadowOffset: { width: 0, height: 2 }, // iOS
    shadowRadius: 6, // iOS
    shadowOpacity: 0.25, // iOS
  },
});
