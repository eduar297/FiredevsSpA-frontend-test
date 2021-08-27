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
import MenuItem from "@material-ui/core/MenuItem";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { connect } from "react-redux";

import {
  signInStudent,
  registerProfessor,
  registerStudent,
  signInProfessor,
  getAllGroups,
} from "../../redux/actions";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({ setLogin, dispatch, handleClose, groups }) => {
  const classes = useStyles();

  const towns = [
    "La Habana",
    "Santiago de Cuba",
    "Camagüey",
    "Holguín",
    "Guantánamo",
    "Santa Clara",
    "Las Tunas",
    "Bayamo",
    "Cienfuegos",
    "Pinar del Río",
    "Matanzas",
    "Ciego de Ávila",
    "Sancti Spíritus",
    "Manzanillo",
    "Cárdenas",
    "Palma Soriano",
    "Moa",
    "Morón",
    "Florida",
    "Contramaestre",
    "Artemisa",
    "Nueva Gerona",
    "Trinidad",
    "Colón",
    "Baracoa",
    "Güines",
    "Placetas",
    "Nuevitas",
    "Sagua la Grande",
    "San José de las Lajas",
    "Banes",
    "San Luis",
    "Puerto Padre",
    "San Antonio de los Baños",
    "Caibarién",
    "Cabaiguán",
    "Mayarí",
    "San Cristóbal",
    "Vertientes",
    "Jagüey Grande",
    "Consolación del Sur",
    "Jovellanos",
    "Amancio",
    "Güira de Melena",
    "Cumanayagua",
    "Jatibonico",
    "Niquero",
    "San Germán",
    "Sagua de Tánamo",
    "Bauta",
    "La Maya",
    "Guanajay",
    "Colombia",
    "Jiguaní",
    "Manicaragua",
    "Camajuaní",
    "Guisa",
    "Jobabo",
  ];

  const [role, setRole] = React.useState("student");
  const [sex, setSex] = React.useState("male");
  const [group, setGroup] = React.useState(null);
  const [bornCity, setBornCity] = React.useState(towns[0]);
  const [bornDate, setBornDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");

  const [sexError, setSexError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [groupError, setGroupError] = React.useState(null);
  const [bornCityError, setBornCityError] = React.useState(null);
  const [bornDateError, setBornDateError] = React.useState(null);
  const [lastNameError, setLastNameError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);
  const [specialtyError, setSpecialtyError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleRolChange = (event) => {
    setRole(event.target.value);
  };
  const handleSexChange = (event) => {
    setSex(event.target.value);
  };
  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };
  const handleBornDateChange = (date) => {
    setBornDate(date);
  };
  const handleBornCityChange = (event) => {
    setBornCity(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSpecialtyChange = (event) => {
    setSpecialty(event.target.value);
  };

  React.useEffect(() => {
    axios
      .get(`${ENDPOINT}/group/all`)
      .then((res) => {
        var data = res.data;
        dispatch(getAllGroups(data.groups));
      })
      .catch((err) => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSexError(null);
    setPasswordError(null);
    setGroupError(null);
    setBornCityError(null);
    setBornDateError(null);
    setLastNameError(null);
    setEmailError(null);
    setNameError(null);
    // setSpecialtyError(null);
    setLoading(true);
    if (role === "student") {
      axios
        .post(`${ENDPOINT}/student/register`, {
          name,
          lastName,
          bornCity,
          sex,
          email,
          bornDate,
          password,
          groupId: group,
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
            case "name":
              setNameError(error.msg);
              break;
            case "lastName":
              setLastNameError(error.msg);
              break;
            case "bornCity":
              setBornCityError(error.msg);
              break;
            case "sex":
              setSexError(error.msg);
              break;
            case "group":
              setGroupError(error.msg);
              break;
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
        .post(`${ENDPOINT}/professor/register`, {
          specialty,
          name,
          lastName,
          bornCity,
          sex,
          email,
          bornDate,
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
            case "specialty":
              setSpecialtyError(error.msg);
              break;
            case "name":
              setNameError(error.msg);
              break;
            case "lastName":
              setLastNameError(error.msg);
              break;
            case "bornCity":
              setBornCityError(error.msg);
              break;
            case "sex":
              setSexError(error.msg);
              break;
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
          Registrarme como{" "}
          <span style={{ color: "gray" }}>
            {role === "student" ? "Estudiante" : "Profesor"}
          </span>
        </Typography>
        <form
          className={classes.form}
          noValidate={false}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={role}
                onChange={handleRolChange}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                value={name}
                onChange={handleNameChange}
                placeholder="Jhon"
                error={nameError}
                helperText={nameError ? nameError : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellidos"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Snow"
                error={lastNameError}
                helperText={lastNameError ? lastNameError : null}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-sex"
                select
                label="Sexo"
                fullWidth
                value={sex}
                onChange={handleSexChange}
                variant="outlined"
                error={sexError}
                helperText={sexError ? sexError : null}
              >
                {[
                  { value: "none", label: "prefiero no decirlo" },
                  { value: "male", label: "masculino" },
                  { value: "female", label: "femenino" },
                  { value: "other", label: "otro" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {role == "student" ? (
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-select-group"
                  select
                  label="Grupo"
                  required
                  fullWidth
                  value={group}
                  onChange={handleGroupChange}
                  variant="outlined"
                  error={groupError}
                  helperText={groupError ? groupError : null}
                >
                  {groups.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="specialty"
                  label="Especialidad"
                  name="specialty"
                  autoComplete="especialidad"
                  value={specialty}
                  onChange={handleSpecialtyChange}
                  placeholder="mathematics"
                  error={specialtyError}
                  helperText={specialtyError ? specialtyError : null}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="With keyboard"
                  id="date-picker-dialog"
                  label="Fecha de nacimiento"
                  format="MM/dd/yyyy"
                  value={bornDate}
                  onChange={handleBornDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  error={bornDateError}
                  helperText={bornDateError ? bornDateError : null}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-born-city"
                select
                label="Ciudad de nacimiento"
                required
                fullWidth
                value={bornCity}
                onChange={handleBornCityChange}
                variant="outlined"
                error={bornCityError}
                helperText={bornCityError ? bornCityError : null}
              >
                {towns.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="jhon@gmail.com"
                error={emailError}
                helperText={emailError ? emailError : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="..."
                error={passwordError}
                helperText={passwordError ? passwordError : null}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarme
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => setLogin(true)} color="primary">
                {"Tienes una cuenta? Entrar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} style={{ marginBottom: "10px" }}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groupReducer.groups,
  };
};

export default connect(mapStateToProps)(SignUp);
