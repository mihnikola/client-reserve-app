import {getStorage } from "@/helpers";
import { useEffect, useState } from "react";
import LoginScreen from "../components/login/login";
import NotificationComponent from "../components/notification/NotificationComponent";
import Loader from "@/components/Loader";

export default function TabTwoScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getStorage()
      .then((res) => {
        if (res) {
          setIsLoggedIn(res);
          setIsLoading(false);
        } else {
          setIsLoggedIn(null);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);

        console.log("error", error);
      });
  }, []);

  return <>{!isLoading && isLoggedIn && <NotificationComponent />}{!isLoading && !isLoggedIn && <LoginScreen />}{isLoading && <Loader/>}</>;

}
