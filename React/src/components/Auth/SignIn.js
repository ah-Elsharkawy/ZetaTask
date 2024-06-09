// src/components/Auth/SignUp.js
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { Button, TextField, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
});

const Form = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "300px",
  gap: "20px",
});

const StyledButton = styled(Button)({
  marginTop: "10px",
});

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const handleLogIn = async () => {
    try {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Please enter a valid email");
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error(
          "Password should be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }

      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      setCurrentUser(user);

      toast.success("Logged In successfully", {
        position: "top-center",
        autoClose: 1000,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/");
    } catch (error) {
      toast.error(error.message, { position: "top-center", autoClose: 1000 });
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        LogIn
      </Typography>
      <Form component="form">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <StyledButton variant="contained" color="primary" onClick={handleLogIn}>
          Login
        </StyledButton>
      </Form>
    </FormContainer>
  );
};

export default LogIn;
