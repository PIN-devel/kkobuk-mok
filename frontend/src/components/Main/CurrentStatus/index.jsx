import React, { useState, useContext, useEffect } from "react";
import CurrentScore from "../CurrentScore";
import Room from "../Room";
import { Grid } from "@material-ui/core";
import { Wrapper, Image } from "./styles";
import turtle1 from "../../../assets/turtle1.jpg";
import turtle2 from "../../../assets/turtle2.jpg";
import turtle3 from "../../../assets/turtle3.jpg";
import turtle4 from "../../../assets/turtle4.jpg";
import head from "../../../assets/Khead.png";
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
  const [scoreClass, setScoreClass] = useState("whiteCircle");
  const [isLoaded, setIsLoaded] = useState(false);

  const getInfo = () => {
    axios
      .get(`${SERVER_URL}/accounts/maininfo/`, config)
      .then((res) => {
        console.log(res.data.data);
        setMyScore(res.data.data.posture_level);
        if (myScore === 3) {
          setScoreClass("blueCircle");
        } else if (myScore === 2) {
          setScoreClass("yellowCircle");
        } else if (myScore === 1) {
          setScoreClass("redCircle");
        } else {
          setScoreClass("whiteCircle");
        }
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
    const tick = setInterval(getInfo, 1000);
    return function cleanup() {
      clearInterval(tick);
    };
  }, []);

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Image
            src={
              myScore === 3
                ? head
                : myScore === 2
                ? head
                : myScore === 1
                ? head
                : head
            }
            alt="gone"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <CurrentScore myScore={myScore} scoreClass={scoreClass} />
        </Grid>
        <Grid item xs={12} md={4} className="dodo">
          <Room humidity={humidity} temperature={temperature} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CurrentStatus;
