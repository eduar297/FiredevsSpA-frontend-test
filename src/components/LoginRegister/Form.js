import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import SigIn from "./SignIn";
import SignUp from "./SignUp";

export default function FormDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const [login, setLogin] = React.useState(true);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {login ? (
          <SigIn handleClose={handleClose} setLogin={setLogin} />
        ) : (
          <SignUp handleClose={handleClose} setLogin={setLogin} />
        )}
      </Dialog>
    </div>
  );
}
