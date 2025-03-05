import React, { useEffect, useState } from "react";
import { getStorage } from "@/helpers";
import LoginScreen from "../login/login";
import DateComponent from "./DateComponent";
import Loader from "@/components/Loader";

const DateReservation: React.FC = () => {
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
    return <>{!isLoading && isLoggedIn && <DateComponent />}{!isLoading && !isLoggedIn && <LoginScreen />}{isLoading && <Loader/>}</>;
  }

export default DateReservation;
