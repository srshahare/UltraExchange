import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LoginImage from '../../assets/Login.png'
import { Alert, AlertTitle } from '@material-ui/lab';
import { withRouter, useHistory } from 'react-router-dom';
import { auth, googleProvider, myFirebase } from '../../Firebase';

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const usersDb = myFirebase.firestore().collection("Users");

  useEffect(() => {
    
  }, [])

  const [error, setError] = useState(false);

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
        const userId = res.user.uid;
        usersDb.doc(userId).get().then(snapshot => {
          if(!snapshot.exists) {
            usersDb.doc(userId).set({
              displayName: res.user.displayName,
              email: res.user.email,
              photoURL: res.user.photoURL,
              mobile: res.user.phoneNumber,
              uid: userId
            }).then(docRef => {
              setError(false)
              history.push("/")
            }).catch(err => {
              setError(true)
            })
          }else {
            setError(false)
            history.push("/")
          }
        })
      }).catch((error) => {
        console.log(error.message)
        setError(true)
      })
  }


  return (
      <div>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <img src={LoginImage} alt="login alternate" style={{width:'50%'}}></img>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
              className={classes.submit}
            >
                SIGN IN WITH GOOGLE
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
    <div style={{position: "fixed", bottom: 0, width: "100%"}}>
        {error?
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
        </Alert>:
        ""
        }
      </div>
    </div>
  );
}

export default withRouter(SignIn);