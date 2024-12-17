// @ts-nocheck
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong } from 'react-icons/fa6'
import assets from '../../../../asset'
import colors from '../../../../constants/colors'
import titleCompanyInformationPreview from '../../../../constants/titleCompanyInformationPreview'
import ReportOrderTable from '../../../Table/OrderTable/reportOrderTable'
import { useUser } from "../../../../contexts/AuthContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '612px',
  height: 'auto',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto'
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    lineHeight: '16.41px',
    textAlign: 'left',
    letterSpacing: '0em',
    border: 'none',
    padding: '0',
    verticalAlign: 'top'
  }
}))

export default function PreviewOrder(props) {
  const {
    open,
    handleClose,
    nameTitle,
    previewData,
    errorsMessage,
    handleSubmitAction,
    orderDetail,
    isEdit
  } = props
  const { t } = useTranslation()
  const currentDate = new Date()
  const { userInfo } = useUser()
  const handleBackModal = () => {
    handleClose()
  }

  const handlesubmit = () => {
    if (isEdit) {
      handleSubmitAction({ id: orderDetail.id })
    } else {
      handleSubmitAction()
    }
  }

  const formattedDate = `${currentDate.getDate()} ${t('month')} ${currentDate.getMonth() + 1} ${t('year')} ${currentDate.getFullYear()}`
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box sx={style}>
          <Box p={2}>
            <Typography variant="h6" component="p" className="order-title">
              {nameTitle}
            </Typography>
            <Box>
              <Box className="table-container-value2">
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid item container alignItems="center" spacing={1}>
                        <Grid item>
                          <img
                            src={assets.images.logo}
                            style={{
                              width: '45px',
                              height: '45px'
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '700' }}>
                            {titleCompanyInformationPreview.COMPANY_NAME}
                          </Typography>
                          <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '400' }}>
                            {titleCompanyInformationPreview.COMPANY_ADDRESS}
                          </Typography>
                          <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '400' }}>
                            {titleCompanyInformationPreview.COMPANY_PHONE}
                          </Typography>
                        </Grid>
                        <Grid item sx={{ marginLeft: 'auto' }}>
                          <Grid container alignItems="flex-end" justifyContent="flex-end">
                            <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '400' }}>
                              {titleCompanyInformationPreview.ORDER_NUMBER}
                            </Typography>
                          </Grid>
                          <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '400' }}>
                            <br />
                          </Typography>
                          <Grid container alignItems="flex-end" justifyContent="flex-end">
                            <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '400' }}>
                              {titleCompanyInformationPreview.ANOTHER_NUMBER}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: '15px',
                      marginBottom: '15px'
                    }}
                  >
                    <Typography component="span" sx={{ fontSize: '20px', fontWeight: '700' }}>
                      {t('provisionalInvoice')}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '400' }}>
                      {t('day')} {formattedDate}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <TableContainer>
                      <Table sx={{ border: 'none' }}>
                        <TableBody>
                          <TableRow>
                            <StyledTableCell
                              component="th"
                              sx={{
                                whiteSpace: 'nowrap',
                                pr: '16px !important',
                                width: '140px'
                              }}
                            >
                              <Typography className="customerInfoItem">{t('customer')}:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography className="customerInfoItem">{previewData.customer}</Typography>
                            </StyledTableCell>
                          </TableRow>
                          <TableRow>
                            <StyledTableCell
                              component="th"
                              sx={{
                                whiteSpace: 'nowrap',
                                pr: '16px !important',
                                width: '140px'
                              }}
                            >
                              <Typography className="customerInfoItem">{t('branch')}:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography className="customerInfoItem">{previewData.branch}</Typography>
                            </StyledTableCell>
                          </TableRow>
                          <TableRow>
                            <StyledTableCell
                              component="th"
                              sx={{
                                whiteSpace: 'nowrap',
                                pr: '16px !important',
                                width: '140px'
                              }}
                            >
                              <Typography className="customerInfoItem">{t('deliveryAddress')}:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography className="customerInfoItem">{previewData.address}</Typography>
                            </StyledTableCell>
                          </TableRow>
                          <TableRow>
                            <StyledTableCell
                              component="th"
                              sx={{
                                whiteSpace: 'nowrap',
                                pr: '16px !important',
                                width: '140px'
                              }}
                            >
                              <Typography className="customerInfoItem">{t('payments')}:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography className="customerInfoItem">
                                  {previewData.payment !== '' ? previewData.payment : t('noData')}
                                </Typography>
                                <Typography sx={{ marginLeft: '150px' }} className="customerInfoItem">
                                  {t('deliveryTerm')}: {previewData.date}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                          </TableRow>
                          <TableRow>
                            <StyledTableCell
                              component="th"
                              sx={{
                                whiteSpace: 'nowrap',
                                pr: '16px !important',
                                width: '140px'
                              }}
                            >
                              <Typography className="customerInfoItem">{t('explain')}:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Typography className="customerInfoItem">
                                {previewData.description !== '' ? previewData.description : t('noData')}
                              </Typography>
                            </StyledTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <ReportOrderTable data={previewData} />
                  <Box sx={{ display: 'flex', width: '100%', marginTop: '30px' }}>
                    <Typography component="span" sx={{ fontSize: '12px', fontWeight: '400', flex: 1 }}>
                      {t('receiver')}
                    </Typography>
                    <Typography component="span" sx={{ fontSize: '12px', fontWeight: '400', flex: 1 }}>
                      {t('controller')}
                    </Typography>
                    <Typography component="span" sx={{ fontSize: '12px', fontWeight: '400', flex: 1 }}>
                      {t('deliver')}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Typography component="span" sx={{ fontSize: '12px', fontWeight: '400' }}>
                        {t('salesman')}
                      </Typography>
                      <Typography component="span" sx={{ fontSize: '12px', fontWeight: '400', fontStyle: 'italic' }}>
                        {userInfo.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="setPadding" sx={{ position: 'sticky', bottom: 0, zIndex: 1, bgcolor: colors.paleblueColor }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: '5px' }}>
              <Typography sx={{ marginRight: '15px' }} variant="body1" color="error">
                {errorsMessage}
              </Typography>
              <Box>
                <Button className="cancelButton" variant="outlined" onClick={handleBackModal}>
                  {t('back')}
                </Button>
              </Box>
              <Box sx={{ marginLeft: '20px' }}>
                <Button className="confirmButton" onClick={handlesubmit}>
                  {isEdit ? t('edit') : t('create')}
                  <FaArrowRightLong />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
