import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider, createTheme, DialogContentText } from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const theme = createTheme({
    palette: {
        type: "dark"
    }
});
const rootID = "alert-dialog";
export default function AlertRoot(props){

    const { message, title, openDialog } = props;

    const root = useRef();
    const [open, setOpen] = useState(openDialog)
    // on mount, get and set the root element
    useEffect(() => {
        let div = document.getElementById(rootID);
        root.current = div;
    }, [openDialog])

    function Close() {
        setOpen(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                disablePortal={true}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() =>  Close()}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}