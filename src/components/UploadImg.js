import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { NotificationManager } from "react-notifications";

const FileInput = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imgD, setImgD] = useState("https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/DefaultCover.png?alt=media&token=8c3ccc1d-1316-46e6-9184-d2d0d2f012bd")

    const MIN_FILE_SIZE = 100 // 100Kb
    const MAX_FILE_SIZE = 5120 // 5MB

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            sendData(URL.createObjectURL(selectedImage))
        }
        if(props.book.img){
            setImgD(props.book.img)
        }
    }, [selectedImage]);

    const sendData = (img) => {
        props.parentCallback(img);
    }

    const onChangeFile = event => {
        const image = event.target.files[0];
        if (!image) {
            NotificationManager.error("Không đúng định dạng", "Không đúng định dạng ảnh", 2000)
            return false;
        }
        if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
            NotificationManager.error("Chỉ nhận file .jpg, .jpeg, .png", "Không đúng định dạng ảnh", 2000)
            return false;
        }

        const fileSizeKiloBytes = image.size / 1024

        if (fileSizeKiloBytes < MIN_FILE_SIZE) {
            NotificationManager.error("File quá nhỏ, không đảm bảo độ phân giải", "Tối thiểu là 1mb", 2000);
            return
        }
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            NotificationManager.error("File quá lơn", "Tối đa là 5mb", 2000);
            return
        }

        setSelectedImage(image)
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
                onChange={(e) => onChangeFile(e.target.files[0])}
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