// @ts-nocheck
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { HiOutlineTrash } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import colors from '../../../../constants/colors'
import DownloadIcon from '../../../../asset/icon/DownloadIcon.svg'
import { downloadFile } from '../../../../utils/download'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { formatCreatedAt } from '../../../../common/common'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.lightwhiteColor,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: '14px',
    letterSpacing: '0em',
    textAlign: 'center',
    padding: '3px',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    height: '48px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    padding: '3px',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    height: '56px'
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.overdue': {
    backgroundColor: colors.vividredColor
  },
  cursor: 'pointer'
}))

export default function RelatedDocumentTable(props) {
  const { titleTable, data, loading, allowDownload = false, handleDelete, allowDelete = false, progress } = props
  const { t } = useTranslation()
  const handleDownload = (filename) => async () => {
    await downloadFile(filename)
  }

  return (
    <TableContainer component={Paper} sx={{ border: '1px solid #DDE1E5' }}>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography sx={{ textAlign: 'center' }}>{`${progress}%`}</Typography>
        </Box>
      )}

      <Table sx={{ minWidth: 1500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {titleTable.map((item, index) => (
              <StyledTableCell key={index}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontWeight: 700 }}>
                  <div>{t(item.label)}</div>
                </div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <StyledTableRow hover key={index}>
                <StyledTableCell sx={{ color: colors.slategrayColor }}>
                  {(index + 1).toString().padStart(2, '0')}
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    maxWidth: '15rem',
                    textAlign: 'left !important'
                  }}
                >
                  <Tooltip
                    title={item.originalName}
                  >{`${item.originalName.substring(0, 100)}${item.originalName.length > 100 ? '...' : ''}`}</Tooltip>
                </StyledTableCell>
                <StyledTableCell sx={{ maxWidth: '5rem' }}>{item.size}</StyledTableCell>
                <StyledTableCell sx={{ maxWidth: '5rem' }}>{formatCreatedAt(item.createdAt)}</StyledTableCell>
                <StyledTableCell>
                  {allowDownload && (
                    <Button className="button-action" onClick={handleDownload(item.originalName)}>
                      <DownloadIcon style={{ fontSize: '24px', color: colors.amberColor, width: 24, height: 24 }} />
                    </Button>
                  )}
                  {allowDelete && (
                    <Button className="button-action" onClick={() => handleDelete(item.id)}>
                      <HiOutlineTrash style={{ color: colors.scarletredColor }} />
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={titleTable.length} align="center">
                <i>{t('noData')}</i>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
