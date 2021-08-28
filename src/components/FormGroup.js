import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import MenuItem from "@material-ui/core/MenuItem";

import { ENDPOINT } from "../config";
import axios from "axios";

import { addGroup, updateGroup } from "../redux/actions";

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

export default function FormGroup({
  open,
  setOpen,
  create,
  groupToEdit,
  dispatch,
  professors,
}) {
  const classes = useStyles();
  const [professorId, setProfessorId] = useState(
    !create ? groupToEdit.professorId : null
  );
  const [name, setName] = useState(!create ? groupToEdit.name : "");

  const [loading, setLoading] = React.useState(false);

  const [nameError, setNameError] = useState(null);
  const [professorIdError, setProfessorIdError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfessorChange = (event) => {
    setProfessorId(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(null);
    setProfessorIdError(null);

    setLoading(true);
    if (create) {
      axios
        .post(`${ENDPOINT}/group/create`, {
          name,
          professorId: professorId,
        })
        .then((res) => {
          var data = res.data;
          var group = data.group;
          dispatch(addGroup(group));
          setLoading(false);
          handleClose();
        })
        .catch((err) => {
          var error = err.response.data;
          switch (error.type) {
            case "name":
              setNameError(error.msg);
              break;
            case "professor":
              setProfessorIdError(error.msg);
              break;
            default:
              break;
          }
          setLoading(false);
        });
    } else {
      axios
        .put(`${ENDPOINT}/group/edit/${groupToEdit._id}`, {
          name,
          professorId: professorId,
        })
        .then((res) => {
          var data = res.data;
          var group = data.updatedGroup;
          dispatch(updateGroup(groupToEdit._id, group));
          setLoading(false);
          handleClose();
        })
        .catch((err) => {
          var error = err.response.data;
          switch (error.type) {
            case "name":
              setNameError(error.msg);
              break;
            case "professor":
              setProfessorIdError(error.msg);
              break;
            default:
              break;
          }
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {create ? <AddIcon /> : <EditIcon />}
            </Avatar>
            <Typography component="h1" variant="h5">
              {create ? "Crear nuevo grupo" : "Editar grupo"}
            </Typography>
            <form
              className={classes.form}
              noValidate={false}
              onSubmit={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                    placeholder="G-1"
                    error={nameError}
                    helperText={nameError ? nameError : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-select-professor"
                    select
                    label="Profesor"
                    required
                    fullWidth
                    value={professorId}
                    onChange={handleProfessorChange}
                    variant="outlined"
                    error={professorIdError}
                    helperText={professorIdError ? professorIdError : null}
                  >
                    {professors.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {`${option.name} ${option.lastName}`}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {create ? "Crear" : "Editar"}
              </Button>
              {loading ? <LinearProgress color="primary" /> : null}
            </form>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
