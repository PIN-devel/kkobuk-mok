import React from "react";
import Layout from "../../../Layout/MyDash/Dashboard";
import useStyles from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const AboutMe = () => {
  const classes = useStyles();

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Grid
          container
          className={classes.root}
          spacing={10}
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              제품 소개
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" className={classes.mute}>
              저희 꼬북이를 구매해주셔서 감사합니다. 제품 및 사이트 이용 전 아래
              내용을 확인해주세요.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={classes.control}>
              <img
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/screens-section.jpg"
                alt=""
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Typography variant="h5" className={classes.icon}>
                  <i class="fas fa-heart fa-2x"></i>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5">거북목 관리</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Typography variant="h6" className={classes.mute}>
                  사용자의 자세에 맞춰 거북이의 목이 움직입니다. 자세는 가장
                  좋은 자세인 1단계부터 가장 안좋은 자세인 3단계로 나뉩니다.
                  단계가 바뀔 때마다 거북이 목이 움직이며, 3단계를 일정 시간
                  동안 유지하면 경고 알림이 울립니다. 대시보드 페이지에서 실시간
                  자세 점수를 확인할 수 있고, 프로필 페이지에서 최근 일주일
                  동안의 자세 통계를 확인할 수 있습니다.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5" className={classes.icon}>
                  <i class="fas fa-clock fa-2x"></i>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5">시간 관리</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Typography variant="h6" className={classes.mute}>
                  사용자는 대시보드 페이지 하단의 타이머를 이용해 시간 관리를 할
                  수 있습니다. 총 작업 시간과 휴식 시간 설정을 할 수 있습니다.
                  작업 시간과 휴식 시간의 시작 및 종료 시 꼬북이가 알림을
                  줍니다. 대시보드 페이지에서 무음 모드 설정이 가능하며, 알림
                  테마를 바꿔 알림음을 바꿀 수 있습니다.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5" className={classes.icon}>
                  <i class="fas fa-tint fa-2x"></i>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5">습도 관리</Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Typography variant="h6" className={classes.mute}>
                  사용자의 작업 환경에 대한 온습도 정보를 대시보드 페이지에서
                  확인할 수 있습니다. 사용자가 설정한 희망 습도에 따라 가습기가
                  자동으로 on/off가 됩니다. 또한 원할 시 메인페이지에서 가습기
                  수동 조작도 가능합니다
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent className={classes.cardHeader}>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.cardTitle}
                >
                  꼬북목 사용법
                </Typography>
                <Typography variant="h5">
                  <Grid container spacing={6} className={classes.cardBody}>
                    <Grid item xs={12}>
                      1. 꼬북목 기기를 준비합니다.
                    </Grid>
                    <Grid item xs={12}>
                      2. 회원가입 및 꼬북목 제품키 등록 후 로그인을 합니다.
                    </Grid>
                    <Grid item xs={12}>
                      3. 대시보드 페이지에서 타이머 및 가습기 설정을 합니다.
                    </Grid>
                    <Grid item xs={12}>
                      4. 시작 버튼 클릭합니다.
                    </Grid>
                    <Grid item xs={12}>
                      5. 시간 별 자세 점수를 통해 거북목 관리를 할 수 있습니다.
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent className={classes.cardHeader}>
                <Typography
                  variant="h4"
                  align="center"
                  className={classes.cardTitle}
                >
                  주의 사항
                </Typography>
                <Typography variant="h5">
                  <Grid container spacing={6} className={classes.cardBody}>
                    <Grid item xs={12}>
                      1. 꼬북목 기기의 위치가 적합하지 않으면 정확한 거북목
                      판단이 어려울 수 있습니다.
                    </Grid>
                    <Grid item xs={12}>
                      2. 주변 환경이 너무 어두우면 정확한 거북목 판단이 어려울
                      수 있습니다.
                    </Grid>
                    <Grid item xs={12}>
                      3. 가습기에 물을 보충할때 기기 안에는 물이 들어가지 않도록
                      주의해주십시오.
                    </Grid>
                    <Grid item xs={12}>
                      4. 충격을 가하면 고장의 원인이 될 수 있습니다.
                    </Grid>
                    <Grid item xs={12}>
                      5. 억지로 목을 당기거나 밀면 고장의 원인이 될 수 있습니다.
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* <section className="my-5">
        <h2 className="h1-responsive font-weight-bold text-center my-5">
        제품 소개
        </h2>
        <p className="lead grey-text w-responsive text-center mx-auto mb-5">
        저희 꼬북이를 구매해주셔서 감사합니다. 제품 및 사이트 이용 전 아래
          내용을 확인해주세요.
        </p>
         */}
      {/* <MDBRow>
          <MDBCol lg="5" className="text-center text-lg-left">
            <img
              className="img-fluid"
              src="https://mdbootstrap.com/img/Photos/Others/screens-section.jpg"
              alt=""
            />
          </MDBCol>
          <MDBCol lg="7">
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="heart" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">거북목 관리</h5>
                <p className="grey-text">
                  사용자의 자세에 맞춰 거북이의 목이 움직입니다. 자세는 가장
                  좋은 자세인 1단계부터 가장 안좋은 자세인 3단계로 나뉩니다.
                  단계가 바뀔 때마다 거북이 목이 움직이며, 3단계를 일정 시간
                  동안 유지하면 경고 알림이 울립니다. 대시보드 페이지에서 실시간
                  자세 점수를 확인할 수 있고, 프로필 페이지에서 최근 일주일
                  동안의 자세 통계를 확인할 수 있습니다.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="clock" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">시간 관리</h5>
                <p className="grey-text">
                  사용자는 대시보드 페이지 하단의 타이머를 이용해 시간 관리를 할
                  수 있습니다. 총 작업 시간과 휴식 시간 설정을 할 수 있습니다.
                  작업 시간과 휴식 시간의 시작 및 종료 시 꼬북이가 알림을
                  줍니다. 대시보드 페이지에서 무음 모드 설정이 가능하며, 알림
                  테마를 바꿔 알림음을 바꿀 수 있습니다.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol size="1">
                <MDBIcon icon="tint" size="2x" className="deep-purple-text" />
              </MDBCol>
              <MDBCol xl="10" md="11" size="10">
                <h5 className="font-weight-bold mb-3">환경 관리</h5>
                <p className="grey-text">
                  사용자의 작업 환경에 대한 온습도 정보를 대시보드 페이지에서
                  확인할 수 있습니다. 사용자가 설정한 희망 습도에 따라 가습기가
                  자동으로 on/off가 됩니다. 또한 원할 시 메인페이지에서 가습기
                  수동 조작도 가능합니다.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </section>
      <MDBRow>
        <MDBCol col="6">
          <MDBCard>
            <MDBCardImage
              className="blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded"
              tag="div"
            >
              <h2>1</h2>
              <p>꼬북이 사용법</p>
            </MDBCardImage>
            <MDBCardBody cascade className="text-center">
              <MDBCardText>
                1. 꼬북이 기기 구매 2. 회원가입 시 꼬북목 제품키 등록 3. 로그인
                후 사용 시간 및 휴식 시간 설정 (설정 안할 시 자동 재생) 4.
                꼬북이 기기 ON 5. 내 자세 점수를 기기 또는 웹으로 확인 6. 거북목
                탈출
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col="6">
          <MDBCard>
            <MDBCardImage
              className="blue-gradient white-text d-flex justify-content-center align-items-center flex-column p-4 rounded"
              tag="div"
            >
              <h2>2</h2>
              <p>주의사항</p>
            </MDBCardImage>
            <MDBCardBody cascade className="text-center">
              <MDBCardText>
                1. 장비가 물에 들어가지 않게 조심 2. 충격에 약하니 무거운 물건
                올리지 않기 3. 장비의 목이 나올 수 있도록 공간 확보 필수 4. 인형
                얼굴로 공놀이 금지 5. 인형이 너무 귀여운 나머지 애정행각 금지
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow> */}
    </Layout>
  );
};

export default AboutMe;
