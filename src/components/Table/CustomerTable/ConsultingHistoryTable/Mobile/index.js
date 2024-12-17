// @ts-nocheck
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useTranslation } from 'react-i18next'
import { TbEdit, TbEye } from 'react-icons/tb'
import colors from '../../../../../constants/colors'
import ModalDelete from '../../../../Modal/Common/delete'

import dayjs from 'dayjs'

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

const ConsultingHistoryMobileTable = (props) => {
  const {
    titleTable,
    data,
    successFlag,
    handleDelete,
    handleView,
    listAllConsultationHistoryProblem,
    handleEdit,
    isEdit
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
          {data.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell sx={{ textAlign: 'center !important' }}>
                {dayjs(item.consultation_date).format('DD/MM/YYYY')}
              </StyledTableCell>
              <StyledTableCell>
                {
                  listAllConsultationHistoryProblem.find(
                    (product) => product.id === item.consultation_history_problem_id
                  )?.consultation_history_problem_name
                }
              </StyledTableCell>
              <StyledTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button className="button-action" onClick={() => handleView(item)}>
                  <TbEye style={{ color: colors.lightroyalblueColor }} />
                </Button>
                {isEdit && (
                  <>
                    <Button className="button-action" onClick={() => handleEdit(item, index)}>
                      <TbEdit style={{ color: colors.amberColor }} />
                    </Button>
                    <ModalDelete successFlag={successFlag} id={index} handleDelete={() => handleDelete(index)} />
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

export default ConsultingHistoryMobileTable
