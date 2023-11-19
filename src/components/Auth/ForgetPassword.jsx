import React, { useState } from "react";
import { TextField, Button} from '@mui/material';

const ForgetPassword = ({ data, onUpdatePassword }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleForgetPassword = (e) => {
    e.preventDefault();

    // Check email exists or not
    const user = data.find((user) => user.email === email);

    if (user) {
      // Update the user's password
      const updatedData = data.map((u) =>
        u.email === email ? { ...u, password: newPassword } : u
      );

      // Save the updated data to local storage
      localStorage.setItem("user", JSON.stringify(updatedData));

      // Notify parent component to password update
      onUpdatePassword(email, newPassword);

      // Reset form fields
      setEmail("");
      setNewPassword("");
      
    } else {
      alert("User not found");
    }
  };

  return (
    <div>   
       <h2>Forget Password</h2>
      <form onSubmit={handleForgetPassword}>
        <TextField
          required
          fullWidth
          type="email"
          label="Your Email"
          placeholder="Enter Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          type="password"
          label="New Password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
        >
          Reset Password
        </Button>
      </form>
    </div>

  );
};

export default ForgetPassword;