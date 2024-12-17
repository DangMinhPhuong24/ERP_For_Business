// @ts-nocheck
import Box from '@mui/material/Box'
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

export default function ModalDelete({
  disable,
  id,
  customerHandBookId = null,
  handleDelete,
  successFlag,
  tooltipMessage = null
}) {
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

  const confirmDelete = () => {
    if (customerHandBookId) {
      handleDelete(id, customerHandBookId)
    } else {
      handleDelete(id)
    }
  }

  return (
    <>
      <Tooltip title={disable ? tooltipMessage : ''}>
        <Button
          className={`button-action ${disable ? 'disabled-cursor' : ''}`}
          onClick={() => handleOpen(disable)}
        >
          <HiOutlineTrash style={{ color: colors.scarletredColor }} />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="style" sx={{ p: 2, width: 520 }}>
          <Box textAlign="center">
            <Clear className="styleIcon" />
          </Box>
          <Typography component="h2" className="title-name">
            {t('areyousure')}
          </Typography>
          <Typography component="p" className="message-delete">
            {t('confirmDeleteCustomerMessage')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="outlined" className="button-style" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button className="button-style delete-button" onClick={confirmDelete} variant="outlined">
              {t('delete')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
