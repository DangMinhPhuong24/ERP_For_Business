import * as React from 'react'
import { useMemo } from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import ModalDelete from '../../../Modal/Common/delete'
import { TbEdit } from 'react-icons/tb'
import colors from '../../../../constants/colors'
import { formatCurrency, formatNumber } from '../../../../common/common'
import CustomStepper from '../../../Stepper'
import { titleStepOrder } from '../../../../constants/titleStepOrder'
import { getStatusColorOder } from '../../../../constants/getStatusColorOder'
import { statusOrder } from '../../../../constants/statusOder'
import BasicTable from "../../../BasicTable";
import { getErrorMessageByName } from "../../../../utils";
import { FormControl, Select } from "@mui/material";
import PolygonIcon from "../../../../asset/icon/Polygon.svg";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm, Controller } from 'react-hook-form';

export default function CreateOrUpdateTable(props) {
  const {
    data,
    handlerDelete,
    successMessage,
    loading,
    listAllManufactureForm,
    handleManufactureFormChange,
    control,
  } = props
  const { t } = useTranslation()

  const headers = useMemo(
    () => [
      {
        key: 'commodityDode',
        label: t('commodityDode'),
        align: 'left',
      },
      {
        key: 'type',
        label: t('type'),
        align: 'left',
      },
      {
        key: 'quantity',
        label: t('quantity'),
        align: 'right',
      },
      {
        key: 'width',
        label: (
          <>
            { t('width') }(cm)
          </>
        ),
        align: 'right',
      },
      {
        key: 'length',
        label: (
          <>
            { t('length') }(m)
          </>
        ),
        align: 'right',
      },
      {
        key: 'm2',
        label: (
          <>
            { t('M') }
            <sup>2</sup>
          </>
        ),
        align: 'right',
      },
      {
        key: 'waste',
        label: (
          <>
            { t('waste') } (%)
          </>
        ),
        align: 'right',
      },
      {
        key: 'storage',
        label: (
          <>
            { t('storage') } ({ t('day') })
          </>
        ),
        align: 'right',
      },
      {
        key: 'QTSX',
        label: 'QTSX',
      },

      {
        key: 'actions',
        label: t('actions'),
      }
    ],
    [ t ]
  )

  const rows = useMemo(() => {
    return data.map((row, index) => ({
      commodityDode: {
        label: row.code,
      },
      type: {
        label: row.finished_product_form.finished_product_form_name,
      },
      quantity: {
        label: formatNumber(row.quantity),
      },
      width: {
        label: formatNumber(row.width),
      },
      length: {
        label: formatNumber(row.length),
      },
      m2: {
        label: formatNumber(row.square_meter),
      },
      waste: {
        label: row.scrap === -1 ? '-' : row.scrap,
      },
      storage: {
        label: row.inventory_period,
      },
      QTSX: {
        label: (
          <>
            <FormControl size="small">
              <Controller
                name={`manufacture_form_id_${row.id}`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    IconComponent={PolygonIcon}
                    displayEmpty
                    size="small"
                    value={row.manufacture_form.id || ''}
                    sx={{ width: '120px' }}
                    onChange={(event) => {
                      const newValue = event.target.value;
                      handleManufactureFormChange(row.id, newValue);
                    }}
                  >
                    {listAllManufactureForm.map((item) => (
                      <MenuItem
                        sx={{
                          fontSize: '14px',
                          padding: '4px 8px',
                        }}
                        key={item.id}
                        value={item.id}
                      >
                        {item.manufacture_form_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </>
        )
      },
      actions: {
        label: (
          <>
              <ModalDelete
                successFlag={ successMessage }
                id={ row.id }
                buttonName={ t('delete') }
                handleDelete={handlerDelete}
              />
          </>
        )
      },
      id: {
        label: row.id
      }
    } ))
  }, [ data, successMessage ])

  return (
    <>
      { !loading && (
        <BasicTable
          headers={ headers }
          rows={ rows }
          showIndex
          currentPage={1}
        />
      ) }
    </>
  )
}
