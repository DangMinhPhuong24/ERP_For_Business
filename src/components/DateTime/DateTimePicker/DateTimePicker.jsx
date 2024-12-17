import * as React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

export default function BasicDateTimePicker(props) {
    const { label, onChangeDateTime } = props

    

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                className="datetimePicker"
                onChange={onChangeDateTime}
                sx={{ width: "100% !important" }}
                label={label}
            />
        </LocalizationProvider>
    )
}
