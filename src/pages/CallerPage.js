import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AudioManager, { AudioManagerErrorType } from "../AudioManager";
import io from "socket.io-client";

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
  const [socket, setSocket] = useState(null);
  const [audioManager] = useState(AudioManager.getInstance());
  const classes = useStyles();

  useEffect(() => {
    if (socket != null) {
      console.log("Set Handler");
      socket.on("call:frame", ({ frame }) => {
        const length = Object.keys(frame).length;
        audioManager.playAudioChunk(
          Float32Array.from([...Array(length).keys()].map((key) => frame[key]))
        );
      });

      audioManager.onAudioFragmentHandler = (event) => {
        console.log("Emmited");
        socket.emit("call:frame", {
          frame: event.inputBuffer.getChannelData(0),
        });
      };
    }
  }, [socket, audioManager]);

  const onCallButtonClicked = () => {
    setIsCalling(true);
    setSocket(io(process.env.REACT_APP_SERVER_URL));

    audioManager
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
    socket.disconnect();
    setSocket(null);
    audioManager.close();
  };

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
