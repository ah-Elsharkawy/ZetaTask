// src/components/Auth/SignUp.js
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { Button, TextField, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

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

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
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

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      toast.success("User created successfully", {
        position: "top-center",
        autoClose: 1000,
      });
      console.log(user);
    } catch (error) {
      toast.error(error.message, { position: "top-center", autoClose: 1000 });
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
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
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSignUp}
        >
          Sign Up
        </StyledButton>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
