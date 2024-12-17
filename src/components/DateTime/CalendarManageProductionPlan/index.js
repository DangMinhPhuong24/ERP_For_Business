import React, { useState,useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Calendar, { MonthView } from "react-calendar";
import '../../../resource/style/CalendarManageProductionPlanStyle.css';


const CalendarManageProductionPlan = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState(new Date());

    return (
        <div>
            <Calendar
                value={value}
                tileClassName="c-c-content"
                tileContent={({ date, view }) => {
                    if (date.getDate() === 20 || date.getDate() === 3 || date.getDate() === value.getDate())
                        if( date.getDate() === value.getDate() &&
                            date.getMonth() === value.getMonth() &&
                            date.getFullYear() === value.getFullYear()){
                            return (
                                <div style={{ width: "5px", height: "5px" }}>
                                    <span style={{ marginTop: "9px" }} className="c-content">
                                      9
                                    </span>
                                </div>
                            );
                        }else {
                            return (
                                <div style={{ width: "5px", height: "5px" }}>
                                    <span style={{ marginTop: "9px" }} className="c-content-none">
                                      9
                                    </span>
                                </div>
                            );
                        }
                }}
            />
        </div>
    );
};

export default CalendarManageProductionPlan;
