import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";

const FileInput = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    return (
        <>
            <Box mt={2} textAlign="left">
                {imageUrl && selectedImage ? (
                    <img src={imageUrl} alt={selectedImage.name} width="100%" />
                ) :
                    <img src='https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/341263434_237177232146883_4137101451342149163_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oVBrUKg6yQAAX_9mUZ9&_nc_ht=scontent.fdad1-2.fna&oh=00_AfAJzvX02tdE1Ou2rQIg-OZ_oHkpF51x_iim68782kYIQg&oe=6440F313' alt='Default img' width="100%" />
                }
            </Box>
            <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor="select-image" style={{width: '100%'}}>
                <Button variant="contained" color="primary" component="span" sx={{width:'100%', marginTop: '0.5em'}}>
                    Upload Image
                </Button>
            </label>
        </>
    );
};

export default FileInput;