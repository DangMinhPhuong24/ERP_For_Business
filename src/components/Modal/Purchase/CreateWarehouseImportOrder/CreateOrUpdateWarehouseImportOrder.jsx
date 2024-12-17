import { yupResolver } from '@hookform/resolvers/yup'
import { EastRounded } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from '@mui/material'
import AutocompleteForm from 'components/AutocompleteForm'
import DatePickerCalendar from 'components/DateTime/DatePickerCalendar'
import TimePickerComponent from 'components/DateTime/TimePicker'
import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { getListPurchaseOrderCodeOrdered } from '../../../../redux/purchase/purchase.action'
import { listPurchaseOrderCodeOrderedState } from '../../../../redux/purchase/purchase.selectors'
import ConfirmParkingList from './ConfirmParkingList'
import { useStyles } from './styles'
import moment from 'moment'
import { isEmpty } from 'lodash'
import dayjs from 'dayjs'

const CreateOrUpdateWarehouseImportOrder = (props) => {
  const { onClose, open, importOrder, purchaseOrderId, isCreatePurchaseOrderId } = props
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()

  const [isConfirmList, setIsConfirmList] = useState(false)
  const [dataSelects, setDataSelects] = useState([])

  const dataPurchaseOrderCodes = useSelector(listPurchaseOrderCodeOrderedState)

  useEffect(() => {
    dispatch(getListPurchaseOrderCodeOrdered())
  }, [])

  const validationSchema = yup.object().shape({
    purchaseOrderId: yup.string().required(t('pleaseSelectPurchaseForm')),
    warehouseLocation: yup.number().required(t('pleaseSelectWarehouseLocation')),
    time: yup
      .string()
      .required(t('timeRequired'))
      .typeError(t('pleaseFillTrueFormat'))
      .transform((curr, orig) => {
        return orig === '' ? null : curr
      })
      .test('is-future', t('pleaseSelectHourDayInTheFuture'), function (value) {
        const { date } = this.parent
        if (!isEmpty(importOrder)) {
          return true
        } else {
          if (date) {
            if (moment(new Date(date), 'yyyy-MM-dd').isAfter(new Date(), 'yyyy-MM-dd')) {
              return true
            } else {
              return moment(new Date(value), 'HH:mm').isAfter(new Date(), 'HH:mm')
            }
          } else return true
        }
      })
      .test('required-time', t('pleaseFillTrueFormat'), function (value) {
        if (moment(new Date(value), 'HH:mm').isValid()) return true
        else return false
      }),
    date: yup
      .string()
      .required(t('dateRequired'))
      .typeError(t('pleaseFillTrueFormat'))
      .transform((curr, orig) => {
        return orig === '' ? null : curr
      })
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all'
  })

  useEffect(() => {
    if (!isEmpty(importOrder)) {
      setValue('purchaseOrderId', importOrder.origin.id)
      setValue('warehouseLocation', 4)
      setValue('time', importOrder.import_time ? dayjs(importOrder.import_time, 'HH:mm') : '')
      setValue('date', importOrder.import_date ? dayjs(importOrder.import_date, 'DD/MM/YYYY') : '')
    }
  }, [importOrder, setValue])

  useEffect(() => {
    if(isCreatePurchaseOrderId && purchaseOrderId){
      setValue('purchaseOrderId', purchaseOrderId)
    }
  }, [ setValue, purchaseOrderId ]);

  const onSubmit = (data) => {
    const formatData = {
      ...data,
      time: format(data.time, 'HH:mm'),
      date: format(data.date, 'yyyy-MM-dd')
    }
    setDataSelects(formatData)
    setIsConfirmList(!isConfirmList)
  }

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <Dialog
      maxWidth={isConfirmList ? 'xl' : 'sm'}
      fullWidth
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: '16px'
        }
      }}
    >
      {!isConfirmList && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Typography variant="h5" className={classes.title} p={0}>
              {!isEmpty(importOrder) ? t('editWarehouseImportOrder') : t('createWarehouseImportOrder')}
            </Typography>
            <Box marginY={2}>
              <Grid
                container
                spacing={2}
                direction="row"
                sx={{
                  alignItems: 'center'
                }}
              >
                <Grid item xs={4}>
                  <Typography className={classes.textLabel}>
                    {t('purchaseForm')}
                    <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <AutocompleteForm
                    name="purchaseOrderId"
                    control={control}
                    options={!isEmpty(importOrder) ? [importOrder?.origin] : dataPurchaseOrderCodes}
                    disabled={!isEmpty(importOrder) || isCreatePurchaseOrderId ? true : false}
                    errors={errors}
                    getOptionLabel={(option) => option.code ?? option.origin_name}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.textLabel}>
                    {t('warehouseLocation')}
                    <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <AutocompleteForm
                    name="warehouseLocation"
                    control={control}
                    options={[{ id: 4, label: 'Cửa số 4' }]}
                    errors={errors}
                    getOptionLabel={(option) => option.label}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.textLabel}>
                    {t('timeOfWarehouse')}
                    <span className="required">*</span>
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Controller
                      name="time"
                      control={control}
                      render={({ field }) => (
                        <TimePickerComponent customStyle={{ maxWidth: 110 }} {...field} error={errors.time} />
                      )}
                    />

                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <DatePickerCalendar
                          {...field}
                          customStyle={{ maxWidth: 160 }}
                          classes={undefined}
                          minDate={undefined}
                          error={errors.date}
                          disablePast={isEmpty(importOrder) ? true : false}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions className={classes.wrapAction}>
            <Button className={classes.cancelBtn} autoFocus onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button className={`modalButtonClick`} endIcon={<EastRounded />} type="submit" autoFocus>
              {t(isConfirmList ? 'createWarehouseImportOrder' : 'continue')}
            </Button>
          </DialogActions>
        </form>
      )}
      {isConfirmList && (
        <ConfirmParkingList
          onClose={onClose}
          onBack={() => setIsConfirmList(!isConfirmList)}
          dataSelects={dataSelects}
          isEdit={!isEmpty(importOrder) ? true : false}
          importOrder={importOrder}
        />
      )}
    </Dialog>
  )
}
export default CreateOrUpdateWarehouseImportOrder
