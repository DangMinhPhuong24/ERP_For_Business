// @ts-nocheck
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Notification from 'components/Modal/Common/loadingNotification'
import PaginationComponent from 'components/Paginate'
import colors from 'constants/colors'
import { useTranslation } from 'react-i18next'
import { useStyle } from './styles'
import { formatNumber } from 'common/common'
import Checkbox from "@mui/material/Checkbox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.platinumColor,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: '14px',
    letterSpacing: '0em',
    padding: '3px',
    whiteSpace: 'pre-wrap',
    height: '48px'
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#FFFFFF00',
    fontWeight: '400',
    fontSize: 14,
    padding: '3px',
    whiteSpace: 'pre-wrap',
    height: '56px'
  }
}))

const getCellHeaderStyle = ({ maxWidth, w, lineHeight, fontWeight = 700 }) => {
  const style = {
    maxWidth: maxWidth,
    width: w,
    fontWeight: fontWeight,
    lineHeight: lineHeight
  }

  return style
}

const getCellStyle = ({ maxWidth, w, fontWeight, color }) => {
  const style = {
    maxWidth: maxWidth,
    width: w,
    color: color
  }

  return style
}

// @ts-ignore
const BasicTable = (props) => {
  const {
    rows,
    headers,
    loading,
    handlePageChange,
    totalPages,
    currentPage,
    showIndex,
    maxHeight,
    navigateToDetail,
    minWidth = 700,
    isRowWithColspan,
    totalValue,
    isTaxAndTotalValue,
    showCheckbox,
    checkboxSelected,
    handleSelectOne,
    recordsPerPage = 10
  } = props

  const classes = useStyle()

  const { t } = useTranslation()

  return (
    <>
      <Box sx={{ overflowX: 'auto', maxHeight: maxHeight }}>
        <TableContainer component={Paper} sx={{ border: '1px solid #DDE1E5' }}>
          <Table sx={{ minWidth: minWidth }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {showCheckbox && (
                  <StyledTableCell align="center">
                  </StyledTableCell>
                )}
                {!!showIndex && (
                  <StyledTableCell align="center" style={{ fontWeight: 700 }} >
                    {t('STT')}
                  </StyledTableCell>
                )}
                {headers.map((header) => {
                  return (
                    <StyledTableCell align={'center'} style={getCellHeaderStyle(header)} key={header.key}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>{header.label}</div>
                      </div>
                    </StyledTableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <Notification loading={loading} />
              {loading ? (
                <TableRow>
                  <StyledTableCell colSpan={headers.length} align="center">
                    {t('loading')}
                  </StyledTableCell>
                </TableRow>
              ) : (
                <>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{ cursor: 'pointer' }}
                      className={row['overdue_amount']?.label > 0 ? classes.overdue : ''}
                    >
                      {showCheckbox && (
                        <StyledTableCell align={'center'}>
                          <Checkbox
                            sx={{ p: 0 }}
                            checked={checkboxSelected.includes(row.id.label)}
                            onChange={() => handleSelectOne(row)}
                          />
                        </StyledTableCell>
                      )}
                      {!!showIndex && (
                        <StyledTableCell
                            align={'center'}
                            onClick={() => {
                              if (navigateToDetail) {
                                if (handleSelectOne) {
                                  navigateToDetail(row);
                                } else {
                                  navigateToDetail(row['id']?.label);
                                }
                              }
                            }}
                        >
                          {((currentPage - 1) * recordsPerPage + index + 1).toString().padStart(2, '0')}
                        </StyledTableCell>
                      )}
                      {headers.map((header) => (
                        <StyledTableCell
                          align={header.align ?? 'center'}
                          style={getCellStyle(header)}
                          sx={{ color: row[header.key]?.color ? row[header.key]?.color : '' }}
                          key={header.key + '_row_' + index}
                          onClick={() => {
                            if (row[header.key]?.cellWithButton) {
                              if (handleSelectOne) {
                                navigateToDetail(row);
                              } else {
                                navigateToDetail(row['id']?.label);
                              }
                            }
                          }}
                        >
                          {row[header.key]?.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  ))}
                  {isRowWithColspan && (
                    <TableRow>
                      <StyledTableCell colSpan={headers.length + 1} align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Typography
                            sx={{
                              fontWeight: '700',
                              fontSize: '14px',
                              color: colors.darkmidnightblueColor
                            }}
                          >
                            {t('totalValue')}
                          </Typography>

                          <Typography
                            sx={{
                              fontWeight: '700',
                              fontSize: '14px',
                              color: colors.charcoalBlackColor
                            }}
                          >
                            {formatNumber(totalValue)}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                    </TableRow>
                  )}
                  {isTaxAndTotalValue && (
                    <>
                      <TableRow>
                        <StyledTableCell colSpan={headers.length + 1} align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography
                              sx={{
                                fontWeight: '700',
                                fontSize: '14px',
                                color: colors.darkmidnightblueColor
                              }}
                            >
                              {t('totalValueBeforeTax')}
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: '700',
                                fontSize: '14px',
                                color: colors.charcoalBlackColor
                              }}
                            >
                              {formatNumber(totalValue)}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell colSpan={headers.length + 1} align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography
                              sx={{
                                fontWeight: '700',
                                fontSize: '14px',
                                color: colors.darkmidnightblueColor
                              }}
                            >
                              {t('tax')}
                              {' '.repeat(4)}
                              <span style={{color:colors.greyColor}}>{isTaxAndTotalValue?.supplier_tax?.tax_name} ({formatNumber(isTaxAndTotalValue?.supplier_tax?.proportion)}{isTaxAndTotalValue?.supplier_tax?.tax_unit})</span>
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: '700',
                                fontSize: '14px',
                                color: colors.charcoalBlackColor
                              }}
                            >
                              {formatNumber(isTaxAndTotalValue.purchase_order_product_total_tax)}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <StyledTableCell colSpan={headers.length + 1} align="center">
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography
                              sx={{
                                fontWeight: '700',
                                fontSize: '14px',
                                color: colors.darkmidnightblueColor
                              }}
                            >
                              {t('totalValueAfterTax')}
                            </Typography>

                            <Typography
                              sx={{
                                fontWeight: '700',
                                fontSize: '14px',
                                color: colors.charcoalBlackColor
                              }}
                            >
                              {formatNumber(isTaxAndTotalValue.purchase_order_product_total_after_cal_tax)}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                    </>
                  )}

                  {rows.length === 0 && (
                    <TableRow>
                      <StyledTableCell colSpan={headers.length + 1} align="center">
                        <i>{t('noData')}</i>
                      </StyledTableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '10px' }}>
          <PaginationComponent totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />
        </Box>
      </Box>
    </>
  )
}

export default BasicTable
