import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { TextField, InputLabel } from '@mui/material'
import '../../../../../resource/style/common.css'
import colors from '../../../../../constants/colors'
import Autocomplete from '@mui/material/Autocomplete'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PolygonIcon from '../../../../../asset/icon/Polygon.svg'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '380px',
  maxHeight: '96%',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto'
}

export default function LocationModal({
  nameTitle,
  open,
  handleClose,
  dataWarehouse,
  handleSubmitAction,
  createSuccessFlag,
  dataLocation,
  updateSuccess,
  isEdit,
  errorWarehouseLocationMessage,
  isEditByLocationId,
  removeMessageError,
  locationId
}) {
  const { t } = useTranslation()
  const schema = yup.object().shape({
    locationName: yup.string().trim().required(t('pleaseEnterLocationName')).max(255, t('maxLength')),
    warehouse: yup.string().trim().required(t('pleaseSelectLocationType')),
    height: yup
      .number()
      .required(t('pleaseEnterHeight'))
      .typeError(t('onlyNumber'))
      .positive(t('enterNumberGreaterThanZero'))
      .max(999, t('enterANumberLessThanOrEqual999')),
    length: yup
      .number()
      .required(t('pleaseEnterLength'))
      .typeError(t('onlyNumber'))
      .positive(t('enterNumberGreaterThanZero'))
      .max(999, t('enterANumberLessThanOrEqual999')),
    weight: yup
      .number()
      .required(t('pleaseEnterWidth'))
      .typeError(t('onlyNumber'))
      .positive(t('enterNumberGreaterThanZero'))
      .max(999, t('enterANumberLessThanOrEqual999')),
    limitInventorySquareMeters: yup
      .number()
      .nullable()
      .required(t('pleaseEnterSquareMeters'))
      .typeError(t('onlyNumber'))
      .positive(t('enterNumberGreaterThanZero'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .max(999999999, t('enterANumberLessThanOrEqual999999999')),
    note: yup.string().trim().max(255, t('maxLength'))
  })

  const {
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      locationName: '',
      warehouse: '',
      height: null,
      length: null,
      weight: null,
      limitInventorySquareMeters: null,
      note: ''
    }
  })

  useEffect(() => {
    if (errorWarehouseLocationMessage) {
      if (errorWarehouseLocationMessage.warehouse_location_name) {
        setError('locationName', {
          type: 'manual',
          message: errorWarehouseLocationMessage.warehouse_location_name[0]
        })
      }
      if (errorWarehouseLocationMessage.limit_inventory_length) {
        setError('limitInventoryLength', {
          type: 'manual',
          message: errorWarehouseLocationMessage.limit_inventory_length[0]
        })
      }
    }
  }, [errorWarehouseLocationMessage, setError])

  useEffect(() => {
    if (createSuccessFlag || updateSuccess) {
      handleCloseModal()
    }
  }, [createSuccessFlag, updateSuccess])

  useEffect(() => {
    if (!isEdit && !isEditByLocationId) {
      reset()
    } else {
      reset({
        locationName: dataLocation?.warehouse_location_name || '',
        warehouse: dataLocation?.warehouse_location_type?.id || '',
        height: dataLocation?.height || '',
        length: dataLocation?.length || '',
        weight: dataLocation?.width || '',
        limitInventorySquareMeters: dataLocation?.limit_inventory_square_meter || '',
        note: dataLocation?.description || ''
      })
    }
  }, [dataLocation, isEdit, isEditByLocationId, reset])

  const onSubmit = (data) => {
    const formData = {
      warehouse_id: locationId,
      id: dataLocation?.id,
      warehouse_location_name: data.locationName,
      warehouse_location_type_id: data.warehouse,
      height: data.height,
      length: data.length,
      width: data.weight,
      limit_inventory_square_meter: data.limitInventorySquareMeters,
      description: data.note
    }
    handleSubmitAction(formData)
  }

  const handleCloseModal = () => {
    handleClose()
    removeMessageError()
    reset()
    setError()
  }
  return (
    <div>
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
        <Fade in={open}>
          <Box sx={{ ...style }} className="order-container">
            <Box p={2}>
              <Typography className="modalTitle">{nameTitle}</Typography>
              <Box>
                <InputLabel required className="requiredTextField inputLabel-modal">
                  {t('locationName')}
                </InputLabel>
                <Controller
                  name="locationName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      fullWidth
                      placeholder={t('enterLocationName')}
                      error={!!errors.locationName}
                      helperText={errors.locationName ? errors.locationName.message : ''}
                      disabled={isEditByLocationId}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  )}
                />
                <InputLabel required className="requiredTextField inputLabel-modal">
                  {t('locationType')}
                </InputLabel>
                <Controller
                  name="warehouse"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      fullWidth
                      popupIcon={<PolygonIcon />}
                      sx={{ borderRadius: '8px' }}
                      options={dataWarehouse}
                      getOptionLabel={(option) => option.warehouse_location_type_name}
                      value={dataWarehouse.find((option) => option.id === field.value) || null}
                      onChange={(event, value) => field.onChange(value ? value.id : '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('selectLocationType')}
                          size="small"
                          error={!!errors.warehouse}
                          helperText={errors.warehouse ? errors.warehouse.message : ''}
                        />
                      )}
                      ListboxProps={{ sx: { fontSize: '12px' } }}
                    />
                  )}
                />
                <InputLabel required className="requiredTextField inputLabel-modal">
                  {t('positionSize')}
                </InputLabel>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <Controller
                    name="height"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        value={field.value}
                        sx={{ width: '80%' }}
                        error={!!errors.height}
                        helperText={errors.height ? errors.height.message : ''}
                        placeholder={t('theHeight')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                      />
                    )}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 400, color: colors.grayColor }}>M (mét)</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                  <Controller
                    name="length"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        value={field.value}
                        sx={{ width: '80%' }}
                        error={!!errors.length}
                        helperText={errors.length ? errors.length.message : ''}
                        placeholder={t('theLength')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                      />
                    )}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 400, color: colors.grayColor }}>M (mét)</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                  <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        value={field.value}
                        sx={{ width: '80%' }}
                        error={!!errors.weight}
                        helperText={errors.weight ? errors.weight.message : ''}
                        placeholder={t('theWidth')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                      />
                    )}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 400, color: colors.grayColor }}>M (mét)</Typography>
                  </Box>
                </Box>
                <InputLabel required className="requiredTextField inputLabel-modal">{t('storageLimitWeight')}</InputLabel>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <Controller
                    name="limitInventorySquareMeters"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        value={field.value}
                        sx={{ width: '80%' }}
                        error={!!errors.limitInventorySquareMeters}
                        helperText={errors.limitInventorySquareMeters ? errors.limitInventorySquareMeters.message : ''}
                        placeholder={t('enterNumberOfSquareMeters')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                      />
                    )}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 400, color: colors.grayColor }}>{t('squareMeters')}</Typography>
                  </Box>
                </Box>
                <InputLabel className="inputLabel-modal">{t('note')}</InputLabel>
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={2}
                      size="small"
                      fullWidth
                      error={!!errors.note}
                      helperText={errors.note ? errors.note.message : ''}
                      placeholder={t('enterNoteAboutTheLocation')}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box
              sx={{
                position: 'sticky',
                bottom: '0',
                display: 'flex',
                justifyContent: 'flex-end',
                p: '8px 16px',
                bgcolor: colors.paleblueColor,
                zIndex: 1
              }}
            >
              <Button onClick={handleCloseModal} className="cancelButton">
                {t('cancel')}
              </Button>
              <Button onClick={handleSubmit(onSubmit)} className="confirmButton">
                {!isEdit ? t('add') : t('confirm')}
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
