import {
  Card,
  CardContent,
  Typography,
  Divider,
  Paper
} from "@mui/material";
import React from "react";

function CardBar({ title, chart }) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography color="textPrimary">
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