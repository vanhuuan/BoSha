import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { NotificationManager } from "react-notifications";
import { imgService } from "../services/image.services";

const FileInput = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imgD, setImgD] = useState("https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/DefaultCover.png?alt=media&token=8c3ccc1d-1316-46e6-9184-d2d0d2f012bd")
    const [isDisa, setIsDisa] = useState(false)

    const MIN_FILE_SIZE = 100 // 100Kb
    const MAX_FILE_SIZE = 6144 // 6MB

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
        if(isDisa === true){
            return
        }
        setIsDisa(true)
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
            NotificationManager.error("File quá nhỏ, không đảm bảo độ phân giải", "Tối thiểu là 100 Kb", 2000);
            return
        }
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            NotificationManager.error("File quá lớn", "Tối đa là 6 Mb", 2000);
            return
        }
        imgService.checkImg(image).then((rs) => {
            if(rs.data){
                console.log(rs)
                if(rs.data.status === "Oke"){
                    NotificationManager.success("Ảnh phù hợp", "Kiểm tra ảnh thành công", 2000);
                    setSelectedImage(image)
                }else{
                    NotificationManager.error("Ảnh không phù hợp", "Kiểm tra ảnh thành công", 2000);
                }
            }else{
                NotificationManager.error("Có lỗi khi kiểm tra ảnh", "Kiểm tra ảnh không thành công", 2000);
            }
            setIsDisa(false);
        }).catch((err) => {
            console.log(err)
            NotificationManager.error("Có lỗi khi kiểm tra ảnh", "Kiểm tra ảnh không thành công", 2000);
            setIsDisa(false);
        })
        
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
                onChange={(e) => onChangeFile(e)}
            />
            <label htmlFor="select-image" style={{ width: '100%' }}>
                <Button disabled={isDisa} variant="contained" color={isDisa === true ? "error" : "primary"} component="span" sx={{ width: '100%', marginTop: '0.5em' }}>
                    Thay ảnh
                </Button>
            </label>
        </>
    );
};

export default FileInput;