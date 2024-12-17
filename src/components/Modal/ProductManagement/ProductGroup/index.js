import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { TextField, InputLabel } from '@mui/material'
import colors from '../../../../constants/colors'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '32%',
    maxHeight: '96%',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    overflow: 'auto'
}

export default function ProductGroupModal({
                                          nameTitle,
                                          open,
                                          handleClose,
                                          handleSubmitAction,
                                          successFlag,
                                          dataDetail,
                                          isEdit,
                                          errorMessage,
                                          removeMessageError,
                                          loadingAPICreate
                                      }) {
    const { t } = useTranslation()
    const schema = yup.object().shape({
        productGroupName: yup.string().trim().required(t('pleaseEnterProductGroupName')).max(255, t('maxLength')),
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
            productGroupName: '',
        }
    })

    useEffect(() => {
        if (errorMessage) {
            if (errorMessage.product_group_name) {
                setError('productGroupName', {
                    type: 'manual',
                    message: errorMessage.product_group_name[0]
                })
            }
        }
    }, [errorMessage, setError])

    useEffect(() => {
        if (successFlag) {
            handleCloseModal()
        }
    }, [successFlag])

    useEffect(() => {
        if (!isEdit ) {
            reset()
        } else {
            reset({
                productGroupName: dataDetail?.product_group_name || '',
            })
        }
    }, [dataDetail, isEdit, reset])

    const onSubmit = (data) => {
        const formData = {
            product_group_name: data.productGroupName,
            id: dataDetail?.id,
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
                                    {t('productGroupName')}
                                </InputLabel>
                                <Controller
                                    name="productGroupName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            size="small"
                                            fullWidth
                                            placeholder={t('enterProductGroupName')}
                                            error={!!errors.productGroupName}
                                            helperText={errors.productGroupName ? errors.productGroupName.message : ''}
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
                            <Button onClick={handleSubmit(onSubmit)} className={`confirmButton ${loadingAPICreate === false ? 'disabled-cursor' : ''}`}>
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
