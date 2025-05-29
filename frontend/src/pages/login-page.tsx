import { useContext, useEffect, useState } from "react";
import { Button, Container, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "@/features/auth/auth-context";
import { useNavigate } from "react-router-dom";
import { LoadingBackground } from "@/components/loading-background";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useContext(AuthContext);

  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Redirect to appointments if the user is already authenticated
    if (user && !user.emailVerified) {
      navigate("/confirmation");
    }
    if (user && user.emailVerified) {
      navigate("/appointments");
    }
  }, [user, navigate]);

  const handleNavigation = () => {
    navigate("/signup");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    setAuthForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    login(authForm.email, authForm.password);
  };

  if (loading) {
    return <LoadingBackground />;
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" sx={{ minWidth: "100%", minHeight: "100vh", backgroundColor: "secondary.main" }}>
      <Paper className="d-flex flex-column p-3 align-items-center h-100" elevation={12} sx={{ width: "25rem", height: "35rem", backgroundColor: "white", borderRadius: "30px" }}>
        <div className="d-flex flex-column p-3 justify-content-between">
          <div className="d-flex flex-column p-3 m-3 align-items-center">
            <h4>Welcome back !</h4>
            <h6>Login to your account</h6>
          </div>
          <form onSubmit={handleSignIn}>
            <TextField focused name="email" type="email" label="Email" fullWidth margin="normal" value={authForm["email"]} onChange={handleInputChange} placeholder="Enter an email" />
            <FormControl fullWidth focused margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                fullWidth
                value={authForm["password"]}
                placeholder="Enter a password"
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="button" aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button data-testid="button-sign-in" type="submit" className="mt-3 mb-3" variant="contained" color="primary">
                Sign In
              </Button>
            </FormControl>
          </form>
          <div className="w-100">
            <Divider>Or sign in with</Divider>
          </div>
        </div>

        <div className="d-flex gap-3 mt-3 align-items-center">
          <div>Don't have an account ?`</div>
          <Button color="primary" variant="outlined" onClick={handleNavigation}>
            Sign up !
          </Button>
        </div>
      </Paper>
    </Container>
  );
};
