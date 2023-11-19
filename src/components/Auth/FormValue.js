import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';

function FormValue() {
  const [signin, setSignIn] = useState(false);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("user")) || []);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();

    if (e.target.email.value && e.target.password.value) {
      if (!localStorage.getItem("user")) {
        localStorage.setItem(
          "user",
          JSON.stringify([{ email: e.target.email.value, password: e.target.password.value }])
        );
        navigate("/home", { state: e.target.email.value });
      } else {
        for (let val of data) {
          setEmail(val.email);
          if (val.email.includes(e.target.email.value)) {
            if (type === "signUp") {
              alert("User already Exist");
              setSignIn(true);
            } else {
              if (val.password === e.target.password.value) {
                navigate("/home", { state: e.target.email.value });
              } else {
                alert("Password does not match");
              }
            }
            return true;
          }
        }
        if (type === "signUp" && email !== e.target.email.value) {
          localStorage.setItem(
            "user",
            JSON.stringify([...data, { email: e.target.email.value, password: e.target.password.value }])
          );
          navigate("/home", { state: e.target.email.value });
        } else {
          alert("User does not exist");
          setSignIn(false);
        }
      }
    }
  };

  const handleForgetPassword = (email, newPassword) => {
    // Notify user  update password
    alert(`Password reset for ${email}. New password: ${newPassword}`);
  };

  return (
    <Paper elevation={3} style={{ padding: 30, width: 300, margin: "auto"  }}>
      {showForgetPassword ? (
        <ForgetPassword data={data} onUpdatePassword={handleForgetPassword} />
      ) : (
        <>
          <Tabs
            value={signin ? 1 : 0}
            indicatorColor="primary"
            textColor="primary"
            onChange={() => {
              setSignIn(!signin);
              setShowForgetPassword(false);
            }}
          >
            <Tab label="SignUp" />
            <Tab label="SignIn" />
          </Tabs>

          <form onSubmit={(e) => handleSubmit(e, signin ? "signIn" : "signUp")}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Your Email</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter Password"
              />
            </FormControl>

            <Button variant="contained" color="primary" type="submit">
              {signin ? "SignIn" : "SignUp"}
            </Button>

            <Button
              onClick={() => setShowForgetPassword(true)}
              style={{ display: signin ? "block" : "none", marginTop: 10 }}
            >
              Forget Password
            </Button>
          </form>
        </>
      )}
    </Paper>
  );
}

export default FormValue;
