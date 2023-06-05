import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { confirmable, createConfirmation } from "react-confirm";
import { Button } from "@mui/material";

const Confirmation = ({
    okLabel = "Đồng ý",
    cancelLabel = "Hủy",
    title = "Xác nhận",
    confirmation,
    show,
    proceed,
    enableEscape = true
}) => {
    return (
        <div className="static-modal">
            <Modal
                animation={false}
                show={show}
                onHide={() => proceed(false)}
                backdrop={enableEscape ? true : "static"}
                keyboard={enableEscape}
            >
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{confirmation}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => proceed(false)}>{cancelLabel}</Button>
                    <Button
                        className="button-l"
                        bsStyle="primary"
                        onClick={() => proceed(true)}
                    >
                        {okLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

Confirmation.propTypes = {
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    title: PropTypes.string,
    confirmation: PropTypes.string,
    show: PropTypes.bool,
    proceed: PropTypes.func, // called when ok button is clicked.
    enableEscape: PropTypes.bool
};

export function confirm(
    confirmation,
    proceedLabel = "OK",
    cancelLabel = "cancel",
    options = {}
) {
    return createConfirmation(confirmable(Confirmation))({
        confirmation,
        proceedLabel,
        cancelLabel,
        ...options
    });
}
