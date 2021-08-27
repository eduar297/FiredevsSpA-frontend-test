import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";

import { signInStudent, signInProfessor } from "../../redux/actions";

import { ENDPOINT } from "../../config";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        FiredevsSpA test
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ setLogin, dispatch, handleClose }) => {
  const classes = useStyles();

  const [role, setRole] = React.useState("student");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setLoading(true);
    if (role === "student") {
      axios
        .post(`${ENDPOINT}/student/login`, {
          email,
          password,
        })
        .then((res) => {
          var data = res.data;
          var student = data.account;
          var token = data.token;
          dispatch(signInStudent(student, token));
          setLoading(false);
          handleClose();
        })
        .catch((err) => {
          var error = err.response.data;
          switch (error.type) {
            case "email":
            case "unregistered":
              setEmailError(error.msg);
              break;
            case "password":
              setPasswordError(error.msg);
              break;
            default:
              break;
          }
          setLoading(false);
        });
    } else {
      axios
        .post(`${ENDPOINT}/professor/login`, {
          email,
          password,
        })
        .then((res) => {
          var data = res.data;
          var professor = data.account;
          var token = data.token;
          dispatch(signInProfessor(professor, token));
          setLoading(false);
          handleClose();
        })
        .catch((err) => {
          var error = err.response.data;
          switch (error.type) {
            case "email":
            case "unregistered":
              setEmailError(error.msg);
              break;
            case "password":
              setPasswordError(error.msg);
              break;
            default:
              break;
          }
          setLoading(false);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar como{" "}
          <span style={{ color: "gray" }}>
            {role === "student" ? "Estudiante" : "Profesor"}
          </span>
        </Typography>
        <form
          className={classes.form}
          noValidate={false}
          onSubmit={handleSubmit}
        >
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={role}
            onChange={handleChange}
          >
            <FormControlLabel
              value="student"
              control={<Radio />}
              label="Estudiante"
            />
            <FormControlLabel
              value="professor"
              control={<Radio />}
              label="Profesor"
            />
          </RadioGroup>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            placeholder="jhon@gmail.com"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? emailError : null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            placeholder="..."
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordError ? passwordError : null}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          {loading ? <LinearProgress color="primary" /> : null}
          <Grid container>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => setLogin(false)} color="primary">
                  {"No tienes una cuenta? Registrate"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8} style={{ marginBottom: "10px" }}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default connect()(SignIn);
