


// // LoginVariant2.jsx


// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { TextField, Button, Typography, Box, Container } from "@mui/material";
// import axios from 'axios'
// const LoginVariant2 = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${apiUrl}/login`, { email, password });
//       console.log('response from login',response.data.token);
//       localStorage.setItem("authToken", response.data.token);
//       alert(response.data.message);

//       login(response.data.token);
//       navigate("/upload", { state: { ...response.data } });
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

//   return (
//     <Container maxWidth="xs">
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 4,
//           backgroundColor: "linear-gradient(to right, #ff7e5f, #feb47b)",
//           borderRadius: 3,
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
//           mt: 5,
//         }}
//       >
//         <Typography variant="h3" sx={{ marginBottom: 3, color: "#fff", textAlign: "center" }}>
//           Welcome Back
//         </Typography>

//         <TextField
//           label="Email"
//           variant="filled"
//           value={email}
//           onChange={handleEmailChange}
//           required
//           fullWidth
//           error={!isEmailValid && email.length > 0}
//           helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
//           sx={{
//             marginBottom: 3,
//             backgroundColor: "#fff",
//             borderRadius: 2,
//           }}
//         />

//         <TextField
//           label="Password"
//           type="password"
//           variant="filled"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           fullWidth
//           sx={{
//             marginBottom: 3,
//             backgroundColor: "#fff",
//             borderRadius: 2,
//           }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{
//             padding: "12px",
//             fontSize: "16px",
//             backgroundColor: "#ff6f61",
//             color: "#fff",
//             "&:hover": {
//               backgroundColor: "#d9534f",
//             },
//           }}
//         >
//           Sign In
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default LoginVariant2;







// LoginVariant2.jsx


import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import axios from 'axios'
const LoginVariant2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      console.log('response from login',response.data.token);
      localStorage.setItem("authToken", response.data.token);
      alert(response.data.message);

      login(response.data.token);
      navigate("/upload", { state: { ...response.data } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
<Container maxWidth="xs">
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
      background: "linear-gradient(135deg, #6a11cb, #2575fc)", // different gradient
      borderRadius: 3,
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
      mt: 5,
      transition: "box-shadow 0.3s ease-in-out",
    }}
  >
    <Typography variant="h3" sx={{ marginBottom: 3, color: "#fff", textAlign: "center" }}>
      Welcome Back
    </Typography>

    <TextField
      label="Email"
      variant="filled"
      value={email}
      onChange={handleEmailChange}
      required
      fullWidth
      error={!isEmailValid && email.length > 0}
      helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
      sx={{
        marginBottom: 3,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 2,
        "& .MuiInputBase-root": {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
        },
      }}
    />

    <TextField
      label="Password"
      type="password"
      variant="filled"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      fullWidth
      sx={{
        marginBottom: 3,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 2,
        "& .MuiInputBase-root": {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
        },
      }}
    />

    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        padding: "12px",
        fontSize: "16px",
        backgroundColor: "#ff6f61",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#d9534f",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        },
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      Sign In
    </Button>
  </Box>
</Container>

  );
};

export default LoginVariant2;
