import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,

} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";
import Input from "./input";
import Icon from "./Icon";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  //it's like a toggle
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    // one is sig in submit other is sign up submit
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    // this spread all other properties but only change the one specific one currently u on wih the target value(current input field)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was  unsuccessful. Try again later");
  };
  const googleSuccess = async (res) => {
    // console.log(res);
    const result = res?.profileObj; //from google
    const token = res?.tokenId; //from google
    try {
      //we throw the action with result and token
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                {/* <Grid xs={6} md={12}>
                <TextField
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
                </Grid>
                <Grid xs={6} md={12}>
                <TextField
                  name="LastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
                </Grid>  instead of repeating this we can create a custom component for input*/}

                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label=" Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button type="submit" variant="contained" fullWidth color="primary" className='button'>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="674637406945-v8eek61gu3gf0g3d3n38f78oj9ki8k02.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
