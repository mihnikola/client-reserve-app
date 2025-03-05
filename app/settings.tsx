import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useNavigation } from "expo-router";
import axios from "axios";
import { getStorage, removeStorage } from "@/helpers";

const SettingsComponent = () => {
  const navigation = useNavigation();
  const [logout, setLogout] = useState(null);

  const onPressHandler = (data) => {
    if (data === "1") {
      navigation.navigate("components/settings/userprofile");
    }
    if (data === "2") {
      navigation.navigate("components/settings/aboutapplication");
    }
    // if (data === "3") {
    //   navigation.navigate("components/settings/aboutapplication");
    // }
    if (data === "6") {
      logoutHandler();
      // navigation.navigate("components/settings/aboutapplication");
    }
  };

  const logoutHandler = async () => {
    removeStorage().then((r) => navigation.navigate("(tabs)"));

    // getStorage()
    // .then((res) => {
    //   if (res) {
    //     setLogout(res);
    //   } else {
    //     setLogout(null);
    //   }
    // })
    // .catch((error) => {

    //   console.log("error", error);
    // });
    // try {
    //   await axios
    //     .post(`${api}/users/logout", {
    //       params:{
    //         token: logout
    //       },
    //       headers: {
    //         Authorization: `${logout}`,
    //       },
    //     })
    //     .then((res) => {
    //       navigation.navigate("(tabs)");
    //     })
    //     .catch((er) => console.log(er));
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <View>
      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.containerInfo}>
        <SettingItem
          title="Korisnički profil"
          icon="person.outline"
          handlePress={() => onPressHandler("1")}
        />

        <SettingItem
          title="Notifikacije"
          icon="notifications.fill"
          handlePress={() => onPressHandler("3")}
        />
        <SettingItem
          title="Pravila privatnosti"
          icon="lock"
          handlePress={() => onPressHandler("4")}
        />
        <SettingItem
          title="Uslovi korišćenja"
          icon="file"
          handlePress={() => onPressHandler("5")}
        />
        <SettingItem
          title="O aplikaciji"
          icon="info"
          handlePress={() => onPressHandler("2")}
        />
        <SettingItem
          title="Odjavi me"
          icon="logout"
          handlePress={() => onPressHandler("6")}
        />
      </View>
    </View>
  );
};

export default SettingsComponent;

const styles = StyleSheet.create({
  containerInfo: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  item: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    alignItems: "center",
  },
});

const SettingItem = ({ title, icon, handlePress }) => {
  return (
    <View style={styles.item}>
      <IconSymbol color="white" name={icon} size={32} />
      <Pressable style={styles.content} onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
        <IconSymbol color="white" name="arrow.right" size={32} />
      </Pressable>
    </View>
  );
};
