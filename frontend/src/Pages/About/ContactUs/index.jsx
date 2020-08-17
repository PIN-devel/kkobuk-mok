import React, { useContext } from "react";
import Layout from "../../../Layout/MyDash/Dashboard";
import { Grid } from "@material-ui/core";
import Wrapper from "./styles";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const ContactUs = () => {
  const { auth } = useContext(AuthContext);
  if (!auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout>
        <Wrapper>
          <Grid className="subject">Contact Us</Grid>
          <Grid container className="info">
            <Grid xs={0} sm={0} md={1} item></Grid>
            <Grid xs={12} sm={6} md={2} item>
              <Grid className="img">
                <img src="/images/호준.jpg" alt="" />
              </Grid>
              <Grid className="title">김호준</Grid>
              <Grid className="text">email</Grid>
            </Grid>
            <Grid xs={12} sm={6} md={2} item>
              <Grid className="img">
                <img src="/images/동식.jpg" alt="" />
              </Grid>
              <Grid className="title">심동식</Grid>
              <Grid className="text">tlaehdtlr@kkobuk.com</Grid>
            </Grid>
            <Grid xs={12} sm={6} md={2} item>
              <Grid className="img">
                <img src="/images/주현.jpg" alt="" />
              </Grid>
              <Grid className="title">박주현</Grid>
              <Grid className="text">email</Grid>
            </Grid>
            <Grid xs={12} sm={6} md={2} item>
              <Grid className="img">
                <img src="/images/수미.jpg" alt="" />
              </Grid>
              <Grid className="title">조수미</Grid>
              <Grid className="text">email</Grid>
            </Grid>
            <Grid xs={12} sm={6} md={2} item>
              <Grid className="img">
                <img src="/images/인남.jpg" alt="" />
              </Grid>
              <Grid className="title">박인남</Grid>
              <Grid className="text">
                email
                {/* <br />
                (Yeoksam-Dong 718-5 Address) */}
              </Grid>
            </Grid>
            <Grid xs={0} sm={0} md={1} item></Grid>
          </Grid>
        </Wrapper>
      </Layout>
    );
  }
};

export default ContactUs;