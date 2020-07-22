// default imports
import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// added imports
import Input from '../../shared/formelements/Input';
import ErrorModal from '../../shared/uielements/ErrorModal';
import LoadingSpinner from '../../shared/uielements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';


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
  paper: {
    marginTop: theme.spacing(8),
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

const SignIn = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
    },
    false
  );

  const authSubmitHandler = async event => {

    event.preventDefault();

    try {

      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/users/signin',
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.userId, responseData.token);

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container component="main" maxWidth="xs">
        {isLoading && <LoadingSpinner asOverlay />}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} onSubmit={authSubmitHandler}>
            <Input
              id="email"
              label="Email Adress"
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              id="password"
              label="Password"
              errorText="Please enter a valid password (min 6 characters)."
              onInput={inputHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!formState.isValid}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default SignIn;