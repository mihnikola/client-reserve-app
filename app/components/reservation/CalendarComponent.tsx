import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Storage from "expo-storage";
import Loader from "@/components/Loader";
import CardFutureReservation from "@/app/components/reservation/CardFutureReservation";
import CardNoReservation from "@/app/components/reservation/CardNoReservation";
import { getApiUrl, getStorage } from "@/helpers";

const CalendarComponent = () => {
  const [check, setCheck] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const checkReservationHandler = () => {
    setCheck(true);
  };

  const checkPastReservationHandler = () => {
    setCheck(false);
  };

  useEffect(() => {
    getStorage()
      .then((res) => {
        if (res) {
          getReservationsData(res);
        }
      })
      .catch((error) => console.log("error", error));
    
  }, [check]);

  const getReservationsData = async (tokenValue) => {
    setIsLoading(true);
    const api = getApiUrl();

    try {
      await axios
        .get(`${api}/reservations`, {
          params: {
            token: tokenValue,
            check: check,
          },
          headers: { Authorization: `${tokenValue}` },
        })
        .then((res) => {
          console.log("rrrrDtadata",res.data)
          if (res.status === 200) {
            setReservations(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <View style={styles.containerCapture}>
        <Text
          style={[styles.capture, check && styles.active]}
          onPress={checkReservationHandler}
        >
          Budući
        </Text>
        <Text
          style={[styles.capture, !check && styles.active]}
          onPress={checkPastReservationHandler}
        >
          Prošli
        </Text>
      </View>
      <View style={styles.greyLine} />
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ display: "flex" }}>
          {check && reservations?.length > 0 ? (
            <CardFutureReservation reservations={reservations} />
          ) : (
            check && reservations?.length === 0 && <CardNoReservation />
          )}
          {!check && reservations?.length > 0 ? (
            <CardFutureReservation reservations={reservations} />
          ) : (
            !check && reservations?.length === 0 && <CardNoReservation />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  active: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  containerCapture: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    position: "absolute",
    top: 240,
  },
  greyLine: {
    width: "100%",
    height: 4,
    backgroundColor: "grey",
    marginTop: -1,
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.2,
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
  },
});
