import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AudioManager, { AudioManagerErrorType } from "../AudioManager";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(5),
  },
  buttons: {
    margin: theme.spacing(5, 1.5),
  },
}));

const CallerPage = () => {
  const [isCalling, setIsCalling] = useState(false);
  const classes = useStyles();

  const onCallButtonClicked = () => {
    setIsCalling(true);

    const manager = AudioManager.getInstance();
    manager
      .requestMicrophonePermission()
      .then(() => {
        console.log("got audio permission");
      })
      .catch((reason) => {
        console.log(reason);
        alert(AudioManagerErrorType[reason]);
      });
  };

  const onHangUpButtonClicked = () => {
    setIsCalling(false);

    const manager = AudioManager.getInstance();
    manager.close();
  }

  return (
    <Box component="div" textAlign="center" className={classes.wrapper}>
      <Typography variant="h2">Caller Page</Typography>
      <Button
        variant="contained"
        className={classes.buttons}
        disabled={isCalling}
        onClick={onCallButtonClicked}
      >
        Call
      </Button>
      <Button
        variant="contained"
        className={classes.buttons}
        disabled={!isCalling}
        onClick={onHangUpButtonClicked}
      >
        Hang up
      </Button>
    </Box>
  );
};

export default CallerPage;
