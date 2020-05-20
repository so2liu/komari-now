import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ChangeNumBtn from "./ChangeNumBtn";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function SimpleTable(props: {
  labels: { key: string; label: string }[];
  data: { [label: string]: any }[];
  row: (item: any, keys: string[]) => JSX.Element;
  footer?: JSX.Element;
}) {
  const classes = useStyles();
  const { labels, data, row } = props;
  const keys = labels.map(({ key }) => key);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {labels.map(({ label, key }, index) => (
              <TableCell key={key} align={index > 0 ? "right" : undefined}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{data.map((item) => row(item, keys))}</TableBody>
        {props.footer}
      </Table>
    </TableContainer>
  );
}
