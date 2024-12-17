// @ts-nocheck
import { Backdrop, Box, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import DetailWarehouseImportOrderTable from 'components/Table/DetailWarehouseImportOrder'
import { useTranslation } from 'react-i18next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '600px',
  height: '523px',
  maxHeight: '550px',
  borderRadius: '8px',
  overflow: 'auto'
}

export default function DetailWarehouseImportOrderModal({
  isExport = false,
  warehouseOrderName = null,
  open,
  dataDetail,
  handleCloseModal,
  dataPrintQR
}) {
  const { t } = useTranslation()

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box sx={style}>
          <Box p={2}>
            <Typography pb={2}>
              <span style={{ fontSize: '20px', fontWeight: '700' }}>
                {isExport ? t('warehouseExportOrderInformation') : t('warehouseImportOrderInformation')}:
              </span>
              <span style={{ fontSize: '20px' }}> {warehouseOrderName}</span>
            </Typography>
            <DetailWarehouseImportOrderTable isExport={isExport} dataTable={dataDetail} dataPrintQR={dataPrintQR} />
          </Box>
        </Box>
      </Modal>
    </>
  )
}
