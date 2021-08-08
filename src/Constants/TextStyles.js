import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
export default StyleSheet.create({
  Header1: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  Header2: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  Header3: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  BoxDescription: {
    color: Colors.white,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    opacity: 0.6,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  DotText: {
    fontSize: 13,
    fontWeight: "bold",
    opacity: 0.8,
    color: Colors.white,
    textAlign: "center",
  },
});
