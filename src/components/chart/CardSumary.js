import { Card, CardContent, Typography, Divider } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/material";

function CardSummary({ title, value, footer }) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            color="textPrimary"
          >
            {title}
          </Typography>
          <Divider />
          <Typography variant="h3" color="textPrimary">
            {value}
          </Typography>
          <div>{footer}</div>
        </CardContent>
      </Card>
    </>
  );
}

function CardBookSummary({ title, value, footer }) {
    return (
      <>
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              color="textPrimary"
            >
              {title}
            </Typography>
            <Divider />
            <Typography variant="h3" color="textPrimary">
              {value}
            </Typography>
            <div>{footer}</div>
          </CardContent>
        </Card>
      </>
    );
  }

export { CardSummary, CardBookSummary };