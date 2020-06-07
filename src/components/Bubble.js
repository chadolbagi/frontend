import React from "react";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0.3, 2),
  },
}));

const Bubble = ({ children, fromMe = true }) => {
  const classes = useStyles();

  return (
    <Box className={classes.box} textAlign={fromMe ? "right" : "left"}>
      <Chip
        variant="outlined"
        label={children}
        color={fromMe ? "primary" : "secondary"}
      />
    </Box>
  );
};

export default Bubble;
