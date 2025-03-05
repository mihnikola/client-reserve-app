import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "expo-storage";
import Constants  from "expo-constants";

export function addMinutesToTime(inputTime, minutesToAdd) {
  // Parsiraj ulazno vreme (format je hh:mm)
  const [hours, minutes] = inputTime?.split(":").map(Number);

  // Kreiraj datum sa tim vremenom
  let date = new Date();
  date.setHours(hours, minutes, 0, 0); // Postavi vreme

  // Dodaj traženi broj minuta
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Formatiraj rezultat
  let updatedHours = String(date.getHours()).padStart(2, "0");
  let updatedMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${updatedHours}:${updatedMinutes}`;
}

export function convertToMonthName(dateString) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Get the month name (e.g., January)
  const monthName = date
    .toLocaleString("en-US", { month: "long" })
    .substring(0, 3)
    .toUpperCase();

  return monthName; // Output: January
}
// get token from storage
export const getStorage = async () => {
  const res = await Storage.getItem({ key: "token" });
  return res;
};
export function getApiUrl(){
  return Constants?.expoConfig?.extra?.apiUrl;

}
//remove token from storage
export const removeStorage = async () => {
  const res = await Storage.removeItem({ key: "token" });
  return res;
};
export function convertToDay(dateString) {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Get the day of the month
  const day = date.getDate();

  return day; // Output: January
}

export const convertDate = (item: any) => {
    const date = new Date(item);
    const weekdays = [
      "Nedelja",
      "Ponedeljak",
      "Utorak",
      "Sreda",
      "Četvrtak",
      "Petak",
      "Subota",
    ];

    // Get the day of the week in Croatian
    const dayOfWeek = weekdays[date.getDay()];

    // Format the date to day-month-year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Combine everything into the desired format
    return `${dayOfWeek} ${day}-${month}-${year}`;
  };

export async function getAuthToken() {
  const authToken = await AsyncStorage.getItem("authToken");
  if (authToken._j === null) {
    return false;
  } else {
    return true;
  }
}
