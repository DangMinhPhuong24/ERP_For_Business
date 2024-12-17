import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import assets from '../../../../asset';
import AdjustmentVoucherTable from "../../../Table/OrderTable/adjustmentVoucherTable/index";
import titleCompanyInformationPreview from '../../../../constants/titleCompanyInformationPreview';
import { isNumeric } from "../../../../common/common";
import { useLocation } from "react-router-dom";
import colors from "../../../../constants/colors";
import { FaArrowRightLong } from "react-icons/fa6";
import { useUser } from "../../../../contexts/AuthContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '612px',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  overflow: 'auto',
  borderRadius: '16px',
};

export default function AdjustmentVoucherModal({
                                                 open,
                                                 handleClose,
                                                 nameTitle,
                                                 data,
                                                 errorsMessage,
                                                 handleAdjustmentVoucher,
                                                 closeModalAction,
                                                 mode
                                               }) {
  const { t } = useTranslation();
  const currentDate = new Date();
  const { userInfo } = useUser()
  const location = useLocation();
  const oderId = new URLSearchParams(location.search).get('id');
  const [ newPrices, setNewPrices ] = useState([]);
  const [ intoMoney, setIntoMoney ] = useState(0);
  const [ total, setTotal ] = useState(0);
  const [ priceError, setPriceError ] = useState([]);
  const [ quantityError, setQuantityError ] = useState([]);
  const handleCloseModal = () => {
    setPriceError([]);
    setQuantityError([]);
    setNewPrices([]);
    setIntoMoney(0);
    setTotal(0);
    closeModalAction();
    handleClose();
  }

  const handleUpdatePrices = (updatedNewPrices, updatedIntoMoney, updatedTotal) => {
    setNewPrices(updatedNewPrices);
    setIntoMoney(updatedIntoMoney);
    setTotal(updatedTotal);
  };
  const handleSubmit = () => {
    let adjustmentVoucher;
    if (mode === 'edit') {
      adjustmentVoucher = {
        id: data.id,
        adjustment_prices: newPrices,
        amount: intoMoney,
        total_cost: total
      };
    } else {
      adjustmentVoucher = {
        order_id: oderId,
        adjustment_prices: newPrices,
        amount: intoMoney,
        total_cost: total
      };
    }
    let validate = validateData(adjustmentVoucher);
    if (validate) {
      handleAdjustmentVoucher(adjustmentVoucher)
    }
  };

  const validateData = (adjustmentVoucher) => {
    let flag = true;
    setPriceError([]);
    setQuantityError([]);
    const newPriceErrors = [];
    const newQuantityErrors = [];
    adjustmentVoucher.adjustment_prices.forEach((item, index) => {
      if (!item.price) {
        newPriceErrors[index] = t("requiredField");
        flag = false;
      } else if (!isNumeric(item.price) || parseFloat(item.price) <= 0) {
        newPriceErrors[index] = t("theNewPriceMustBeAnIntegerAndGreaterThanZeros");
        flag = false;
      } else {
        newPriceErrors[index] = "";
      }
      if (!item.quantity) {
        newQuantityErrors[index] = t("requiredField");
        flag = false;
      } else if (!isNumeric(item.quantity) || parseFloat(item.quantity) <= 0) {
        newQuantityErrors[index] = t("quantityMustBeIntegerAndGreaterThan0");
        flag = false;
      } else {
        newQuantityErrors[index] = "";
      }
    });
    setQuantityError(newQuantityErrors);
    setPriceError(newPriceErrors);
    return flag;
  };

  const formattedDate = `${ currentDate.getDate() } ${ t('month') } ${ currentDate.getMonth() + 1 } ${ t('year') } ${ currentDate.getFullYear() }`;
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
          <Box className="setPadding">
            <Typography variant="h6" component="p" className="order-title">
              { nameTitle }
            </Typography>
            <Box>
              <Box className="table-container-value2">
                <Box sx={ { marginTop: '10px' } }>
                  <Grid container spacing={ 2 }>
                    <Grid item xs={ 12 }>
                      <Grid item container alignItems="center" spacing={ 1 }>
                        <Grid item>
                          <img
                            src={ assets.images.logo }
                            style={ {
                              width: '45px',
                              height: '45px',
                            } }
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" sx={ { fontSize: '12px', fontWeight: '700' } }>
                            { titleCompanyInformationPreview.COMPANY_NAME }
                          </Typography>
                          <Typography variant="body1" sx={ { fontSize: '12px', fontWeight: '400' } }>
                            { titleCompanyInformationPreview.COMPANY_ADDRESS }
                          </Typography>
                          <Typography variant="body1" sx={ { fontSize: '12px', fontWeight: '400' } }>
                            { titleCompanyInformationPreview.COMPANY_PHONE }
                          </Typography>
                        </Grid>
                        <Grid item sx={ { marginLeft: 'auto' } }>
                          <Grid container alignItems="flex-end" justifyContent="flex-end">
                            <Typography variant="body1" sx={ { fontSize: '12px', fontWeight: '400' } }>
                              { titleCompanyInformationPreview.ORDER_NUMBER }
                            </Typography>
                          </Grid>
                          <Typography variant="body1" sx={ { fontSize: '12px', fontWeight: '400' } }>
                            <br/>
                          </Typography>
                          <Grid container alignItems="flex-end" justifyContent="flex-end">
                            <Typography variant="body1" sx={ { fontSize: '12px', fontWeight: '400' } }>
                              { titleCompanyInformationPreview.ANOTHER_NUMBER }
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Box sx={ {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '15px',
                    marginBottom: '15px'
                  } }>
                    <Typography component="span" sx={ { fontSize: '20px', fontWeight: '700' } }>
                      { t('provisionalInvoice') }
                    </Typography>
                    <Typography variant="body1" sx={ { fontSize: '12px', fontWeight: '400' } }>
                      { t('day') } { formattedDate }
                    </Typography>
                  </Box>
                  <Box sx={ {
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginBottom: '20px'
                  } }>
                    <Box sx={ { display: 'flex', flexDirection: 'column', marginRight: '10px' } }>
                      <Typography className="customerInfoItem">{ t('customer') }:</Typography>
                      <Typography className="customerInfoItem">{ t('deliveryAddress') }:</Typography>
                      <Typography className="customerInfoItem">{ t('payments') }:</Typography>
                    </Box>
                    <Box sx={ { display: 'flex', flexDirection: 'column', marginLeft: '10px' } }>
                      <Typography
                        className="customerInfoItem">{ data.customer?.customer_name ? data.customer.customer_name : '\u00A0' }</Typography>
                      { data.customer?.different_address && data.customer.different_address != "" ? (
                        <Typography className="customerInfoItem">
                          { data.customer.different_address.detail && `${ data.customer.different_address.detail }, ` }
                          { data.customer.different_address.ward?.ward_name && `${ data.customer.different_address.ward.ward_name }, ` }
                          { data.customer.different_address.district?.district_name && `${ data.customer.different_address.district.district_name }, ` }
                          { data.customer.different_address.province?.province_name && `${ data.customer.different_address.province.province_name }.` }
                        </Typography>
                      ) : (
                        <Typography className="customerInfoItem">
                          { data.customer?.address && (
                            <React.Fragment>
                              { data.customer.address.detail && `${ data.customer.address.detail }, ` }
                              { data.customer.address.ward?.ward_name && `${ data.customer.address.ward.ward_name }, ` }
                              { data.customer.address.district?.district_name && `${ data.customer.address.district.district_name }, ` }
                              { data.customer.address.province?.province_name && `${ data.customer.address.province.province_name }.` }
                            </React.Fragment>
                          ) }
                        </Typography>
                      ) }
                      <Box sx={ { display: 'flex', justifyContent: 'space-between' } }>
                        <Typography
                          className="customerInfoItem">{ data.payment_method?.payment_method_name ? data.payment_method.payment_method_name : '\u00A0' }</Typography>
                        <Typography sx={ { marginLeft: '100px' } }
                                    className="customerInfoItem">{ t('deliveryTerm') }: { data.delivery_date ? data.delivery_date : '\u00A0' }</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <AdjustmentVoucherTable
                    data={ data }
                    onUpdatePrices={ handleUpdatePrices }
                    total={ total }
                    priceError={ priceError }
                    quantityError={ quantityError }
                    mode={ mode }
                  />
                  <Box sx={ { display: 'flex', width: '100%', marginTop: '30px' } }>
                    <Typography component="span" sx={ { fontSize: '12px', fontWeight: '400', flex: 1 } }>
                      { t('receiver') }
                    </Typography>
                    <Typography component="span" sx={ { fontSize: '12px', fontWeight: '400', flex: 1 } }>
                      { t('controller') }
                    </Typography>
                    <Typography component="span" sx={ { fontSize: '12px', fontWeight: '400', flex: 1 } }>
                      { t('deliver') }
                    </Typography>
                    <Box sx={ {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    } }>
                      <Typography component="span" sx={ { fontSize: '12px', fontWeight: '400' } }>
                        { t('salesman') }
                      </Typography>
                      <Typography component="span" sx={ { fontSize: '12px', fontWeight: '400', fontStyle: 'italic' } }>
                        { userInfo.name }
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="setPadding"
               sx={ {
                 marginTop: '10px',
                 position: 'sticky',
                 bottom: 0,
                 display: 'flex',
                 alignItems: 'baseline',
                 justifyContent: 'space-between',
                 columnGap: 2,
                 height: '64px',
                 background: colors.paleblueColor,
                 zIndex: 1,
               } }>
            <Box sx={ { display: 'inline-flex', alignItems: 'center' } }>

            </Box>
            <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
              <Typography sx={ { marginRight: "15px" } } variant="body1" color="error">
                { errorsMessage }
              </Typography>
              <Button className="cancelButton" variant="outlined" onClick={ handleCloseModal }>
                { t('cancel') }
              </Button>
              { mode !== 'view' && (
                <Button className="confirmButton" onClick={ handleSubmit }>
                  { mode === 'edit' ? t('edit') : t('create') }
                  <FaArrowRightLong/>
                </Button>
              ) }
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}