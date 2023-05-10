import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

const FileInput = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    let imgD = props.book.img

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            sendData(URL.createObjectURL(selectedImage))
        }
    }, [selectedImage]);

    const sendData = (img) => {
        props.parentCallback(img);
    }

    return (
        <>
            <Box mt={2} textAlign="left">
                {imageUrl && selectedImage ? (
                    <img src={imageUrl} alt={selectedImage.name} width="100%" />
                ) :
                    <img src={imgD} alt='Default img' width="100%" />
                }
            </Box>
            <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor="select-image" style={{ width: '100%' }}>
                <Button variant="contained" color="primary" component="span" sx={{ width: '100%', marginTop: '0.5em' }}>
                    Thay ảnh
                </Button>
            </label>
        </>
    );
};

export default FileInput;