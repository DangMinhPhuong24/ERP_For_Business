// @ts-nocheck
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { Clear } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import '../../../resource/style/ModalDeleteStyle.css'
import Typography from '@mui/material/Typography'
import { HiOutlineTrash } from 'react-icons/hi'
import colors from '../../../constants/colors'
import Tooltip from '@mui/material/Tooltip'
import { TbEdit } from 'react-icons/tb'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function ModalConfirmRedirect(props) {
  const {
    disable,
    successFlag,
    tooltipMessage = null,
    confirmAction,
    orderedProducts = []
  } = props
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [successFlag])

  const handleOpen = (disabled) => {
    if (disabled) {
      return
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const confirmRedirect = () => {
    if (confirmAction) {
      confirmAction();
    }
    setOpen(false);
  };

  const handle = (id) => {
    const url = `/purchase/detail-purchase-view?id=${id}`
    window.open(url, '_blank')
  }

  const handleRedirectDetailPurchaseOrder = (id) => {
    const url = `/purchase/detail-purchase-view?id=${id}`
    window.open(url, '_blank')
  }

  return (
    <>
      <Tooltip title={disable ? tooltipMessage : ''}>
        <Button
          className={`button-action ${disable ? 'disabled-cursor' : ''}`}
          onClick={() => handleOpen(disable)}
        >
          <TbEdit style={{ color: colors.lightroyalblueColor }} />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="style" sx={{ p: 2, width: 520 }}>
          <Typography component="h2" className="confirm-title">
            {t('doYouWantToContinue')}
          </Typography>
          <Typography component="p" className="message-delete">
            {t('thisProductHasBeenOrdered')}
            {orderedProducts.map((item, index) => (
              <>
                <Link style={{ cursor: 'pointer' }} onClick={(e) => {
                  e.preventDefault()
                  handleRedirectDetailPurchaseOrder(item.id)
                }}> {item.code}</Link>
                {index < orderedProducts.length - 1 && ', '}
              </>

            ))}
            <br />
            <br />
            {t('doYouWantAddOrder')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button onClick={handleClose} className="cancelButton">
              {t('cancel')}
            </Button>
            <Button className="confirmButton" onClick={confirmRedirect}>
              {t('resume')}
              <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
