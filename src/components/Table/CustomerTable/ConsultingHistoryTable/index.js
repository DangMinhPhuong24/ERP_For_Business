import DateRangeIcon from '@mui/icons-material/DateRange'
import { IconButton, InputAdornment, TextField, InputLabel, Typography } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import colors from '../../../../constants/colors'
import ModalDelete from '../../../Modal/Common/delete'
import './style.css'

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
    textAlign: 'left',
    padding: '0 5px',
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

const ConsultingHistoryTable = (props) => {
  const {
    isEdit,
    titleTable,
    data,
    successFlag,
    handleDelete,
    handleUpdateConsultingHistory,
    listAllConsultationHistoryProblem,
    disabledRows,
    setDisabledRows,
    rowNewConsultingHistories
  } = props
  const { t } = useTranslation()

  const handleEdit = (index) => {
    const newDisabledRows = [...disabledRows]
    newDisabledRows[index] = false
    setDisabledRows(newDisabledRows)
  }

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
          {data.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{ textAlign: 'center !important' }}>
                {isEdit ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      className="consulting-date-picker"
                      disabled={disabledRows[index]}
                      placeholder={t('selectDate')}
                      value={dayjs(item.consultation_date)}
                      format="DD-MM-YYYY"
                      error={false}
                      onChange={(date) =>
                        handleUpdateConsultingHistory(index, 'consultation_date', date.format('YYYY-MM-DD'))
                      }
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: {
                            '& input': {
                              fontSize: '0.75rem !important',
                              fontWeight: 400
                            },
                            '& input::placeholder': {
                              fontSize: '0.625rem !important',
                              fontWeight: 400
                            }
                          },
                          InputProps: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton edge="end">
                                  <DateRangeIcon sx={{ color: colors.whiteColor }} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {item.consultation_date ? dayjs(item.consultation_date).format('DD-MM-YYYY') : t('noData')}
                  </InputLabel>
                )}
              </StyledTableCell>
              <StyledTableCell sx={{ width: '165px' }}>
                {isEdit ? (
                  <Autocomplete
                    disabled={disabledRows[index]}
                    popupIcon={<PolygonIcon />}
                    noOptionsText={t('noResult')}
                    onChange={(event, newValue) =>
                      handleUpdateConsultingHistory(
                        index,
                        'consultation_history_problem_id',
                        newValue ? newValue.id : null
                      )
                    }
                    options={listAllConsultationHistoryProblem}
                    getOptionLabel={(option) => option.consultation_history_problem_name}
                    value={
                      listAllConsultationHistoryProblem.find(
                        (product) => product.id === item.consultation_history_problem_id
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
                    {listAllConsultationHistoryProblem.find(
                      (history) => history.id === item.consultation_history_problem_id
                    )?.consultation_history_problem_name || t('noData')}
                  </Typography>
                )}
              </StyledTableCell>
              <StyledTableCell sx={{ width: '100px', textAlign: 'center !important' }}>
                {isEdit ? (
                  <TextField
                    fullWidth
                    value={item.information_provider}
                    onChange={(e) => handleUpdateConsultingHistory(index, 'information_provider', e.target.value)}
                    disabled={disabledRows[index]}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {item.information_provider || t('noData')}
                  </InputLabel>
                )}
              </StyledTableCell>
              <StyledTableCell sx={{ width: '180px' }}>
                {isEdit ? (
                  <TextField
                    fullWidth
                    value={item.description}
                    onChange={(e) => handleUpdateConsultingHistory(index, 'description', e.target.value)}
                    disabled={disabledRows[index]}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{item.description || t('noData')}</InputLabel>
                )}
              </StyledTableCell>
              <StyledTableCell sx={{ width: '80px', textAlign: 'center !important' }}>
                {isEdit ? (
                  <TextField
                    fullWidth
                    value={item.consultant}
                    onChange={(e) => handleUpdateConsultingHistory(index, 'consultant', e.target.value)}
                    disabled={disabledRows[index]}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{item.consultant || t('noData')}</InputLabel>
                )}
              </StyledTableCell>
              <StyledTableCell sx={{ width: '234px' }}>
                {isEdit ? (
                  <TextField
                    fullWidth
                    value={item.solution}
                    onChange={(e) => handleUpdateConsultingHistory(index, 'solution', e.target.value)}
                    disabled={disabledRows[index]}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{item.solution || t('noData')}</InputLabel>
                )}
              </StyledTableCell>
              <StyledTableCell sx={{ width: '160px' }}>
                {isEdit ? (
                  <TextField
                    fullWidth
                    value={item.result}
                    onChange={(e) => handleUpdateConsultingHistory(index, 'result', e.target.value)}
                    disabled={disabledRows[index]}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{item.result || t('noData')}</InputLabel>
                )}
              </StyledTableCell>
              {isEdit && (
                <StyledTableCell sx={{ width: '104px' }}>
                  {rowNewConsultingHistories ? (
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

export default ConsultingHistoryTable
