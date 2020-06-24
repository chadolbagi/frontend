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
  const [padding, setPadding] = useState(5);
  const [said, setSaid] = useState(false);
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
    }
  }, [socket, audioManager]);

  audioManager.onAudioFragmentHandler = (event) => {
    const channelData = event.inputBuffer.getChannelData(0);
    const mean = channelData.reduce((a, b) => a + b) / channelData.length;
    const stddev = Math.pow(channelData.map(k => Math.pow(k - mean, 2)).reduce((a, b) => a + b) / (channelData.length - 1), 0.5);


    let flag = false;
    if (stddev < 0.08) {
      if (said) {
        if (padding > 0) {
          setPadding(padding - 1);
        } else {
          flag = true;
          setPadding(5);
        }
      }
    }
    else {
      setPadding(5)
      setSaid(true);
    }

    if (flag) {
      console.log("EOS+++++++++++++++++++++++++++++++++++++++++");
      setSaid(false);
    }

    socket.emit("call:frame", { frame: channelData, isEos: flag });
  };

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
