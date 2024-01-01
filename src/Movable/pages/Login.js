import React, { useCallback, useContext, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';
import { AuthContext } from './Auth';
import "./Login.css"
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, TextField, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from './Copyright';

export   const Login = () => {
    // const [email,setEmail] = useState("");
    // const [pass,setPass] = useState("");
    const parms = useParams()
    const navigate = useNavigate()
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            //   console.log(event.target.email.value)
            const { email, password } = event.target.elements;
            try {

                const auth = getAuth();

                //  console.log(email.value,password.value)
                signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate("/");
                    // ...
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    window.alert(errorMessage)
                    console.log(errorCode);
                    console.log(errorMessage);
                });

            } catch (error) {
                alert(error);
            }
        },
        [parms]
    );
    //       const { currentUser } = useContext(AuthContext);

    //   if (currentUser) {
    //     return <Navigate to="/" />;
    //   }

//     const Copyright=(props)=> {
//         return (
//           <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
            
// Global Software Solutions            
//             {new Date().getFullYear()}
//             {'.'}
//           </Typography>
//         );
//       }
const theme = createTheme();


 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )



        }