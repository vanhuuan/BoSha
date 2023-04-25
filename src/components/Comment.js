import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Picker, { Categories, EmojiStyle, SuggestionMode } from 'emoji-picker-react';
import "../css/Comment.css";

export default function TextareaValidator() {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [showEmojis, setShowEmojis] = useState(false);
    const [text, setText] = React.useState('');

    const setInput = (text) => {
        console.log(text)
        if (text.length < 301)
            setText(text)
    }

    const addEmoji = (e) => {
        console.log(text)
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(text + emoji);
    };

    return (
        <FormControl>
            <FormLabel>Đánh giá</FormLabel>
            <Textarea
                placeholder="Hãy để lại đánh giá của bạn"
                minRows={3}
                value={text}
                onChange={(event) => setText(event.target.value)}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                        }}
                    >
                        <button className="button" onClick={() => setShowEmojis(!showEmojis)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        {showEmojis && (
                            <div style={{position: "relative", zIndex: 1}}>
                                <Picker onEmojiClick={addEmoji} searchDisabled skinTonesDisabled emojiStyle={EmojiStyle.GOOGLE} suggestedEmojisMode={SuggestionMode.None}
                                    categories={[
                                        {
                                            name: "Smiles & Emotions",
                                            category: Categories.SMILEYS_PEOPLE
                                        },]}
                                    previewConfig={{
                                        showPreview: false
                                    }} 
                                    height={"10em"}
                                    width={"40em"}/>
                            </div>
                        )}
                        <Typography level="body3">
                            {text.length} / 300 từ
                        </Typography>
                        <Button sx={{ ml: 'auto' }}>Gửi</Button>
                    </Box>
                }
                sx={{
                    minWidth: 300,
                    fontWeight,
                    fontStyle: italic ? 'italic' : 'initial',
                }}
            />
        </FormControl>
    );
}