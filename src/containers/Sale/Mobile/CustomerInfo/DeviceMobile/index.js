// @ts-nocheck
import React from 'react'
import { Box, createFilterOptions, InputLabel, TextField } from '@mui/material'
import PolygonIcon from '../../../../../asset/icon/Polygon.svg'
import Autocomplete from '@mui/material/Autocomplete'
import { useTranslation } from 'react-i18next'

function DeviceMobilePage(props) {
  const {
    listAllDeviceMachineType,
    listAllDeviceMachineManufacturer,
    data,
    mode,
    handleUpdateDeviceMachineData,
    handleCreateDeviceMachineData,
    isEdit
  } = props
  const { t } = useTranslation()
  const filter = createFilterOptions()

  return (
    <Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('machineType')}</InputLabel>
        {mode ? (
          <Autocomplete
            popupIcon={<PolygonIcon />}
            noOptionsText={t('noResult')}
            options={listAllDeviceMachineType}
            onChange={(event, newValue) => {
              let newValueSelected = newValue ? newValue.id : null

              if (newValue && typeof newValue.id === 'string') {
                newValueSelected = newValue.id
                if (isEdit) {
                  handleUpdateDeviceMachineData(data.index, 'device_machine_type_id', '')
                  return handleUpdateDeviceMachineData(data.index, 'device_machine_type_name', newValueSelected ?? '')
                } else {
                  handleCreateDeviceMachineData('device_machine_type_id', '')
                  return handleCreateDeviceMachineData('device_machine_type_name', newValueSelected ?? '')
                }
              }

              if (isEdit) {
                handleUpdateDeviceMachineData(data.index, 'device_machine_type_name', '')
                return handleUpdateDeviceMachineData(data.index, 'device_machine_type_id', newValueSelected ?? null)
              } else {
                handleCreateDeviceMachineData('device_machine_type_name', '')
                return handleCreateDeviceMachineData('device_machine_type_id', newValueSelected ?? null)
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)
              const { inputValue } = params
              const isExisting = options.some((option) => inputValue === option?.device_machine_type_name)
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  id: inputValue,
                  device_machine_type_name: `${t('add')} "${inputValue}"`
                })
              }
              return filtered
            }}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option
              }
              if (option.inputValue) {
                return option.inputValue
              }
              return option?.device_machine_type_name ?? ''
            }}
            value={
              data?.item?.device_machine_type_name !== ''
                ? data?.item?.device_machine_type_name
                : (listAllDeviceMachineType.find((device) => device.id === data?.item?.device_machine_type_id) ?? null)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder={t('select')}
                InputProps={{
                  ...params.InputProps
                }}
              />
            )}
            ListboxProps={{ style: { maxHeight: '180px', fontSize: '12px' } }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">
            {data?.item?.device_machine_type_name
              ? data.item.device_machine_type_name
              : listAllDeviceMachineType.find((device) => device.id === data?.item?.device_machine_type_id)
                  ?.device_machine_type_name || t('noData')}
          </InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('manufacturer')}</InputLabel>
        {mode ? (
          <Autocomplete
            popupIcon={<PolygonIcon />}
            noOptionsText={t('noResult')}
            onChange={(event, newValue) => {
              let newValueSelected = newValue ? newValue.id : null

              if (newValue && typeof newValue.id === 'string') {
                newValueSelected = newValue.id
                if (isEdit) {
                  handleUpdateDeviceMachineData(data?.index, 'device_machine_manufacturer_id', '')
                  handleUpdateDeviceMachineData(data?.index, 'device_machine_manufacturer_name', newValueSelected ?? '')
                } else {
                  handleCreateDeviceMachineData('device_machine_manufacturer_id', '')
                  handleCreateDeviceMachineData('device_machine_manufacturer_name', newValueSelected ?? '')
                }
                return
              }

              if (isEdit) {
                handleUpdateDeviceMachineData(data?.index, 'device_machine_manufacturer_name', '')
                handleUpdateDeviceMachineData(
                  data?.index,
                  'device_machine_manufacturer_id',
                  newValue ? newValue.id : null
                )
              } else {
                handleCreateDeviceMachineData('device_machine_manufacturer_name', '')
                handleCreateDeviceMachineData('device_machine_manufacturer_id', newValue ? newValue.id : null)
              }
            }}
            options={listAllDeviceMachineManufacturer}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)
              const { inputValue } = params
              const isExisting = options.some((option) => inputValue === option.device_machine_manufacturer_name)
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  id: inputValue,
                  device_machine_manufacturer_name: `${t('add')} "${inputValue}"`
                })
              }
              return filtered
            }}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option
              }
              if (option.inputValue) {
                return option.inputValue
              }
              return option?.device_machine_manufacturer_name ?? ''
            }}
            value={
              data?.item?.device_machine_manufacturer_name !== ''
                ? data?.item?.device_machine_manufacturer_name
                : (listAllDeviceMachineManufacturer.find(
                    (device) => device.id === data?.item?.device_machine_manufacturer_id
                  ) ?? null)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder={t('select')}
                InputProps={{
                  ...params.InputProps
                }}
              />
            )}
            ListboxProps={{ style: { maxHeight: '180px', fontSize: '12px' } }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">
            {data?.item?.device_machine_manufacturer_name
              ? data.item.device_machine_manufacturer_name
              : listAllDeviceMachineManufacturer.find(
                  (device) => device.id === data?.item?.device_machine_manufacturer_id
                )?.device_machine_manufacturer_name || t('noData')}
          </InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('machineCode')}</InputLabel>
        {mode ? (
          <TextField
            fullWidth
            value={data?.item?.machine_code}
            onChange={(e) => {
              if (isEdit) {
                handleUpdateDeviceMachineData(data?.index, 'machine_code', e.target.value)
              } else {
                handleCreateDeviceMachineData('machine_code', e.target.value)
              }
            }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">{data?.item?.machine_code || t('noData')}</InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('quantity')}</InputLabel>
        {mode ? (
          <TextField
            fullWidth
            value={data?.item?.quantity}
            onChange={(e) => {
              if (isEdit) {
                handleUpdateDeviceMachineData(data?.index, 'quantity', e.target.value)
              } else {
                handleCreateDeviceMachineData('quantity', e.target.value)
              }
            }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">{data?.item?.quantity || t('noData')}</InputLabel>
        )}
      </Box>
    </Box>
  )
}

export default DeviceMobilePage
