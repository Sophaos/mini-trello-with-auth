// import { useContext, useEffect, useState } from "react";
// import { Button, Container, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { AuthContext } from "@/features/auth/auth-context";
// import { useNavigate } from "react-router-dom";
// import { LoadingBackground } from "@/components/loading-background";
// import { handleError } from "@/error/error-handler";

// export const SignUpPage = () => {
//   const navigate = useNavigate();

//   const [authForm, setAuthForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const { signUp, loading, user } = useContext(AuthContext);

//   useEffect(() => {
//     // Redirect to appointments if the user is already authenticated
//     if (user && !user.emailVerified) {
//       navigate("/confirmation");
//     }
//     if (user && user.emailVerified) {
//       navigate("/appointments");
//     }
//   }, [user, navigate]);

//   const handleNavigation = () => {
//     navigate("/login");
//   };

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleInputChange = (e) => {
//     setAuthForm((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       await signUp(authForm.email, authForm.password);
//     } catch (error) {
//       handleError(error);
//     }
//   };

//   if (loading) {
//     return <LoadingBackground />;
//   }

//   return (
//     <Container className="d-flex align-items-center justify-content-center" sx={{ minWidth: "100%", minHeight: "100vh", backgroundColor: "secondary.main" }}>
//       <Paper className="d-flex flex-column p-3 align-items-center h-100" elevation={12} sx={{ width: "25rem", height: "35rem", backgroundColor: "white", borderRadius: "30px" }}>
//         <div className="d-flex flex-column p-3 justify-content-between">
//           <div className="d-flex flex-column p-3 m-3 align-items-center">
//             <h4>Welcome !</h4>
//             <h6>Create your account</h6>
//           </div>
//           <form onSubmit={handleSignUp}>
//             <TextField focused name="email" type="email" label="Email" fullWidth margin="normal" value={authForm["email"]} onChange={handleInputChange} placeholder="Enter an email" />
//             <FormControl fullWidth focused margin="normal">
//               <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 label="Password"
//                 fullWidth
//                 value={authForm["password"]}
//                 placeholder="Enter a password"
//                 onChange={handleInputChange}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton type="button" aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//               <Button type="submit" className="mt-3 mb-3" variant="contained" color="secondary">
//                 Sign Up
//               </Button>
//             </FormControl>
//           </form>
//           <div className="w-100">
//             <Divider>Or sign up with</Divider>
//           </div>
//         </div>

//         <div className="d-flex gap-3 mt-3 align-items-center">
//           <div>Already have an account ?</div>
//           <Button color="primary" variant="outlined" onClick={handleNavigation}>
//             Sign in !
//           </Button>
//         </div>
//       </Paper>
//     </Container>
//   );
// };

import React from "react";

export const SignUpPage = () => {
  return <div>SignUpPage</div>;
};
