import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import colors from '../../../../constants/colors'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { filterDigits, formatCurrencyWithoutSymbol, isDigitOrEmpty } from '../../../../common/common'

const StyledCheckbox = styled(Checkbox)`
  &.Mui-checked {
    color: #0f62fe;
  }
`

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.platinumColor,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: '14px',
    letterSpacing: '0em',
    textAlign: 'center',
    padding: '3px',
    height: '48px'
  },
  '&:nth-last-child(-n+5)': {
    fontWeight: '700'
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: colors.lilywhiteColor,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    padding: '3px',
    height: '56px'
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  },
  '&.overdue': {
    backgroundColor: colors.brightredColor
  }
}))

const QuotationTable = ({
  open,
  titleTable,
  data,
  onTableDataChange,
  dataDetail,
  databack,
  handleFocus,
  errorMessagePrice
}) => {
  const { t } = useTranslation()
  const [selectedRows, setSelectedRows] = useState([])
  const [editablePricesStandardSheet, setEditablePricesStandardSheet] = useState({})
  const [editablePricesIncludeSheetSize, setEditablePricesIncludeSheetSize] = useState({})
  const [editablePricesStandardRoll, setEditablePricesStandardRoll] = useState({})
  const [editablePricesIncludeRollSize, setEditablePricesIncludeRollSize] = useState({})
  const [editableDescriptions, setEditableDescriptions] = useState({})
  const [editEnabled, setEditEnabled] = useState({})
  const [editedData, setEditedData] = useState([])
  const [filteredSelectedRows, setFilteredSelectedRows] = useState({})

  useEffect(() => {
    const updateData = (dataSource, productDetails) => {
      const initialEditedData = dataSource.map((item) => {
        const detail = productDetails.find(
          (detailItem) => detailItem.product_management_id === item.id || detailItem.product?.id === item.id
        )
        if (detail) {
          return {
            product_management_id: detail.product_management_id || detail.product?.id,
            description: detail.description || '',
            price_include_roll_size_adjustment: parseInt(detail.price_include_roll_size_adjustment),
            price_standard_roll_adjustment: parseInt(detail.price_standard_roll_adjustment),
            price_include_sheet_size_adjustment: parseInt(detail.price_include_sheet_size_adjustment),
            price_standard_sheet_adjustment: parseInt(detail.price_standard_sheet_adjustment)
          }
        } else {
          return undefined
        }
      })
      setEditedData(initialEditedData.reverse())

      const initialSelectedRows = {}
      const initialEditableDescriptions = {}
      const initialEditablePricesStandardSheet = {}
      const initialEditablePricesIncludeSheetSize = {}
      const initialEditablePricesStandardRoll = {}
      const initialEditablePricesIncludeRollSize = {}

      dataSource.forEach((item) => {
        const detail = productDetails.find(
          (detailItem) => detailItem.product_management_id === item.id || detailItem.product?.id === item.id
        )
        if (detail) {
          initialSelectedRows[item.id.toString()] = true
          initialEditableDescriptions[item.id.toString()] = detail.description || ''
          initialEditablePricesStandardSheet[item.id.toString()] = parseInt(detail.price_standard_sheet_adjustment)
          initialEditablePricesIncludeSheetSize[item.id.toString()] = parseInt(
            detail.price_include_sheet_size_adjustment
          )
          initialEditablePricesStandardRoll[item.id.toString()] = parseInt(detail.price_standard_roll_adjustment)
          initialEditablePricesIncludeRollSize[item.id.toString()] = parseInt(detail.price_include_roll_size_adjustment)
        } else {
          initialEditableDescriptions[item.id.toString()] = ''
          initialEditablePricesStandardSheet[item.id.toString()] = item.price_standard_sheet
          initialEditablePricesIncludeSheetSize[item.id.toString()] = item.price_include_sheet_size
          initialEditablePricesStandardRoll[item.id.toString()] = item.price_standard_roll
          initialEditablePricesIncludeRollSize[item.id.toString()] = item.price_include_roll_size
        }
      })
      setSelectedRows((prevRows) => {
        const updatedRows = { ...prevRows }
        Object.keys(initialSelectedRows).forEach((key) => {
          if (initialSelectedRows[key]) {
            updatedRows[key] = true
          }
        })
        return updatedRows
      })

      setFilteredSelectedRows(initialSelectedRows)
      setEditableDescriptions(initialEditableDescriptions)
      setEditablePricesStandardSheet(initialEditablePricesStandardSheet)
      setEditablePricesIncludeSheetSize(initialEditablePricesIncludeSheetSize)
      setEditablePricesStandardRoll(initialEditablePricesStandardRoll)
      setEditablePricesIncludeRollSize(initialEditablePricesIncludeRollSize)
    }

    if (Object.keys(databack).length > 0) {
      updateData(data, databack.product_managements)
    } else if (dataDetail && dataDetail.product_management_quotation_history) {
      updateData(data, dataDetail.product_management_quotation_history)
    }
  }, [dataDetail, databack, open])

  useEffect(() => {
    const filteredData = Object.values(editedData).filter((item) => selectedRows[item?.product_management_id])
    onTableDataChange(filteredData)
  }, [onTableDataChange, editedData])

  const handleCheckboxChange = (ID) => {
    const stringID = ID.toString()

    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [stringID]: !prevSelectedRows[stringID]
    }))

    const item = data.find((item) => item.id === parseInt(stringID))
    const priceStandardSheetChanged =
      editablePricesStandardSheet[stringID] !== undefined &&
      editablePricesStandardSheet[stringID] !== item.price_standard_sheet
    const priceIncludeSheetSizeChanged =
      editablePricesIncludeSheetSize[stringID] !== undefined &&
      editablePricesIncludeSheetSize[stringID] !== item.price_include_sheet_size
    const priceStandardRollChanged =
      editablePricesStandardRoll[stringID] !== undefined &&
      editablePricesStandardRoll[stringID] !== item.price_standard_roll
    const priceIncludeRollSizeChanged =
      editablePricesIncludeRollSize[stringID] !== undefined &&
      editablePricesIncludeRollSize[stringID] !== item.price_include_roll_size
    const descriptionChanged =
      editableDescriptions[stringID] !== undefined && editableDescriptions[stringID] !== item.description

    if (
      !priceStandardSheetChanged &&
      !priceIncludeSheetSizeChanged &&
      !priceStandardRollChanged &&
      !priceIncludeRollSizeChanged &&
      !descriptionChanged
    ) {
      setEditedData((prevEditedData) => {
        const updatedEditedData = [...prevEditedData]
        updatedEditedData[stringID] = {
          ...prevEditedData[stringID],
          product_management_id: parseInt(stringID),
          price_standard_sheet_adjustment: data.find((item) => item.id === parseInt(stringID)).price_standard_sheet,
          price_include_sheet_size_adjustment: data.find((item) => item.id === parseInt(stringID))
            .price_include_sheet_size,
          price_standard_roll_adjustment: data.find((item) => item.id === parseInt(stringID)).price_standard_roll,
          price_include_roll_size_adjustment: data.find((item) => item.id === parseInt(stringID))
            .price_include_roll_size,
          description: '',
          product_group: data.find((item) => item.id === parseInt(stringID)).product_group,
          code: data.find((item) => item.id === parseInt(stringID)).code,
          product_name: data.find((item) => item.id === parseInt(stringID)).product_name,
          length: data.find((item) => item.id === parseInt(stringID)).length,
          width: data.find((item) => item.id === parseInt(stringID)).width
        }
        return updatedEditedData
      })
    } else {
      setEditedData((prevEditedData) => {
        const updatedEditedData = [...prevEditedData]
        updatedEditedData[stringID] = {
          ...prevEditedData[stringID],
          product_management_id: parseInt(stringID),
          price_standard_sheet_adjustment: priceStandardSheetChanged
            ? editablePricesStandardSheet[stringID]
            : data.find((item) => item.id === parseInt(stringID)).price_standard_sheet,
          price_include_sheet_size_adjustment: priceIncludeSheetSizeChanged
            ? editablePricesIncludeSheetSize[stringID]
            : data.find((item) => item.id === parseInt(stringID)).price_include_sheet_size,
          price_standard_roll_adjustment: priceStandardRollChanged
            ? editablePricesStandardRoll[stringID]
            : data.find((item) => item.id === parseInt(stringID)).price_standard_roll,
          price_include_roll_size_adjustment: priceIncludeRollSizeChanged
            ? editablePricesIncludeRollSize[stringID]
            : data.find((item) => item.id === parseInt(stringID)).price_include_roll_size,
          description: descriptionChanged
            ? editableDescriptions[stringID]
            : data.find((item) => item.id === parseInt(stringID)).description,
          code: data.find((item) => item.id === parseInt(stringID)).code,
          product_name: data.find((item) => item.id === parseInt(stringID)).product_name,
          product_group: data.find((item) => item.id === parseInt(stringID)).product_group,
          length: data.find((item) => item.id === parseInt(stringID)).length,
          width: data.find((item) => item.id === parseInt(stringID)).width
        }
        return updatedEditedData
      })
    }
    setFilteredSelectedRows((prevFilteredSelectedRows) => ({
      ...prevFilteredSelectedRows,
      [stringID]: !prevFilteredSelectedRows[stringID]
    }))
  }

  const handleDescriptionChange = (event, productId) => {
    const { value } = event.target
    setEditableDescriptions((prevEditableDescriptions) => {
      const updatedEditableDescriptions = { ...prevEditableDescriptions }
      updatedEditableDescriptions[productId] = value
      return updatedEditableDescriptions
    })
    const keys = Object.keys(editedData)
    const index = keys.find((key) => editedData[key]?.product_management_id === productId)
    setEditedData((prevEditedData) => {
      const updatedEditedData = [...prevEditedData]
      updatedEditedData[index] = {
        ...updatedEditedData[index],
        description: value
      }
      return updatedEditedData
    })
  }

  const handlePriceStandardSheetChange = (event, productId) => {
    let { value } = event.target
    value = filterDigits(value)
    if (isDigitOrEmpty(value)) {
      setEditablePricesStandardSheet((prevEditablePrices) => {
        const updatedEditablePrices = { ...prevEditablePrices }
        updatedEditablePrices[productId] = value
        return updatedEditablePrices
      })

      if (Array.isArray(editedData)) {
        const index = editedData.findIndex((item) => item?.product_management_id === productId)
        if (index !== -1 && value !== editedData[index]?.price_standard_sheet_adjustment) {
          setEditedData((prevEditedData) => {
            const updatedEditedData = [...prevEditedData]
            updatedEditedData[index] = {
              ...updatedEditedData[index],
              price_standard_sheet_adjustment: value
            }
            return updatedEditedData
          })
        }
      } else if (typeof editedData === 'object' && editedData !== null) {
        const keys = Object.keys(editedData)
        const index = keys.find((key) => editedData[key]?.product_management_id === productId)
        if (index && value !== editedData[index]?.price_standard_sheet_adjustment) {
          setEditedData((prevEditedData) => {
            const updatedEditedData = { ...prevEditedData }
            updatedEditedData[index] = {
              ...updatedEditedData[index],
              price_standard_sheet_adjustment: value
            }
            return updatedEditedData
          })
        }
      }
    }
  }

  const handlePriceIncludeSheetSizeChange = (event, productId) => {
    let { value } = event.target
    value = filterDigits(value)
    if (isDigitOrEmpty(value)) {
      setEditablePricesIncludeSheetSize((prevEditablePrices) => {
        const updatedEditablePrices = { ...prevEditablePrices }
        updatedEditablePrices[productId] = value
        return updatedEditablePrices
      })
      const keys = Object.keys(editedData)
      const index = keys.find((key) => editedData[key]?.product_management_id === productId)
      if (value !== editedData[index]?.price_include_sheet_size_adjustment) {
        setEditedData((prevEditedData) => {
          const updatedEditedData = [...prevEditedData]
          updatedEditedData[index] = {
            ...updatedEditedData[index],
            price_include_sheet_size_adjustment: value
          }
          return updatedEditedData
        })
      }
    }
  }
  const handlePriceStandardRollChange = (event, productId) => {
    let { value } = event.target
    value = filterDigits(value)
    if (isDigitOrEmpty(value)) {
      setEditablePricesStandardRoll((prevEditablePrices) => {
        const updatedEditablePrices = { ...prevEditablePrices }
        updatedEditablePrices[productId] = value
        return updatedEditablePrices
      })
      const keys = Object.keys(editedData)
      const index = keys.find((key) => editedData[key]?.product_management_id === productId)
      if (value !== editedData[index]?.price_standard_roll_adjustment) {
        setEditedData((prevEditedData) => {
          const updatedEditedData = [...prevEditedData]
          updatedEditedData[index] = {
            ...updatedEditedData[index],
            price_standard_roll_adjustment: value
          }
          return updatedEditedData
        })
      }
    }
  }
  const handlePriceIncludeRollSizeChange = (event, productId) => {
    let { value } = event.target
    value = filterDigits(value)
    if (isDigitOrEmpty(value)) {
      setEditablePricesIncludeRollSize((prevEditablePrices) => {
        const updatedEditablePrices = { ...prevEditablePrices }
        updatedEditablePrices[productId] = value
        return updatedEditablePrices
      })
      const keys = Object.keys(editedData)
      const index = keys.find((key) => editedData[key]?.product_management_id === productId)
      if (value !== editedData[index]?.price_include_roll_size_adjustment) {
        setEditedData((prevEditedData) => {
          const updatedEditedData = [...prevEditedData]
          updatedEditedData[index] = {
            ...updatedEditedData[index],
            price_include_roll_size_adjustment: value
          }
          return updatedEditedData
        })
      }
    }
  }

  const handleFixPrice = (index) => {
    setEditEnabled((prevEditEnabled) => ({
      ...prevEditEnabled,
      [index]: true
    }))
  }

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: '410px', overflowY: 'auto', borderRadius: '8px', border: '1px solid #DDE1E5' }}
    >
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {titleTable.map((item, index) => (
              <StyledTableCell key={index}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <div>{t(item.label)}</div>
                </div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow colSpan>
              <TableCell colSpan={8}>
                <Typography
                  variant="body1"
                  color="error"
                  align="center"
                  style={{ fontSize: '14px', textAlign: 'center' }}
                >
                  {t('noSuitableResultsFound')}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <StyledTableRow>
                <StyledTableCell> {(index + 1).toString().padStart(2, '0')}</StyledTableCell>
                <StyledTableCell>{item.code}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'left !important' }}>{item.product_name}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'left !important' }}>
                  <TextField
                    size="small"
                    placeholder={t('import')}
                    value={editableDescriptions[item.id] || ''}
                    onChange={(event) => handleDescriptionChange(event, item.id)}
                    disabled={!selectedRows[item.id]}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    sx={{ width: '110px' }}
                    size="small"
                    value={
                      editablePricesStandardSheet[item.id] !== undefined
                        ? formatCurrencyWithoutSymbol(editablePricesStandardSheet[item.id])
                        : formatCurrencyWithoutSymbol(item.price_standard_sheet)
                    }
                    onFocus={() => {
                      if (errorMessagePrice.product_managements?.[item.id]?.price_standard_sheet_adjustment) {
                        handleFocus(item.id, 'price_standard_sheet_adjustment')
                      }
                    }}
                    onChange={(event) => handlePriceStandardSheetChange(event, item.id)}
                    disabled={!editEnabled[item.id] || !selectedRows[item.id]}
                    error={!!errorMessagePrice.product_managements?.[item.id]?.price_standard_sheet_adjustment}
                    helperText={errorMessagePrice.product_managements?.[item.id]?.price_standard_sheet_adjustment || ''}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    sx={{ width: '110px' }}
                    size="small"
                    value={
                      editablePricesIncludeSheetSize[item.id] !== undefined
                        ? formatCurrencyWithoutSymbol(editablePricesIncludeSheetSize[item.id])
                        : formatCurrencyWithoutSymbol(item.price_include_sheet_size)
                    }
                    onFocus={() => {
                      if (errorMessagePrice.product_managements?.[item.id]?.price_include_sheet_size_adjustment) {
                        handleFocus(item.id, 'price_include_sheet_size_adjustment')
                      }
                    }}
                    onChange={(event) => handlePriceIncludeSheetSizeChange(event, item.id)}
                    disabled={!editEnabled[item.id] || !selectedRows[item.id]}
                    error={!!errorMessagePrice.product_managements?.[item.id]?.price_include_sheet_size_adjustment}
                    helperText={errorMessagePrice.product_managements?.[item.id]?.price_include_sheet_size_adjustment || ''}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    sx={{ width: '110px' }}
                    size="small"
                    value={
                      editablePricesStandardRoll[item.id] !== undefined
                        ? formatCurrencyWithoutSymbol(editablePricesStandardRoll[item.id])
                        : formatCurrencyWithoutSymbol(item.price_standard_roll)
                    }
                    onFocus={() => {
                      if (errorMessagePrice.product_managements?.[item.id]?.price_standard_roll_adjustment) {
                        handleFocus(item.id, 'price_standard_roll_adjustment')
                      }
                    }}
                    onChange={(event) => handlePriceStandardRollChange(event, item.id)}
                    disabled={!editEnabled[item.id] || !selectedRows[item.id]}
                    error={!!errorMessagePrice.product_managements?.[item.id]?.price_standard_roll_adjustment}
                    helperText={errorMessagePrice.product_managements?.[item.id]?.price_standard_roll_adjustment || ''}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    sx={{ width: '110px' }}
                    size="small"
                    value={
                      editablePricesIncludeRollSize[item.id] !== undefined
                        ? formatCurrencyWithoutSymbol(editablePricesIncludeRollSize[item.id])
                        : formatCurrencyWithoutSymbol(item.price_include_roll_size)
                    }
                    onFocus={() => {
                      if (errorMessagePrice.product_managements?.[item.id]?.price_include_roll_size_adjustment) {
                        handleFocus(item.id, 'price_include_roll_size_adjustment')
                      }
                    }}
                    onChange={(event) => handlePriceIncludeRollSizeChange(event, item.id)}
                    disabled={!editEnabled[item.id] || !selectedRows[item.id]}
                    error={!!errorMessagePrice.product_managements?.[item.id]?.price_include_roll_size_adjustment}
                    helperText={errorMessagePrice.product_managements?.[item.id]?.price_include_roll_size_adjustment || ''}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Tooltip
                    title={
                      item.price_standard_sheet <= 0 &&
                      item.price_include_sheet_size <= 0 &&
                      item.price_standard_roll <= 0 &&
                      item.price_include_roll_size <= 0
                        ? t('thisProductHasNotBeenConfiguredForPricingYet')
                        : ''
                    }
                  >
                    <span>
                      <StyledCheckbox
                        checked={filteredSelectedRows[item.id] !== undefined ? filteredSelectedRows[item.id] : false}
                        onChange={() => handleCheckboxChange(item.id)}
                        disabled={
                          item.price_standard_sheet <= 0 &&
                          item.price_include_sheet_size <= 0 &&
                          item.price_standard_roll <= 0 &&
                          item.price_include_roll_size <= 0
                        }
                        className={
                          item.price_standard_sheet <= 0 &&
                          item.price_include_sheet_size <= 0 &&
                          item.price_standard_roll <= 0 &&
                          item.price_include_roll_size <= 0
                            ? 'disabled-cursor'
                            : ''
                        }
                      />
                    </span>
                  </Tooltip>
                  {selectedRows[item.id] && (
                    <Button className="buttontableStyle" onClick={() => handleFixPrice(item.id)}>
                      {t('fixPrice')}
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QuotationTable
