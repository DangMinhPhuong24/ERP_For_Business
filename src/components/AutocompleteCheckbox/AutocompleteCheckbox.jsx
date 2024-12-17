import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import PolygonIcon from 'asset/icon/Polygon.svg'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function AutocompleteCheckboxesTags(props) {
  const { dataSelects, setSelectWarehouse, resetCurrentPage, selectWarehouse } = props
  const { t } = useTranslation()

  return (
    <Autocomplete
      multiple
      limitTags={1}
      size="small"
      noOptionsText={t('noResult')}
      popupIcon={<PolygonIcon />}
      options={dataSelects}
      disableCloseOnSelect
      value={selectWarehouse}
      getOptionLabel={(option) => option.warehouse_location_type_name}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props
        const isSelected = selectWarehouse ? selectWarehouse.find((warehouse) => warehouse.id === option.id) : false
        return (
          <li key={key} {...optionProps}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 3 }} checked={!isEmpty(isSelected)} />
            {option.warehouse_location_type_name}
          </li>
        )
      }}
      onChange={(event, newValue) => {
        setSelectWarehouse(newValue)
        resetCurrentPage(1)
      }}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} placeholder={t('selectWarehouse')} />}
    />
  )
}
