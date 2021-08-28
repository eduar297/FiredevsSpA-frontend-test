import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import ProfileUserInfoCard from "./ProfileUserInfoCard";

import professorImg from "../assets/img/professor-illustration.png";
import studentImg from "../assets/img/studying.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingBottom: theme.spacing(5),
  },
  img: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "77%",
    },
  },
}));

const Profile = ({
  isSignedIn,
  user,
  role,
  token,
  dispatch,
  groups,
  ...props
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (isSignedIn) {
    } else {
      props.history.push("/");
    }
  }, [isSignedIn]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              // alignItems="center"
            >
              <Grid
                container
                direction="row"
                justifyContent="center"                
                style={{ marginBottom: "20px" }}
              >
                <Grid>
                  <Typography variant="h4" gutterBottom>
                    Mi Perfil
                  </Typography>
                  <hr />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  src={role === "professor" ? professorImg : studentImg}
                  className={classes.img}
                ></img>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ProfileUserInfoCard
                  dispatch={dispatch}
                  groups={groups}
                  user={user}
                  role={role}
                  token={token}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSignedIn: state.authReducer.isSignedIn,
  user: state.authReducer.user,
  role: state.authReducer.role,
  token: state.authReducer.token,
  groups: state.groupReducer.groups,
});

export default connect(mapStateToProps)(Profile);
