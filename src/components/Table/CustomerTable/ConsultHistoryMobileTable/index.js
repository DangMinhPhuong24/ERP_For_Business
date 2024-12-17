// @ts-nocheck
import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Notification from '../../../Modal/Common/loadingNotification'
import { TbEdit, TbEye } from 'react-icons/tb'
import colors from '../../../../constants/colors'
import ModalDelete from 'components/Modal/Common/delete'
import { useNavigate, useLocation } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.lightwhiteColor,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: '14px',
    letterSpacing: '0em',
    textAlign: 'center',
    padding: '3px',
    whiteSpace: 'pre-wrap',
    height: '48px'
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: colors.lilywhiteColor,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    padding: '3px',
    whiteSpace: 'pre-wrap',
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
    backgroundColor: colors.vividredColor
  }
}))

export default function ConsultHistoryMobileTable(props) {
  const { titleTable, data, loading, handleDelete, successMessage, startIndex } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const customerId = new URLSearchParams(location.search).get('customer_id')

  const handleEditConsultantHistory = (id, customer_handbook_id) => {
    navigate(
      `/sale/information/consultant-history/edit?customer_id=${customerId}&customer_handbook_id=${customer_handbook_id}&consultation_history_id=${id}`
    )
  }

  const handleView = (id, customer_handbook_id, mode = 'view') => {
    navigate(
      `/sale/information/consultant-history/edit?customer_id=${customerId}&customer_handbook_id=${customer_handbook_id}&consultation_history_id=${id}&mode=${mode}`
    )
  }

  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #DDE1E5' }} className="table-container-consult">
      <Table aria-label="customized table" className="table-container-item">
        <TableHead>
          <TableRow>
            {titleTable.map((item, index) => (
              <StyledTableCell key={index}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <div>{t(item)}</div>
                </div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Notification loading={loading} data={data} titleTable={titleTable} />
          {data &&
            data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{item.consultation_date}</StyledTableCell>
                <StyledTableCell sx={{ color: colors.slategrayColor, maxWidth: '20rem', textAlign: 'left !important' }}>
                  {item.consultation_history_problem.consultation_history_problem_name}
                </StyledTableCell>
                <StyledTableCell>
                  <Button className="button-action" onClick={() => handleView(item.id, item.customer_handbook_id)}>
                    <TbEye style={{ color: colors.lightroyalblueColor }} />
                  </Button>
                  <Button
                    className="button-action"
                    onClick={() => handleEditConsultantHistory(item.id, item.customer_handbook_id)}
                  >
                    <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
                  </Button>
                  <ModalDelete
                    successFlag={successMessage}
                    id={item.id}
                    customerHandBookId={item.customer_handbook_id}
                    buttonName={t('delete')}
                    handleDelete={handleDelete}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
