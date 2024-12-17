import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import colors from '../../../constants/colors'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import {
  listFormationHistoryByProductState,
  productDetailState,
  totalPagesListFormationHistoryByProductState
} from '../../../redux/warehouse/warehouse.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getFormationHistoryByProductAction, getProductDetailAction } from '../../../redux/warehouse/warehouse.actions'
import HeaderPage from 'components/HeaderPage'
import { formatNumber } from '../../../common/common'
import BasicTable from '../../../components/BasicTable'
import PrintableContent from "../../../components/Buttons/PrintableContent";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    lineHeight: '16.41px',
    textAlign: 'left',
    letterSpacing: '0em',
    border: 'none',
    padding: '0',
    verticalAlign: 'top'
  }
}))

export default function ProductDetail() {
  const { t } = useTranslation()
  const productDetail = useSelector(productDetailState)
  const location = useLocation()
  const productId = new URLSearchParams(location.search).get('id')
  const listFormationHistoryByProduct = useSelector(listFormationHistoryByProductState)
  const totalPagesListFormationHistoryByProduct = useSelector(totalPagesListFormationHistoryByProductState)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getProductDetailAction(productId))
    dispatch(getFormationHistoryByProductAction(productId))
  }, [])

  const handlePageChange = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(getFormationHistoryByProductAction(productId)).then(() => {
      setLoading(false)
    })
  }

  const headers = useMemo(
    () => [
      {
        key: 'dateOfFormation',
        label: t('dateOfFormation')
      },
      {
        key: 'width',
        label: `${t('width')} (cm)`,
        align: 'right'
      },
      {
        key: 'length',
        label: `${t('length')} (m)`,
        align: 'right'
      },
      {
        key: 'quantity',
        label: t('quantity'),
        align: 'right'
      },
      {
        key: 'format',
        label: t('format'),
        align: 'left'
      },
      {
        key: 'numberOfMetersSquare',
        label: t('numberOfMetersSquare'),
        align: 'right'
      }
    ],
    [t]
  )

  const rows = useMemo(() => {
    return listFormationHistoryByProduct.map((row) => ({
      dateOfFormation: {
        label: row.created_at
      },
      width: {
        label: `${formatNumber(row.width)}`
      },
      length: {
        label: `${formatNumber(row.length)}`
      },
      quantity: {
        label: row.quantity
      },
      format: {
        label: row.finished_product_form?.finished_product_form_name
      },
      numberOfMetersSquare: {
        label: formatNumber(row.square_meter)
      },
      id: {
        label: row.id
      }
    }))
  }, [listFormationHistoryByProduct])

  return (
    <>
      <HeaderPage title={t('detailProductsOrMaterialInStored')} />
      <Box p={2}>
        <Box>
          {productDetail.warehouse?.warehouse_name && (
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: colors.charcoalgrayColor }}>
              {productDetail.warehouse?.warehouse_name} - {productDetail.warehouse_location?.warehouse_location_name}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.dimgrayColor
            }}
          >
            {productDetail.code} ({productDetail.product_name})
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            bgcolor: colors.lilywhiteColor,
            p: 2,
            mt: 2,
            borderRadius: '8px',
            position: 'relative',
            flexGrow: 1
          }}
        >
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box flex={1}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" className="frontpager">
                  {t('basicInformation')}
                </Typography>
              </Box>
              <TableContainer>
                <Table sx={{ border: 'none' }}>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '140px' }}
                      >
                        <Typography className="label-info">{t('width')} (cm):</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">
                          {formatNumber(productDetail.width) ?? 0}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '140px' }}
                      >
                        <Typography className="label-info">{t('length')} (m):</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">
                          {formatNumber(productDetail.length) ?? 0}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '140px' }}
                      >
                        <Typography className="label-info">{t('quantity')}:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{productDetail.quantity}</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '140px' }}
                      >
                        <Typography className="label-info">{t('format')}:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">
                          {productDetail?.finished_product_form?.finished_product_form_name}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '140px' }}
                      >
                        <Typography className="label-info">{t('numberOfMetersSquare')}:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{formatNumber(productDetail.square_meter)}</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '140px' }}
                      >
                        <Typography className="label-info">{t('numberOfDaysInStored')}:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{productDetail.inventory_period}</Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box flex={1}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" className="frontpager">
                  {'\u00A0'}
                </Typography>
              </Box>
              <TableContainer>
                <Table sx={{ border: 'none' }}>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '120px' }}
                      >
                        <Typography className="label-info">{t('dateOfImport')}:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{productDetail.created_at}</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '120px' }}
                      >
                        <Typography className="label-info">{t('dateOfFormation')}:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{productDetail.created_at}</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '120px' }}
                      >
                        <Typography className="label-info">QR:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">
                          <PrintableContent data={productDetail} />
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
        <Box
          component="form"
          sx={{
            bgcolor: colors.lilywhiteColor,
            p: 2,
            mt: 2,
            borderRadius: '8px',
            position: 'relative',
            flexGrow: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '12px' }}>
            <Typography variant="h6" className="frontpager">
              {t('history')}
            </Typography>
          </Box>
          {!loading && (
            <BasicTable
              loading={loading}
              headers={headers}
              rows={rows}
              totalPages={totalPagesListFormationHistoryByProduct}
              currentPage={currentPage}
              showIndex
              handlePageChange={handlePageChange}
            />
          )}
        </Box>
      </Box>
    </>
  )
}
