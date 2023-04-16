import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

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

function EditorImage() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName="TextEditor"
                    editorClassName="TextEditor"
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <div
                    bg
                    sx={{ padding: `1rem`, marginTop: `1rem`, backgroundColor: `gray` }}
                    dangerouslySetInnerHTML={createMarkup(convertedContent)}>
                </div>
            </Grid>
        </Grid>

    );
}

function EditorDescription() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div style={{ marginTop: `1rem`, border: '1px solid gray', marginTop: `1rem` , borderRadius: '4px' }}>
                    <Typography variant="h6" gutterBottom style={{ backgroundColor: `rgba(204, 204, 204, 0.5)`, color: `black`, padding: '0.5em' }}>Miêu tả</Typography>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="TextEditor"
                        editorClassName="TextEditor"
                        toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                            image: { uploadCallback: uploadImageCallBack, alt: { present: false, mandatory: false } },
                        }}
                        editorStyle={{ height: '20em' }}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div style={{ marginTop: `1rem`, border: '1px solid gray', marginTop: `1rem`, borderRadius: '4px' }}>
                    <Typography variant="h6" gutterBottom style={{ backgroundColor: `rgba(204, 204, 204, 0.5)`, color: `black`, padding: '0.5em' }}>Xem trước</Typography>
                    <div
                        bg
                        sx={{ padding: `1rem`, marginTop: `1rem`, backgroundColor: `gray` }}
                        style={{ overflow: `auto`, height: `20em` }}
                        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
                    </div>
                </div>
            </Grid>
        </Grid>

    );
}

export {
    EditorImage, EditorDescription
}