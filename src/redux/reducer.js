import { combineReducers } from "redux";
import {
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  GET_ALL_GROUPS,
  GET_GROUP,
  DELETE_PROFESSOR,
  GET_ALL_PROFESSORS,
  REGISTER_PROFESSOR,
  SIGN_IN_PROFESSOR,
  SIGN_OUT_PROFESOR,
  GET_PROFESSOR,
  UPDATE_PROFESSOR,
  DELETE_STUDENT,
  GET_ALL_STUDENTS,
  GET_STUDENT,
  REGISTER_STUDENT,
  SIGN_IN_STUDENT,
  SIGN_OUT_STUDENT,
  UPDATE_STUDENT,
} from "./actions";

// reducer de GROUP
const groupReducer = (state = { groups: [], currentGroup: null }, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: state.groups.concat(action.group),
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((item) => item._id !== action.groupId),
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups
          .filter((item) => item._id !== action.groupId)
          .concat(action.group),
      };
    case GET_ALL_GROUPS:
      return {
        ...state,
        groups: action.groups,
      };
    case GET_GROUP:
      return {
        ...state,
        currentGroup: action.group,
      };
    default:
      return state;
  }
};

// reducer de AUTHORIZATION
const authReducer = (
  state = { isSignedIn: null, user: null, role: null, token: null },
  action
) => {
  switch (action.type) {
    case SIGN_IN_PROFESSOR:
      return {
        ...state,
        isSignedIn: true,
        user: action.user,
        token: action.token,
        role: "professor",
      };
    case SIGN_IN_STUDENT:
      return {
        ...state,
        isSignedIn: true,
        user: action.user,
        token: action.token,
        role: "student",
      };
    case SIGN_OUT_PROFESOR:
    case SIGN_OUT_STUDENT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        role: null,
        token: null,
      };
    case UPDATE_PROFESSOR:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

// reducer de PROFESSOR
const professorReducer = (
  state = { professors: [], currentProfessor: null },
  action
) => {
  switch (action.type) {
    case GET_ALL_PROFESSORS:
      return {
        ...state,
        professors: action.professors,
      };
    default:
      return state;
  }
};

const reducerFunc = combineReducers({
  groupReducer,
  authReducer,
  professorReducer,
});

export default reducerFunc;
