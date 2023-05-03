import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
                        callback(`<div>" ${xhr.responseText} </div>`)
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
    gerPreview: async (bookId, callback) => {
        getDownloadURL(ref(storage, `book/${bookId}/preview.html`))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'text/html';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        console.log("Helo", xhr)
                        callback(`<div>" ${xhr.responseText} </div>`)
                    }
                }
                xhr.open('GET', url);
                xhr.send();
            })
            .catch((error) => {
                console.log(error)
                return `<div>Đây là một bộ truyện khá hay nhưng tác giả chưa miêu tả cho nó.</div>`
            });
    },
    getCover: async (bookId) => {
        getDownloadURL(ref(storage, `book/${bookId}/cover.jpg`))
            .then((url) => {
                ;
                return url;
            })
            .catch((error) => {
                console.log(error)
                return `https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656a08e27bd8b1165478b%2Fcover.png?alt=media&token=20cfb7d8-6e42-4426-b026-c0443d8cb793`
            });
    },
    uploadPreview: async (bookId, text) => {
        const storageRef = ref(storage, `books/${bookId}/preview.html`);
        const metadata = {
            contentType: 'text/html; charset=utf-8',
        };
        const uploadTask = uploadBytesResumable(storageRef, text, metadata);
        uploadTask.on("state_changed",
            (snapshot) => {

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
        const storageRef = ref(storage, `book/${bookId}/${chapterId}.html`);
        const metadata = {
            contentType: 'text/html; charset=utf-8',
        };
        const uploadTask = uploadBytesResumable(storageRef, text, metadata);
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
    },
    uploadCover: async (bookId, img) => {
        if (img == null)
            return;
        storage.ref(`book/${bookId}/cover.jpg`).put(img)
            .on("state_changed",
                (snapshot) => {

                },
                (error) => {
                    console.log("Upload cover", error)
                },
                () => {
                    getDownloadURL(ref(`book/${bookId}/cover.jpg`)).then((downloadURL) => {
                        console.log(downloadURL)
                        return downloadURL
                    });
                }
            );
    }
}


