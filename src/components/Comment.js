import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Picker,{Categories} from 'emoji-picker-react';

export default function TextareaValidator() {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [text, setText] = React.useState('');
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        addEmoji(emojiObject)
        console.log(emojiObject)
    };
    const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

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