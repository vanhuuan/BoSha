import { NotificationManager } from "react-notifications";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable, listAll, deleteObject, uploadBytes } from "firebase/storage";

export const firebaseService = {
    getChapter: async (bookid, chapterId, callback) => {
        await getDownloadURL(ref(storage, `books/${bookid}/${chapterId}.html`))
            .then(async (url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'text/html';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        console.log("Helo", xhr)
                        callback(`<div>${xhr.responseText} </div>`)
                    }
                }
                xhr.open('GET', url, true);
                xhr.send();
            })
            .catch((error) => {
                console.log("erorr", error)
                callback(`<div> Lỗi không tìm thấy truyện </div>`)
            });
    },
    getPreview: async (bookId, callback) => {
        getDownloadURL(ref(storage, `books/${bookId}/preview.html`))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'text/html';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        callback(`<div> ${xhr.responseText} </div>`)
                    }
                }
                xhr.open('GET', url);
                xhr.send();
            })
            .catch((error) => {
                console.log(error)
                callback(`<div>Đây là một bộ truyện khá hay nhưng tác giả chưa miêu tả cho nó.</div>`)
            });
    },
    getCover: async (bookId, callback) => {
        getDownloadURL(ref(storage, `books/${bookId}/cover.jpg`))
            .then((url) => {
                callback(url)
                return url;
            })
            .catch((error) => {
                console.log(error)
                return `https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656a08e27bd8b1165478b%2Fcover.png?alt=media&token=20cfb7d8-6e42-4426-b026-c0443d8cb793`
            });
    },
    getAva: async (uid, callback) => {
        console.log(`users/ava/${uid}.jpg`)
        getDownloadURL(ref(storage, `users/ava/${uid}.jpg`))
            .then((url) => {
                callback(url)
                console.log("Rs url", url)
                return url;
            })
            .catch((error) => {
                console.log(error)
                callback("")
                return `https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656a08e27bd8b1165478b%2Fcover.png?alt=media&token=20cfb7d8-6e42-4426-b026-c0443d8cb793`
            });
    },
    getDecriptionImages: async (bookId, callback) => {
        const myPicks = ref(storage, `books/${bookId}/Images/`)

        listAll(myPicks)
            .then(async (res) => {
                const { items } = res;
                console.log(items)
                const urls = await Promise.all(
                    items.map(async (item) => {
                        let u = ""
                        await getDownloadURL(item).then((downloadURL) => {
                            console.log(downloadURL)
                            u = downloadURL
                        })
                        return {
                            url: u,
                            ref: item
                        }
                    })
                );
                console.log(urls);
                callback(urls)
            })
            .catch((error) => {
                console.error(error)
            });
    },
    uploadPreview: async (bookId, text) => {
        const storageRef = ref(storage, `books/${bookId}/preview.html`);
        const metadata = {
            contentType: 'text/html; charset=utf-8'
        };
        console.log(text)
        const blob = new Blob([text], { type: 'plain/text' });
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
        uploadTask.on("state_changed",
            (snapshot) => {
                console.log("Uploading")
            },
            (error) => {
                console.log("upload preview", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL)
                    return downloadURL
                });
            }
        );
    },
    uploadChapter: async (bookId, chapterId, text) => {
        const storageRef = ref(storage, `books/${bookId}/${chapterId}.html`);
        const metadata = {
            contentType: 'text/html; charset=utf-8',
        };
        console.log(text)
        const blob = new Blob([text], { type: 'plain/text' });
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
        uploadTask.on("state_changed",
            (snapshot) => {
                console.log("Uploading")
            },
            (error) => {
                console.log("upload chapter loi", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL)
                    return downloadURL
                });
            }
        );
    },
    uploadCover: async (bookId, img) => {
        if (img == null)
            return;

        getFileBlob(img, blob => {
            const storageRef = ref(storage, `books/${bookId}/cover.png`);
            const metadata = {
                contentType: 'image/png',
            };
            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
            uploadTask.on("state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log("Upload chap", error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        return downloadURL
                    });
                }
            );
        })
    },

    uploadChapterImg: async (bookId, chapId, img, callBack) => {
        if (img == null)
            return;

        getFileBlob(img, blob => {
            const storageRef = ref(storage, `books/${bookId}/${chapId}/${makeid(8)}.png`);
            const metadata = {
                contentType: 'image/png',
            };
            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
            uploadTask.on("state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log("Upload chap img", error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        callBack({ 
                            data: { 
                                link: downloadURL
                            }
                        })
                        return downloadURL
                    });
                }
            );
        })
    },

    uploadDesciptionImages: async (bookId, img, callback) => {
        if (img == null)
            return;

        console.log(img)
        getFileBlob(img, blob => {
            const storageRef = ref(storage, `books/${bookId}/Images/` + makeid(8) + ".png");
            const metadata = {
                contentType: 'image/png',
            };
            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
            uploadTask.on("state_changed",
                (snapshot) => {
                    console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100, "%")
                },
                (error) => {
                    console.error("Upload desc img", error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        var data = {
                            url: downloadURL,
                            ref: storageRef
                        }
                        callback(data)
                        return data
                    });
                }
            );
        })

    },
    uploadAva: async (uid, img, callback) => {
        if (img == null)
            return;

        getFileBlob(img, blob => {
            const storageRef = ref(storage, `users/ava/${uid}.jpg`);
            const metadata = {
                contentType: 'image/jpeg',
            };
            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
            uploadTask.on("state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log("Upload ava", error)
                },
                () => {
                    callback("/user/userInfo")
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        return downloadURL
                    });
                }
            );
        })
    },
    deleteDescImg: async (imgRef, callBack) => {
        deleteObject(imgRef.ref).then(() => {
            callBack(imgRef.url)
        }).catch((error) => {
            console.log("Loi up anh", error)
            NotificationManager.error("Xóa ảnh không thành công", "Không thành công", 2000)
        });
    }
}

var getFileBlob = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function () {
        cb(xhr.response);
    });
    xhr.send();
};

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 61
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

