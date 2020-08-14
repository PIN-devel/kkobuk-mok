import React from "react";
import Layout from "../../../Layout/MyDash/Dashboard";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const AboutMe = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Grid className={classes.center} container spacing={5}>
          <Grid item xs={5}>
            <Paper>
              <div className={classes.color}>
                <h1 className={classes.head}>사용법</h1>
              </div>
              <div className={classes.content}>
                <p>1. 꼬북목 기기 구매</p>
                <p>2. 회원가입 시 꼬북목 제품키 등록</p>
                <p>
                  3. 로그인 후 사용 시간 및 쉬는 시간 설정 (설정 안할 시 자동
                  재생)
                </p>
                <p>4. 꼬북목 기기 ON</p>
                <p>5. 내 자세 점수를 기기 또는 웹으로 확인</p>
                <p>6. 거북목 탈출!!</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper>
              <div className={classes.color}>
                <h1 className={classes.head}>주의사항</h1>
              </div>
              <div className={classes.content}>
                <p>- 장비가 물에 들어가지 않게 조심</p>
                <p>- 충격에 약하니 무거운 물건 올리지 않기</p>
                <p>- 장비의 목이 나올수 있도록 공간 확보 필수</p>
                <p>- 인형 얼굴로 공놀이 금지</p>
                <p>- 인형이 너무 귀여운 나머지 애정행각 금지</p>
                <br></br>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default AboutMe;
