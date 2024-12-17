import React, {useEffect, useState} from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { InputLabel } from '@mui/material'
import colors from '../../../../constants/colors'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from "@mui/material/Grid";
import InputFieldForm from "../../../InputFieldForm";
import AutocompleteForm from "../../../AutocompleteForm";
import {formatNumber, isNumeric, isValidPhoneNumber} from "../../../../common/common";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '32%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto'
}

export default function Supplier({
                                   nameTitle,
                                   open,
                                   handleClose,
                                   handleSubmitAction,
                                   successFlag,
                                   dataDetail,
                                   isEdit,
                                   errorMessage,
                                   removeMessageError,
                                   loadingAPICreate,
                                   getAllCurrencyUnit,
                                   getAllSuppliersType
                                 }) {
  const { t } = useTranslation()
  const schema = yup.object().shape({
    supplierName: yup.string().trim()
      .required(t('pleaseEnterSupplierName'))
      .max(255, t('maxLength'))
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    abbreviation: yup.string().trim()
      .required(t('pleaseEnterInitials'))
      .max(5, t('doNotEnterMoreThan5Characters'))
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    nameOfPersonInCharge: yup.string().trim()
      .required(t('pleaseEnterTheNameOfThePersonInCharge'))
      .max(255, t('maxLength')),
    taxCode: yup.string()
      .required(t('pleaseEnterTaxCode'))
      .test('is-numeric', t('onlyNumber'), value => isNumeric(value))
      .max(255, t('maxLength'))
      .test('positive', t('enterNumberGreaterThanZero'), value => parseInt(value, 10) > 0)
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    address: yup.string().trim()
      .required(t('pleaseEnterAddress'))
      .max(255, t('maxLength'))
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    supplierPhoneNumber: yup.string()
      .required(t('pleaseEnterSupplierPhoneNumber'))
      .typeError(t('onlyNumber'))
      .test('is-valid-phone', t('phoneNumberWrongTyper'), value => isValidPhoneNumber(value))
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    supplierEmail: yup.string().trim()
      .required(t('pleaseEnterSupplierEmail'))
      .email(t('pleaseEnterCorrectEmailFormat'))
      .max(255, t('maxLength'))
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    supplierType: yup.string().trim()
      .required(t('pleaseSelectSupplierType'))
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    currency: yup.string().trim()
      .required(t('pleaseSelectCurrency'))
      .transform((value, originalValue) => ( originalValue === '' ? undefined : value )),
    taxList: yup
      .array()
      .of(
        yup.object().shape({
          taxName: yup
            .string()
            .trim()
            .required(t('pleaseEnterNameOfTaxType')),
          proportion: yup
            .number()
            .max(100, t('requiredInputBetween0And100'))
            .required(t('pleaseEnterProportion'))
            .transform((value, originalValue) => {
              if (originalValue === '') return undefined
              return Number(originalValue.replace(',', '.'))
            })
            .test('is-number', t('pleaseEnterAValidNumber'), (value) => !isNaN(value))
        })
      )
  })

  const {
    handleSubmit,
    reset,
    control,
    setError,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      taxList: [{
        taxName: '',
        proportion: ''
      }]
    }
  })

  const {fields: taxList, append, remove} = useFieldArray({
    control,
    name: 'taxList'
  })
  const supplierType = watch('supplierType')
  const [reload, setReload] = useState(false)
  const [supplierTypeId, setSupplierTypeId] = useState(null)

  useEffect(() => {
    if (errorMessage) {
      if (errorMessage.abbreviation) {
        setError('abbreviation', {
          type: 'manual',
          message: errorMessage.abbreviation[0]
        })
      }
      if (errorMessage.tax_code) {
        setError('taxCode', {
          type: 'manual',
          message: errorMessage.tax_code[0]
        })
      }
      if (errorMessage.supplier_name) {
        setError('supplierName', {
          type: 'manual',
          message: errorMessage.supplier_name[0]
        })
      }
    }
  }, [ errorMessage, setError ])

  useEffect(() => {
    if (successFlag) {
      handleCloseModal()
    }
  }, [ successFlag ])

  useEffect(() => {
    if (!isEdit) {
      reset({
        supplierName: '',
        abbreviation: '',
        nameOfPersonInCharge: '',
        taxCode: '',
        address: '',
        supplierPhoneNumber: '',
        supplierEmail: '',
        supplierType: '',
        currency: '',
        taxList: [{
          taxName: '',
          proportion: ''
        }]
      });
    } else {
      reset({
        supplierName: dataDetail?.supplier_name || '',
        abbreviation: dataDetail?.abbreviation || '',
        nameOfPersonInCharge: dataDetail?.person_in_charge || '',
        taxCode: dataDetail?.tax_code || '',
        address: dataDetail?.address || '',
        supplierPhoneNumber: dataDetail?.phone_number || '',
        supplierEmail: dataDetail?.email || '',
        supplierType: dataDetail?.supplier_type?.id || '',
        currency: dataDetail?.currency_unit?.id || '',
        taxList: Array.isArray(dataDetail?.supplier_tax)
          ? dataDetail.supplier_tax.map((item) => ({
            id: item.id,
            taxName: item.tax_name || '',
            proportion: formatNumber(item.proportion) || ''
          }))
          : [],
      })
      setSupplierTypeId(dataDetail?.supplier_type?.id ?? null)
    }
  }, [ dataDetail, isEdit, reset ])

  useEffect(() => {
    if(supplierTypeId){
      if(reload){
        const initialTaxList = [{
          taxName: '',
          proportion: ''
        }]
        setValue("taxList", initialTaxList)
      }
    }
  }, [supplierTypeId]);

  const handleChangeSupplierType = (selectedSupplierType) =>{
    if(selectedSupplierType){
      setSupplierTypeId(selectedSupplierType.id)
      setReload(true)
    }else{
      setReload(false)
    }
  }

  const handleAddTax = () =>{
    append({
      taxName: '',
      proportion: ''
    })
  }

  const handleRemoveTax = (index) =>{
    remove(index)
  }

  const onSubmit = (data) => {
    const formData = {
      supplier_name: data.supplierName,
      abbreviation: data.abbreviation,
      person_in_charge: data.nameOfPersonInCharge,
      tax_code: data.taxCode,
      address: data.address,
      phone_number: data.supplierPhoneNumber,
      email: data.supplierEmail,
      supplier_type_id: data.supplierType,
      currency_unit_id: data.currency,
      supplier_tax: data.taxList
        .map((item) => ({
          id: item.id,
          tax_name: item.taxName,
          proportion: item.proportion,
      })),
    }
    if (dataDetail && dataDetail.id) {
      handleSubmitAction({ id: dataDetail.id, ...formData })
    } else {
      handleSubmitAction(formData)
    }
  }

  const handleCloseModal = () => {
    reset({
      supplierName: '',
      abbreviation: '',
      nameOfPersonInCharge: '',
      taxCode: '',
      address: '',
      supplierPhoneNumber: '',
      supplierEmail: '',
      supplierType: '',
      currency: '',
    });
    setError()
    handleClose()
    removeMessageError()
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ open }
        onClose={ handleCloseModal }
        closeAfterTransition
        BackdropComponent={ Backdrop }
        BackdropProps={ {
          timeout: 500
        } }
      >
        <Fade in={ open }>
          <Box sx={ { ...style } } className="order-container">
            <Box p={ 2 }>
              <Typography className="modalTitle">{ nameTitle }</Typography>
              <Grid spacing={ 1 }>
                <Grid item container xs={ 12 } spacing={ 2 }>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('supplierName') }
                    </InputLabel>
                    <InputFieldForm
                      name="supplierName"
                      control={ control }
                      errors={ errors }
                      placeholder="enterSupplierName"
                    />
                  </Grid>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('abbreviation') }
                    </InputLabel>
                    <InputFieldForm name="abbreviation" control={ control } errors={ errors }
                                    placeholder="enterInitials"/>
                  </Grid>
                </Grid>
                <Grid item container xs={ 12 } spacing={ 2 }>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('nameOfPersonInCharge') }
                    </InputLabel>
                    <InputFieldForm
                      name="nameOfPersonInCharge"
                      control={ control }
                      errors={ errors }
                      placeholder="enterTheNameOfThePersonInCharge"
                    />
                  </Grid>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('taxCode') }
                    </InputLabel>
                    <InputFieldForm name="taxCode" control={ control } errors={ errors } placeholder="enterTaxCode"/>
                  </Grid>
                </Grid>
                <Grid item container xs={ 12 } spacing={ 2 }>
                  <Grid item xs={ 12 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('address') }
                    </InputLabel>
                    <InputFieldForm
                      name="address"
                      control={ control }
                      errors={ errors }
                      placeholder="enterAddress"
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={ 12 } spacing={ 2 }>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('supplierPhoneNumber') }
                    </InputLabel>
                    <InputFieldForm
                      name="supplierPhoneNumber"
                      control={ control }
                      errors={ errors }
                      placeholder="enter"
                    />
                  </Grid>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('supplierEmail') }
                    </InputLabel>
                    <InputFieldForm name="supplierEmail" control={ control } errors={ errors } placeholder="enter"/>
                  </Grid>
                </Grid>
                <Grid item container xs={ 12 } spacing={ 2 }>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('supplierType') }
                    </InputLabel>
                    <AutocompleteForm
                      name="supplierType"
                      control={ control }
                      errors={ errors }
                      options={ getAllSuppliersType }
                      getOptionLabel={ (option) => option.supplier_type_name }
                      onChange={handleChangeSupplierType}
                      noOptionsText={ t('noResult') }
                      placeholder={ t('selectProviderType') }
                    />
                  </Grid>
                  <Grid item xs={ 6 }>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      { t('currency') }
                    </InputLabel>
                    <AutocompleteForm
                      name="currency"
                      control={ control }
                      errors={ errors }
                      options={ getAllCurrencyUnit }
                      getOptionLabel={ (option) => option.name }
                      noOptionsText={ t('noResult') }
                      placeholder={ t('selectCurrency') }
                      disabled={isEdit}
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <InputLabel required className="requiredTextField inputLabel-product">
                    { t('tax') }
                  </InputLabel>
                  {taxList.map((item, index) => (
                    <Grid
                      key={item.id}
                      item
                      container
                      xs={12}
                      spacing={2}
                      alignItems="center"
                      mb={1}
                    >
                      <Grid item xs={6}>
                        <InputFieldForm
                          name={`taxList[${index}].taxName`}
                          control={ control }
                          errors={errors?.taxList?.[index]?.taxName
                            ? { [`taxList[${index}].taxName`]: errors.taxList[index].taxName }
                            : {}}
                          placeholder={ t('nameOfTaxType') }
                        />
                      </Grid>
                      <Grid item xs={supplierType && supplierType !== 1 ? 5.2 : 6}>
                        <InputFieldForm
                          name={`taxList[${index}].proportion`}
                          control={ control }
                          errors={errors?.taxList?.[index]?.proportion
                            ? { [`taxList[${index}].proportion`]: errors.taxList[index].proportion }
                            : {}}
                          placeholder={ t('proportion') }
                          enableFormat={ true }
                        />
                      </Grid>
                      {supplierType && supplierType !== 1 && (
                        <Grid item xs={0.5} container>
                          {index === taxList.length - 1 && (
                            <AddCircleIcon
                              fontSize="medium"
                              onClick={() => handleAddTax()}
                              className="addIcon"
                            />
                          )}
                          {taxList.length > 1 && (
                            <RemoveCircleIcon
                              fontSize="medium"
                              onClick={() => handleRemoveTax(index)}
                              className="removeIcon"
                            />
                          )}
                        </Grid>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={ {
                position: 'sticky',
                bottom: '0',
                display: 'flex',
                justifyContent: 'flex-end',
                p: '8px 16px',
                bgcolor: colors.paleblueColor,
                zIndex: 1
              } }
            >
              <Button onClick={ handleCloseModal } className="cancelButton">
                { t('cancel') }
              </Button>
              <Button onClick={ handleSubmit(onSubmit) }
                      className={ `confirmButton ${ loadingAPICreate === false ? 'disabled-cursor' : '' }` }>
                { !isEdit ? t('add') : t('confirm') }
                <ArrowForwardIcon/>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
