import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit, TbEye } from 'react-icons/tb'
import QRCode from 'react-qr-code'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import House from '../../../asset/icon/House.svg'
import Length from '../../../asset/icon/Length.svg'
import Weigh from '../../../asset/icon/Weigh.svg'
import { formatNumber } from '../../../common/common'
import BasicTable from '../../../components/BasicTable'
import DownloadExcel from "../../../components/Buttons/DownloadExcel"
import SearchBar from '../../../components/Buttons/Search'
import CustomDatePicker from '../../../components/DateTime/DatePicker'
import LocationModal from '../../../components/Modal/Warehouse/WarehouseAreaManagement/Location'
import colors from '../../../constants/colors'
import headerCsvFileExportLocationDetail from "../../../constants/headerCsvFileExportLocationDetail"
import {
  exportDataProductByWarehouseLocationIdToExcelAction,
  getAllWarehouseLocationAction,
  getListProductByWarehouseLocationIdAction,
  getLocationDetailAction,
  removeMessageErrorAction,
  updateStatusDataExportProductByWarehouseLocationIdFlagAction,
  updateWarehouseLocationAction
} from '../../../redux/warehouse/warehouse.actions'
import {
  errorWarehouseLocationMessageState,
  exportProductDataByLocationIdState,
  getDataExportFlagState,
  getListAllWarehouseState,
  listProductByLocationIdState,
  locationDetailState,
  totalPagesListProductByLocationIdState,
  updateLocationSuccessMessageState
} from '../../../redux/warehouse/warehouse.selectors'
import { setListWarehousesLocationCurrentPage } from '../../../redux/warehouse/warehouse.slice'

export default function LocationDetail() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const locationDetail = useSelector(locationDetailState)
  const location = useLocation()
  const locationId = new URLSearchParams(location.search).get('id')
  const dispatch = useDispatch()
  const listProductByLocationId = useSelector(listProductByLocationIdState)
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const totalPages = useSelector(totalPagesListProductByLocationIdState)
  let componentRef = useRef()
  const [isOpenUpdateLocationModal, setIsOpenUpdateLocationModal] = useState(false)
  const updateLocationSuccessMessage = useSelector(updateLocationSuccessMessageState)
  const listWarehouses = useSelector(getListAllWarehouseState)
  const [selectedDateTotalKGwarehoused, setSelectedDateTotalKGwarehoused] = useState('')
  const [selectedDateTotalNumberLongMeters, setSelectedDateTotalNumberLongMeters] = useState('')
  const errorWarehouseLocationMessage = useSelector(errorWarehouseLocationMessageState)
  const [currentPage, setCurrentPage] = useState(1)
  const [fileName, setFileName] = useState('')
  const exportProductDataByLocationId = useSelector(exportProductDataByLocationIdState)
  const getDataExportFlag = useSelector(getDataExportFlagState)

  useEffect(() => {
    dispatch(getLocationDetailAction({ id: locationId }))
    dispatch(getListProductByWarehouseLocationIdAction({ warehouse_location_id: locationId }))
  }, [])

  useEffect(() => {
    if (updateLocationSuccessMessage) {
      dispatch(getLocationDetailAction({ id: locationId }))
      setIsOpenUpdateLocationModal(false)
    }
  }, [updateLocationSuccessMessage])

  useEffect(() => {
    if (selectedDateTotalKGwarehoused || selectedDateTotalNumberLongMeters) {
      dispatch(
        getLocationDetailAction({
          id: locationId,
          date_weight_import_warehouse: selectedDateTotalKGwarehoused,
          date_length_import_warehouse: selectedDateTotalNumberLongMeters
        })
      )
    }
  }, [selectedDateTotalKGwarehoused, selectedDateTotalNumberLongMeters])

  const handleSearch = () => {
    setLoading(true)
    setCurrentPage(1)
    dispatch(
      getListProductByWarehouseLocationIdAction({
        warehouse_location_id: locationId,
        search_product_warehouse: searchValue
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handleClearSearch = () => {
    setLoading(true)
    setCurrentPage(1)
    setSearchValue('')
    dispatch(getListProductByWarehouseLocationIdAction({ warehouse_location_id: locationId })).then(() => {
      setLoading(false)
    })
  }

  const handleEditLocation = () => {
    dispatch(getAllWarehouseLocationAction())
    setIsOpenUpdateLocationModal(true)
  }
  const handleCloseLocationModal = () => {
    setIsOpenUpdateLocationModal(false)
  }
  const updateWarehouseLocation = useCallback((values) => {
    dispatch(updateWarehouseLocationAction(values))
  }, [])

  const handleDateChangeTotalNumberLongMeters = (date) => {
    setSelectedDateTotalNumberLongMeters(date)
  }

  const handleDateChangeTotalKGwarehoused = (date) => {
    setSelectedDateTotalKGwarehoused(date)
  }

  const handlePageChange = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(setListWarehousesLocationCurrentPage(page))
    if (searchValue) {
      dispatch(
        getListProductByWarehouseLocationIdAction({
          search_product_warehouse: searchValue,
          page
        })
      ).then(() => {
        setLoading(false)
      })
    } else {
      dispatch({ page }).then(() => {
        setLoading(false)
      })
    }
  }

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  const handleOnChangeValue = (e) => {
    setSearchValue(e.target.value)
  }

  const handleView = (productId) => {
    const url = `/warehouse/productManagement/product-detail?id=${productId}`
    window.open(url, '_blank')
  }

  const handleExportExcel = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2)
    const currentDay = ('0' + currentDate.getDate()).slice(-2)
    const currentHour = ('0' + currentDate.getHours()).slice(-2)
    const currentMinute = ('0' + currentDate.getMinutes()).slice(-2)
    const dateString = `${currentYear}${currentMonth}${currentDay}${currentHour}${currentMinute}_`
    const fileName = `${dateString}${t('listProductsOrMaterialInStoredData')}`
    const fileNameWithExtension = `${fileName}.xlsx`
    setFileName(fileNameWithExtension)
    dispatch(exportDataProductByWarehouseLocationIdToExcelAction({
      search_product_warehouse: searchValue,
      warehouse_location_id: locationId
    }))
  }

  const updateFlagCallBack = () => {
    dispatch(updateStatusDataExportProductByWarehouseLocationIdFlagAction())
  }

  const headers = useMemo(
    () => [
      {
        key: 'commodityDode',
        label: t('commodityDode'),
        align: 'left'
      },
      {
        key: 'itemName',
        label: t('itemName'),
        align: 'left'
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
        key: 'supplierFullText',
        label: t('supplierFullText'),
        align: 'left'
      },
      {
        key: 'numberOfMetersSquare',
        label: t('numberOfMetersSquare'),
        align: 'right'
      },
      {
        key: 'numberOfDaysInStored',
        label: t('numberOfDaysInStored'),
        align: 'right'
      },
      {
        key: 'actions',
        label: t('actions')
      }
    ],
    [t]
  )

  const rows = useMemo(() => {
    return listProductByLocationId.map((row, index) => ({
      commodityDode: {
        label: row.code,
        cellWithButton: true
      },
      itemName: {
        label: row.product_name,
        cellWithButton: true
      },
      width: {
        label: `${formatNumber(row.width)}`,
        cellWithButton: true
      },
      length: {
        label: `${formatNumber(row.length)}`,
        cellWithButton: true
      },
      quantity: {
        label: row.quantity,
        cellWithButton: true
      },
      format: {
        label: row.finished_product_form_name,
        cellWithButton: true
      },
      supplierFullText: {
        label: row.supplier_name,
        cellWithButton: true
      },
      numberOfMetersSquare: {
        label: formatNumber(row.square_meter),
        cellWithButton: true
      },
      numberOfDaysInStored: {
        label: formatNumber(row.inventory_period),
        cellWithButton: true
      },
      actions: {
        label: (
          <>
            <Button className="button-action" onClick={() => handleView(row.id)}>
              <TbEye style={{ color: colors.lightroyalblueColor }} />
            </Button>
          </>
        ),
        cellWithButton: true
      },
      id: {
        label: row.id
      }
    }))
  }, [listProductByLocationId])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '0 !important',
          border: '1px solid #EFF0F6 !important'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '0px 16px !important',
            bgcolor: colors.lightlavendergrayColor,
            minHeight: '48px !important'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{
                bgcolor: colors.whiteColor,
                color: colors.lightroyalblueColor,
                mr: 1,
                minWidth: '30px',
                borderRadius: '8px'
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
            </Button>
            <Typography sx={{ fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor }}>
              {t('locationDetail')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title={locationDetail.disable_update === true ? t('canNotEditLocationWarehouse') : ''}>
              <Button
                className={`modalButtonClick ${locationDetail.disable_update === true ? 'disabled-cursor' : ''}`}
                onClick={locationDetail.disable_update === true ? null : handleEditLocation}
                sx={{ gap: '8px' }}
              >
                <TbEdit />
                {t('editLocation')}
              </Button>
            </Tooltip>
            <LocationModal
              locationId={locationDetail?.warehouse?.id}
              isEdit={true}
              dataLocation={locationDetail}
              open={isOpenUpdateLocationModal}
              handleSubmitAction={updateWarehouseLocation}
              handleClose={handleCloseLocationModal}
              dataWarehouse={listWarehouses}
              nameTitle={t('editLocation')}
              updateSuccess={updateLocationSuccessMessage}
              errorWarehouseLocationMessage={errorWarehouseLocationMessage}
              removeMessageError={removeMessageError}
            />
          </Box>
        </Toolbar>
      </Box>
      <Box p={2}>
        <Box>
          <Typography sx={{ color: colors.charcoalgrayColor }}>{locationDetail.code}</Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 600 }}>{locationDetail.warehouse_location_name}</Typography>
          {locationDetail.description && (
            <Typography sx={{ fontSize: 14, fontWeight: 500, wordBreak: 'break-word', whiteSpace: 'normal' }}>
              {t('note')}: {locationDetail.description}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
          <Box className="box-statistic">
            <Box>
              <Typography
                className="title-statistic"
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {t('QR')} -
                <ReactToPrint
                  trigger={() => (
                    <Button
                      sx={{
                        minWidth: '45px',
                        textTransform: 'none',
                        textDecoration: 'underline',
                        p: 0
                      }}
                    >
                      {t('Print')}
                    </Button>
                  )}
                  content={() => componentRef}
                />
              </Typography>
              <Box ref={(el) => (componentRef = el)}
                sx={{ display: 'flex', justifyContent: 'center', mt: '15px' }}>
                <QRCode
                  className="qr-code"
                  style={{ height: '70px', maxWidth: '100%', width: '70px' }}
                  value={locationDetail?.warehouse_location_qr || ''}
                />
                <Box className="qr-scan-text qr-scan-text-print">{locationDetail.warehouse_location_name}</Box>
              </Box>
            </Box>
          </Box>
          <Box className="box-statistic">
            <Box>
              <Typography className="title-statistic">{t('totalKGwarehoused')}</Typography>
              <CustomDatePicker className="custom-calendar" onChange={handleDateChangeTotalKGwarehoused} />
              <Box sx={{ display: 'flex', gap: '11px', mt: '5px', justifyContent: 'center' }}>
                <Weigh />
                <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                  <Typography sx={{ color: colors.lightroyalblueColor }} className="text">
                    {locationDetail.total_weight_import_warehouse != null
                      ? formatNumber(locationDetail.total_weight_import_warehouse)
                      : '\u00A0'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="box-statistic">
            <Box>
              <Typography className="title-statistic">{t('numberOfSquareMetersInStock')}</Typography>
              <CustomDatePicker className="custom-calendar" onChange={handleDateChangeTotalNumberLongMeters} />
              <Box sx={{ display: 'flex', gap: '11px', mt: '5px', justifyContent: 'center' }}>
                <Length />
                <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                  <Typography sx={{ color: colors.lightroyalblueColor }} className="text">
                    {locationDetail.total_square_meter_import_warehouse != null
                      ? formatNumber(locationDetail.total_square_meter_import_warehouse)
                      : '\u00A0'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="box-statistic">
            <Box>
              <Typography className="title-statistic">{t('currentInventory')}</Typography>
              <Box sx={{ display: 'flex', gap: '11px', mt: '30px', justifyContent: 'center' }}>
                <House />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <Typography
                    className="text-statistic">{formatNumber(locationDetail.weight_inventory)} Kg</Typography>
                  <Typography className="text-statistic">
                    {formatNumber(locationDetail.square_meter_inventory)} M<sup>2</sup>
                  </Typography>
                </Box>
              </Box>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" className="frontpager">
              {t('listProductsOrMaterialInStored')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <SearchBar
              searchValue={searchValue}
              handleOnChangeValue={handleOnChangeValue}
              handleSearch={handleSearch}
              handleClearSearch={handleClearSearch}
              placeholderText="enterProductNameAndProductCode"
              buttonText="find"
            />
            <Box sx={{ marginLeft: 'auto' }}>
              <DownloadExcel
                csvHeader={headerCsvFileExportLocationDetail}
                data={exportProductDataByLocationId}
                actionGetData={handleExportExcel}
                flagGetDetail={getDataExportFlag}
                updateFlagCallBack={updateFlagCallBack}
                filename={fileName}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            {!loading && (
              <BasicTable
                loading={loading}
                headers={headers}
                rows={rows}
                totalPages={totalPages}
                currentPage={currentPage}
                showIndex
                handlePageChange={handlePageChange}
                navigateToDetail={handleView}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}
