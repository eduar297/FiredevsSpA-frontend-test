import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import LoginRegisterForm from "./LoginRegister/Form";

import { signOutProfessor, signOutStudent } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  body: {
    marginTop: theme.spacing(10),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
  },
  subtitle: {
    fontSize: "20px",
    marginRight: "5px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 6 : 3,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const PrimarySearchAppBar = ({
  Body,
  isSignedIn,
  user,
  role,
  token,
  dispatch,
  history,
  props,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [openLoginForm, setOpenLoginForm] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClickOpen = () => {
    setOpenLoginForm(true);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <MenuItem disabled>{`${user.name} ${user.lastName}`}</MenuItem>
      ) : null}
      <MenuItem
        onClick={() => {
          handleMenuClose();
          history.push("/profile");
        }}
      >
        Perfil
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          if (role === "student") dispatch(signOutStudent());
          else if (role === "professor") dispatch(signOutProfessor());
        }}
      >
        Salir
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Button
              onClick={() => {
                history.push("/");
              }}
              color="inherit"
              disableRipple
            >
              <Typography className={classes.title} variant="h6">
                FiredevsSpA test
              </Typography>
            </Button>
            <div className={classes.grow} />
            <div>
              {isSignedIn ? (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              ) : (
                <Button color="inherit" onClick={handleClickOpen}>
                  Entrar
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {renderMenu}
      <div className={classes.body}>
        <Body />
      </div>
      <LoginRegisterForm open={openLoginForm} setOpen={setOpenLoginForm} />
    </div>
  );
};

const PrimarySearchAppBarContainer = withRouter(({ Body, ...props }) => (
  <PrimarySearchAppBar
    isSignedIn={props.isSignedIn}
    user={props.user}
    role={props.role}
    token={props.role}
    dispatch={props.dispatch}
    Body={Body}
    history={props.history}
  />
));

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.authReducer.isSignedIn,
    user: state.authReducer.user,
    role: state.authReducer.role,
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(PrimarySearchAppBarContainer);
