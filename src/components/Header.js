import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: "wrap",
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  grower: {
    flexGrow: 1,
  },
  link: {
    color: theme.palette.text.primary,
    margin: theme.spacing(1, 1.5),
    textDecoration: "none",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.title}>
          CHAMGIRUM
        </Link>
        <div className={classes.grower} />
        <nav>
          <Link className={classes.link} to="/operator">
            Operator
          </Link>
          <Link className={classes.link} to="/caller">
            Caller
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
