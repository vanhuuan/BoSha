import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { NotificationManager } from "react-notifications";

const FileInput = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    let imgD = props.book.img

    const MIN_FILE_SIZE = 1024 // 1MB
    const MAX_FILE_SIZE = 5120 // 5MB

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            sendData(URL.createObjectURL(selectedImage))
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

        if(fileSizeKiloBytes < MIN_FILE_SIZE){
            NotificationManager.error("File quá nhỏ, không đảm bảo độ phân giải", "Tối thiểu là 1mb", 2000);
          return
        }
        if(fileSizeKiloBytes > MAX_FILE_SIZE){
            NotificationManager.error("File quá lơn", "Tối đa là 5mb", 2000);
          setIsSuccess(false)
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