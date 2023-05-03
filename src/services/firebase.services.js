import api from "./api";
import { storage } from "../firebase";
import { ref } from "firebase/storage";
import { getDownloadURL  } from "firebase/storage";

const baseURL = "https://boshaapi.site";
export const firebaseService = {
    getChapter: async (bookid, chapterId, callback) => {
        await getDownloadURL(ref(storage, `books/${bookid}/${chapterId}.html`))
            .then( async (url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'text/html';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        console.log("Helo", xhr)
                        callback(`<div>" ${xhr.responseText} </div>`)
                    }
                }
                xhr.open('GET', url, true);
                xhr.send();
            })
            .catch((error) => {
                console.log("erorr",error)
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
                xhr.open('GET', url);
                xhr.send();

                // Or inserted into an <img> element
                const img = document.getElementById('myimg');
                img.setAttribute('src', url);
            })
            .catch((error) => {
                console.log(error)
                return `https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656848e27bd8b116546e9%2F643656888e27bd8b116546fa.html?alt=media&token=776995dd-485f-48ed-ac04-8dcff7984a92`
            });
    },
    getCover: async (bookId) => {
        getDownloadURL(ref(storage, `book/${bookId}/cover.jpg`))
            .then((url) => {;
                return url;
            })
            .catch((error) => {
                console.log(error)
                return `https://firebasestorage.googleapis.com/v0/b/bosha-4df95.appspot.com/o/books%2F643656a08e27bd8b1165478b%2Fcover.png?alt=media&token=20cfb7d8-6e42-4426-b026-c0443d8cb793`
            });
    }
}


