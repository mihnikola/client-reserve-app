import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import Storage from "expo-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { getApiUrl } from "@/helpers";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  const saveStorage = async (dataValue) => {
    console.log("saveStorage", dataValue);
    await Storage.setItem({
      key: "token",
      value: dataValue,
    });
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Obaveštenje!",
        "Da li stvarno želite da izadjete iz aplikacije?",
        [
          {
            text: "Otkaži",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Ok", onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  React.useLayoutEffect(() => {
    // Set custom back button behavior
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("(tabs)", { screen: "employers" });
          }}
        >
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);
       const api = getApiUrl();

      try {
        await axios
          .post(`${api}/users/login`, {
            email,
            password,
          })
          .then((res) => {
            saveStorage(res.data.token);
            setIsLoading(false);
            showToast("Login Successfull!");
            navigation.navigate("(tabs)");
          })
          .catch((error) => {
            console.log("errorerrorerror", error);
            setIsLoading(false);
          });
      } catch (e) {
        setIsLoading(false);
        console.log("error", e);
      }
    } else {
      showToast("Please enter both email and password");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={{ padding: 20, marginTop: 10 }}>
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.reactLogo}
      />
      <Text style={styles.title}>Prijavi se</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textInput}
      />

      <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {isLoading ? "Prijavljivanje..." : "Prijava"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Ukoliko nemate nalog možete se registrovati{" "}
            <TouchableOpacity
              onPress={() => navigation.navigate("components/register/register")}
              style={{ marginTop: 7 }}
            >
              <Text style={styles.linkText}>ovde.</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    marginTop: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  button: {
    padding: 5,

    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  container: {
    marginTop: 10,
    flexDirection: "column", // This is similar to flex-col in Tailwind
    justifyContent: "space-between",
    gap: 10, // React Native doesn't have a gap utility like Tailwind, but you can achieve spacing using margin or padding
  },
  textContainer: {
    alignItems: "center", // For centering the text on smaller screens
    flexDirection: "row", // Flex row for larger screens (equivalent to md:flex-row in Tailwind)
    justifyContent: "space-between",
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  text: {
    color: "#6B7280", // Equivalent to text-neutral-500
    textAlign: "center", // Default alignment for smaller screens
  },
  linkText: {
    color: "white",
    textDecorationLine: "underline",
    cursor: "pointer", // While this doesn't do exactly the same thing as cursor:pointer in web, it works for touch events in React Native
  },
  reactLogo: {
    height: 300,
    width: 320,
    margin: "auto",
    marginTop: 40,
  },
});

export default LoginScreen;
