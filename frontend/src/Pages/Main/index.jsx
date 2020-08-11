import React, { useState, useContext, useEffect, useRef } from "react";
import Layout from "../../Layout/MyDash/Dashboard";
import Wrapper from "./styles";
import CurrentStatus from "../../components/Main/CurrentStatus";
import ControlPanel from "../../components/Main/ControlPanel";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../contexts/AuthContext";
import { MainContext } from "../../contexts/MainContext";

const Main = () => {
  const { SERVER_URL } = useContext(AuthContext);
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const [currentImg, setCurrentImg] = useState();
  const [currentScore, setCurrentScore] = useState();
  const [currentHu, setCurrentHu] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [currentScoreData, setCurrentScoreData] = useState([]);
  const [spentTime, setSpentTime] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [TotalTime, setTotalTime] = useState(0);
  const [WorkTime, setWorkTime] = useState(0);
  const [BreakTime, setBreakTime] = useState(0);

  const scoreDataRef = useRef(currentScoreData);
  scoreDataRef.current = currentScoreData;

  // created_at = models.DateTimeField(auto_now_add=True)
  //   # 사용자 설정 값
  //   total_time = models.IntegerField()
  //   work_time = models.IntegerField()
  //   break_time = models.IntegerField()
  //   # 일시정지 기록
  //   total_stop_time = models.IntegerField(default=0)
  //   last_stop_time = models.DateTimeField(null=True)
  //   # 실제 총 작업 시간
  //   real_work_time = models.IntegerField()

  //   user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='time_setting')

  // break_time: 0
  // created_at: "2020-08-11T19:21:18.587713+09:00"
  // id: 3
  // last_stop_time: "2020-08-11T19:21:21.783919+09:00"
  // real_work_time: 5
  // total_stop_time: 0
  // total_time: 0
  // user: 9
  // work_time: 0

  const findoutSpent = (started, wasted) => {
    const st_year = Number(started.slice(0, 4));
    const st_month = Number(started.slice(5, 7)) - 1;
    const st_day = Number(started.slice(8, 10));
    const st_hour = Number(started.slice(11, 13));
    const st_min = Number(started.slice(14, 16));
    const st_sec = Number(started.slice(17, 19));
    const backthen = new Date(
      st_year,
      st_month,
      st_day,
      st_hour,
      st_min,
      st_sec
    );
    const now = new Date();
    return Math.floor(Math.abs(now - backthen) / 1000) - wasted;
  };

  const getInfo = () => {
    axios
      .get(`${SERVER_URL}/accounts/maininfo/`, config)
      .then((res) => {
        setCurrentTemp(res.data.data.temperature);
        setCurrentHu(res.data.data.humidity);
        const St = res.data.data.user_state;
        setCurrentStatus(St);
        if (St !== 1) {
          // 뭔가 하고있음
          const spent = findoutSpent(
            res.data.data.time.created_at,
            res.data.data.time.total_stop_time
          );
          console.log(res.data.data.time.total_stop_time);
          setSpentTime(spent);
        }
        setCurrentScore(res.data.data.posture_level);
        setCurrentScoreData(res.data.data.posture_avg);
        setTotalTime(res.data.data.time.total_time);
        setWorkTime(res.data.data.time.work_time);
        setBreakTime(res.data.data.time.break_time);
        console.log("데이터 받아오는 중");
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log("정보 못받는중");
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

  return (
    <Layout>
      <MainContext.Provider
        value={{
          currentImg,
          currentScore,
          currentHu,
          currentTemp,
          currentScoreData,
          spentTime,
          currentStatus,
          TotalTime,
          WorkTime,
          BreakTime,
        }}
      >
        <Wrapper>
          <CurrentStatus />
          <ControlPanel />
        </Wrapper>
      </MainContext.Provider>
    </Layout>
  );
};

export default Main;
