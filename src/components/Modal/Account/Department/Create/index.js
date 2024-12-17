// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { TextField, InputLabel } from '@mui/material'
import colors from '../../../../../constants/colors'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function DepartmentModal(props) {
  const { handleCreateDepartment, handleEditDepartment, open, onClose, currentData, departmentAll } = props
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '620px',
    maxWidth: '660px',
    maxHeight: '94vh',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    overflow: 'auto'
  }
  const { t } = useTranslation()

  const schema = yup.object().shape({
    departmentName: yup.string().trim().required(t('nameDepartmentRequired')).max(255, t('nameDepartmentMaxLength')),
    departmentDescription: yup.string().trim()
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      departmentName: currentData ? currentData.department_name : '',
      departmentDescription: currentData ? currentData.description : ''
    }
  })

  const onSubmit = (data) => {
    const mappedData = {
      department_name: data.departmentName,
      description: data.departmentDescription
    }

    if (currentData && currentData.id) {
      handleEditDepartment({ id: currentData.id, ...mappedData })
    } else {
      handleCreateDepartment(mappedData)
    }

    const departmentExists = departmentAll.some(
      (dept) =>
        dept.department_name.toLowerCase() === data.departmentName.toLowerCase() &&
        dept.id !== (currentData && currentData.id)
    )

    if (departmentExists) {
      setError('departmentName', { type: 'manual', message: t('departmentNameExists') })
      return
    }

    handleClose()
  }

  const handleClose = () => {
    onClose(true)
    reset()
  }

  useEffect(() => {
    if (currentData) {
      setValue('departmentName', currentData.department_name || '')
      setValue('departmentDescription', currentData.description || '')
    }
  }, [currentData, setValue])

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box sx={style}>
          <Typography component="p" className="claim-title">
            {currentData ? t('editDepartment') : t('addDepartment')}
          </Typography>
          <Box p={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 2 }}>
                <InputLabel required className="requiredTextField inputLabel-modal">
                  {t('nameDepartment')}
                </InputLabel>
                <Controller
                  name="departmentName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="input-style"
                      placeholder={t('enterNameDepartment')}
                      error={!!errors.departmentName}
                      helperText={errors.departmentName ? errors.departmentName.message : ''}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <InputLabel className="inputLabel-modal">{t('description')}</InputLabel>
                <Controller
                  name="departmentDescription"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      className="input-style"
                      placeholder={t('enterDescriptionDepartment')}
                      rows={2}
                      error={!!errors.departmentDescription}
                      helperText={errors.departmentDescription ? errors.departmentDescription.message : ''}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: '8px 16px',
                  bgcolor: colors.paleblueColor
                }}
              >
                <Button onClick={handleClose} className="cancelButton">
                  {t('cancel')}
                </Button>
                <Button type="submit" className="confirmButton">
                  {currentData ? t('save') : t('add')}
                  <ArrowForwardIcon />
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
