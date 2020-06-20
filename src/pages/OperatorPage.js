import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";

import Bubble from "../components/Bubble";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  fixedMap: {
    position: "fixed",
    top: "64px",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  chatPaper: {
    position: "fixed",
    width: "300px",
    top: 80,
    left: 10,
    bottom: 16,
    padding: theme.spacing(2),
  },
  entityPaper: {
    position: "fixed",
    width: "250px",
    top: 80,
    right: 10,
    padding: theme.spacing(2),
  },
}));

const OperatorPage = () => {
  const classes = useStyles();

  const rows = [
    {
      name: "Address",
      value: "패파 건물",
    },
    {
      name: "Name",
      value: "차돌박이",
    },
    {
      name: "Taste",
      value: "👍",
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.fixedMap}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={{ lat: 37.485131, lng: -122.148297 }}
          defaultZoom={15}
        />
      </div>

      <Paper className={classes.chatPaper}>
        <Typography variant="h5" gutterBottom>
          Chat Histories
        </Typography>

        <Bubble fromMe={true}>asdfjklasd</Bubble>
        <Bubble fromMe={false}>asdfjklasd</Bubble>
        <Bubble fromMe={true}>asdfjklasd</Bubble>
        <Bubble fromMe={false}>asdfjklasd</Bubble>
        <Bubble fromMe={true}>asdfjklasd</Bubble>
        <Bubble fromMe={true}>asdfjklasd</Bubble>
        <Bubble fromMe={true}>asdfjklasd</Bubble>
        <Bubble fromMe={true}>asdfjklasd</Bubble>
        <Bubble fromMe={false}>asdfjklasd</Bubble>
      </Paper>

      <Paper className={classes.entityPaper}>
        <Typography variant="h5">Entities</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default OperatorPage;
