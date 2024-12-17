// @ts-nocheck
import { Box, Button, InputLabel, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { formatNumber } from 'common/common'
import BasicTable from 'components/BasicTable'
import HeaderPage from 'components/HeaderPage'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GrDownload } from 'react-icons/gr'
import { TbEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import PurchaseOrderPDFComponent from '../../../components/PDF/PurchaseOrderPDF'
import RelatedDocumentTable from '../../../components/Table/ProductManagement/RelatedDocumentTable'
import colors from '../../../constants/colors'
import titleTableRelatedDocumentProduct from '../../../constants/titleTableRelatedDocumentProduct'
import { getDetailPurchaseOrderAction } from '../../../redux/purchase/purchase.action'
import { detailPurchaseOrderState } from '../../../redux/purchase/purchase.selectors'

const ViewDetailPurchaseOrderPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const queryParams = new URLSearchParams(location.search)
  const purchaseId = queryParams.get('id') ?? null
  const now = new Date()
  const formattedDateTime = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}-${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`
  const filename = `Purchase-Ordered-Linh-Hieu-${formattedDateTime}.pdf`
  const detailPurchaseOrder = useSelector(detailPurchaseOrderState)

  const [selectedFiles, setSelectedFiles] = useState([])
  const [dataTablePurchaseOrdered, setDataTablePurchaseOrdered] = useState([])
  const [dataTableActualWarehouseEntry, setDataTableActualWarehouseEntry] = useState([])
  const [totalValueOfProductsOrdered, setTotalValueOfProductsOrdered] = useState(null)
  const [totalActualWarehouseValue, setTotalActualWarehouseValue] = useState(null)
  const [taxData, setTaxData] = useState({})
  const unitCurrency = detailPurchaseOrder?.supplier?.currency_unit?.name

  useEffect(() => {
    dispatch(getDetailPurchaseOrderAction(purchaseId))
  }, [dispatch])

  const headers = [
    {
      key: 'codeLH',
      label: t('codeLH'),
      align: 'left'
    },
    {
      key: 'productCategories',
      label: t('productCategories'),
      align: 'left'
    },
    {
      key: 'description',
      label: t('description'),
      w: '20%'
    },
    {
      key: 'width',
      label: `${t('width')} (cm)`
    },
    {
      key: 'length',
      label: `${t('length')} (m)`
    },
    {
      key: 'quantity',
      label: t('quantity')
    },
    {
      key: 'unit',
      label: t('unit')
    },

    {
      key: 'squareMeterUnit',
      label: (
        <>
          {t('squareMeterUnit')}
          <sup>2</sup>
        </>
      )
    },
    {
      key: 'priceOfSquareMeter',
      label: (
        <>
          {t('priceOfSquareMeter')} / m<sup>2</sup> ({unitCurrency})
        </>
      ),
      align: 'right'
    }
  ]

  const rows = useMemo(() => {
    return dataTablePurchaseOrdered.map((row, index) => ({
      codeLH: {
        label: row.lh_code
      },
      productCategories: {
        label: row.product_category
      },
      description: {
        label: (
          <Tooltip title={row.description || ''}>{`${row.description ? row.description.substring(0, 40) : ''}${row.description && row.description.length > 10 ? '...' : ''
            }`}</Tooltip>
        )
      },
      width: {
        label: formatNumber(row.width)
      },
      length: {
        label: formatNumber(row.length)
      },
      quantity: {
        label: formatNumber(row.quantity)
      },
      unit: {
        label: row.finished_product_form?.finished_product_form_name
      },
      squareMeterUnit: {
        label: formatNumber(row.m2)
      },
      priceOfSquareMeter: {
        label: formatNumber(row.price_m2)
      },
      id: {
        label: row.id
      }
    }))
  }, [dataTablePurchaseOrdered])

  const rowsActualWarehouseEntry = useMemo(() => {
    return dataTableActualWarehouseEntry.map((row, index) => ({
      codeLH: {
        label: row?.product?.code
      },
      productCategories: {
        label: row?.product_category
      },
      description: {
        label: (
          <Tooltip title={row.description || ''}>{`${row.description ? row.description.substring(0, 40) : ''}${row.description && row.description.length > 10 ? '...' : ''
            }`}</Tooltip>
        )
      },
      width: {
        label: formatNumber(row.width)
      },
      length: {
        label: formatNumber(row.length)
      },
      quantity: {
        label: formatNumber(row.quantity)
      },
      unit: {
        label: row.finished_product_form?.finished_product_form_name
      },
      squareMeterUnit: {
        label: formatNumber(row.m2)
      },
      priceOfSquareMeter: {
        label: formatNumber(row.price_m2)
      },
      id: {
        label: row.id
      }
    }))
  }, [dataTableActualWarehouseEntry])

  useEffect(() => {
    if (detailPurchaseOrder) {
      if (detailPurchaseOrder?.file_purchase_order) {
        const formattedFiles = detailPurchaseOrder?.file_purchase_order?.map((file) => ({
          id: Date.now() + Math.random(),
          url: file.path_name,
          originalName: file.name.split('/').pop(),
          size: file.size,
          createdAt: file.created_at
        }))
        setSelectedFiles(formattedFiles)
      }

      if (detailPurchaseOrder?.purchase_order_product || detailPurchaseOrder?.purchase_order_product?.length) {
        setDataTablePurchaseOrdered(detailPurchaseOrder?.purchase_order_product)
      }

      if (detailPurchaseOrder?.product_warehouse_warehouse_import_order ||
        detailPurchaseOrder?.product_warehouse_warehouse_import_order?.length) {
        setDataTableActualWarehouseEntry(detailPurchaseOrder?.product_warehouse_warehouse_import_order)
      }

      setTotalValueOfProductsOrdered(
        detailPurchaseOrder.purchase_order_product_total && detailPurchaseOrder.purchase_order_product_total !== 0
          ? detailPurchaseOrder.purchase_order_product_total
          : null
      )

      setTaxData({
        purchase_order_product_total_tax: detailPurchaseOrder.purchase_order_product_total_tax,
        purchase_order_product_total_after_cal_tax: detailPurchaseOrder.purchase_order_product_total_after_cal_tax,
        supplier_tax: detailPurchaseOrder.supplier_tax,
      })
      setTotalActualWarehouseValue(
        detailPurchaseOrder.product_warehouse_warehouse_import_order_total &&
          detailPurchaseOrder.product_warehouse_warehouse_import_order_total !== 0
          ? detailPurchaseOrder.product_warehouse_warehouse_import_order_total
          : null
      )
    }
  }, [detailPurchaseOrder])

  const handleChangeEdit = (purchaseId) => {
    navigate(`/purchase/edit?id=${purchaseId}`)
  }

  const navigateToDetail = (event) => { }

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={t('purchaseOrderDetails')}
        actionButton={
          <Button
            className="buttonAction"
            sx={{ gap: '8px', color: colors.greenColor }}
            onClick={() => handleChangeEdit(purchaseId)}
          >
            <TbEdit style={{ fontSize: '16px', marginBottom: '2px' }} />
            {t('editAction')}
          </Button>
        }
      />
      <Box p={2}>
        <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', position: 'relative' }}>
          <form>
            {/* SECTION 1 */}
            <Box>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                  <Typography
                    sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                  >
                    {t('purchaseInformation')}
                  </Typography>
                </Box>

                <PDFDownloadLink
                  id="pdf-download-link"
                  document={
                    <PurchaseOrderPDFComponent
                      dataPurchaseOrder={detailPurchaseOrder}
                      typeSupplier={detailPurchaseOrder?.supplier?.supplier_type?.id}
                    />
                  }
                  fileName={filename}
                ></PDFDownloadLink>

                <Button
                  className="addButton"
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                  startIcon={<GrDownload style={{ fontSize: '16px', marginBottom: '2px' }} />}
                  onClick={() => {
                    document.getElementById('pdf-download-link').click()
                  }}
                >
                  {t('exportPOPDF')}
                </Button>
              </Box>

              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={2}>
                    <InputLabel className="inputLabel-product">{t('codeOrders')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailPurchaseOrder && detailPurchaseOrder.code ? detailPurchaseOrder?.code : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel className="inputLabel-product">{t('status')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailPurchaseOrder && detailPurchaseOrder?.status?.name
                        ? detailPurchaseOrder?.status?.name
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel className="inputLabel-product">{t('supplier')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailPurchaseOrder && detailPurchaseOrder?.supplier?.supplier_name
                        ? detailPurchaseOrder?.supplier?.supplier_name
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel className="inputLabel-product">{t('deliveryDate')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailPurchaseOrder && detailPurchaseOrder.delivery_date
                        ? detailPurchaseOrder?.delivery_date
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel className="inputLabel-product">{t('orderDate')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailPurchaseOrder && detailPurchaseOrder.created_at
                        ? new Date(
                          detailPurchaseOrder.created_at.replace(
                            /(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{4})/,
                            '$4/$3/$5'
                          )
                        ).toLocaleDateString('en-GB')
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 2 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('listOfProductsOrdered')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                {!loading && (
                  <BasicTable
                    loading={loading}
                    headers={headers}
                    rows={rows}
                    totalPages={1}
                    currentPage={currentPage}
                    showIndex
                    handlePageChange={handlePageChange}
                    navigateToDetail={navigateToDetail}
                    totalValue={totalValueOfProductsOrdered}
                    isTaxAndTotalValue={taxData}
                  />
                )}
              </Grid>
            </Box>
            {/* SECTION 3 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('orderNotes')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        color: colors.blackWithOpacityColor
                      }}
                    >
                      {detailPurchaseOrder && detailPurchaseOrder.note ? (
                        detailPurchaseOrder.note
                      ) : (
                        <em>{t('noData')}</em>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 4 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('actualInventoryList')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                {!loading && (
                  <BasicTable
                    loading={loading}
                    headers={headers}
                    rows={rowsActualWarehouseEntry}
                    totalPages={1}
                    currentPage={currentPage}
                    showIndex
                    handlePageChange={handlePageChange}
                    navigateToDetail={navigateToDetail}
                    isRowWithColspan={totalActualWarehouseValue}
                    totalValue={totalActualWarehouseValue}
                  />
                )}
              </Grid>
            </Box>
            {/* SECTION 5 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('relatedDocuments')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid container>
                  <RelatedDocumentTable
                    titleTable={titleTableRelatedDocumentProduct}
                    data={selectedFiles}
                    loading={false}
                    handleDelete={false}
                    allowDownload={true}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default ViewDetailPurchaseOrderPage
