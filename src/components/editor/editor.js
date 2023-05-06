import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';

function createMarkup(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}

function EditorImage(props) {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const maxLength = "15000"
    const [convertedContent, setConvertedContent] = useState(null);
    try {
        const data = props.text
        if (data) {
            setConvertedContent(data)
            setEditorState(EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(data)
                )
            ))
        }
    } catch (err) { }
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
        sendData(html)
    }, [editorState]);

    const sendData = (htmls) => {
        props.parentCallback(htmls);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName="TextEditor"
                    editorClassName="TextEditor"
                    toolbar={{
                        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'image'],
                    }}
                    editorStyle={{ height: '30em' }}
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
                />
                <Typography variant='caption'>{editorState.getCurrentContent().getPlainText().length} / {maxLength} ký tự</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>

    );
}

function EditorDescription(props) {
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(props.book.text))))

    const [isPreview, setIsPreview] = useState(false)
    const [convertedContent, setConvertedContent] = useState(null);

    const sendData = (htmls) => {
        props.parentCallback(htmls);
    }

    const maxLength = 3000;

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
        sendData(html)
    }, [editorState]);

    return (
        <Grid container spacing={2}>

            <Grid item xs={12}>
                <div style={{ marginTop: `1rem`, border: '1px solid gray', marginTop: `1rem`, borderRadius: '4px' }}>
                    <Typography variant="h6" gutterBottom style={{ backgroundColor: `rgba(204, 204, 204, 0.5)`, color: `black`, padding: '0.5em' }}>
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