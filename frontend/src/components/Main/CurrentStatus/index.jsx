import React, { useState, useContext, useEffect } from "react";
import CurrentScore from "../CurrentScore";
import Room from "../Room";
import { Grid } from "@material-ui/core";
import { Wrapper, Image } from "./styles";
import Bono2 from "../../../assets/bono2.jpg";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../../contexts/AuthContext";

const CurrentStatus = (props) => {
  const { SERVER_URL } = useContext(AuthContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const [myScore, setMyScore] = useState();
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const getInfo = () => {
    axios
      .get(`${SERVER_URL}/accounts/maininfo/`, config)
      .then((res) => {
        console.log("성공");
        setMyScore(res.data.data.posture_level);
        setHumidity(res.data.data.humidity);
        setTemperature(res.data.data.temperature);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("실패");
        console.log(err.response);
      });
  };

  useEffect(() => {
    getInfo();
    const ticktok = setInterval(getInfo, 10000);
  }, []);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Image src={Bono2} alt="gone" />
        </Grid>
        <Grid item xs={12} md={6}>
          <CurrentScore myScore={myScore} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Room humidity={humidity} temperature={temperature} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;
