import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

export default function RadioPrice(props) {
    const [selectedValue, setSelectedValue] = React.useState("1");
    const [value, setValue] = React.useState(1000);
    const [radioDisabled, setRadioDisabled] = React.useState(false);
    const [helpText, setHelpText] = useState("")
   
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setValue(0);
        sendData(0)
    };
    const handlePriceChange = (event) => {
        setValue(event.target.value);
        if(event.target.value < 1000){
            setHelpText("Giá trij tối thiểu phải là 1.000 VND hoặc là miễn phí 0 VND")
            return;
        }
        setHelpText("")
        sendData(event.target.value)
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: "size-radio-button-demo",
        inputProps: { "aria-label": item },
    });

    const sendData = (htmls) => {
        props.parentCallback(htmls);
    }

    useEffect(() => {
        const price = props.book.price
        console.log('gia', price)
        if(price){
            if(price < 1000){
                setSelectedValue("1")
                setValue(0)
            }else{
                setSelectedValue("2")
                setValue(price)
            }
            setRadioDisabled(true)
        }
    }, [])
    return (
        <FormControl fullWidth margin="normal">
            <FormLabel id="demo-radio-buttons-group-label" >Loại truyện</FormLabel>
            <RadioGroup
                disabled={radioDisabled}
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                margin="normal">
                <FormControlLabel
                    value="1"
                    control={<Radio {...controlProps("1")} size="small" />}
                    label="Miễn phí"
                />
                <FormControlLabel
                    value="2"
                    control={
                        <Radio
                            {...controlProps("2")}
                            size="small"
                        />
                    }
                    label="Có phí"
                />
            </RadioGroup>
            {selectedValue === "2" ?
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="outlined-adornment-amount">Giá tiền</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        inputProps={{min: 1000, style: { textAlign: 'right' }}}
                        endAdornment={<InputAdornment position="start">VND</InputAdornment>}
                        label="Giá tiền"
                        onChange={handlePriceChange}
                        type="number"
                        value={value}
                        helperText={helpText}
                        error={helpText.length > 0 ? true : false}
                    />
                </FormControl> : <></>
            }
        </FormControl>
    );
}