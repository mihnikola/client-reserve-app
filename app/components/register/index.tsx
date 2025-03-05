import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { LABEL_VALUES } from "@/constants";
import { useNavigation } from "expo-router";
import axios from "axios";
import Storage from "expo-storage";
import { getApiUrl } from "@/helpers";

const register = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigation = useNavigation();


  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
       const api = getApiUrl();

    try {
      await axios
        .post(`${api}/users`, {
          name: userName,
          email,
          password,
        })
        .then((result) => {
          console.log("sadas", result);
          showToast();
          setTimeout(() => {
            navigation.navigate("components/login/login");
          }, 3000);
        })
        .catch((error) => {
          console.log("sadas", error);
        });
    } catch (e) {
      console.log("error ", e);
    }
  };
  const showToast = () => {
    ToastAndroid.show("User created successfully!", ToastAndroid.SHORT);
  };

  return (
    <ScrollView style={styles.form}>
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.logoImageImg}
      />
      <View>
        <Text style={styles.title}>Registruj se</Text>
      </View>
      <View style={styles.formContent}>
      <TextInput
        placeholder="Unesi ime i prezime "
        value={userName}
        onChangeText={setUserName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Unesi email "
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Unesi lozinku "
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Potvrdi lozinku "
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.textInput}
      />

      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{LABEL_VALUES.REGISTER}</Text>
        </View>
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Ukoliko već imate nalog možete se prijaviti{" "}
            <TouchableOpacity
              onPress={() => 
                navigation.navigate("components/login/login")}
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

export default register;

const styles = StyleSheet.create({
  formContent:{
    display: "flex",
    gap:5
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  button: {
    margin: 10,
    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    // marginBottom: 20,
    // marginTop: 5,
    marginVertical: 10,
    textAlign: "center",
  },
  logoImageImg: {
    height: 300,
    marginTop: 40,
    width: 320,
    margin: "auto",
    
  },
  textInput: {
    margin: "auto",
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
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
  text: {
    color: "#6B7280", // Equivalent to text-neutral-500
    textAlign: "center", // Default alignment for smaller screens
  },
  linkText: {
    textAlign: "center", // Default alignment for smaller screens
    color: "white",
    textDecorationLine: "underline",
    cursor: "pointer", // While this doesn't do exactly the same thing as cursor:pointer in web, it works for touch events in React Native
  },
});
