import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import GroupTable from "./GroupsTable";

import { ENDPOINT } from "../config";
import axios from "axios";

import { getAllGroups, getAllProfessors } from "../redux/actions";

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

const Home = ({ dispatch, groups, professors }) => {
  const classes = useStyles();

  const [_groups, set_groups] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${ENDPOINT}/group/all`)
      .then((res) => {
        var data1 = res.data;
        dispatch(getAllGroups(data1.groups));
        axios
          .get(`${ENDPOINT}/professor/all`)
          .then((res) => {
            var data2 = res.data;
            dispatch(getAllProfessors(data2.accounts));
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, []);

  React.useEffect(() => {
    if (groups.length !== 0 && professors.length !== 0) {
      var aux_groups = groups.map((item) => {
        var aux_group = item;
        var _professor = professors.find(
          (x) => x._id === aux_group.professorId
        );
        aux_group.professorName = `${_professor.name} ${_professor.lastName}`;
        return aux_group;
      });
      set_groups(aux_groups);
    }
  }, [groups, professors]);

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
            >
              <Grid
                container
                direction="row"
                justifyContent="center"                
                style={{ marginBottom: "20px" }}
              >
                <Grid>
                  <Typography variant="h4" gutterBottom>
                    Administrar Grupos
                  </Typography>
                  <hr />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {_groups ? (
                  <GroupTable
                    dispatch={dispatch}
                    professors={professors}
                    groups={_groups}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  groups: state.groupReducer.groups,
  professors: state.professorReducer.professors,
});

export default connect(mapStateToProps)(Home);
