// @ts-nocheck
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ConsultantIcon from 'asset/icon/ConsultantIcon.svg'
import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {HiChevronDown, HiChevronUp} from 'react-icons/hi2'
import {LuScrollText} from 'react-icons/lu'
import {TbBook, TbEdit} from 'react-icons/tb'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import ClaimIcon from '../../../../asset/icon/Claim.svg'
import DebtIcon from '../../../../asset/icon/Debt.svg'
import GrowthIcon from '../../../../asset/icon/Growth.svg'
import RevenueIcon from '../../../../asset/icon/Revenue.svg'
import {formatCurrency} from '../../../../common/common'
import RevenueChart from '../../../../components/Chart/Sale/RevenueChart'
import colors from '../../../../constants/colors'
import commons from '../../../../constants/common'
import {
    getAllClaimProblemAction,
    getAllClaimStatusAction,
    getCustomerInformationAction,
    getCustomerListAction,
    getListAllStatusOrderByCustomerAction,
    getListClaimHistoriesByCustomerIdAction,
    getListOrderByCustomerAction,
    getListProposalDebtAgeByCustomerIdAction,
    getListSalesInChargeAction,
    getQuotationHistoriesByCustomerIdAction,
    getQuotationListAction
} from '../../../../redux/customer/customer.actions'
import {
    claimHistoriesListTotalPagesState,
    getCustomerDetailsState,
    listClaimHistoriesState,
    listOrderByCustomerState,
    listOrderByCustomerTotalPagesState,
    listProposalDebtAgeByCustomerIdState,
    listQuotationHistoriesState,
    proposalDebtAgeTotalPagesState,
    quotationHistoriesListTotalPagesState
} from '../../../../redux/customer/customer.selectors'
import {getAllProposalStatusAction, getStatisticProposalAction} from '../../../../redux/proposal/proposal.actions'
import {createProposalDebtAgeSuccessState} from '../../../../redux/proposal/proposal.selectors'
import '../../../../resource/style/ComboBoxStyle.css'
import '../../../../resource/style/CustomerDetailStyle.css'
import CustomerListTransactionTable from "../../../../components/Table/CustomerTable/ListTransactionTable";
import titleTableDetailCustomer from "../../../../constants/titleTableDetailCustomer";
import QuotationHistoriesTable from "../../../../components/Table/CustomerTable/QuotationHistoriesTable";
import ClaimHistoriesTable from "../../../../components/Table/CustomerTable/ClaimHistoriesTable";
import ProposalDebtAgeTable from "../../../../components/Table/CustomerTable/ProposalDebtAgeTable";

const StyledTableCell = styled(TableCell)(({theme}) => ({
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

function CustomerDetailMobile() {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const customerDetail = useSelector(getCustomerDetailsState)
    const listQuotationHistories = useSelector(listQuotationHistoriesState)
    const listClaimHistories = useSelector(listClaimHistoriesState)
    const quotationHistoriesListTotalPages = useSelector(quotationHistoriesListTotalPagesState)
    const listOrderByCustomer = useSelector(listOrderByCustomerState)
    const listProposalDebtAgeByCustomerId = useSelector(listProposalDebtAgeByCustomerIdState)
    const listOrderByCustomerTotalPages = useSelector(listOrderByCustomerTotalPagesState)
    const location = useLocation()
    const customerId = new URLSearchParams(location.search).get('id')
    const navigate = useNavigate()
    let validAddressOfficeCount = 0
    let validAddressFactoryCount = 0
    let validAddressBranchCount = 0
    const [loading, setLoading] = useState(false)
    const [loadingListOrderByCustomer, setLoadingListOrderByCustomer] = useState(false)
    const [claimStatusId] = useState('')
    const claimHistoriesListTotalPages = useSelector(claimHistoriesListTotalPagesState)
    const createProposalDebtAgeSuccess = useSelector(createProposalDebtAgeSuccessState)
    const proposalDebtAgeTotalPages = useSelector(proposalDebtAgeTotalPagesState)
    const [isShowBranchAddress, setIsShowBranchAddress] = useState(false)
    const [isShowOfficeAddress, setIsShowOfficeAddress] = useState(false)
    const [isShowFactoryAddress, setIsShowFactoryAddress] = useState(false)
    const [selectedHistoryOption, setSelectedHistoryOption] = useState('transaction')
    const [currentPageCustomerListTransaction, setCurrentPageCustomerListTransaction] = useState(1)
    const [currentPageQuotationHistories, setCurrentPageQuotationHistories] = useState(1)
    const [currentPageClaimHistories, setCurrentPageClaimHistories] = useState(1)
    const [currentPageProposalDebtAge, setCurrentPageProposalDebtAge] = useState(1)

    const handleChangeViewOption = (event) => {
        setSelectedHistoryOption(event.target.value)
    }

    const handleClickToggle = (type) => {
        if (type == commons.OFFICE_ADDRESS) {
            setIsShowOfficeAddress(!isShowOfficeAddress)
        } else if (type == commons.FACTORY_ADDRESS) {
            setIsShowFactoryAddress(!isShowFactoryAddress)
        } else if (type == commons.BRANCH_ADDRESS) {
            setIsShowBranchAddress(!isShowBranchAddress)
        }
    }

    useEffect(() => {
        if (createProposalDebtAgeSuccess) {
            dispatch(getListProposalDebtAgeByCustomerIdAction({customerId: customerId}))
        }
    }, [createProposalDebtAgeSuccess])

    useEffect(() => {
        dispatch(getCustomerInformationAction({id: customerId, from_date: '', to_date: ''}))
        dispatch(getQuotationHistoriesByCustomerIdAction({customerId: customerId}))
        dispatch(getListClaimHistoriesByCustomerIdAction({customerId: customerId}))
        dispatch(getListSalesInChargeAction())
        dispatch(getQuotationListAction({customer_id: customerId}))
        dispatch(getListAllStatusOrderByCustomerAction())
        dispatch(getAllClaimStatusAction())
        dispatch(getCustomerListAction())
        dispatch(getAllProposalStatusAction())
        dispatch(getListProposalDebtAgeByCustomerIdAction({customerId: customerId}))
        dispatch(getStatisticProposalAction())
        dispatch(getAllClaimProblemAction())
        dispatch(getListOrderByCustomerAction({customer_id: customerId}))
    }, [])

    const openCustomerHandbook = () => {
        navigate(`/handbook-mobile?id=${customerId}`)
    }
    const openQuoteModal = () => {
        navigate(`/quote?id=${customerId}`)
    }

    const openConsultantHistoryPage = () => {
        navigate(`/sale/information/consultant-history?customer_id=${customerId}`)
    }

    const handlePageChangeListQuotationHistories = (event, page) => {
        setLoading(true)
        setCurrentPageQuotationHistories(page)
        dispatch(getQuotationHistoriesByCustomerIdAction({page: page, customerId: customerId})).then(() => {
            setLoading(false)
        })
    }

    const handlePageChangeListProposalDebtAge = (event, page) => {
        setLoading(true)
        setCurrentPageProposalDebtAge(page)
        dispatch(getListProposalDebtAgeByCustomerIdAction({page: page, customerId: customerId})).then(() => {
            setLoading(false)
        })
    }

    const handlePageChangeListOrderByCustomer = (event, page) => {
        setLoadingListOrderByCustomer(true)
        setCurrentPageCustomerListTransaction(page)
        dispatch(getListOrderByCustomerAction({customer_id: customerId, page})).then(() => {
            setLoadingListOrderByCustomer(false)
        })
    }

    const handlePageChangeHistoryClaim = (event, page) => {
        setLoading(true)
        setCurrentPageClaimHistories(page)
        dispatch(
            getListClaimHistoriesByCustomerIdAction({
                page: page,
                customerId: customerId,
                claimStatusId: claimStatusId
            })
        ).then(() => {
            setLoading(false)
        })
    }

    const handleOpenEdit = () => {
        navigate(`/update-customer?id=${customerId}`)
    }

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
                        p: '8px !important',
                        bgcolor: colors.lightlavendergrayColor,
                        minHeight: '48px !important',
                        border: '1px solid #EFF0F6 !important'
                    }}
                >
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
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
                            <ArrowBackIosNewIcon sx={{fontSize: 16}}/>
                        </Button>
                        <Typography sx={{fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor}}>
                            {t('customerInformation')}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            disabled={customerDetail.disable_update}
                            className={`modalButtonClick ${customerDetail.disable_update ? 'disabled-cursor' : ''}`}
                            sx={{gap: '8px'}}
                            onClick={() => handleOpenEdit()}
                        >
                            <TbEdit style={{fontSize: '16px', marginBottom: '2px'}}/>
                            {t('editAction')}
                        </Button>
                    </Box>
                </Toolbar>
            </Box>
            <Box p={1}>
                <Box>
                    <Typography sx={{color: colors.charcoalgrayColor}}>{t('customer')}</Typography>
                    <Typography sx={{fontSize: 22, fontWeight: 600}}>{customerDetail.customer_name}</Typography>
                </Box>
                <Box>
                    <Box className="button-container">
                        <Button
                            disabled={customerDetail.disable_update}
                            className={`buttons-customer-mobile ${customerDetail.disable_update ? 'disabled-cursor' : ''}`}
                            onClick={() => openConsultantHistoryPage()}
                        >
                            <ConsultantIcon style={{fontSize: '16px', marginBottom: '2px'}}/>
                            {t('btnConsultant')}
                        </Button>
                        <Button
                            disabled={customerDetail.disable_update}
                            className={`buttons-customer-mobile ${customerDetail.disable_update ? 'disabled-cursor' : ''}`}
                            onClick={() => openQuoteModal()}
                        >
                            <LuScrollText
                                style={{
                                    transform: 'scaleX(-1)',
                                    fontSize: '16px',
                                    marginBottom: '2px'
                                }}
                            />
                            {t('quotes')}
                        </Button>
                        <Button
                            disabled={customerDetail.disable_update}
                            className={`buttons-customer-mobile ${customerDetail.disable_update ? 'disabled-cursor' : ''}`}
                            onClick={() => openCustomerHandbook()}
                        >
                            <TbBook style={{fontSize: '16px', marginBottom: '2px'}}/>
                            {t('customerHandbook')}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 1}}>
                    <Box className="box">
                        <GrowthIcon/>
                        <Box>
                            <Typography className="title">{t('revenue')}</Typography>
                            <Typography
                                className="text">{formatCurrency(customerDetail.total_revenue || 0)}</Typography>
                        </Box>
                    </Box>
                    <Box className="box">
                        <RevenueIcon/>
                        <Box>
                            <Typography className="title">{t('profitParameter')}</Typography>
                            <Typography className="text">{formatCurrency(129000000)}</Typography>
                        </Box>
                    </Box>
                    <Box className="box">
                        <DebtIcon/>
                        <Box>
                            <Typography className="title">{t('accountsPayable')}</Typography>
                            <Typography className="text">{formatCurrency(-200000000)}</Typography>
                        </Box>
                    </Box>
                    <Box className="box">
                        <ClaimIcon/>
                        <Box>
                            <Typography className="title">{t('claimParameter')}</Typography>
                            <Typography className="text">{customerDetail.claims || 0}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    component="form"
                    sx={{
                        bgcolor: colors.lilywhiteColor,
                        p: 1,
                        mt: 1,
                        borderRadius: '8px',
                        position: 'relative',
                        flexGrow: 1
                    }}
                >
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="h6" className="frontpager">
                            {t('basicInformation')}
                        </Typography>
                    </Box>
                    <TableContainer>
                        <Table sx={{border: 'none'}}>
                            <TableBody>
                                <TableRow>
                                    <StyledTableCell
                                        component="th"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            pr: '16px !important',
                                            width: '140px'
                                        }}
                                    >
                                        <Typography className="label-info">{t('customerCode')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography className="result-letters">{customerDetail.code}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell
                                        component="th"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            pr: '16px !important',
                                            width: '140px'
                                        }}
                                    >
                                        <Typography className="label-info">{t('firstAndLastName')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography
                                            className="result-letters">{customerDetail.customer_name}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell
                                        component="th"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            pr: '16px !important',
                                            width: '140px'
                                        }}
                                    >
                                        <Typography className="label-info">{t('companyName')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography
                                            className="result-letters">{customerDetail.company_name}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell
                                        component="th"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            pr: '16px !important',
                                            width: '140px'
                                        }}
                                    >
                                        <Typography className="label-info">{t('phoneNumber')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography
                                            className="result-letters">{customerDetail.phone_number}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                                {customerDetail.zalo_number && (
                                    <TableRow>
                                        <StyledTableCell
                                            component="th"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                pr: '16px !important',
                                                width: '140px'
                                            }}
                                        >
                                            <Typography className="label-info">{t('zaloNumber')}:</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Typography className="result-letters">
                                                {customerDetail.zalo_number ? customerDetail.zalo_number : '\u00A0'}
                                            </Typography>
                                        </StyledTableCell>
                                    </TableRow>
                                )}
                                <TableRow>
                                    <StyledTableCell
                                        component="th"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            pr: '16px !important',
                                            width: '140px'
                                        }}
                                    >
                                        <Typography className="label-info">{t('debtLimit')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography className="result-letters">
                                            {formatCurrency(customerDetail.debt_limit ? customerDetail.debt_limit : '\u00A0')}
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell
                                        component="th"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            pr: '16px !important',
                                            width: '140px'
                                        }}
                                    >
                                        <Typography className="label-info">{t('debtAge')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography className="result-letters">
                                            {customerDetail.debt_age?.debt_age_name
                                                ? customerDetail.debt_age.debt_age_name
                                                : t('notDebtAgeYet')}
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell
                                        component="th"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            pr: '16px !important',
                                            width: '140px'
                                        }}
                                    >
                                        <Typography className="label-info">{t('salesInCharge')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography className="result-letters">
                                            {customerDetail.users && customerDetail.users.length > 0
                                                ? customerDetail.users.map((user) => user.name).join(', ')
                                                : '\u00A0'}
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/*----------------------Address Branch----------------------*/}
                    {customerDetail.address_branches && customerDetail.address_branches.length > 0 ? (
                        <>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography className="label-info" sx={{color: colors.indigoColor}}>
                                    {t('branch')}
                                </Typography>
                                {!isShowBranchAddress ? (
                                    <HiChevronDown
                                        onClick={() => handleClickToggle(commons.BRANCH_ADDRESS)}
                                        style={{cursor: 'pointer', fontSize: '24px', color: colors.lightGreyColor}}
                                    />
                                ) : (
                                    <HiChevronUp
                                        onClick={() => handleClickToggle(commons.BRANCH_ADDRESS)}
                                        style={{cursor: 'pointer', fontSize: '24px', color: colors.lightGreyColor}}
                                    />
                                )}
                            </Box>
                            {isShowBranchAddress && (
                                <>
                                    {customerDetail.address_branches.map((branch, index) => {
                                        if (branch.address_branch_name) {
                                            validAddressBranchCount++
                                            return (
                                                <TableContainer key={index}>
                                                    <Table sx={{border: 'none'}}>
                                                        <TableRow sx={{verticalAlign: 'baseline'}}>
                                                            <StyledTableCell
                                                                component="th"
                                                                sx={{
                                                                    whiteSpace: 'nowrap',
                                                                    width: '170px',
                                                                    borderBottom: 'none',
                                                                    p: '0 16px'
                                                                }}
                                                            >
                                                                <Typography className="label-info">
                                                                    {t('branch')} {validAddressBranchCount}:
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell sx={{
                                                                whiteSpace: 'pre-line',
                                                                borderBottom: 'none',
                                                                p: 0
                                                            }}>
                                                                <Typography sx={{lineHeight: '20px !important'}}
                                                                            className="result-letters">
                                                                    {branch.address_branch_name && `${branch.address_branch_name}`}
                                                                </Typography>
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    </Table>
                                                </TableContainer>
                                            )
                                        } else {
                                            return null
                                        }
                                    })}
                                </>
                            )}
                        </>
                    ) : null}
                    {/*----------------------Office Address----------------------*/}
                    {customerDetail.address_offices && customerDetail.address_offices.length > 0 ? (
                        <>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography className="label-info" sx={{color: colors.indigoColor}}>
                                    {t('officeAddress')}
                                </Typography>
                                {!isShowOfficeAddress ? (
                                    <HiChevronDown
                                        onClick={() => handleClickToggle(commons.OFFICE_ADDRESS)}
                                        style={{cursor: 'pointer', fontSize: '24px', color: colors.lightGreyColor}}
                                    />
                                ) : (
                                    <HiChevronUp
                                        onClick={() => handleClickToggle(commons.OFFICE_ADDRESS)}
                                        style={{cursor: 'pointer', fontSize: '24px', color: colors.lightGreyColor}}
                                    />
                                )}
                            </Box>
                            {isShowOfficeAddress && (
                                <>
                                    {customerDetail.address_offices.map((address, index) => {
                                        if (
                                            address.address.detail ||
                                            address.address.ward ||
                                            address.address.district ||
                                            address.address.province
                                        ) {
                                            validAddressOfficeCount++
                                            return (
                                                <TableContainer key={index}>
                                                    <Table sx={{border: 'none'}}>
                                                        <TableRow sx={{verticalAlign: 'baseline'}}>
                                                            <StyledTableCell
                                                                component="th"
                                                                sx={{
                                                                    whiteSpace: 'nowrap',
                                                                    width: '170px',
                                                                    borderBottom: 'none',
                                                                    p: '0 16px'
                                                                }}
                                                            >
                                                                <Typography className="label-info">
                                                                    {t('officeAddress')} {validAddressOfficeCount}:
                                                                </Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell sx={{
                                                                whiteSpace: 'pre-line',
                                                                borderBottom: 'none',
                                                                p: 0
                                                            }}>
                                                                <Typography sx={{lineHeight: '20px !important'}}
                                                                            className="result-letters">
                                                                    {address.address.detail && `${address.address.detail}, `}
                                                                    {address.address.ward &&
                                                                        address.address.ward.ward_name &&
                                                                        `${address.address.ward.ward_name}, `}
                                                                    {address.address.district &&
                                                                        address.address.district.district_name &&
                                                                        `${address.address.district.district_name}, `}
                                                                    {address.address.province &&
                                                                        address.address.province.province_name &&
                                                                        `${address.address.province.province_name}.`}
                                                                </Typography>
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    </Table>
                                                </TableContainer>
                                            )
                                        } else {
                                            return null
                                        }
                                    })}
                                </>
                            )}
                        </>
                    ) : null}
                    {/*----------------------Factory Address----------------------*/}
                    {customerDetail.address_factories && customerDetail.address_factories.length > 0 ? (
                        <>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Typography className="label-info" sx={{color: colors.indigoColor}}>
                                    {t('factoryAddress')}
                                </Typography>
                                {!isShowFactoryAddress ? (
                                    <HiChevronDown
                                        onClick={() => handleClickToggle(commons.FACTORY_ADDRESS)}
                                        style={{cursor: 'pointer', fontSize: '24px', color: colors.lightGreyColor}}
                                    />
                                ) : (
                                    <HiChevronUp
                                        onClick={() => handleClickToggle(commons.FACTORY_ADDRESS)}
                                        style={{cursor: 'pointer', fontSize: '24px', color: colors.lightGreyColor}}
                                    />
                                )}
                            </Box>
                            {isShowFactoryAddress &&
                                customerDetail.address_factories.map((address, index) => {
                                    if (
                                        address.address.detail ||
                                        address.address.ward ||
                                        address.address.district ||
                                        address.address.province
                                    ) {
                                        validAddressFactoryCount++
                                        return (
                                            <TableContainer key={index}>
                                                <Table sx={{border: 'none'}}>
                                                    <TableRow sx={{verticalAlign: 'baseline'}}>
                                                        <StyledTableCell
                                                            component="th"
                                                            sx={{
                                                                whiteSpace: 'nowrap',
                                                                width: '170px',
                                                                borderBottom: 'none',
                                                                p: '0 16px'
                                                            }}
                                                        >
                                                            <Typography className="label-info">
                                                                {t('factoryAddress')} {validAddressFactoryCount}:
                                                            </Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell
                                                            sx={{whiteSpace: 'pre-line', borderBottom: 'none', p: 0}}>
                                                            <Typography sx={{lineHeight: '20px !important'}}
                                                                        className="result-letters">
                                                                {address.address.detail && `${address.address.detail}, `}
                                                                {address.address.ward &&
                                                                    address.address.ward.ward_name &&
                                                                    `${address.address.ward.ward_name}, `}
                                                                {address.address.district &&
                                                                    address.address.district.district_name &&
                                                                    `${address.address.district.district_name}, `}
                                                                {address.address.province &&
                                                                    address.address.province.province_name &&
                                                                    `${address.address.province.province_name}.`}
                                                            </Typography>
                                                        </StyledTableCell>
                                                    </TableRow>
                                                </Table>
                                            </TableContainer>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                        </>
                    ) : null}
                </Box>
                <Box
                    component="form"
                    sx={{
                        bgcolor: colors.lilywhiteColor,
                        p: 1,
                        mt: 1,
                        borderRadius: '8px',
                        position: 'relative',
                        flexGrow: 1
                    }}
                >
                    <Typography variant="h6" className="frontpager">
                        {t('revenue')}
                    </Typography>
                    {customerDetail.total_revenue != 0 ? (
                        <RevenueChart dataRevenue={customerDetail.customer_revenue}/>
                    ) : (
                        <span>{t('customerHasNoRevenueYet')}</span>
                    )}
                </Box>
                <Box
                    component="form"
                    sx={{
                        bgcolor: colors.lilywhiteColor,
                        p: 1,
                        mt: 1,
                        borderRadius: '6px',
                        position: 'relative',
                        flexGrow: 1
                    }}
                >
                    <Box sx={{display: 'flex', alignItems: 'center', mb: '12px', gap: '8px'}}>
                        <Typography variant="h6" className="frontpager">
                            {t('history')}
                        </Typography>
                        <TextField
                            size="small"
                            select
                            value={selectedHistoryOption}
                            onChange={handleChangeViewOption}
                            variant="outlined"
                            style={{width: '204px', backgroundColor: colors.lilywhiteColor}}
                        >
                            <MenuItem value="transaction">{t('transaction')}</MenuItem>
                            <MenuItem value="priceAdjustment">{t('priceAdjustment')}</MenuItem>
                            <MenuItem value="claim">{t('claim')}</MenuItem>
                            <MenuItem value="proposeDebtAge">{t('proposeDebtAge')}</MenuItem>
                        </TextField>
                    </Box>
                    <Box>
                        <Box style={{display: selectedHistoryOption === 'transaction' ? 'block' : 'none'}}>
                            <Box
                                component="form"
                                sx={{
                                    bgcolor: colors.lilywhiteColor,
                                    borderRadius: '10px',
                                    position: 'relative',
                                    mt: 1
                                }}
                            >
                                <CustomerListTransactionTable
                                    titleTable={titleTableDetailCustomer}
                                    data={listOrderByCustomer}
                                    loading={loadingListOrderByCustomer}
                                    totalPages={listOrderByCustomerTotalPages}
                                    handlePageChange={handlePageChangeListOrderByCustomer}
                                    currentPagePagination={currentPageCustomerListTransaction}
                                    isShowMobile={true}
                                />
                            </Box>
                        </Box>
                        <Box
                            id="priceAdjustment"
                            style={{display: selectedHistoryOption === 'priceAdjustment' ? 'block' : 'none'}}
                        >
                            <Box
                                component="form"
                                sx={{
                                    bgcolor: colors.lilywhiteColor,
                                    borderRadius: '10px',
                                    position: 'relative',
                                    mt: 1
                                }}
                            >
                                <QuotationHistoriesTable
                                    data={listQuotationHistories}
                                    loading={loading}
                                    handlePageChange={handlePageChangeListQuotationHistories}
                                    totalPages={quotationHistoriesListTotalPages}
                                    isShowMobile={true}
                                    currentPagePagination={currentPageQuotationHistories}
                                />
                            </Box>
                        </Box>
                        <Box id="claim" style={{display: selectedHistoryOption === 'claim' ? 'block' : 'none'}}>
                            <Box
                                component="form"
                                sx={{
                                    bgcolor: colors.lilywhiteColor,
                                    borderRadius: '10px',
                                    position: 'relative',
                                    mt: 1
                                }}
                            >
                                <ClaimHistoriesTable
                                    data={listClaimHistories}
                                    loading={loading}
                                    currentPagePagination={currentPageClaimHistories}
                                    handlePageChange={handlePageChangeHistoryClaim}
                                    totalPages={claimHistoriesListTotalPages}
                                    isShowMobile={true}
                                />
                            </Box>
                        </Box>
                        <Box id="proposeDebtAge"
                             style={{display: selectedHistoryOption === 'proposeDebtAge' ? 'block' : 'none'}}>
                            <Box
                                component="form"
                                sx={{
                                    bgcolor: colors.lilywhiteColor,
                                    borderRadius: '10px',
                                    position: 'relative',
                                    mt: 1
                                }}
                            >
                                <ProposalDebtAgeTable
                                    data={listProposalDebtAgeByCustomerId}
                                    loading={loading}
                                    currentPagePagination={currentPageProposalDebtAge}
                                    handlePageChange={handlePageChangeListProposalDebtAge}
                                    totalPages={proposalDebtAgeTotalPages}
                                    isShowMobile={true}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CustomerDetailMobile
