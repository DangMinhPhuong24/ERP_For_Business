import {
  Autocomplete,
  Button,
  createFilterOptions,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputLabel
} from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import colors from '../../../../constants/colors'
import ModalDelete from '../../../Modal/Common/delete'

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

const DeviceTable = (props) => {
  const {
    isEdit,
    titleTable,
    deviceMachines,
    listAllDeviceMachineType,
    listAllDeviceMachineManufacturer,
    handleDelete,
    handleUpdateDeviceMachineData,
    successFlag,
    disabledRows,
    setDisabledRows,
    rowNewDeviceMachines
  } = props
  const { t } = useTranslation()

  const handleEdit = (index) => {
    const newDisabledRows = [...disabledRows]
    newDisabledRows[index] = false
    setDisabledRows(newDisabledRows)
  }

  const filter = createFilterOptions()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ height: '48px' }}>
            {titleTable.map(
              (item, index) =>
                (item !== 'actions' || isEdit) && (
                  <StyledTableCell key={index} align="right">
                    {t(item)}
                  </StyledTableCell>
                )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {deviceMachines.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{ width: '165px' }}>
                {isEdit ? (
                  <Autocomplete
                    disabled={disabledRows[index]}
                    popupIcon={<PolygonIcon />}
                    noOptionsText={t('noResult')}
                    options={listAllDeviceMachineType}
                    onChange={(event, newValue) => {
                      let newValueSelected = newValue ? newValue.id : null

                      if (newValue && typeof newValue.id === 'string') {
                        newValueSelected = newValue.id
                        handleUpdateDeviceMachineData(index, 'device_machine_type_id', '')
                        return handleUpdateDeviceMachineData(index, 'device_machine_type_name', newValueSelected ?? '')
                      }

                      handleUpdateDeviceMachineData(index, 'device_machine_type_name', '')
                      return handleUpdateDeviceMachineData(index, 'device_machine_type_id', newValueSelected ?? null)
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params)

                      const { inputValue } = params

                      const isExisting = options.some((option) => inputValue === option.device_machine_type_name)
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          id: inputValue,
                          device_machine_type_name: `${t('add')} "${inputValue}"`
                        })
                      }

                      return filtered
                    }}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }

                      if (option.inputValue) {
                        return option.inputValue
                      }

                      return option.device_machine_type_name
                    }}
                    value={
                      item.device_machine_type_name !== ''
                        ? item.device_machine_type_name
                        : listAllDeviceMachineType.find((device) => device.id === item?.device_machine_type_id) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder={t('select')}
                        InputProps={{
                          ...params.InputProps
                        }}
                      />
                    )}
                    ListboxProps={{ style: { maxHeight: '180px', fontSize: '12px' } }}
                  />
                ) : (
                  <Typography className="inputLabel-handbook-view">
                    {listAllDeviceMachineType.find((device) => device.id === item.device_machine_type_id)
                      ?.device_machine_type_name || t('noData')}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell>
                {isEdit ? (
                  <Autocomplete
                    disabled={disabledRows[index]}
                    popupIcon={<PolygonIcon />}
                    noOptionsText={t('noResult')}
                    onChange={(event, newValue) => {
                      let newValueSelected = newValue ? newValue.id : null

                      if (newValue && typeof newValue.id === 'string') {
                        newValueSelected = newValue.id
                        handleUpdateDeviceMachineData(index, 'device_machine_manufacturer_id', '')
                        return handleUpdateDeviceMachineData(
                          index,
                          'device_machine_manufacturer_name',
                          newValueSelected ?? ''
                        )
                      }

                      handleUpdateDeviceMachineData(index, 'device_machine_manufacturer_name', '')
                      return handleUpdateDeviceMachineData(
                        index,
                        'device_machine_manufacturer_id',
                        newValue ? newValue.id : null
                      )
                    }}
                    options={listAllDeviceMachineManufacturer}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params)

                      const { inputValue } = params

                      const isExisting = options.some(
                        (option) => inputValue === option.device_machine_manufacturer_name
                      )
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          id: inputValue,
                          device_machine_manufacturer_name: `${t('add')} "${inputValue}"`
                        })
                      }

                      return filtered
                    }}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option
                      }

                      if (option.inputValue) {
                        return option.inputValue
                      }

                      return option.device_machine_manufacturer_name
                    }}
                    value={
                      item.device_machine_manufacturer_name !== ''
                        ? item.device_machine_manufacturer_name
                        : listAllDeviceMachineManufacturer.find(
                            (manufactured) => manufactured.id === item?.device_machine_manufacturer_id
                          ) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder={t('select')}
                        InputProps={{
                          ...params.InputProps
                        }}
                      />
                    )}
                    ListboxProps={{ style: { maxHeight: '180px', fontSize: '12px' } }}
                  />
                ) : (
                  <Typography className="inputLabel-handbook-view">
                    {listAllDeviceMachineManufacturer.find(
                      (manufacturer) => manufacturer.id === item.device_machine_manufacturer_id
                    )?.device_machine_manufacturer_name || t('noData')}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell>
                {isEdit ? (
                  <TextField
                    value={item?.machine_code}
                    onChange={(e) => handleUpdateDeviceMachineData(index, 'machine_code', e.target.value)}
                    disabled={disabledRows[index]}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{item?.machine_code || t('noData')}</InputLabel>
                )}
              </StyledTableCell>
              <StyledTableCell>
                {isEdit ? (
                  <TextField
                    value={item?.quantity}
                    onChange={(e) => handleUpdateDeviceMachineData(index, 'quantity', e.target.value)}
                    disabled={disabledRows[index]}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{item?.quantity || t('noData')}</InputLabel>
                )}
              </StyledTableCell>
              {isEdit && (
                <StyledTableCell>
                  {rowNewDeviceMachines ? (
                    <>
                      {index !== 0 && (
                        <Button className="button-action" onClick={() => handleEdit(index)}>
                          <TbEdit style={{ color: colors.amberColor }} />
                        </Button>
                      )}
                      <ModalDelete successFlag={successFlag} id={index} handleDelete={() => handleDelete(index)} />
                    </>
                  ) : (
                    <>
                      <Button className="button-action" onClick={() => handleEdit(index)}>
                        <TbEdit style={{ color: colors.amberColor }} />
                      </Button>
                      <ModalDelete successFlag={successFlag} id={index} handleDelete={() => handleDelete(index)} />
                    </>
                  )}
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DeviceTable
