// @ts-nocheck
import { useTranslation } from 'react-i18next'
import BasicTable from "../../../BasicTable";
import * as React from "react";
import { useMemo } from "react";
import {formatNumber} from "../../../../common/common";

const FinishedProductWarehouseTable = (props) => {
  const {
    data,
    checkboxSelected,
    handleSelectOne
  } = props
  const { t } = useTranslation()


  const headers = useMemo(() => {
    return [
      {
        key: 'commodityDode',
        label: t('commodityDode'),
      },
      {
        key: 'type',
        label: t('type'),
      },
      {
        key: 'quantity',
        label: t('SL'),
      },
      {
        key: 'widthExcel',
        label: t('widthExcel'),
      },
      {
        key: 'lengthExcel',
        label: t('lengthExcel'),
      },
      {
        key: 'squareMeter',
        label: ( <span>{ t('M') }<sup>2</sup></span> ),
      },
      {
        key: 'percentScrap',
        label: t('percentScrap'),
      },
      {
        key: 'numberOfDaysOfStorage',
        label: t('numberOfDaysOfStorage'),
      },
    ]
  }, [ t ])

  const rows = useMemo(() => {
    return data.map((row) => {
      return {
        commodityDode: {
          label: row.code,
          cellWithButton: true
        },
        type: {
          label: row.finished_product_form?.finished_product_form_name,
          cellWithButton: true
        },
        quantity: {
          label: formatNumber(row.quantity),
          cellWithButton: true
        },
        widthExcel: {
          label: formatNumber(row.width),
          cellWithButton: true
        },
        lengthExcel: {
          label: formatNumber(row.length),
          cellWithButton: true
        },
        squareMeter: {
          label: formatNumber(row.square_meter),
          cellWithButton: true
        },
        percentScrap: {
          label: row.scrap === -1 ? '-' : row.scrap,
          cellWithButton: true
        },
        numberOfDaysOfStorage: {
          label: row.inventory_period,
          cellWithButton: true
        },
        id: {
          label: row.id
        }
      }
    })
  }, [ data ])

  return (
    <>
      <BasicTable
        headers={ headers }
        rows={ rows }
        maxHeight={ 620 }
        showIndex
        currentPage={1}
        showCheckbox={ data.length > 0 }
        checkboxSelected={ checkboxSelected }
        handleSelectOne={ handleSelectOne }
        navigateToDetail={ handleSelectOne }
      />
    </>
  )
}

export default FinishedProductWarehouseTable
