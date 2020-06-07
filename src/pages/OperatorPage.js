import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

import Bubble from "../components/Bubble";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  paper: {
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
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
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
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
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
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Waiting Queue</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OperatorPage;
