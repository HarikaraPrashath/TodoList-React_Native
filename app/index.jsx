import { Text, View, StyleSheet, Image, StatusBar ,TouchableOpacity } from "react-native";
import PostItImage from "@/assets/images/post-it.png";
import { router, useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f4511e" />
      <Image source={PostItImage} style={styles.image} />
      <Text style={styles.title}>Welcome to Notes app </Text>
      <Text style={styles.subTittle}>
        Capture Your Thoughts any time anywhere
      </Text>
      <TouchableOpacity
      style={styles.button}
      onPress={()=> router.push('/notes')}
      >
       <Text style={styles.buttonText}>
        Get Start
       </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Vertically centers content
    alignItems: "center", // Horizontally centers content
    backgroundColor: "#fff", // Background color for the screen
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subTittle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
