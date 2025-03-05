import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  

  const handleSubmit = () => {
    // Handle form submission here
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Cellphone:", cellphone);
    // if (profileImage) {
    //   console.log("Profile Image:", profileImage);
    // }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ime i prezime</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Cellphone Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Broj telefona</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your cellphone number"
          value={cellphone}
          onChangeText={setCellphone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Sačuvaj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
  container: {
    flex: 1,
  },
  profileImageContainer: {
    marginBottom: 20,
    position: "absolute",
    top: 100,
    left: 100
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#ddd",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'grey'
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
    borderColor: 'white'
  },
  submitButtonText: {
    color: "white",
    textAlign:'center',
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'grey',
    marginTop: 30,
    padding: 10
  },
});

export default UserProfile;
