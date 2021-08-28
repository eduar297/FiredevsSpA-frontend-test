// tipos de acciones de GRUPO
export const ADD_GROUP = "ADD_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const GET_GROUP = "GET_GROUP";
export const GET_ALL_GROUPS = "GET_ALL_GROUPS";

// tipos de acciones de PROFESOR
export const SIGN_IN_PROFESSOR = "SIGN_IN_PROFESSOR";
export const SIGN_OUT_PROFESOR = "SIGN_OUT_PROFESSOR";
export const REGISTER_PROFESSOR = "REGISTER_PROFESSOR";
export const UPDATE_PROFESSOR = "UPDATE_PROFESSOR";
export const DELETE_PROFESSOR = "DELETE_PROFESSOR";
export const GET_PROFESSOR = "GET_PROFESSOR";
export const GET_ALL_PROFESSORS = "GET_ALL_PROFESSORS";

// tipos de acciones de ESTUDIANTE
export const SIGN_IN_STUDENT = "SIGN_IN_STUDENT";
export const SIGN_OUT_STUDENT = "SIGN_OUT_STUDENT";
export const REGISTER_STUDENT = "REGISTER_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";
export const GET_STUDENT = "GET_STUDENT";
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";

// creadores de acciones de GRUPO
export const addGroup = (group) => {
  return { type: ADD_GROUP, group };
};
export const deleteGroup = (groupId) => {
  return { type: DELETE_GROUP, groupId };
};
export const updateGroup = (groupId, group) => {
  return { type: UPDATE_GROUP, groupId, group };
};
export const getGroup = (group) => {
  return { type: GET_GROUP, group };
};
export const getAllGroups = (groups) => {
  return { type: GET_ALL_GROUPS, groups };
};

// creadores de acciones de PROFESOR
export const signInProfessor = (professor, token) => {
  return { type: SIGN_IN_PROFESSOR, user: professor, token };
};
export const signOutProfessor = () => {
  return { type: SIGN_OUT_PROFESOR };
};
export const registerProfessor = (professor) => {
  return { type: REGISTER_PROFESSOR, professor };
};
export const updateProfessor = (professor) => {
  return { type: UPDATE_PROFESSOR, user: professor };
};
export const deleteProfessor = (professorId) => {
  return { type: DELETE_PROFESSOR, professorId };
};
export const getProfessor = (professor) => {
  return { type: GET_PROFESSOR, professor };
};
export const getAllProfessors = (professors) => {
  return { type: GET_ALL_PROFESSORS, professors };
};

// creadores de acciones de ESTUDIANTE
export const signInStudent = (student, token) => {
  return { type: SIGN_IN_STUDENT, user: student, token };
};
export const signOutStudent = () => {
  return { type: SIGN_OUT_STUDENT };
};
export const registerStudent = (student) => {
  return { type: REGISTER_STUDENT, student };
};
export const updateStudent = (student) => {
  return { type: UPDATE_STUDENT, user: student };
};
export const deleteStudent = (studentId) => {
  return { type: DELETE_STUDENT, studentId };
};
export const getStudent = (student) => {
  return { type: GET_STUDENT, student };
};
export const getAllStudents = (students) => {
  return { type: GET_ALL_STUDENTS, students };
};
