import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import useStyles from "./styles";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

export default function SignUp() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [product, setProduct] = useState("");
  const [gender, setGender] = useState("1");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const { auth, setAuth, SERVER_URL, myUserId, setMyUserId } = useContext(
    AuthContext
  );

  const history = useHistory();

  const handleSetFirstName = (first) => {
    setFirstName(first);
  };
  const handleSetLastName = (last) => {
    setLastName(last);
  };
  const handleSetEmail = (email) => {
    setEmail(email);
  };
  const handleSetPassword = (password) => {
    setPassword(password);
  };
  const handelSetPasswordConfirm = (passwordConfirm) => {
    setPasswordConfirm(passwordConfirm);
  };
  const handleSetGender = (gender) => {
    setGender(gender);
  };
  const handleSetBirthDate = (birthdate) => {
    setBirthDate(birthDate);
  };

  const reqSignUp = (signUpData) => {
    // console.log(signUpData);
    const url = `${SERVER_URL}/rest-auth/signup/`;
    const handleSetAuth = (auth) => {
      setAuth(auth);
      // setMyUserId(myUserId);
    };
    axios
      .post(url, signUpData)
      .then((res) => {
        console.log("회원가입성공");
        console.log(res);
        Cookies.set("token", res.data.key, { path: "/" });
        handleSetAuth(true);
        history.push("user/");
        // 이거 프로필로 갈 때, 유저가 product 키 입력해줬으면 그것도 같이 보내주자 아 그러지는 말까?.... 어쩌지 고민좀
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numGender = Number(gender);

    // const useBirthDate =
    if (password === passwordConfirm) {
      if (password.length < 8) {
        alert("비밀번호는 8자리 이상 입력해주세요");
      } else {
        reqSignUp({
          first_name: firstName,
          last_name: lastName,
          email,
          password1: password,
          password2: password,
          gender: numGender,
          birth_date: birthDate,
        });
      }
    } else {
      alert("비밀번호가 다릅니다.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => {
                  handleSetFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => {
                  handleSetLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  handleSetEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  handleSetPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="check"
                label="Check Password"
                type="password"
                id="check"
                autoComplete="current-password"
                value={passwordConfirm}
                onChange={(e) => {
                  handelSetPasswordConfirm(e.target.value);
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="product"
                label="Product Key"
                name="product"
                autoComplete="p-key"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={3}>
              <FormLabel>Gender</FormLabel>
            </Grid>
            <Grid item xs={12} sm={7}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => {
                    handleSetGender(e.target.value === "female" ? "1" : "0");
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormLabel>Birthday</FormLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <form className={classes.container} noValidate>
                <TextField
                  id="birth"
                  type="date"
                  name="birth"
                  defaultValue="2000-01-01"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    handleSetBirthDate(e.target.value);
                  }}
                />
              </form>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
