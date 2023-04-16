import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from "@mui/material";

export default function RadioPrice() {
    const [selectedValue, setSelectedValue] = React.useState(1);
    const [value, setValue] = React.useState("1000");
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue)
    };
    const handlePriceChange = (event) => {
        setValue(event.target.value);
        console.log(value)
    };
    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: "size-radio-button-demo",
        inputProps: { "aria-label": item },
    });
    return (
        <FormControl fullWidth margin="normal">
            <FormLabel id="demo-radio-buttons-group-label" >Loại truyện</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                margin="normal">
                <FormControlLabel
                    value="female"
                    control={<Radio {...controlProps("1")} size="small" />}
                    label="Miễn phí"
                />
                <FormControlLabel
                    value="male"
                    control={
                        <Radio
                            {...controlProps("2")}
                            size="small"
                        />
                    }
                    label="Có phí"
                />
            </RadioGroup>
            {selectedValue == 2 ?
                <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="outlined-adornment-amount">Giá tiền</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                        label="Amount"
                        onChange={handlePriceChange}
                    />
                </FormControl> : <></>
            }
        </FormControl>
    );
}