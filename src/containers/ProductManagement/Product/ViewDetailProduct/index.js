// @ts-nocheck
import { Box, Button, InputLabel, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import HeaderPage from 'components/HeaderPage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatNumber } from '../../../../common/common'
import RelatedDocumentTable from '../../../../components/Table/ProductManagement/RelatedDocumentTable'
import colors from '../../../../constants/colors'
import commons from '../../../../constants/common'
import titleTableRelatedDocumentProduct from '../../../../constants/titleTableRelatedDocumentProduct'
import { getDetailProductManagementAction } from '../../../../redux/product/product.actions'
import { getDetailProductState } from '../../../../redux/product/product.selectors'

const ViewDetailProductPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const productId = queryParams.get('id')

  const detailProduct = useSelector(getDetailProductState)
  const [selectedFiles, setSelectedFiles] = useState([])

  useEffect(() => {
    if (productId) {
      dispatch(
        getDetailProductManagementAction({
          id: productId
        })
      )
    }
  }, [])

  useEffect(() => {
    if (productId && detailProduct) {
      if (detailProduct?.pdf) {
        const formattedFiles = detailProduct?.pdf?.map((file) => ({
          id: Date.now() + Math.random(),
          url: file.path_name,
          originalName: file.path_name.split('/').pop(),
          size: file.size,
          createdAt: file.created_at
        }))
        setSelectedFiles(formattedFiles)
      }
    }
  }, [productId, detailProduct])

  const handleChangeEdit = (productId) => {
    navigate(`/product/edit?id=${productId}`)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={t('detailProduct')}
        actionButton={
          <Button
            className="buttonAction"
            sx={{ gap: '8px', color: colors.greenColor }}
            onClick={() => handleChangeEdit(productId)}
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
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('basicInformation')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('internalCode')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.code ? detailProduct?.code : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('name')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.product_name ? detailProduct?.product_name : t('noData')}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('supplierFullText')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.supplier ? detailProduct?.supplier?.supplier_name : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('supplierProductCode')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.supplier_code ? detailProduct?.supplier_code : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('pricePerSquareMeter')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.price_m2 && parseFloat(detailProduct.price_m2) !== 0
                        ? `${formatNumber(detailProduct.price_m2)} ${detailProduct?.supplier?.currency_unit?.name}`
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('productGroups')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.product_group
                        ? detailProduct?.product_group?.product_group_name
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('typeOfGoods')} (VN)
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.vn_product_category && detailProduct.vn_product_category.name
                        ? detailProduct?.vn_product_category?.name
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel
                      required={detailProduct?.supplier?.supplier_type?.id === commons.FOREIGN ? true : false}
                      className={`inputLabel-product ${detailProduct?.supplier?.supplier_type?.id === commons.FOREIGN ? 'requiredTextField' : ''}`}
                    >
                      {t('typeOfGoods')} (EN)
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.en_product_category && detailProduct.en_product_category.name
                        ? detailProduct?.en_product_category?.name
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('productDescription')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.description ? detailProduct?.description : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('note')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.note ? detailProduct?.note : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={3}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('specificationsUnit')}
                    </InputLabel>
                    {detailProduct.specifications?.map((spec, index) => (
                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '0.5rem' }} key={index}>
                        <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>{index + 1}</Typography>
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <InputLabel className="inputLabel-handbook-view">
                            {t('high')}: {formatNumber(spec.height) || '-'} cm
                          </InputLabel>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <InputLabel className="inputLabel-handbook-view">
                            {t('length')}: {formatNumber(spec.length) || '-'} m
                          </InputLabel>
                        </Box>
                      </Box>
                    ))}
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
                  {t('productSpecifications')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('facialType')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.surface_type ? detailProduct.surface_type?.name : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('facialQuantification')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.surface_quantification ? (
                        <>
                          {formatNumber(detailProduct.surface_quantification.surface_quantification)}{' '}
                          <span>
                            ( ± {formatNumber(detailProduct.surface_quantification.surface_quantification_tolerance)}
                            {detailProduct.surface_quantification.surface_quantification_tolerance_type.name} )
                          </span>
                        </>
                      ) : (
                        t('noData')
                      )}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('facialThickness')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.surface_thickness ? (
                        <>
                          {formatNumber(detailProduct.surface_thickness.surface_thickness)}{' '}
                          <span>
                            ( ± {formatNumber(detailProduct.surface_thickness.surface_thickness_tolerance)}
                            {detailProduct.surface_thickness.surface_thickness_tolerance_type.name} )
                          </span>
                        </>
                      ) : (
                        t('noData')
                      )}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('adhesiveTypes')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.adhesive_type ? detailProduct.adhesive_type?.name : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('adhesiveQuantification')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct &&
                        detailProduct.adhesive_measurement &&
                        detailProduct.adhesive_measurement.adhesive_measurement ? (
                        <>
                          {formatNumber(detailProduct.adhesive_measurement.adhesive_measurement)}{' '}
                          <span>
                            ( ± {formatNumber(detailProduct.adhesive_measurement.adhesive_measurement_tolerance)}
                            {detailProduct.adhesive_measurement.adhesive_measurement_tolerance_type.name} )
                          </span>
                        </>
                      ) : (
                        t('noData')
                      )}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('adhesiveThickness')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct &&
                        detailProduct.adhesive_thickness &&
                        detailProduct.adhesive_thickness.adhesive_thickness ? (
                        <>
                          {formatNumber(detailProduct.adhesive_thickness.adhesive_thickness)}{' '}
                          <span>
                            ( ± {formatNumber(detailProduct.adhesive_thickness.adhesive_thickness_tolerance)}
                            {detailProduct.adhesive_thickness.adhesive_thickness_tolerance_type.name} )
                          </span>
                        </>
                      ) : (
                        t('noData')
                      )}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('baseType')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.base_type ? detailProduct.base_type?.name : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('baseQuantification')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.base_measurement ? (
                        <>
                          {formatNumber(detailProduct.base_measurement.base_measurement)}{' '}
                          <span>
                            ( ± {formatNumber(detailProduct.base_measurement.base_measurement_tolerance)}
                            {detailProduct.base_measurement.base_measurement_tolerance_type.name} )
                          </span>
                        </>
                      ) : (
                        t('noData')
                      )}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('baseThickness')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.base_thickness ? (
                        <>
                          {formatNumber(detailProduct.base_thickness.base_thickness)}{' '}
                          <span>
                            ( ± {formatNumber(detailProduct.base_thickness.base_thickness_tolerance)}
                            {detailProduct.base_thickness.base_thickness_tolerance_type.name} )
                          </span>
                        </>
                      ) : (
                        t('noData')
                      )}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('adhesiveForce')}
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.adhesive_force ? (
                        <>
                          {formatNumber(detailProduct.adhesive_force.adhesive_force)}{' '}
                          <span>
                            ( ± {formatNumber(detailProduct.adhesive_force.adhesive_force_tolerance)}
                            {detailProduct.adhesive_force.adhesive_force_tolerance_type.name} )
                          </span>
                        </>
                      ) : (
                        t('noData')
                      )}
                    </InputLabel>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 3 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('productApplication')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('bondingEnvironment')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.bonding_env && detailProduct.bonding_env.length > 0
                        ? detailProduct.bonding_env.map((item) => item.name).join(', ')
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('surfaceMaterial')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.surface_material && detailProduct.surface_material.length > 0
                        ? detailProduct.surface_material.map((item) => item.name).join(', ')
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('printingMachine')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.printer && detailProduct.printer.length > 0
                        ? detailProduct.printer.map((item) => item.name).join(', ')
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('suitableTemperature')}</InputLabel>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: '400', color: colors.greyColor }}>
                          {t('from')}
                        </Typography>
                        <InputLabel className="inputLabel-handbook-view">
                          {detailProduct &&
                            detailProduct.temperature_from !== null &&
                            detailProduct.temperature_from !== undefined
                            ? detailProduct.temperature_from
                            : t('noData')}
                        </InputLabel>
                        <Typography sx={{ fontSize: '12px', fontWeight: '400', color: colors.greyColor }}>
                          {t('to')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <InputLabel className="inputLabel-handbook-view">
                          {detailProduct &&
                            detailProduct.temperature_to !== null &&
                            detailProduct.temperature_to !== undefined
                            ? detailProduct.temperature_to
                            : t('noData')}
                        </InputLabel>
                        <Box x={{ display: 'flex', whiteSpace: 'nowrap' }}>
                          <Typography sx={{ fontSize: '12px', fontWeight: '400', color: colors.greyColor }}>
                            {t('degreesC')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('notSuitable')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.not_suitable_for && detailProduct.not_suitable_for.length > 0
                        ? detailProduct.not_suitable_for.map((item) => item.name).join(', ')
                        : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('expirationDate')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.expiry_year ? detailProduct.expiry_year : t('noData')}
                    </InputLabel>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('advantages')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.advantage ? detailProduct.advantage : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('disadvantages')}</InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.disadvantage ? detailProduct.disadvantage : t('noData')}
                    </InputLabel>
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
                  {t('inventoryLimitProduct')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">
                      {t('minimumInventory')} (m<sup>2</sup>){' '}
                      <span style={{ fontWeight: '500', fontSize: '14px', color: colors.greyColor }}>
                        ({t('orderAlert')})
                      </span>
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.min_inventory ? formatNumber(detailProduct?.min_inventory) : t('noData')}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">
                      {t('maximumInventory')} (m<sup>2</sup>)
                    </InputLabel>
                    <InputLabel className="inputLabel-handbook-view">
                      {detailProduct && detailProduct.max_inventory ? formatNumber(detailProduct?.max_inventory) : t('noData')}
                    </InputLabel>
                  </Grid>
                </Grid>
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

export default ViewDetailProductPage
