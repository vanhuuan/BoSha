import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { imgService } from '../../services/image.services';
import { firebaseService } from '../../services/firebase.services';


function EditorImage(props) {
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(props.chap.text))))

    const maxLength = "15000"
    const minLength = "100"
    // const [convertedContent, setConvertedContent] = useState(null);

    const uploadImageCallBack = (file) => {
        console.log(file)
        var imgFile = URL.createObjectURL(file)
        return new Promise(
            (resolve, reject) => {
                imgService.checkImg(imgFile).then(() => {
                    firebaseService.uploadChapterImg(props.chap.bookId, props.chap.chapId, imgFile, (url) => {
                        resolve(url)
                    })
                }).catch(e => {
                    reject(e)
                })
            }
        );
    }

    const handleKeyCommand = (command, editorState) => {
        if (command === 'backspace') {
            const contentState = editorState.getCurrentContent();
            const selectionState = editorState.getSelection();
            const anchorKey = selectionState.getAnchorKey();
            const currentContentBlock = contentState.getBlockForKey(anchorKey);
            console.log(currentContentBlock)
            const type = currentContentBlock.getType();
            console.log(type)
            if (type === 'atomic') {
                const entityKey = currentContentBlock.getEntity();
                if (entityKey) {
                    contentState = contentState.deleteEntity(entityKey);
                }
            }
            setEditorState(EditorState.set(editorState, {
                currentContent: contentState
            }));
        }
    };

    useEffect(() => {
        let raw = convertToRaw(editorState.getCurrentContent());
        let html = draftToHtml(raw)
        console.log(html)
        // setConvertedContent(html);
        sendData(html)
    }, [editorState]);

    const sendData = (htmls) => {
        props.parentCallback(htmls);
    }

    const sendDataOke = (oke) => {
        props.okeCallback(oke);
    }


    return (
        <Grid container spacing={2} border={'1px solid #D8C4B6;'} marginTop={"2em"}>
            <Grid item xs={12}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    // handleKeyCommand={handleKeyCommand}
                    wrapperClassName="TextEditor"
                    editorClassName="TextEditor"
                    toolbar={{
                        // options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'image'],
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history']
                        // image: {
                        //     urlEnabled: false,
                        //     uploadEnabled: true,
                        //     alignmentEnabled: true,
                        //     uploadCallback: uploadImageCallBack,
                        //     previewImage: true,
                        //     inputAccept: 'image/jpeg,image/jpg,image/png',
                        //     alt: {
                        //         present: true,
                        //         mandatory: false
                        //     }
                        // }
                    }}
                    editorStyle={{ height: '30em' }}
                    handleBeforeInput={val => {
                        console.log(val)
                        const textLength = editorState.getCurrentContent().getPlainText().length;
                        if (val && textLength >= maxLength) {
                            sendDataOke(false)
                            return 'handled';
                        }
                        if (val && textLength < minLength) {
                            sendDataOke(false)
                        } else {
                            sendDataOke(true)
                        }
                        return 'not-handled';
                    }}
                    handlePastedText={val => {
                        console.log("Paset", val)
                        const textLength = editorState.getCurrentContent().getPlainText().length;
                        return ((val.length + textLength) >= maxLength);
                    }}
                />
                <Typography variant='caption'>{editorState.getCurrentContent().getPlainText().length} / {maxLength} ký tự</Typography>
            </Grid>
        </Grid>

    );
}

function EditorDescription(props) {
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(props.book.text))))

    // const [convertedContent, setConvertedContent] = useState(null);

    const sendData = (htmls) => {
        props.parentCallback(htmls);
    }

    const maxLength = 3000;

    useEffect(() => {
        let raw = convertToRaw(editorState.getCurrentContent());
        let html = draftToHtml(raw)
        console.log(html)
        // setConvertedContent(html);
        sendData(html)
    }, [editorState]);

    return (
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <div style={{ marginTop: `1rem`, border: '1px solid gray', borderRadius: '4px' }}>
                    <Typography variant="h6" gutterBottom style={{ backgroundColor: `#F5EFE7`, color: `black`, padding: '0.5em' }}>
                        Miêu tả
                    </Typography>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="TextEditor"
                        editorClassName="TextEditor"
                        toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                        }}
                        editorStyle={{ height: '20em' }}
                        handleBeforeInput={val => {
                            const textLength = editorState.getCurrentContent().getPlainText().length;
                            if (val && textLength >= maxLength) {
                                return 'handled';
                            }
                            return 'not-handled';
                        }}
                        handlePastedText={val => {
                            const textLength = editorState.getCurrentContent().getPlainText().length;
                            return ((val.length + textLength) >= maxLength);
                        }}
                    />  <Typography variant='caption'>{editorState.getCurrentContent().getPlainText().length} / {maxLength} ký tự</Typography>
                </div>
            </Grid>
        </Grid >

    );
}

export {
    EditorImage, EditorDescription
}