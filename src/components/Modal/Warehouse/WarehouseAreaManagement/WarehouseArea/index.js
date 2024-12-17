// @ts-nocheck
import React, { useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { TextField, InputLabel, Autocomplete } from '@mui/material'
import colors from '../../../../../constants/colors'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import roles from '../../../../../constants/titleRole'

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

export default function WarehouseAreaModal(props) {
  const {
    isLoading,
    setLoading,
    isEdit,
    setIsEdit,
    open,
    onClose,
    handleCreateWarehouse,
    handleEditWarehouse,
    userRole,
    userBranch,
    listBranch = [],
    currentData,
    createWarehouseSuccessFlag,
    updateWarehouseSuccessFlag,
    errorCreateWarehouseMessage,
    errorUpdateWarehouseMessage,
    removeMessageError
  } = props
  const branches = Array.isArray(listBranch) ? listBranch : [listBranch]
  const isSuperAdmin = userRole === roles.SUPER_ADMIN
  const { t } = useTranslation()

  const schema = yup.object().shape({
    warehouseName: yup.string().trim().required(t('warehouseNameRequired')).max(255, t('warehouseNameMaxLength')),
    branchId: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .required(t('branchRequired')),
    description: yup.string().trim().max(255, t('warehouseDescriptionMaxLength'))
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
      warehouseName: '',
      branchId: !isSuperAdmin ? userBranch : '',
      description: ''
    }
  })

  const onSubmit = (data) => {
    const mappedData = {
      warehouse_name: data.warehouseName,
      branch_id: data.branchId,
      description: data.description
    }
    if (isEdit) {
      handleEditWarehouse({ id: currentData.id, ...mappedData })
    } else {
      handleCreateWarehouse(mappedData)
    }
  }

  useEffect(() => {
    if (createWarehouseSuccessFlag || updateWarehouseSuccessFlag) {
      handleClose()
    }
  }, [createWarehouseSuccessFlag, updateWarehouseSuccessFlag])

  useEffect(() => {
    const extracErrorMessage = (error) =>
      Array.isArray(error?.warehouseName) ? error.warehouse_name[0] : error?.warehouse_name

    if (errorCreateWarehouseMessage || errorUpdateWarehouseMessage) {
      setError('warehouseName', {
        type: 'manual',
        message: extracErrorMessage(errorCreateWarehouseMessage) || extracErrorMessage(errorUpdateWarehouseMessage)
      })
    }
  }, [errorCreateWarehouseMessage, errorUpdateWarehouseMessage])

  const handleClose = () => {
    onClose(true)
    reset()
    setIsEdit(false)
    removeMessageError()
    setError()
    setLoading(false)
  }

  useEffect(() => {
    if (isEdit) {
      setValue('warehouseName', currentData?.warehouse_name || '')
      setValue('branchId', currentData?.branch?.id)
      setValue('description', currentData.description || '')
    } else {
      setValue('warehouseName', '')
      setValue('branchId', !isSuperAdmin ? userBranch : '')
      setValue('description', '')
    }
  }, [isEdit, currentData, setValue])

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
            {isEdit ? t('editWarehouse') : t('addWarehouse')}
          </Typography>
          <Box p={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 2 }}>
                <InputLabel required className="requiredTextField inputLabel-modal">
                  {t('warehouseName')}
                </InputLabel>
                <Controller
                  name="warehouseName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="input-style"
                      placeholder={t('enterWarehouseName')}
                      error={!!errors.warehouseName}
                      helperText={errors.warehouseName ? errors.warehouseName.message : ''}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <InputLabel required className="requiredTextField inputLabel-modal">
                  {t('branch')}
                </InputLabel>
                <Controller
                  name="branchId"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={branches}
                      getOptionLabel={(option) => option.branch_name}
                      noOptionsText={t('noResult')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('select')}
                          error={!!errors.branchId}
                          helperText={errors.branchId ? errors.branchId.message : ''}
                          disabled={!isSuperAdmin}
                        />
                      )}
                      onChange={(_, value) => {
                        field.onChange(value ? Number(value.id) : '')
                      }}
                      value={
                        isSuperAdmin
                          ? branches.find((option) => option.id === field.value) || null
                          : branches.find((option) => option.id === userBranch) || null
                      }
                      ListboxProps={{ style: { maxHeight: '180px', fontSize: '12px' } }}
                      disabled={!isSuperAdmin}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <InputLabel className="inputLabel-modal">{t('note')}</InputLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      className="input-style"
                      placeholder={t('enterWarehouseNotes')}
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description ? errors.description.message : ''}
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
                <Button type="submit" className="confirmButton" disabled={isLoading}>
                  {isEdit ? t('save') : t('add')}
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
