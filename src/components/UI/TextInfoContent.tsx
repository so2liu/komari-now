import React from "react";
import { Typography } from "@material-ui/core";

export default (props: { overline: any; heading: string; body: string }) => {
  const { overline, heading, body } = props;
  return (
    <>
      {overline}
      <Typography variant="h4">{heading}</Typography>
      <Typography variant="body1">{body}</Typography>
    </>
  );
};
