import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import '../../../../resource/style/OderDetailStyle.css'
import {
  filterDigits,
  formatCurrency,
  formatCurrencyWithoutSymbol,
  formatNumber, formatPercentage,
  isNumeric
} from '../../../../common/common'
import Typography from '@mui/material/Typography'
import { ReadingConfig, doReadNumber } from 'read-vietnamese-number'

function AdjustmentVoucherTable({ data, onUpdatePrices, total, priceError, mode,quantityError }) {
  const { t } = useTranslation()
  const config = new ReadingConfig()
  config.unit = ['đồng']
  const [newPrices, setNewPrices] = useState([])
  const [intoMoney, setIntoMoney] = useState(0)
  useEffect(() => {
    if (mode === 'create' && data.product_items) {
      const initialPrices = data.product_items.map((item) => ({
        product_item_id: item.id,
        price: ''
      }))
      setNewPrices(initialPrices)
    }
  }, [data.product_items, mode])

  useEffect(() => {
    if (mode === 'edit' && data.product_items) {
      const initialPrices = data.product_items.map((item) => ({
        product_item_id: item.id,
        price: item.new_price,
        quantity: item.new_quantity,
      }))
      setNewPrices(initialPrices)
    }
  }, [data.product_items, mode])

  useEffect(() => {
    if (mode !== 'view' && data.product_items) {
      const newTotal = data.product_items.reduce((acc, item) => {
        const newPrice = newPrices.find((price) => price.product_item_id === item.id)?.price || item.price
        const newQuantity = newPrices.find((price) => price.product_item_id === item.id)?.quantity || item.quantity
        return acc + newPrice * newQuantity
      }, 0)
      setIntoMoney(newTotal)
      const discountAmount = (parseFloat(data.discount || 0) / 100) * parseFloat(newTotal);
      const totalCost =
        parseFloat(newTotal) +
        parseFloat(data.delivery_charges || 0) -
          discountAmount +
        parseFloat(data.tax_amount || 0)
      onUpdatePrices(newPrices, intoMoney, totalCost)
    }
  }, [newPrices, data.product_items, data.delivery_charges, data.discount, data.tax_amount, onUpdatePrices, mode])

  const handlePriceEdit = (itemId, newPrice) => {
    if (mode !== 'view') {
      const value = filterDigits(newPrice);
      const index = newPrices.findIndex((item) => item.product_item_id === itemId)
      const updatedNewPrices = [...newPrices]
      if (index !== -1) {
        updatedNewPrices[index].price = value
      } else {
        updatedNewPrices.push({ product_item_id: itemId, price: value })
      }
      setNewPrices(updatedNewPrices)
    }
  }

  const handleQuantityEdit = (itemId, newQuantity) => {
    if (mode !== 'view') {
      const index = newPrices.findIndex((item) => item.product_item_id === itemId)
      const updatedNewPrices = [...newPrices]
      if (index !== -1) {
        updatedNewPrices[index].quantity = newQuantity
      } else {
        updatedNewPrices.push({ product_item_id: itemId, quantity: newQuantity })
      }
      setNewPrices(updatedNewPrices)
    }
  }

  const getNumberString = (value) => {
    if (isNaN(value) || value == null) {
      return '0'
    }
    return String(Math.round(value))
  }

  return (
    <Box>
      <table style={{ width: '100%', border: '1px solid #ccc', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th className="uppercaseTh" rowSpan="2">
              {t('goodsName')}
            </th>
            <th className="specificationsTh" colSpan="4">
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
            data.product_items &&
            data.product_items.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th className="table-cell" rowSpan="2">
                    {item.product.product_name}
                  </th>
                  <th className="another-table-cell" colSpan="2">
                    {item.product_form?.id === 2 && (
                        <>
                          {formatNumber(item.length_standard)} x {formatNumber(item.width_standard)} x {formatNumber(item.quantity_standard)}
                          {item.finished_product_form_standard?.id === 1 ? 'T' : (item.finished_product_form_standard?.id === 2 ? 'C' : '')}
                        </>
                    )}
                  </th>
                  <th className="another-table-cell" colSpan="2">
                    {formatNumber(item.length)} x {formatNumber(item.width)} x {formatNumber(item.quantity)}
                    {item.finished_product_form.id === 1 ? 'T' : (item.finished_product_form.id === 2 ? 'C' : '')}
                  </th>
                  {mode === 'edit' ? (
                      <td className="custom-table-cell" rowSpan="2">
                        <input
                            placeholder={t('enterQuantity')}
                            value={newPrices.find((price) => price.product_item_id === item.id)?.quantity || ''}
                            onChange={(e) => handleQuantityEdit(item.id, e.target.value)}
                        />
                        {quantityError[index] && (
                            <Typography sx={{ fontSize: '12px', fontWeight: '400', flex: 1 }} color="error">
                              {quantityError[index]}
                            </Typography>
                        )}
                      </td>
                  ) : (
                      <td className="custom-table-cell" rowSpan="2">
                        {mode === 'view' ? (
                            <React.Fragment>
                              <Typography sx={{ fontSize: '10px', textDecoration: 'line-through' }}>
                                {formatNumber(item.old_quantity)}
                              </Typography>
                              <Typography sx={{ fontSize: '10px' }}>{formatNumber(item.new_quantity)}</Typography>
                            </React.Fragment>
                        ) : (
                            <input
                                placeholder={t('enterQuantity')}
                                value={newPrices.find((price) => price.product_item_id === item.id)?.quantity || ''}
                                readOnly={mode === 'view'}
                                className={mode === 'view' ? '' : quantityError[index] ? 'error-input' : ''}
                                onChange={mode !== 'view' ? (e) => handleQuantityEdit(item.id, e.target.value) : null}
                            />
                        )}
                        {quantityError[index] && (
                            <Typography sx={{ fontSize: '12px', fontWeight: '400', flex: 1 }} color="error">
                              {quantityError[index]}
                            </Typography>
                        )}
                      </td>
                  )}
                  {mode === 'edit' ? (
                    <td className="custom-table-cell" rowSpan="2">
                      <input
                        placeholder={t('enterNewPrice')}
                        value={formatCurrencyWithoutSymbol(newPrices.find((price) => price.product_item_id === item.id)?.price) || ''}
                        onChange={(e) => handlePriceEdit(item.id, e.target.value)}
                      />
                      {priceError[index] && (
                        <Typography sx={{ fontSize: '12px', fontWeight: '400', flex: 1 }} color="error">
                          {priceError[index]}
                        </Typography>
                      )}
                    </td>
                  ) : (
                    <td className="custom-table-cell" rowSpan="2">
                      {mode === 'view' ? (
                        <React.Fragment>
                          <Typography sx={{ fontSize: '10px', textDecoration: 'line-through' }}>
                            {formatCurrency(item.old_price)}
                          </Typography>
                          <Typography sx={{ fontSize: '10px' }}>{formatCurrency(item.new_price)}</Typography>
                        </React.Fragment>
                      ) : (
                        <input
                          placeholder={t('enterNewPrice')}
                          value={formatCurrencyWithoutSymbol(newPrices.find((price) => price.product_item_id === item.id)?.price) || ''}
                          readOnly={mode === 'view'}
                          className={mode === 'view' ? '' : priceError[index] ? 'error-input' : ''}
                          onChange={mode !== 'view' ? (e) => handlePriceEdit(item.id, e.target.value) : null}
                        />
                      )}
                      {priceError[index] && (
                        <Typography sx={{ fontSize: '12px', fontWeight: '400', flex: 1 }} color="error">
                          {priceError[index]}
                        </Typography>
                      )}
                    </td>
                  )}
                  <td className="custom-table-cell" rowSpan="2">
                    {mode === 'view'
                      ? formatCurrency(item.new_quantity * item.new_price)
                      : formatCurrency(
                            (isNumeric(newPrices.find((price) => price.product_item_id === item.id)?.quantity)
                                ? newPrices.find((price) => price.product_item_id === item.id).quantity
                                : 0) *
                            (isNumeric(newPrices.find((price) => price.product_item_id === item.id)?.price)
                              ? newPrices.find((price) => price.product_item_id === item.id).price
                              : 0)
                        )}
                  </td>
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
              {mode === 'view' ? formatCurrency(data.amount) : formatCurrency(intoMoney)}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('shippingAndProcessingFees')}
            </td>
            <td className="customCell" colSpan="5">
              {formatCurrency(data.delivery_charges ? data.delivery_charges : '')}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('discount')}
            </td>
            <td className="customCell" colSpan="5">
              {formatPercentage(data.discount ? data.discount : 0)}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('tax')}
            </td>
            <td className="customCell" colSpan="5">
              {formatCurrency(data.tax_amount ? data.tax_amount : '')}
            </td>
          </tr>
          <tr>
            <td className="custom-table-header" colSpan="5">
              {t('total')}
            </td>
            <td className="customCell" colSpan="5">
              {mode === 'view' ? formatCurrency(data.total_cost) : formatCurrency(total)}
            </td>
          </tr>
        </tbody>
      </table>
      <Box sx={{ display: 'flex', width: '100%', marginTop: '10px', justifyContent: 'center' }}>
        <Typography
          component="span"
          sx={{ fontSize: '12px', fontWeight: '400', fontStyle: 'italic', textAlign: 'center' }}
        >
          {t('amountInwords')}:{' '}
          {mode === 'view'
            ? doReadNumber(config, getNumberString(data.total_cost))
            : doReadNumber(config, getNumberString(total))}
        </Typography>
      </Box>
    </Box>
  )
}
export default AdjustmentVoucherTable
