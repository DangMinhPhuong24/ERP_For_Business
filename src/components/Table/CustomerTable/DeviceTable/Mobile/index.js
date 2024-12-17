import {
    Autocomplete,
    Button,
    createFilterOptions,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TextField
} from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {TbEdit, TbEye} from 'react-icons/tb'
import PolygonIcon from '../../../../../asset/icon/Polygon.svg'
import colors from '../../../../../constants/colors'
import ModalDelete from '../../../../Modal/Common/delete'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: colors.lightwhiteColor,
        color: theme.palette.common.black,
        fontSize: 12,
        fontWeight: '700',
        lineHeight: '14px',
        letterSpacing: '0em',
        textAlign: 'center',
        padding: '0 12px',
        height: '56px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        height: '56px',
        textAlign: 'center',
        padding: '0 12px',
        color: colors.slategrayColor
    }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: colors.lilywhiteColor
    },
    '&:last-child td, &:last-child th': {
        border: 0
    },
    '&.overdue': {
        backgroundColor: colors.redColor
    }
}))

const DeviceMobileTable = (props) => {
    const {
        titleTable,
        deviceMachines,
        handleDelete,
        successFlag,
        isEdit,
        handleView,
        handleEdit,
        listAllDeviceMachineType,
        listAllDeviceMachineManufacturer
    } = props
    const { t } = useTranslation()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                    <TableRow sx={{ height: '48px' }}>
                        {titleTable.map((item, index) => (
                            <StyledTableCell align="right">{t(item)}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deviceMachines.map((item, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell sx={{textAlign:'left !important'}} >
                                {item?.device_machine_type_name
                                    ? item.device_machine_type_name
                                    : (listAllDeviceMachineType.find(device => device.id === item?.device_machine_type_id)?.device_machine_type_name || t('noData'))
                                }
                            </StyledTableCell>
                            <StyledTableCell>
                                {item.quantity}
                            </StyledTableCell>
                            <StyledTableCell sx={{display:'flex',justifyContent:'center'}}>
                                <Button className="button-action" onClick={() => handleView(item)}>
                                    <TbEye style={{ color: colors.lightroyalblueColor }} />
                                </Button>
                                {isEdit && (
                                    <>
                                        <Button className="button-action" onClick={() => handleEdit(item, index)}>
                                            <TbEdit style={{ color: colors.amberColor }} />
                                        </Button>
                                        <ModalDelete successFlag={successFlag} id={index}
                                                     handleDelete={() => handleDelete(index)}/>
                                    </>
                                )}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DeviceMobileTable
