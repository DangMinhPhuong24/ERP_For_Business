// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TextField,
  Checkbox,
  InputLabel
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import colors from '../../../../constants/colors'
import { useTranslation } from 'react-i18next'
import { filterDigits, formatCurrencyWithoutSymbol, isDigitOrEmpty } from '../../../../common/common'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import './style.css'

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
    height: '48px'
  },
  '&:nth-last-child(-n+5)': {
    fontWeight: '700'
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: colors.lilywhiteColor,
    fontSize: 14,
    fontWeight: '400'
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

const QuotationTableMobile = ({ open, titleTable, data, onTableDataChange, dataDetail, databack, onchange }) => {
  const { t } = useTranslation()
  const [selectedRows, setSelectedRows] = useState([])
  const [editablePrices, setEditablePrices] = useState({
    standardSheet: {},
    includeSheetSize: {},
    standardRoll: {},
    includeRollSize: {}
  })
  const [editableDescriptions, setEditableDescriptions] = useState({})
  const [editEnabled, setEditEnabled] = useState({})
  const [editedData, setEditedData] = useState([])
  const [filteredSelectedRows, setFilteredSelectedRows] = useState({})
  const [expandedRows, setExpandedRows] = useState({})

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
    const descriptionChanged =
      editableDescriptions[stringID] !== undefined && editableDescriptions[stringID] !== item.description

    const getDefaultAdjustedData = (key, originalValue) =>
      editablePrices[key][stringID] !== undefined ? editablePrices[key][stringID] : originalValue

    const updatedData = {
      product_management_id: parseInt(stringID),
      price_standard_sheet_adjustment: getDefaultAdjustedData('standardSheet', item.price_standard_sheet),
      price_include_sheet_size_adjustment: getDefaultAdjustedData('includeSheetSize', item.price_include_sheet_size),
      price_standard_roll_adjustment: getDefaultAdjustedData('standardRoll', item.price_standard_roll),
      price_include_roll_size_adjustment: getDefaultAdjustedData('includeRollSize', item.price_include_roll_size),
      description: descriptionChanged ? editableDescriptions[stringID] : item.description || '',
      code: item.code,
      product_name: item.product_name,
      product_group: item.product_group,
      length: item.length,
      width: item.width
    }

    setEditedData((prevEditedData) => {
      const updatedEditedData = [...prevEditedData]
      updatedEditedData[stringID] = updatedData
      return updatedEditedData
    })

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
      const updatedEditedData = { ...prevEditedData }
      updatedEditedData[index] = {
        ...updatedEditedData[index],
        description: value
      }
      return updatedEditedData
    })
  }

  const handlePriceChange = (event, productId, priceType, adjustmentKey) => {
    let { value } = event.target
    value = filterDigits(value)

    if (isDigitOrEmpty(value)) {
      setEditablePrices((prevEditablePrices) => {
        const updatedPrices = { ...prevEditablePrices }
        updatedPrices[priceType][productId] = value
        return updatedPrices
      })

      if (Array.isArray(editedData)) {
        const index = editedData.findIndex((item) => item?.product_management_id === productId)
        if (index !== -1 && value !== editedData[index]?.[adjustmentKey]) {
          setEditedData((prevEditedData) => {
            const updatedEditedData = [...prevEditedData]
            updatedEditedData[index] = {
              ...updatedEditedData[index],
              [adjustmentKey]: value
            }
            return updatedEditedData
          })
        }
      } else if (typeof editedData === 'object' && editedData !== null) {
        const keys = Object.keys(editedData)
        const index = keys.find((key) => editedData[key]?.product_management_id === productId)
        if (index && value !== editedData[index]?.[adjustmentKey]) {
          setEditedData((prevEditedData) => {
            const updatedEditedData = { ...prevEditedData }
            updatedEditedData[index] = {
              ...updatedEditedData[index],
              [adjustmentKey]: value
            }
            return updatedEditedData
          })
        }
      }
    }
  }

  const handlePriceStandardSheetChange = (event, productId) => {
    handlePriceChange(event, productId, 'standardSheet', 'price_standard_sheet_adjustment')
  }

  const handlePriceIncludeSheetSizeChange = (event, productId) => {
    handlePriceChange(event, productId, 'includeSheetSize', 'price_include_sheet_size_adjustment')
  }

  const handlePriceStandardRollChange = (event, productId) => {
    handlePriceChange(event, productId, 'standardRoll', 'price_standard_roll_adjustment')
  }

  const handlePriceIncludeRollSizeChange = (event, productId) => {
    handlePriceChange(event, productId, 'includeRollSize', 'price_include_roll_size_adjustment')
  }

  const handleFixPrice = (id) => {
    setEditEnabled((prevEditEnabled) => ({
      ...prevEditEnabled,
      [id]: true
    }))
    if (!expandedRows[id]) {
      handleExpandRow(id, true)
    }
  }

  const handleExpandRow = (id, forceExpand = false) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: forceExpand ? true : !prev[id]
    }))
  }

  return (
    <TableContainer component={Paper} className="quote-container-table">
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead className="quote-table-header">
          <TableRow className="quote-table-row-header">
            {titleTable.map((item, index) => (
              <StyledTableCell key={index} className="quote-table-cell-header">
                <div className="quote-table-cell-header-flex">
                  <div>{t(item.label)}</div>
                </div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow colSpan>
              <TableCell colSpan={3}>
                <Typography className="quote-text-no-result" variant="body1" color="error" align="center">
                  {t('noSuitableResultsFound')}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <React.Fragment key={item.id}>
                <StyledTableRow className="quote-row-parent">
                  <StyledTableCell
                    className={`quote-cell quote-cell-code quote-cell-item ${expandedRows[item.id] ? 'expanded' : ''}`}
                    sx={{ position: 'relative' }}
                    onClick={() => handleExpandRow(item.id)}
                  >
                    <Box className="quote-box-text">{item.code}</Box>
                    <Box className="quote-box-down">
                      {expandedRows[item.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    className={`quote-text-color quote-cell-name quote-cell-item ${expandedRows[item.id] ? 'expanded' : ''}`}
                  >
                    {item.product_name}
                  </StyledTableCell>
                  <StyledTableCell
                    className={`quote-cell-checkbox quote-text-color quote-cell-item ${expandedRows[item.id] ? 'expanded' : ''}`}
                  >
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
                {expandedRows[item.id] && (
                  <StyledTableRow className="quote-expand-row-parent">
                    <StyledTableCell className="quote-expand-cell-parent" colSpan={3}>
                      <Table>
                        <TableBody>
                          {[
                            {
                              label: 'standardSizeSheetPrice',
                              price: item.price_standard_sheet,
                              priceType: 'standardSheet',
                              onChange: handlePriceStandardSheetChange
                            },
                            {
                              label: 'standardSizeRollPrice',
                              price: item.price_standard_roll,
                              priceType: 'standardRoll',
                              onChange: handlePriceStandardRollChange
                            },
                            {
                              label: 'priceIncludesSheetSize',
                              price: item.price_include_sheet_size,
                              priceType: 'includeSheetSize',
                              onChange: handlePriceIncludeSheetSizeChange
                            },
                            {
                              label: 'priceIncludesRollSize',
                              price: item.price_include_roll_size,
                              priceType: 'includeRollSize',
                              onChange: handlePriceIncludeRollSizeChange
                            }
                          ].map((row, index) => (
                            <TableRow className="quote-expand-row-item" key={index}>
                              <TableCell className="quote-expand-cell-item quote-expand-cell-width">
                                <InputLabel className="quote-text-color quote-text-label">{t(row.label)}</InputLabel>
                              </TableCell>
                              <TableCell className="quote-expand-cell-item">
                                <div className="quote-expand-cell-flex">
                                  <TextField
                                    className={`quote-input ${editEnabled[item.id] && selectedRows[item.id] ? 'quote-input-edit-enabled' : 'quote-input-edit-disabled'}`}
                                    size="small"
                                    value={
                                      editablePrices[row.priceType][item.id] !== undefined
                                        ? formatCurrencyWithoutSymbol(editablePrices[row.priceType][item.id])
                                        : formatCurrencyWithoutSymbol(row.price)
                                    }
                                    onChange={(event) => row.onChange(event, item.id)}
                                    disabled={!editEnabled[item.id] || !selectedRows[item.id]}
                                  />
                                  <div className="quote-text-color quote-text-currency">VND</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="quote-expand-row-item">
                            <TableCell className="quote-expand-cell-item">
                              <InputLabel className="quote-text-color quote-text-label">{t('note')}</InputLabel>
                            </TableCell>
                            <TableCell className="quote-expand-cell-item">
                              <TextField
                                className={`quote-input quote-note ${editEnabled[item.id] && selectedRows[item.id] ? 'quote-input-edit-enabled' : 'quote-input-edit-disabled'}`}
                                size="small"
                                multiline
                                maxRows={5}
                                placeholder={t('import')}
                                value={editableDescriptions[item.id] || ''}
                                onChange={(event) => handleDescriptionChange(event, item.id)}
                                disabled={!editEnabled[item.id] || !selectedRows[item.id]}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default QuotationTableMobile
