import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const ConfirmNotification = () => {
  const [isOpen, setIsOpen] = useState(true);
  const StyledPaper = styled(Paper)`
    background-color: green;
  `;
  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      open={isOpen}
      disableEscapeKeyDown={true}
      PaperComponent={StyledPaper}
    >
      <DialogTitle>
        {" "}
        <Typography variant="h4">Delete</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Are you sure you want to delete this user?
        </Typography>
        <Typography variant="subtitle2">
          You can't undo this operation
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">No</Button>
        <Button variant="contained" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default ConfirmNotification;