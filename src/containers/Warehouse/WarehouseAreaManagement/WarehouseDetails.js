// @ts-nocheck
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import colors from '../../../constants/colors'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TbEdit, TbEye } from 'react-icons/tb'
import TextField from '@mui/material/TextField'
import LocationModal from '../../../components/Modal/Warehouse/WarehouseAreaManagement/Location'
import Autocomplete from '@mui/material/Autocomplete'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
import {
    createWarehouseLocationAction,
    deleteWarehouseLocationAction,
    getAllWarehouseLocationAction,
    getDetailWarehouseAction,
    getListWarehousesLocationAction,
    getLocationDetailAction,
    removeMessageErrorAction,
    updateWarehouseAction,
    updateWarehouseLocationAction
} from '../../../redux/warehouse/warehouse.actions'
import {
    createWarehouseLocationSuccessFlagState,
    deleteLocationSuccessMessageState,
    detailWarehouseState,
    errorUpdateWarehouseMessageState,
    errorWarehouseLocationMessageState,
    getListAllWarehouseState,
    listWarehousesLocationState,
    locationDetailState,
    totalPagesListWarehousesLocationState,
    updateLocationSuccessMessageState,
    updateWarehouseSuccessFlagState
} from '../../../redux/warehouse/warehouse.selectors'
import { setListWarehousesLocationCurrentPage } from '../../../redux/warehouse/warehouse.slice'
import { formatNumber } from '../../../common/common'
import CustomDatePicker from '../../../components/DateTime/DatePicker'
import Warehouse from '../../../asset/icon/Warehouse.svg'
import Weigh from '../../../asset/icon/Weigh.svg'
import Length from '../../../asset/icon/Length.svg'
import House from '../../../asset/icon/House.svg'
import WarehouseAreaModal from 'components/Modal/Warehouse/WarehouseAreaManagement/WarehouseArea'
import { listBranchsState } from '../../../redux/account/account.selectors'
import { useUser } from '../../../contexts/AuthContext'
import { getListAllBranchAction } from '../../../redux/account/account.actions'
import roles from '../../../constants/titleRole'
import HeaderPage from 'components/HeaderPage'
import BasicTable from "../../../components/BasicTable";
import ModalDelete from "../../../components/Modal/Common/delete";
import Tooltip from "@mui/material/Tooltip";

export default function WarehouseDetails() {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const locationId = new URLSearchParams(location.search).get('id')
    const dispatch = useDispatch()
    const listWarehousesLocation = useSelector(listWarehousesLocationState)
    const totalPagesListWarehousesLocation = useSelector(totalPagesListWarehousesLocationState)
    const [searchWarehouseLocation, setSearchWarehouseLocation] = useState('')
    const [loadingWarehouseLocationTable, setLoadingWarehouseLocationTable] = useState(false)
    const [isOpenLocationModal, setIsOpenLocationModal] = useState(false)
    const locationDetail = useSelector(locationDetailState)
    const [isOpenUpdateLocationModal, setIsOpenUpdateLocationModal] = useState(false)
    const listWarehouses = useSelector(getListAllWarehouseState)
    const errorWarehouseLocationMessage = useSelector(errorWarehouseLocationMessageState)
    const updateLocationSuccessMessage = useSelector(updateLocationSuccessMessageState)
    const createWarehouseLocationSuccessFlag = useSelector(createWarehouseLocationSuccessFlagState)
    const deleteLocationSuccessMessage = useSelector(deleteLocationSuccessMessageState)
    const updateWarehouseSuccessFlag = useSelector(updateWarehouseSuccessFlagState)
    const errorUpdateWarehouseMessage = useSelector(errorUpdateWarehouseMessageState)
    const [selectedDateTotalKGwarehoused, setSelectedDateTotalKGwarehoused] = useState('')
    const [selectedDateTotalNumberSquareMeters, setSelectedDateTotalNumberSquareMeters] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isEdit, setIsEdit] = useState(false)
    const [warehouseLocationType, setWarehouseLocationType] = useState(null)
    const [isOpenWarehouseModal, setIsOpenWarehouseModal] = useState(false)
    const detailWarehouse = useSelector(detailWarehouseState)
    const listBranch = useSelector(listBranchsState)
    const { userInfo } = useUser()
    const userRole = useMemo(() => userInfo.role?.name ?? '', [userInfo])
    const userBranch = useMemo(() => userInfo.branch?.id ?? '', [userInfo])

    useEffect(() => {
        dispatch(getDetailWarehouseAction({ id: locationId }))
        dispatch(getListAllBranchAction())
        dispatch(getAllWarehouseLocationAction())
    }, [])

    useEffect(() => {
        const searchWarehouseLocationSelected = localStorage.getItem('searchWarehouseLocation')
        const warehouseLocationTypeSelected = localStorage.getItem('warehouseLocationType')
        setSearchWarehouseLocation(searchWarehouseLocationSelected)
        setWarehouseLocationType(warehouseLocationTypeSelected)
        setLoadingWarehouseLocationTable(true)
        setCurrentPage(1)

        const searchParams = {
            warehouse_id: locationId,
            search_warehouse_location: searchWarehouseLocationSelected || '',
            warehouse_location_type_id: warehouseLocationTypeSelected || null
        }

        dispatch(getListWarehousesLocationAction(searchParams)).then(() => {
            setLoadingWarehouseLocationTable(false)
        })
    }, [])

    useEffect(() => {
        if (updateWarehouseSuccessFlag) {
            dispatch(getDetailWarehouseAction({ id: locationId }))
        }
    }, [updateWarehouseSuccessFlag])

    useEffect(() => {
        if (createWarehouseLocationSuccessFlag || deleteLocationSuccessMessage || updateLocationSuccessMessage) {
            setIsOpenLocationModal(false)
            setIsOpenUpdateLocationModal(false)
            setCurrentPage(1)
            dispatch(
                getListWarehousesLocationAction({
                    warehouse_id: locationId,
                    search_warehouse_location: searchWarehouseLocation,
                    warehouse_location_type_id: warehouseLocationType
                })
            )
        }
    }, [createWarehouseLocationSuccessFlag, deleteLocationSuccessMessage, updateLocationSuccessMessage])

    const handleEditWarehouse = () => {
        setIsEdit(true)
        setIsOpenWarehouseModal(true)
    }

    const handleUpdateWarehouse = useCallback(
        async (value) => {
            try {
                setLoading(true)
                await dispatch(updateWarehouseAction(value))
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
            setCurrentPage(1)
        },
        [dispatch]
    )

    const handleSearchWarehouseLocation = () => {
        setLoadingWarehouseLocationTable(true)
        setCurrentPage(1)
        dispatch(
            getListWarehousesLocationAction({
                search_warehouse_location: searchWarehouseLocation,
                warehouse_location_type_id: warehouseLocationType,
                warehouse_id: locationId
            })
        ).then(() => {
            setLoadingWarehouseLocationTable(false)
        })
    }

    const handleClearSearchWarehouseLocation = () => {
        setSearchWarehouseLocation('')
        localStorage.removeItem('searchWarehouseLocation')
        setCurrentPage(1)
        setLoadingWarehouseLocationTable(true)
        dispatch(
            getListWarehousesLocationAction({
                search_warehouse_location: '',
                warehouse_location_type_id: warehouseLocationType,
                warehouse_id: locationId
            })
        ).then(() => {
            setLoadingWarehouseLocationTable(false)
        })
    }

    useEffect(() => {
        if (selectedDateTotalKGwarehoused || selectedDateTotalNumberSquareMeters) {
            setCurrentPage(1)
            dispatch(
                getDetailWarehouseAction({
                    id: locationId,
                    date_weight_import_warehouse: selectedDateTotalKGwarehoused,
                    date_square_meter_import_warehouse: selectedDateTotalNumberSquareMeters
                })
            )
        }
    }, [selectedDateTotalKGwarehoused, selectedDateTotalNumberSquareMeters])

    const handleOpenLocationModal = () => {
        dispatch(getAllWarehouseLocationAction())
        setIsOpenLocationModal(true)
    }

    const removeMessageError = useCallback(() => {
        dispatch(removeMessageErrorAction())
    }, [dispatch])

    const handlePageChangeWarehouseLocationTable = (event, page) => {
        setLoadingWarehouseLocationTable(true)
        setCurrentPage(page)
        dispatch(setListWarehousesLocationCurrentPage(page))
        if (searchWarehouseLocation) {
            dispatch(
                getListWarehousesLocationAction({
                    search_warehouse_location: searchWarehouseLocation,
                    page,
                    warehouse_id: locationId,
                    warehouse_location_type_id: warehouseLocationType
                })
            ).then(() => {
                setLoadingWarehouseLocationTable(false)
            })
        } else {
            dispatch(
                getListWarehousesLocationAction({
                    page,
                    warehouse_id: locationId,
                    warehouse_location_type_id: warehouseLocationType
                })
            ).then(() => {
                setLoadingWarehouseLocationTable(false)
            })
        }
    }

    const deleteLocation = useCallback((params) => {
        dispatch(deleteWarehouseLocationAction(params))
    }, [])

    const createWarehouseLocation = useCallback((values) => {
        dispatch(createWarehouseLocationAction(values))
    }, [])

    const handleGetLocationDetail = useCallback((locationId) => {
        dispatch(getAllWarehouseLocationAction())
        dispatch(getLocationDetailAction({ id: locationId }))
        setIsOpenUpdateLocationModal(true)
    }, [])

    const updateWarehouseLocation = useCallback((values) => {
        dispatch(updateWarehouseLocationAction(values))
    }, [])

    const handleDateChangeTotalKGwarehoused = (date) => {
        setSelectedDateTotalKGwarehoused(date)
    }

    const handleCloseLocationModal = () => {
        setIsOpenLocationModal(false)
        setIsOpenUpdateLocationModal(false)
    }

    const handleCloseWarehouseModal = () => {
        setIsOpenWarehouseModal(false)
    }

    const handleDateChangeTotalNumberSquareMeters = (date) => {
        setSelectedDateTotalNumberSquareMeters(date)
    }

    const handleOnChangeValue = (e) => {
        setSearchWarehouseLocation(e.target.value)
        localStorage.setItem('searchWarehouseLocation', e.target.value)
    }

    const handleWarehouseTypeChange = (event, value) => {
        setWarehouseLocationType(value ? value.id : '')
        localStorage.setItem('warehouseLocationType', value ? value.id : '')
    }

    const handleClearFilterWarehouseType = () => {
        localStorage.removeItem('warehouseLocationType')
        setWarehouseLocationType(null)
        setLoadingWarehouseLocationTable(true)
        setCurrentPage(1)
        dispatch(
            getListWarehousesLocationAction({
                search_warehouse_location: searchWarehouseLocation,
                warehouse_id: locationId
            })
        ).then(() => {
            setLoadingWarehouseLocationTable(false)
        })
    }

    useEffect(() => {
        if (warehouseLocationType) {
            handleSearchWarehouseLocation()
        }
    }, [warehouseLocationType])

    const headers = useMemo(
        () => [
            {
                key: 'locationCode',
                label: t('locationCode'),
                align: 'left'
            },
            {
                key: 'locationName',
                label: t('locationName'),
                align: 'left'
            },
            {
                key: 'numberOfKgStored',
                label: t('numberOfKgStored'),
                align: 'right'
            },
            {
                key: 'numberOfSquareMetersOfStorage',
                label: t('numberOfSquareMetersOfStorage'),
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
        return listWarehousesLocation.map((row, index) => ({
            locationCode: {
                label: row.code,
                cellWithButton: true
            },
            locationName: {
                label: row.warehouse_location_name,
                cellWithButton: true
            },
            numberOfKgStored: {
                label: formatNumber(row.weight_inventory),
                cellWithButton: true
            },
            numberOfSquareMetersOfStorage: {
                label: formatNumber(row.square_meter_inventory),
                cellWithButton: true
            },
            actions: {
                label: (
                    <>
                        <Button onClick={() => handleView(row.id)} className="button-action">
                            <TbEye style={{ color: colors.lightroyalblueColor, width: 24, height: 24 }} />
                        </Button>
                        <Tooltip title={row.disable_update === true ? t('canNotEditLocationWarehouse') : ''}>
                            <Button
                                className={`button-action ${row.disable_update === true ? 'disabled-cursor' : ''}`}
                                onClick={row.disable_update === true ? null : () => handleGetLocationDetail(row.id)}
                            >
                                <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
                            </Button>
                        </Tooltip>
                        <ModalDelete
                            disable={row.disable_delete}
                            successMessage={deleteLocationSuccessMessage}
                            id={row.id}
                            buttonName={t('delete')}
                            handleDelete={deleteLocation}
                            tooltipMessage={t('canNotDeleteLocationWarehouse')}
                        />
                    </>
                ),
            },
            id: {
                label: row.id
            }
        }))
    }, [listWarehousesLocation])

    const handleView = (locationId) => {
        navigate(`/warehouse/warehouse-area-management/location-detail?id=${locationId}`)
    }

    return (
        <>
            <HeaderPage
                title={t('warehouseDetail')}
                actionButton={
                    <Button
                        className='modalButtonClick'
                        sx={{ gap: '8px' }}
                        onClick={handleEditWarehouse}
                    >
                        <TbEdit />
                        {t('editWarehouse')}
                    </Button>
                }
            />

            <Box p={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ color: colors.charcoalgrayColor }}>{detailWarehouse.code}</Typography>
                        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>{detailWarehouse.warehouse_name}</Typography>
                        {detailWarehouse.description && (
                            <Typography
                                sx={{ fontSize: 14, fontWeight: 500, wordBreak: 'break-word', whiteSpace: 'normal' }}>
                                {t('note')}: {detailWarehouse.description}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
                    <Box className="box-statistic">
                        <Box>
                            <Typography className="title-statistic">{t('totalNumberOfPositions')}</Typography>
                            <Box sx={{ display: 'flex', gap: '11px', mt: '30px' }}>
                                <Warehouse />
                                <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                                    <Typography sx={{ color: colors.lightroyalblueColor }} className="text">
                                        {formatNumber(detailWarehouse.total_warehouse_location)}
                                    </Typography>
                                </Box>
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
                                        {detailWarehouse.total_weight_import_warehouse != null
                                            ? formatNumber(detailWarehouse.total_weight_import_warehouse)
                                            : '\u00A0'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="box-statistic">
                        <Box>
                            <Typography className="title-statistic">{t('numberOfSquareMetersInStock')}</Typography>
                            <CustomDatePicker className="custom-calendar"
                                onChange={handleDateChangeTotalNumberSquareMeters} />
                            <Box sx={{ display: 'flex', gap: '11px', mt: '5px', justifyContent: 'center' }}>
                                <Length />
                                <Box sx={{ display: 'flex', alignItems: 'center ' }}>
                                    <Typography sx={{ color: colors.lightroyalblueColor }} className="text">
                                        {detailWarehouse.total_square_meter_import_warehouse != null
                                            ? formatNumber(detailWarehouse.total_square_meter_import_warehouse)
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
                                    <Typography className="text-statistic">
                                        {formatNumber(detailWarehouse.weight_inventory)} Kg
                                    </Typography>
                                    <Typography className="text-statistic">
                                        {formatNumber(detailWarehouse.square_meter_inventory)} M<sup>2</sup>
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
                        borderRadius: '6px',
                        position: 'relative',
                        flexGrow: 1
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Typography gutterBottom className="customer-detail-title">
                                {t('listOfLocations')}
                            </Typography>
                            <Button
                                className="modalButtonClick"
                                sx={{ gap: '8px', marginLeft: 'auto' }}
                                onClick={handleOpenLocationModal}
                            >
                                <TbEdit />
                                {t('addLocation')}
                            </Button>
                            <LocationModal
                                locationId={locationId}
                                open={isOpenLocationModal}
                                handleSubmitAction={createWarehouseLocation}
                                handleClose={handleCloseLocationModal}
                                dataWarehouse={listWarehouses}
                                nameTitle={t('addLocationInStored')}
                                errorWarehouseLocationMessage={errorWarehouseLocationMessage}
                                createSuccessFlag={createWarehouseLocationSuccessFlag}
                                removeMessageError={removeMessageError}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                            <TextField
                                size="small"
                                placeholder={t('locationCodeName')}
                                value={searchWarehouseLocation}
                                onChange={handleOnChangeValue}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleSearchWarehouseLocation()
                                    }
                                }}
                                sx={{ width: '210px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                                InputProps={{
                                    endAdornment: searchWarehouseLocation && (
                                        <InputAdornment position="end">
                                            <IconButton sx={{ color: colors.blackColor }}
                                                onClick={handleClearSearchWarehouseLocation}>
                                                <IoCloseOutline />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true
                                }}
                            />
                            <Box>
                                <Button
                                    className="modalButton"
                                    sx={{
                                        ml: 1,
                                        gap: '8px',
                                        textAlign: 'center',
                                        lineHeight: '16.94px',
                                        '&:hover': {
                                            backgroundColor: colors.blueColor,
                                            color: colors.lilywhiteColor
                                        }
                                    }}
                                    onClick={handleSearchWarehouseLocation}
                                >
                                    <IoSearchOutline style={{ fontSize: '16px' }} />
                                    {t('find')}
                                </Button>
                            </Box>
                            <Autocomplete
                                popupIcon={<PolygonIcon />}
                                size="small"
                                className="autocomplete-container"
                                options={listWarehouses}
                                value={listWarehouses.find((option) => option.id === Number(warehouseLocationType)) || null}
                                onChange={(event, value) => {
                                    handleWarehouseTypeChange(event, value)
                                    if (!value) {
                                        handleClearFilterWarehouseType()
                                    }
                                }}
                                getOptionLabel={(option) => option.warehouse_location_type_name}
                                renderInput={(params) => <TextField {...params} placeholder={t('locationType')}
                                    variant="outlined" />}
                                ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                                classes={{ inputRoot: 'custom-input-search' }}
                                sx={{ minWidth: '13rem' }}
                            />
                        </Box>
                    </Box>
                    <Box>
                        {!loadingWarehouseLocationTable && (
                            <BasicTable
                                loading={loadingWarehouseLocationTable}
                                headers={headers}
                                rows={rows}
                                totalPages={totalPagesListWarehousesLocation}
                                currentPage={currentPage}
                                showIndex
                                handlePageChange={handlePageChangeWarehouseLocationTable}
                                navigateToDetail={handleView}
                            />
                        )}
                        <LocationModal
                            locationId={locationId}
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
                </Box>
                <WarehouseAreaModal
                    isLoading={loading}
                    setLoading={setLoading}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    open={isOpenWarehouseModal}
                    handleEditWarehouse={handleUpdateWarehouse}
                    onClose={handleCloseWarehouseModal}
                    userRole={userRole}
                    userBranch={userBranch}
                    listBranch={listBranch}
                    currentData={detailWarehouse}
                    updateWarehouseSuccessFlag={updateWarehouseSuccessFlag}
                    errorUpdateWarehouseMessage={errorUpdateWarehouseMessage}
                    removeMessageError={removeMessageError}
                />
            </Box>
        </>
    )
}
