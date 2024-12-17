import {useTranslation} from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React, {useEffect, useRef, useState} from 'react'
import '../../../resource/style/WarehouseStyle.css'
import {TbEdit} from 'react-icons/tb'
import WarehouseImportBoardStandStill from '../../../components/Kanban/Warehouse/StandStill/board/board'
import {kanbanWarehouseImportOrdersState} from '../../../redux/warehouse/warehouse.selectors'
import {useDispatch, useSelector} from 'react-redux'
import {getKanbanWarehouseImportOrdersAction} from '../../../redux/warehouse/warehouse.actions'
import format from 'date-fns/format'
import {subscribeToChannel} from '../../../utils/pusher'
import {getProfileState} from '../../../redux/auth/auth.selectors'
import HeaderPage from 'components/HeaderPage'
import {titleKanban} from '../../../constants/attributesKanbanImportWarehouse'
import CustomDatePicker from "../../../components/DateTime/DatePicker";
import SearchBar from "../../../components/Buttons/Search";

export default function ImportWarehouseManagementPage() {
    const {t} = useTranslation()
    const kanbanWarehouseImportOrders = useSelector(kanbanWarehouseImportOrdersState)
    const getProfile = useSelector(getProfileState)
    const [searchValue, setSearchValue] = useState('')
    const [selectedRange, setSelectedRange] = useState([
        format(new Date(), 'yyyy-MM-dd')
    ])
    const dispatch = useDispatch()
    const [columns, setColumns] = useState([])
    const selectedRangeRef = useRef(selectedRange)

    useEffect(() => {
        dispatch(
            getKanbanWarehouseImportOrdersAction({code: searchValue, date: selectedRange})
        )
    }, [dispatch, selectedRange])

    useEffect(() => {
        if (kanbanWarehouseImportOrders) {
            setColumns(kanbanWarehouseImportOrders)
        }
    }, [kanbanWarehouseImportOrders])

    const handleDateChange = (range) => {
        setSelectedRange(range)
        selectedRangeRef.current = range
    }
    const handleSearchValue = () => {
        if (searchValue === '') {
            dispatch(getKanbanWarehouseImportOrdersAction({date: selectedRange}))
        } else {
            dispatch(
                getKanbanWarehouseImportOrdersAction({
                    code: searchValue,
                    date: selectedRange
                })
            )
        }
    }

    const handleClearSearchValue = () => {
        setSearchValue('')
        dispatch(getKanbanWarehouseImportOrdersAction({date: selectedRange}))
    }

    useEffect(() => {
        const channel = subscribeToChannel(getProfile.id);
        channel.bind('kanban-warehouse-import-order-event', function (data) {
            updateOrderInColumns(data);
        });

        return () => {
            channel.unbind('kanban-warehouse-import-order-event')
        }
    }, [getProfile])

    const updateOrderInColumns = (data) => {
        const {
            id,
            from_column,
            to_column,
            warehouse_import_order_name,
            from,
            to,
            import_time,
            warning,
            code,
            import_date
        } = data;
        const orderDate = new Date(import_date);
        const date = new Date(selectedRangeRef.current);
        const isDateInRange = orderDate.getTime() === date.getTime();

        const isMatchingSearch = searchValue === "" ||
            code.includes(searchValue) ||
            warehouse_import_order_name.includes(searchValue);

        if (isDateInRange && isMatchingSearch) {
            setColumns(prevColumns => {
                let newColumns = {...prevColumns};

                if (from_column && newColumns[from_column]) {
                    const order = newColumns[from_column].find((order) => order.id === id)
                    if (order) {
                        newColumns[from_column] = newColumns[from_column].filter((order) => order.id !== id)
                    }
                    newColumns[to_column] = [data, ...newColumns[to_column]]
                } else {
                    for (let column in newColumns) {
                        if (newColumns[column]) {
                            const existingOrder = newColumns[column].find((order) => order.id === id)
                            if (existingOrder) {
                                newColumns[column] = newColumns[column].filter((order) => order.id !== id)
                                break
                            }
                        }
                    }
                    newColumns[to_column] = [
                        {id, code, warehouse_import_order_name, from, to, warning, import_time},
                        ...newColumns[to_column]
                    ]
                }
                return newColumns
            })
        }
    }

    return (
        <>
            <HeaderPage
                title={t('importWarehouseManagement')}
                actionButton={
                    <Button disabled sx={{gap: '8px'}} className="addButton disabled-cursor">
                        <TbEdit style={{fontSize: '16px', marginBottom: '2px'}}/>
                        {t('createWarehouseImportOrder')}
                    </Button>
                }
            />
            <Box sx={{display: 'flex', gap: '20px', m: '10px 16px', justifyContent: 'space-between'}}>
                <SearchBar
                    searchValue={searchValue}
                    handleOnChangeValue={(event) => setSearchValue(event.target.value)}
                    handleSearch={handleSearchValue}
                    handleClearSearch={handleClearSearchValue}
                    placeholderText="enterTheWarehouseImportOrderCode"
                    buttonText="find"
                />
                <CustomDatePicker onChange={handleDateChange}/>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{m: '4px 60px'}}>
                    <WarehouseImportBoardStandStill initial={columns} title={titleKanban} withScrollableColumns/>
                </Box>
            </Box>
        </>
    )
}