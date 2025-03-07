import { Text, View, ActivityIndicator ,StyleSheet, Image, StatusBar ,TouchableOpacity } from "react-native";
import PostItImage from "@/assets/images/post-it.png";
import { useRouter } from "expo-router";
import{useAuth} from '../context/AuthContext'
import { lazy, useEffect } from "react";

const HomeScreen = () => {
  const {user,loading}=useAuth()
  const router = useRouter();
 
  useEffect(()=>{
    if(!loading && user){
      router.replace('/notes')
    }
  },[user,loading])

  if(loading){
    return(
      <View style={styles.centerContainer}>
        <ActivityIndicator size='large' color= 'origin'/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="orange" />
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E", // Dark background for a modern look
  },
});

export default HomeScreen;
