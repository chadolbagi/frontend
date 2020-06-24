import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

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
        <a href="/" className={classes.title}>
          911 Assistant
        </a>
        <div className={classes.grower} />
        <nav>
          <a className={classes.link} href="/operator">
            Operator
          </a>
          <a className={classes.link} href="/caller">
            Caller
          </a>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
