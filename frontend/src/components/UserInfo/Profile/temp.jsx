import React, { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

const Temp = () => {
  const [temp, setTemp] = useState("Not Changed");
  const [isLoaded, setIsLoaded] = useState(false);
  const SERVER_URL = "http://localhost:8000";
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  Axios.get(`${SERVER_URL}/accounts/4`, config)
    .then((res) => {
      setTemp(res.data.data.first_name);
      setIsLoaded(true);
    })
    .catch((err) => {
      console.log(err);
    });
  if (isLoaded) {
    return <h1>HI I'm {temp}!!</h1>;
  }
  return <h1>Loading...</h1>;
};

export default Temp;
