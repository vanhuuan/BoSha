import { makeStyles } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Paper
} from "@mui/material";
import React from "react";
import { BarChart } from "./BarChart";

const useStyles = makeStyles(() => ({
  header: {
    textTransform: "uppercase"
  }
}));

function CardBar({ title, chart }) {
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardContent>
          <Typography className={classes.header} color="textPrimary">
            {title}
          </Typography>
          <Divider />
          {chart}
        </CardContent>
      </Card>
    </>
  );
}

export { CardBar };