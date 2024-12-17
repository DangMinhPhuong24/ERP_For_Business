import React, { useState,useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Calendar, { MonthView } from "react-calendar";
import styles from '../../../resource/style/CalendarResourceManagementStyle.css';
import format from "date-fns/format";

const CalendarResourceManagement = ({handleArrangeWorkers,onChangeDate,listWorkerAssignments}) => {
    const { t } = useTranslation();
    const [value, setValue] = useState(new Date());

    const onChange = (nextValue) => {
        // if (nextValue.getDay() === 0) {
        //     return;
        // }
        setValue(nextValue);
    };

    useEffect(() => {
        onChangeDate && onChangeDate(format(value, 'yyyy-MM-dd'));
    }, [value]);

    const handleOpenModal = (nextValue) => {
        // if (nextValue.getDay() === 0) {
        //     return;
        // }
        handleArrangeWorkers();
    };
    return (
        <div>
            <Calendar
                className="calendarResourceManagement"
                onChange={onChange}
                // value={value}
                tileClassName="c-c-content"
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const formattedDate = format(date, 'yyyy-MM-dd');
                        const assignments = listWorkerAssignments.find(item => Object.keys(item)[0] === formattedDate);
                        if (assignments && assignments[formattedDate].length > 0) {
                            const shiftNames = assignments[formattedDate].map(item => {
                                if (Array.isArray(item.in_charges)) {
                                    return item.in_charges.map(charge => charge.delivery_shift.delivery_shift_name);
                                } else {
                                    return ['P'];
                                }
                            });
                            return (
                                <div>
                                    {shiftNames.map((shifts, index) => (
                                        <div key={index}>
                                            {shifts.map((shift, i) => (
                                                <div key={i}>
                                                    {(shift === 'P') ? (
                                                        <div className="custom-contentP">
                                                            <span>{shift}</span>
                                                        </div>
                                                    ) : (
                                                        <React.Fragment>
                                                            {(shift === 'S1') && (
                                                                <div className="custom-content">
                                                                    <span>{shift}</span>
                                                                </div>
                                                            )}
                                                            {(shift === 'S2') && (
                                                                <div className="custom-contentS2">
                                                                    <span>{shift}</span>
                                                                </div>
                                                            )}
                                                            {(shift === 'C1') && (
                                                                <div className="custom-contentC1">
                                                                    <span>{shift}</span>
                                                                </div>
                                                            )}
                                                            {(shift === 'C2') && (
                                                                <div className="custom-contentC2">
                                                                    <span>{shift}</span>
                                                                </div>
                                                            )}
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                    }
                    return null;
                }}
                onClickDay={handleOpenModal}
            />
        </div>
    );
};

export default CalendarResourceManagement;