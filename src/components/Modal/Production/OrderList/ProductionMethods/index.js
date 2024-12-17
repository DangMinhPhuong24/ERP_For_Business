import React, { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import {Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from '@mui/material';
import Fade from '@mui/material/Fade';
import ReportOrderTable from "../../../../Table/OrderTable/reportOrderTable/index";
import ReceiptTable from "../../../../Table/OrderTable/receiptTable";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    maxHeight: '95vh',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    overflow: 'auto',
    padding: '20px',
};

export default function ProductionMethods({open, handleClose, nameTitle,data,handleSubmitAction }) {
    const { t } = useTranslation();
    const navigate=useNavigate();
    const [productionMethod, setProductionMethod] = useState("");
    const handleCloseModal = () => {
        handleClose();
    }

    useEffect(() => {
        if (open) {
            setProductionMethod("1");
        }
    }, [open]);
    const handleProductionMethodChange = (event) => {
        setProductionMethod(event.target.value);
    };
    // const handlesubmit = () =>{
    // }
    const handleOpenCreateWorkOrder = () => {
        navigate(`/production/manage-production-orders/create-work-order`);
    }
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={ open }
                onClose={ handleCloseModal }
                closeAfterTransition
                BackdropComponent={ Backdrop }
                BackdropProps={ {
                    timeout: 500,
                } }
            >
                <Box sx={ style }>
                    <Typography variant="h6" component="p" className="order-title">
                        { nameTitle }
                    </Typography>
                    <Box sx={{marginLeft:"30px"}}>
                        <Box className="table-container-value2">
                            <Box sx={{ marginTop:'10px'}}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',marginBottom:'20px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                                        <Typography className="customerInfoItem">{t('codeOrders')}:</Typography>
                                        <Typography className="customerInfoItem">{t('customer')}:</Typography>
                                        <Typography className="customerInfoItem">{t('deliveryTerm')}:</Typography>
                                        <Typography className="customerInfoItem">{t('explain')}:</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                        <Typography sx={{fontSize:12, fontWeight:700}}>{data?.code}</Typography>
                                        <Typography className="customerInfoItem">{data?.customer?.customer_name}</Typography>
                                        <Typography className="customerInfoItem">{data?.delivery_date}</Typography>
                                        <Typography className="customerInfoItem" sx={{ display: 'block', width: '470px' }}>
                                            {data.description ? data.description : t('noData')}
                                        </Typography>

                                    </Box>
                                </Box>
                                <ReceiptTable
                                    data={data}
                                    mode={"no information"}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '30px' }}>
                                    <Typography sx={{fontSize:12, fontWeight:700}}>{ t('productionMethod') }</Typography>
                                    <RadioGroup value={productionMethod} onChange={handleProductionMethodChange}>
                                        <FormControlLabel
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 12 }, m: '8px 0 0', height: 15 }}
                                            value="1"
                                            control={<Radio />}
                                            label={<Typography className="radio-text-productionMethod">{t('onlyProducedInLinhHieu')}</Typography>}
                                        />
                                        <FormControlLabel
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 12 }, m: '8px 0 0', height: 15 }}
                                            value="2"
                                            control={<Radio />}
                                            label={<Typography className="radio-text-productionMethod">{t('hireProcessingAndProductionAtLinhHieu')}</Typography>}
                                        />
                                        <FormControlLabel
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 12 }, m: '8px 0 0', height: 15 }}
                                            value="3"
                                            control={<Radio />}
                                            label={<Typography className="radio-text-productionMethod">{t('outSourcingOnly')}</Typography>}
                                        />
                                        <FormControlLabel
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 12 }, m: '8px 0 0', height: 15 }}
                                            value="4"
                                            control={<Radio />}
                                            label={<Typography className="radio-text-productionMethod">{t('purchasedFromNCCAndManufacturedInLinhHieu')}</Typography>}
                                        />
                                        <FormControlLabel
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 12 }, m: '8px 0 0', height: 15 }}
                                            value="5"
                                            control={<Radio />}
                                            label={<Typography className="radio-text-productionMethod">{t('onlyBuyFromNCC')}</Typography>}
                                        />
                                    </RadioGroup>
                                </Box>
                            </Box>
                            <Box sx={{ position: 'sticky', bottom: 0, zIndex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px',py: '5px', bgcolor: 'background.paper'}}>
                                    <Box>
                                        <Button className="back-button" variant="outlined" onClick={handleCloseModal}>
                                            {t('cancel')}
                                        </Button>
                                    </Box>
                                    <Box sx={{ marginLeft: '20px' }}>
                                        <Button className="createButton" onClick={handleOpenCreateWorkOrder} >
                                            {t('createCommand')}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Modal>
        </>
    );
}