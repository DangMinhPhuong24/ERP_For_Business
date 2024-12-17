import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import Box from '@mui/material/Box';
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import '../../../../resource/style/OderDetailStyle.css'
import ReceiptTable from '../../../../components/Table/OrderTable/receiptTable/index'
import AdjustTable from "../../../Table/OrderTable/receiptTable/adjust";
import PaginationComponent from "../../../Paginate";
import AdjustmentVoucherModal from "../../../Modal/Order/AdjustmentVoucher";
import {TbEdit} from "react-icons/tb";
import BOMTable from "../../../Table/OrderTable/BOM";
import titleTableBOM from "../../../../constants/titleTableBOM";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import CostOfRawMaterialTable from "../../../Table/OrderTable/BOM/costOfRawMaterial";
import titleTableCostOfRawMaterial from "../../../../constants/titleTableCostOfRawMaterial";
import WorkerSalaryCostsTable from "../../../Table/OrderTable/BOM/workerSalaryCosts";
import titleTableWorkerSalaryCosts from "../../../../constants/titleTableWorkerSalaryCosts";
import MachineryCostsTable from "../../../Table/OrderTable/BOM/machineryCosts";
import titleTableMachineryCosts from "../../../../constants/titleTableMachineryCosts";
import titleTableDepreciation from "../../../../constants/titleTableDepreciation";
import DepreciationTable from "../../../Table/OrderTable/BOM/depreciation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: '14px',
        lineHeight: '16.41px',
        textAlign: 'left',
        letterSpacing: '0em',
        border: 'none',
        padding: '0',
        verticalAlign: 'top',
    },
}));

function TabDetail({dataOderDetail,dataAdjustmentVoucher,adjustmentVoucherTotalPages,handlePageAdjustmentVoucherChange,
                       handleCreateAdjustmentVoucher,errorsMessageCreateAdjustmentVoucher,isCreateAdjustmentVoucherModalOpen,
                       setIsCreateAdjustmentVoucherModalOpen,handlerDeleteAdjustmentVoucher,successMessageAdjustmentVoucher,
                       errorMessageAdjustmentVoucher,removeMessageError,handleGetDetailAdjustmentVoucher,adjustmentVoucherDetail,
                       isOpenModalAdjustmentVoucherView,setIsOpenModalViewAdjustmentVoucher,handleUpdateDetailAdjustmentVoucher,
                       isOpenModalAdjustmentVoucherUpdate,setIsOpenModalUpdateAdjustmentVoucher,errorsMessageUpdateAdjustmentVoucher,
                       handleUpdateAdjustmentVoucher, loadingAdjustTable,currentPageAdjustmentVoucher}) {
    const { t } = useTranslation();
    const [ valueTabs, setValueTabs ] = useState('1');

    const handleChangeTabs = (event, newValueTabs) => {
        setValueTabs(newValueTabs);
    };
    const handleOpenCreateAdjustmentVoucherModal = () => {
        setIsCreateAdjustmentVoucherModalOpen(true);
    };
    const handleCloseCreateAdjustmentVoucherModal = () => {
        setIsCreateAdjustmentVoucherModalOpen(false);
    };
    const handleCloseViewAdjustmentVoucherModal = () => {
        setIsOpenModalViewAdjustmentVoucher(false);
    };
    const handleCloseUpdateAdjustmentVoucherModal = () => {
        setIsOpenModalUpdateAdjustmentVoucher(false);
    };
    return (
        <Box>
            <TabContext value={ valueTabs }>
                <Box
                    className="tab-order-wrapper">
                    <TabList
                        className="tabOrderList"
                        onChange={ handleChangeTabs }
                    >
                        <Tab
                            className={`${valueTabs === '1' ? 'button-tab-selected-small' : 'button-tab-unselected-small'}`}
                              label={ t('information') }
                              value="1"
                        />
                        <Tab   className={`${valueTabs === '2' ? 'button-tab-selected-small' : 'button-tab-unselected-small'}`}
                               label={ t('document') }
                               value="2"
                        />
                        <Tab   className={`${valueTabs === '3' ? 'button-tab-selected-small' : 'button-tab-unselected-small'}`}
                               label={ t('bOM') }
                               value="3"
                        />
                        <Tab   className={`${valueTabs === '4' ? 'button-tab-selected-long' : 'button-tab-unselected-long'}`}
                               label={ t('adjustmentForm') }
                               value="4"
                        />
                    </TabList>
                </Box>
                <TabPanel sx= {{ padding: '0' }} value="1">
                    <Box>
                        <Box className="table-container">
                            <ReceiptTable
                                data={dataOderDetail}
                            />
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel sx= {{ padding: '0' }} value="2">

                </TabPanel>
                <TabPanel sx= {{ padding: '0' }} value="3">
                    <Box sx={{marginTop:'5px',marginLeft:'10px'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography component="span" sx={{ fontSize: '14px', fontWeight: '400' }}>
                                    {t('relatedCommands')} :
                                </Typography>
                                <TableContainer sx={{ marginLeft: '5px', marginTop: '8px' }}>
                                    <Table sx={{ border: 'none' }}>
                                        <TableBody>
                                            <TableRow>
                                                <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                                                    <Typography className="label-info-BOM">{t('productionOrder')}:</Typography>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Typography className="result-letters-BOM">LSX0003, LSX9348, LSX00333</Typography>
                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                                                    <Typography className="label-info-BOM">{t('exWarehouse')}:</Typography>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Typography className="result-letters-BOM">LXK099, LXK9384</Typography>
                                                </StyledTableCell>
                                            </TableRow>
                                            <TableRow>
                                                <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                                                    <Typography className="label-info-BOM">{t('purchaseOrder')}:</Typography>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Typography className="result-letters-BOM">LMH48</Typography>
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box sx={{ width: '738px', ml: 0 }}>
                                <BOMTable
                                    titleTable={titleTableBOM}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row',gap: '19px', marginTop:'50px'}}>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{marginBottom:'20px'}}>
                                    <Typography className='text-table-header-BOM'>
                                        {t('rawMaterialCosts')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <CostOfRawMaterialTable
                                        titleTable={titleTableCostOfRawMaterial}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{marginBottom:'20px'}}>
                                    <Typography className='text-table-header-BOM'>
                                        {t('workerSalaryCosts')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <WorkerSalaryCostsTable
                                        titleTable={titleTableWorkerSalaryCosts}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{marginBottom:'20px'}}>
                                    <Typography className='text-table-header-BOM'>
                                        {t('machineryCosts')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <MachineryCostsTable
                                        titleTable={titleTableMachineryCosts}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row',gap: '19px', marginTop:'40px'}}>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{marginBottom:'20px'}}>
                                    <Typography className='text-table-header-BOM'>
                                        {t('depreciation')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <DepreciationTable
                                        titleTable={titleTableDepreciation}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel sx= {{ padding: '0' }} value="4">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',marginBottom:'10px',marginTop:'10px'  }}>
                        <Typography component="span" sx={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>
                            {t('listOfAdjustmentVotes')}
                        </Typography>
                        <Button
                            className="modalButtonClick"
                            sx={{gap:'8px'}}
                            onClick={handleOpenCreateAdjustmentVoucherModal}
                        >
                            <TbEdit/>
                            {t('createAdjustmentSlip')}
                        </Button>
                    </Box>
                    <AdjustTable
                        data={dataAdjustmentVoucher}
                        handlerDelete={handlerDeleteAdjustmentVoucher}
                        successMessage={successMessageAdjustmentVoucher}
                        errorMessage={errorMessageAdjustmentVoucher}
                        handleGetDetailAdjustmentVoucher={handleGetDetailAdjustmentVoucher}
                        handleUpdateDetailAdjustmentVoucher={handleUpdateDetailAdjustmentVoucher}
                        loading={loadingAdjustTable}
                        handlePageChange={handlePageAdjustmentVoucherChange}
                        currentPagePagination={currentPageAdjustmentVoucher}
                        totalPages={adjustmentVoucherTotalPages}
                    />
                    <AdjustmentVoucherModal
                        open={isCreateAdjustmentVoucherModalOpen}
                        handleClose={handleCloseCreateAdjustmentVoucherModal}
                        nameTitle={t('createAdjustmentSlip')}
                        data={dataOderDetail}
                        errorsMessage={errorsMessageCreateAdjustmentVoucher}
                        handleAdjustmentVoucher={handleCreateAdjustmentVoucher}
                        closeModalAction={removeMessageError}
                        mode="create"
                    />
                    <AdjustmentVoucherModal
                        open={isOpenModalAdjustmentVoucherView}
                        handleClose={handleCloseViewAdjustmentVoucherModal}
                        nameTitle={t('seeAdjustmentSlip')}
                        data={adjustmentVoucherDetail}
                        errorsMessage={errorsMessageCreateAdjustmentVoucher}
                        handleAdjustmentVoucher={handleCreateAdjustmentVoucher}
                        closeModalAction={removeMessageError}
                        mode="view"
                    />
                    <AdjustmentVoucherModal
                        open={isOpenModalAdjustmentVoucherUpdate}
                        handleClose={handleCloseUpdateAdjustmentVoucherModal}
                        nameTitle={t('editAdjustmentSlip')}
                        data={adjustmentVoucherDetail}
                        errorsMessage={errorsMessageUpdateAdjustmentVoucher}
                        handleAdjustmentVoucher={handleUpdateAdjustmentVoucher}
                        closeModalAction={removeMessageError}
                        mode="edit"
                    />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
export default TabDetail;