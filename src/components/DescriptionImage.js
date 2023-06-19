import React, { useEffect, useState } from "react";
import { firebaseService } from "../services/firebase.services";
import { IconButton, LinearProgress } from "@mui/material";
import addimg from '../assets/images/add-image.png'
import { NotificationManager } from "react-notifications";
import { imgService } from "../services/image.services";
import { Remove } from "@mui/icons-material";
import { confirm } from "./prompt/Confirmation";

function throttle(cb, delay = 10) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false
        } else {
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args
            return
        }

        cb(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}

function onHandleClickLeft() {
    const progressBar = document.querySelector(".progress-bar")
    const slider = document.querySelector(".slider")
    const sliderIndex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    const progressBarItemCount = progressBar.children.length

    if (sliderIndex - 1 < 0) {
        slider.style.setProperty("--slider-index", progressBarItemCount - 1)
    } else {
        slider.style.setProperty("--slider-index", sliderIndex - 1)
    }
}

function onHandleClickRight() {
    const progressBar = document.querySelector(".progress-bar")
    const slider = document.querySelector(".slider")
    const sliderIndex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
    )
    const progressBarItemCount = progressBar.children.length

    if (sliderIndex + 1 >= progressBarItemCount) {
        slider.style.setProperty("--slider-index", 0)
    } else {
        slider.style.setProperty("--slider-index", sliderIndex + 1)
    }
}

function DescriptionImage({ bookId, status }) {

    const calculateProgressBar = (progressBar) => {
        progressBar.innerHTML = ""
        const slider = progressBar.closest(".container-book").querySelector(".slider")
        const itemCount = imgs.length
        const itemsPerScreen = parseInt(
            getComputedStyle(slider).getPropertyValue("--items-per-screen")
        )
        let sliderIndex = parseInt(
            getComputedStyle(slider).getPropertyValue("--slider-index")
        )
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
        if (sliderIndex >= progressBarItemCount) {
            slider.style.setProperty("--slider-index", progressBarItemCount - 1)
            sliderIndex = progressBarItemCount - 1
        }

        for (let i = 0; i < progressBarItemCount; i++) {
            const barItem = document.createElement("div")
            barItem.classList.add("progress-item")
            if (i === sliderIndex) {
                barItem.classList.add("active")
            }
            progressBar.append(barItem)
        }
    }

    const throttleProgressBar = throttle(() => {
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
    }, 250)

    const [imgs, setImgs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const changeImgs = (listImg) => {
        setImgs(listImg)
    }

    const LoadImages = () => {
        setIsLoading(true)
        firebaseService.getDecriptionImages(bookId, changeImgs).then((rs) => {
            console.log("rs", rs)
            setIsLoading(false)
            window.addEventListener("resize", throttleProgressBar)
            document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
        }).catch((e) => {
            console.error(e)
        })
    }

    useState(() => {
        console.log(bookId)
        LoadImages()
    }, [])

    return (<>
        {
            isLoading === true ? <LinearProgress /> : <div>
                {
                    imgs.length === 0 ? <> </> : <div className='container-book' style={{ border: 'none' }}>
                        <div className='header-slider'>
                            <h1 className='title' style={{ textAlign: 'right', color: 'black', fontSize: "20px", lineHeight: "24px" }}>Ảnh minh họa</h1>
                            <div className='progress-bar'></div>
                        </div>
                        <div className='container-book-hot' style={{ padding: 0 }}>
                            {imgs.length > 6 ?
                                <button class="handle left-handle" style={{ padding: 0 }}
                                    onClick={() => onHandleClickLeft()}
                                >
                                    <div class="text">&#8249;</div>
                                </button>
                                : <></> }
                            <div class="slider">
                                {imgs.map(p => (
                                    <span style={{ margin: "1em" }}>
                                        <img style={{ aspectRatio: '10/16', width: '6em' }} src={p.url} alt="Mô tả" />
                                    </span>
                                ))}
                            </div>
                            {imgs.length > 6 ?
                                <button class="handle right-handle" style={{ padding: 0 }}
                                    onClick={() => onHandleClickRight()}
                                >
                                    <div class="text">&#8250;</div>
                                </button>
                                : <></>}
                        </div>

                    </div>
                }
            </div>
        }
    </>
    )
}

function DescriptionImageEdit({ bookId }) {

    const calculateProgressBar = (progressBar) => {
        progressBar.innerHTML = ""
        const slider = progressBar.closest(".container-book").querySelector(".slider")
        const itemCount = imgs.length
        const itemsPerScreen = parseInt(
            getComputedStyle(slider).getPropertyValue("--items-per-screen")
        )
        let sliderIndex = parseInt(
            getComputedStyle(slider).getPropertyValue("--slider-index")
        )
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
        if (sliderIndex >= progressBarItemCount) {
            slider.style.setProperty("--slider-index", progressBarItemCount - 1)
            sliderIndex = progressBarItemCount - 1
        }

        for (let i = 0; i < progressBarItemCount; i++) {
            const barItem = document.createElement("div")
            barItem.classList.add("progress-item")
            if (i === sliderIndex) {
                barItem.classList.add("active")
            }
            progressBar.append(barItem)
        }
    }

    const throttleProgressBar = throttle(() => {
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
    }, 250)

    const [imgs, setImgs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const changeImgs = (listImg) => {
        console.log("list", listImg)
        setImgs(listImg)
    }

    const LoadImages = () => {
        setIsLoading(true)
        firebaseService.getDecriptionImages(bookId, changeImgs).then((rs) => {
            console.log("rs", rs)
            setIsLoading(false)
            window.addEventListener("resize", throttleProgressBar)
            document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
        }).catch((e) => {
            console.error(e)
        })
    }

    useEffect(() => {
        console.log(bookId)
        LoadImages()
    }, [])

    const [isDisa, setIsDisa] = useState(false)

    const MIN_FILE_SIZE = 100 // 100Kb
    const MAX_FILE_SIZE = 6144 // 6MB

    const uploadOke = (image) => {
        changeImgs([...imgs, image])
    }

    const onChangeFile = event => {
        if (isDisa === true) {
            return
        }

        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png, image/jpeg image/jpg"
        input.onchange = _ => {
            let files = Array.from(input.files);
            const imag = files[0];
            console.log(imag)
            if (!imag) {
                NotificationManager.error("Không đúng định dạng", "Không đúng định dạng ảnh", 2000)
                return false;
            }
            if (!imag.name.match(/\.(jpg|jpeg|png)$/)) {
                NotificationManager.error("Chỉ nhận file .jpg, .jpeg, .png", "Không đúng định dạng ảnh", 2000)
                return false;
            }

            const fileSizeKiloBytes = imag.size / 1024

            if (fileSizeKiloBytes < MIN_FILE_SIZE) {
                NotificationManager.error("File quá nhỏ, không đảm bảo độ phân giải", "Tối thiểu là 100 Kb", 2000);
                return
            }
            if (fileSizeKiloBytes > MAX_FILE_SIZE) {
                NotificationManager.error("File quá lớn", "Tối đa là 6 Mb", 2000);
                return
            }
            setIsDisa(true)
            imgService.checkImg(imag).then((rs) => {
                if (rs.data) {
                    console.log(rs)
                    if (rs.data.status === "Oke") {
                        NotificationManager.success("Ảnh phù hợp", "Kiểm tra ảnh thành công", 2000);
                        firebaseService.uploadDesciptionImages(bookId, URL.createObjectURL(imag), uploadOke)
                    } else {
                        NotificationManager.error("Ảnh không phù hợp", "Kiểm tra ảnh thành công", 2000);
                    }
                } else {
                    NotificationManager.error("Có lỗi khi kiểm tra ảnh", "Kiểm tra ảnh không thành công", 2000);
                }
                setIsDisa(false);
            }).catch((err) => {
                console.log(err)
                NotificationManager.error("Có lỗi khi kiểm tra ảnh", "Kiểm tra ảnh không thành công", 2000);
                setIsDisa(false);
            })
        };
        input.click();
    }

    const onDeleteDescImg = async (img) => {
        if (await confirm("Bạn có chắc muốn xóa ảnh này chứ")) {
            setIsDisa(true);
            firebaseService.deleteDescImg(img, (u) => {
                setImgs(imgs.filter(x => x.url !== u))
                NotificationManager.success("Xóa ảnh thành công", "Thành công", 2000)
            }).finally(() => {
                setIsDisa(false);
            })
        }
    }


    return (<>
        {
            isLoading === true ? <LinearProgress /> :
                <div className='container-book' style={{ border: 'none' }}>
                    <div className='header-slider'>
                        <h1 className='title' style={{ textAlign: 'right', color: 'black', fontSize: "20px", lineHeight: "24px" }}>Ảnh minh họa</h1>
                        <div className='progress-bar'></div>
                    </div>
                    <div className='container-book-hot' style={{ padding: 0 }}>
                        <button class="handle left-handle" style={{ padding: 0 }}
                            onClick={() => onHandleClickLeft()}
                        >
                            <div class="text">&#8249;</div>
                        </button>
                        <div class="slider">
                            {imgs.map(p => (
                                <span style={{ margin: "1em", position: "relative" }}>
                                    <IconButton sx={{ backgroundColor: "red", color: "white", "&:hover": { backgroundColor: "#B31312" } }}
                                        size="small"
                                        style={{ position: "absolute", right: "-0.5em", top: "-0.5em" }}
                                        onClick={(e) => { onDeleteDescImg(p) }}
                                        disabled={isDisa}
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <img style={{ aspectRatio: '10/16', width: '6em' }} src={p.url} alt="Mô tả" />
                                </span>
                            ))}
                            <span style={{ margin: "1em", verticalAlign: 'center' }} onClick={onChangeFile}>
                                <img style={{ aspectRatio: '1/1', width: '6em' }} src={addimg} alt="Thêm ảnh mới" />
                            </span>
                        </div>
                        <button class="handle right-handle" style={{ padding: 0 }}
                            onClick={() => onHandleClickRight()}
                        >
                            <div class="text">&#8250;</div>
                        </button>
                    </div>

                </div>
        }
    </>
    )
}

function DescriptionImageCreate({ sendData }) {
    const calculateProgressBar = (progressBar) => {
        progressBar.innerHTML = ""
        const slider = progressBar.closest(".container-book").querySelector(".slider")
        const itemCount = imgs.length
        const itemsPerScreen = parseInt(
            getComputedStyle(slider).getPropertyValue("--items-per-screen")
        )
        let sliderIndex = parseInt(
            getComputedStyle(slider).getPropertyValue("--slider-index")
        )
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
        if (sliderIndex >= progressBarItemCount) {
            slider.style.setProperty("--slider-index", progressBarItemCount - 1)
            sliderIndex = progressBarItemCount - 1
        }

        for (let i = 0; i < progressBarItemCount; i++) {
            const barItem = document.createElement("div")
            barItem.classList.add("progress-item")
            if (i === sliderIndex) {
                barItem.classList.add("active")
            }
            progressBar.append(barItem)
        }
    }

    const throttleProgressBar = throttle(() => {
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
    }, 250)

    const [imgs, setImgs] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const changeImgs = (listImg) => {
        console.log("list", listImg)
        setImgs(listImg)
    }

    useEffect(() => {
        window.addEventListener("resize", throttleProgressBar)
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
    }, [])

    const [isDisa, setIsDisa] = useState(false)

    const MIN_FILE_SIZE = 100 // 100Kb
    const MAX_FILE_SIZE = 6144 // 6MB

    const uploadOke = (image) => {
        changeImgs([...imgs, image])
        sendData([...imgs, image])
    }

    const onChangeFile = event => {
        if (isDisa === true) {
            return
        }

        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png, image/jpeg image/jpg"
        input.onchange = _ => {
            let files = Array.from(input.files);
            const imag = files[0];
            console.log(imag)
            if (!imag) {
                NotificationManager.error("Không đúng định dạng", "Không đúng định dạng ảnh", 2000)
                return false;
            }
            if (!imag.name.match(/\.(jpg|jpeg|png)$/)) {
                NotificationManager.error("Chỉ nhận file .jpg, .jpeg, .png", "Không đúng định dạng ảnh", 2000)
                return false;
            }

            const fileSizeKiloBytes = imag.size / 1024

            if (fileSizeKiloBytes < MIN_FILE_SIZE) {
                NotificationManager.error("File quá nhỏ, không đảm bảo độ phân giải", "Tối thiểu là 100 Kb", 2000);
                return
            }
            if (fileSizeKiloBytes > MAX_FILE_SIZE) {
                NotificationManager.error("File quá lớn", "Tối đa là 6 Mb", 2000);
                return
            }
            setIsDisa(true)
            imgService.checkImg(imag).then((rs) => {
                if (rs.data) {
                    console.log(rs)
                    if (rs.data.status === "Oke") {
                        NotificationManager.success("Ảnh phù hợp", "Kiểm tra ảnh thành công", 2000);
                        uploadOke(imag)
                    } else {
                        NotificationManager.error("Ảnh không phù hợp", "Kiểm tra ảnh thành công", 2000);
                    }
                } else {
                    NotificationManager.error("Có lỗi khi kiểm tra ảnh", "Kiểm tra ảnh không thành công", 2000);
                }
                setIsDisa(false);
            }).catch((err) => {
                console.log(err)
                NotificationManager.error("Có lỗi khi kiểm tra ảnh", "Kiểm tra ảnh không thành công", 2000);
                setIsDisa(false);
            })
        };
        input.click();
    }

    const onDeleteDescImg = async (img) => {
        if (await confirm("Bạn có chắc muốn xóa ảnh này chứ")) {
            setIsDisa(true);
            firebaseService.deleteDescImg(img, (u) => {
                setImgs(imgs.filter(x => x.url !== u))
                NotificationManager.success("Xóa ảnh thành công", "Thành công", 2000)
            }).finally(() => {
                setIsDisa(false);
            })
        }
    }


    return (<>
        {
            isLoading === true ? <LinearProgress /> :
                <div className='container-book' style={{ border: 'none' }}>
                    <div className='header-slider'>
                        <h1 className='title' style={{ textAlign: 'right', color: 'black', fontSize: "20px", lineHeight: "24px" }}>Ảnh minh họa</h1>
                        <div className='progress-bar'></div>
                    </div>
                    <div className='container-book-hot' style={{ padding: 0 }}>
                        <button class="handle left-handle" style={{ padding: 0 }}
                            onClick={() => onHandleClickLeft()}
                        >
                            <div class="text">&#8249;</div>
                        </button>
                        <div class="slider">
                            {imgs.map(p => (
                                <span style={{ margin: "1em", position: "relative" }}>
                                    <IconButton sx={{ backgroundColor: "red", color: "white", "&:hover": { backgroundColor: "#B31312" } }}
                                        size="small"
                                        style={{ position: "absolute", right: "-0.5em", top: "-0.5em" }}
                                        onClick={(e) => { onDeleteDescImg(p) }}
                                        disabled={isDisa}
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <img style={{ aspectRatio: '10/16', width: '6em' }} src={URL.createObjectURL(p)} alt="Mô tả" />
                                </span>
                            ))}
                            <span style={{ margin: "1em", verticalAlign: 'center' }} onClick={onChangeFile}>
                                <img style={{ aspectRatio: '1/1', width: '6em' }} src={addimg} alt="Thêm ảnh mới" />
                            </span>
                        </div>
                        <button class="handle right-handle" style={{ padding: 0 }}
                            onClick={() => onHandleClickRight()}
                        >
                            <div class="text">&#8250;</div>
                        </button>
                    </div>

                </div>
        }
    </>
    )
}

export { DescriptionImage, DescriptionImageEdit, DescriptionImageCreate }