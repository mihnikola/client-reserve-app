import { useEffect, useState } from "react";
import { getStorage } from "@/helpers";
import LoginScreen from "../components/login/login";
import SettingsComponent from "../settings";
import Loader from "@/components/Loader";

export default function Settings() {
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
  return <>{!isLoading && isLoggedIn && <SettingsComponent />}{!isLoading && !isLoggedIn && <LoginScreen />}{isLoading && <Loader/>}</>;
}
