import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import '../../../../resource/style/OderDetailStyle.css'
import { formatCurrency, formatNumber, formatPercentage } from '../../../../common/common'
import Typography from '@mui/material/Typography'
import { ReadingConfig, doReadNumber } from 'read-vietnamese-number'

function calculateTotal(item) {
  const length = parseFloat(item.length)
  const width = parseFloat(item.width)
  const quantityValue = parseFloat(item.quantity)
  const length_standard = parseFloat(item.length_standard)
  const width_standard = parseFloat(item.width_standard)
  const quantityStandard = parseFloat(item.quantity_standard)
  const productForm = parseFloat(item.product_form_id)
  const finishedProduct = parseFloat(item.finished_product_form_id)
  const priceValue = parseFloat(item.price)
  const finishedProductStandard = parseFloat(item.finished_product_form_standard_id)
  const isValidNumber = (value) => !isNaN(value)

  let total = 0

  if (
    productForm === 2 &&
    isValidNumber(priceValue) &&
    isValidNumber(quantityStandard) &&
    isValidNumber(width_standard) &&
    isValidNumber(length_standard)
  ) {
    const lengthStandard = finishedProductStandard === 1 ? length_standard / 100 : length_standard
    const widthStandard = width_standard / 100
    total += quantityStandard * widthStandard * lengthStandard
  } else if (
    productForm === 1 &&
    isValidNumber(priceValue) &&
    isValidNumber(quantityValue) &&
    isValidNumber(width) &&
    isValidNumber(length)
  ) {
    const lengthInMeters = finishedProduct === 1 ? length / 100 : length
    const widthInMeters = width / 100
    total = quantityValue * lengthInMeters * widthInMeters
  }

  return total
}

function ReportOrderTable({ data }) {

  const { t } = useTranslation()
  const config = new ReadingConfig()
  config.unit = ['đồng']
  return (
    <Box>
      <table style={{ width: '100%', border: '1px solid #ccc', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th className="uppercaseTh" rowSpan="2">
              {' '}
              {t('goodsName')}
            </th>
            <th className="specificationsTh" colSpan="4">
              {' '}
              {t('specifications')}
            </th>
            <th className="slTh" rowSpan="2">
              SL (M2)
            </th>
            <th className="cell-with-border" rowSpan="2">
              {t('unitPrice')}
            </th>
            <th className="cell-with-border" rowSpan="2">
              {t('intoMoney')}
            </th>
          </tr>
          <tr>
            <th className="standardTh" colSpan="2">
              {t('standard')}
            </th>
            <th className="machiningTh" colSpan="2">
              {t('machining')}
            </th>
          </tr>
          {data &&
            data.goods &&
            data.goods.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th className="table-cell" rowSpan="2">
                    {item.product_name}
                  </th>
                  <th className="another-table-cell" colSpan="2">
                    {(item.product_form_id === 2 || item.product_form_id === '2') && (
                      <>
                        {formatNumber(item.length_standard)} x {formatNumber(item.width_standard)} x
                        {formatNumber(item.quantity_standard)}
                        {item.finished_product_form_standard_id === 1 || item.finished_product_form_standard_id === '1'
                          ? 'T'
                          : item.finished_product_form_standard_id === 2 || item.finished_product_form_standard_id === '2'
                            ? 'C'
                            : ''}
                      </>
                    )}
                  </th>
                  <th className="another-table-cell" colSpan="2">
                    {formatNumber(item.length)} x {formatNumber(item.width)} x {formatNumber(item.quantity)}{' '}
                    {item.finished_product_form_id === 1 ? 'T' : item.finished_product_form_id === 2 ? 'C' : ''}
                  </th>
                  <th className="another-table-cell" rowSpan="2">
                    {formatNumber(calculateTotal(item))}
                  </th>
                  <th className="custom-table-cell" rowSpan="2">
                    {formatCurrency(item.price)}
                  </th>
                  <th className="custom-table-cell" rowSpan="2">
                    {formatCurrency(calculateTotal(item) * item.price)}
                  </th>
                </tr>
                <tr></tr>
              </React.Fragment>
            ))}
        </thead>
        <tbody>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('intoMoney')}
            </td>
            <td className="customCell" colSpan="5">
              {formatCurrency(data.intoMoney)}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('shippingAndProcessingFees')}
            </td>
            <td className="customCell" colSpan="5">
              {formatCurrency(data.shippingFee)}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('discount')}
            </td>
            <td className="customCell" colSpan="5">
              {formatPercentage(formatNumber(data.discount))}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('valueAddedServices')}
            </td>
            <td className="customCell" colSpan="5">
              {formatCurrency(data.taxAmount)}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('total')}
            </td>
            <td className="customCell" colSpan="5">
              {formatCurrency(data.total)}
            </td>
          </tr>
        </tbody>
      </table>
      <Box sx={{ display: 'flex', width: '100%', marginTop: '10px', justifyContent: 'center' }}>
        <Typography
          component="span"
          sx={{ fontSize: '12px', fontWeight: '400', fontStyle: 'italic', textAlign: 'center' }}
        >
          Số tiền bằng chữ:{' '}
          {data?.total && !isNaN(data.total)
            ? doReadNumber(config, String(Math.round(Number(data.total))))
            : t('inValidData')}
        </Typography>
      </Box>
    </Box>
  )
}
export default ReportOrderTable
