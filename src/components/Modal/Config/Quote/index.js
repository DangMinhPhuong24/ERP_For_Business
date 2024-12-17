import Autocomplete from "@mui/material/Autocomplete";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import PolygonIcon from "../../../../asset/icon/Polygon.svg";
import {
    decimalTwoPlacesRegex,
    filterDigits,
    formatCurrencyWithoutSymbol,
    isDigitOrEmpty,
    isValidDimension,
    filterDigitsLimit
} from "../../../../common/common";
import colors from "../../../../constants/colors";
import "../../../../resource/style/ConfigStyle.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '547px',
    maxHeight: '95vh',
    maxWidth: '95vw',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    overflow: 'auto',
    padding: '0px',
};

export default function QuoteModal(props) {
    const { open, nameTitle, dataProduct, handleCreateQuote,
        errorsMessage, successFlag, closeModalAction,
        handleClose, isEdit, quoteData, handleUpdateQuote
    } = props
    const { t } = useTranslation();
    const [quoteID, setQuoteID] = useState("");
    const [productId, setProductId] = useState("");
    const [priceStandardSheet, setPriceStandardSheet] = useState(0);
    const [priceIncludeSheetSize, setPriceIncludeSheetSize] = useState(0);
    const [priceStandardRoll, setPriceStandardRoll] = useState(0);
    const [priceIncludeRollSize, setPriceIncludeRollSize] = useState(0);
    const [allowableDeviation, setAllowableDeviation] = useState(0);
    const [errorMessageProduct, setErrorMessageProduct] = useState("");
    const [errorMessageAllowableDifference, setErrorMessageAllowableDifference] = useState("");
    const [errorMessagePriceStandardSheet, setErrorMessagePriceStandardSheet] = useState("");
    const [errorMessagePriceIncludeSheetSize, setErrorMessagePriceIncludeSheetSize] = useState("");
    const [errorMessagePriceStandardRoll, setErrorMessagePriceStandardRoll] = useState("");
    const [errorMessagePriceIncludeRollSize, setErrorMessagePriceIncludeRollSize] = useState("");

    useEffect(() => {
        if (isEdit && quoteData) {
            setQuoteID(quoteData.id);
            setPriceStandardSheet(quoteData.price_standard_sheet);
            setPriceIncludeSheetSize(quoteData.price_include_sheet_size);
            setPriceStandardRoll(quoteData.price_standard_roll);
            setPriceIncludeRollSize(quoteData.price_include_roll_size);
            setAllowableDeviation(quoteData.allowable_deviation);
            onChangeProductSelect(quoteData.id);
            setProductId(quoteData.id);
        }
    }, [isEdit, quoteData]);

    const handleSubmit = () => {
        const quote = {
            product_id: productId,
            allowable_deviation: allowableDeviation,
            price_standard_sheet: priceStandardSheet,
            price_include_sheet_size: priceIncludeSheetSize,
            price_standard_roll: priceStandardRoll,
            price_include_roll_size: priceIncludeRollSize,
        }
        let validate = validateData(quote);
        if (validate) {
            if (isEdit) {
                quote.id = productId;
                handleUpdateQuote(quote)
            } else {
                handleCreateQuote(quote)
            }
        }
    };

    const validateData = (quote) => {
        let flag = true;
        setErrorMessageProduct("");
        setErrorMessageAllowableDifference("");
        setErrorMessagePriceStandardSheet("");
        setErrorMessagePriceIncludeSheetSize("");
        setErrorMessagePriceStandardRoll("");
        setErrorMessagePriceIncludeRollSize("");
        if (!quote.product_id) {
            setErrorMessageProduct(t("pleaseSelectProductName"));
            flag = false;
        }
        if (!(String(quote.allowable_deviation).trim())) {
            setErrorMessageAllowableDifference(t("pleaseEnterTheAllowableDifference"));
            flag = false;
        } else if (!decimalTwoPlacesRegex((String(quote.allowable_deviation).trim()))) {
            setErrorMessageAllowableDifference(t("isValidDecimalNumber"));
            flag = false;
        } else {
            const deviationNumber = parseFloat((String(quote.allowable_deviation).trim()));
            if (deviationNumber < 0 || deviationNumber > 100) {
                setErrorMessageAllowableDifference(t("requiredInputBetween0And100"));
                flag = false;
            }
        }

        const validatePrice = (value, setErrorMessage) => {
            const trimmedValue = String(value).trim();
            if (!trimmedValue) {
                setErrorMessage(t('requiredField'));
                flag = false;
            }
            else if (!isValidDimension(value)) {
                setErrorMessage(t('onlyNumber'));
                flag = false;
            }
            else if (parseFloat(trimmedValue) <= 0) {
                setErrorMessage(t('enterNumberGreaterThanZero'));
                flag = false;
            }
        };

        validatePrice(quote.price_standard_sheet, setErrorMessagePriceStandardSheet);
        validatePrice(quote.price_include_sheet_size, setErrorMessagePriceIncludeSheetSize);
        validatePrice(quote.price_standard_roll, setErrorMessagePriceStandardRoll);
        validatePrice(quote.price_include_roll_size, setErrorMessagePriceIncludeRollSize);

        return flag;
    };

    const onChangeProductSelect = (value) => {
        setProductId(value);
        const selectedProduct = dataProduct.find(item => item.id === value);
        if (selectedProduct) {
            setPriceStandardSheet(selectedProduct.price_standard_sheet);
            setPriceIncludeSheetSize(selectedProduct.price_include_sheet_size);
            setPriceStandardRoll(selectedProduct.price_standard_roll);
            setPriceIncludeRollSize(selectedProduct.price_include_roll_size);
            setAllowableDeviation(selectedProduct.allowable_deviation);
        }
    };

    const handleCloseModal = () => {
        setErrorMessageProduct("");
        setErrorMessageAllowableDifference("");
        setProductId("");
        setAllowableDeviation("");
        setErrorMessagePriceStandardSheet('');
        setErrorMessagePriceIncludeSheetSize('')
        setErrorMessagePriceStandardRoll('')
        setErrorMessagePriceIncludeRollSize('')
        closeModalAction();
        handleClose();
    }

    const handlePriceIncludeRollSizeChange = (event) => {
        let { value } = event.target;
        value = filterDigitsLimit(value);
        if (isDigitOrEmpty(value)) {
            setPriceIncludeRollSize(value)
        }
    };

    const handlePriceStandardRollChange = (event) => {
        let { value } = event.target;
        value = filterDigitsLimit(value);
        if (isDigitOrEmpty(value)) {
            setPriceStandardRoll(value)
        }
    };

    const handlePriceIncludeSheetSizeChange = (event) => {
        let { value } = event.target;
        value = filterDigitsLimit(value);
        if (isDigitOrEmpty(value)) {
            setPriceIncludeSheetSize(value)
        }
    };

    const handlePriceStandardSheetChange = (event) => {
        let { value } = event.target;
        value = filterDigitsLimit(value);
        if (isDigitOrEmpty(value)) {
            setPriceStandardSheet(value)
        }
    };

    const handleAllowableDeviationChange = (event) => {
        const input = event.target.value;

        const regex = /^(100(\.0{1,2})?|0*(\d{1,2})(\.\d{0,2})?)$/;

        if (regex.test(input) || input === "") {
            setAllowableDeviation(input);
        }
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box className='setPaddingGruopDebt'>
                            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                                {nameTitle}
                            </Typography>
                            <Box sx={{ marginLeft: '30px', mt: 2 }}>
                                <Box>
                                    <Typography className="tiletypography">
                                        {t("productName")}
                                        <span className="required">*</span>
                                    </Typography>
                                    <Autocomplete
                                        noOptionsText={t('noResult')}
                                        onChange={(event, newValue) => onChangeProductSelect(newValue ? newValue.id : '')}
                                        options={dataProduct}
                                        value={dataProduct.find(item => item.id === productId) || null}
                                        getOptionLabel={(options) => options.product_name}
                                        popupIcon={<PolygonIcon />}
                                        renderInput={(params) => (
                                            <TextField
                                                error={errorMessageProduct ? true : false}
                                                helperText={errorMessageProduct ? errorMessageProduct : ""}
                                                {...params}
                                                sx={{ width: '429px', height: '48px', gap: '4px' }}
                                                size="small"
                                                placeholder={t('pleaseSelectProductName')}
                                                InputProps={{
                                                    ...params.InputProps,
                                                }}
                                                required
                                                className="requiredTextField"
                                            />
                                        )}
                                        classes={{ inputRoot: 'custom-input-search' }}
                                    />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: '20px',
                                    gap: '3px'
                                }}>
                                    <Box>
                                        <Typography className="tiletypography">
                                            {t("standardSizeSheetPrice")} (VND)
                                            <span className="required">*</span>
                                        </Typography>
                                        <TextField
                                            size="small"
                                            sx={{ width: '212px', height: '48px', gap: '4px' }}
                                            value={formatCurrencyWithoutSymbol(priceStandardSheet)}
                                            onChange={(event) => handlePriceStandardSheetChange(event)}
                                            error={errorMessagePriceStandardSheet ? true : false}
                                            helperText={errorMessagePriceStandardSheet ? errorMessagePriceStandardSheet : ""}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography className="tiletypography">
                                            {t("priceIncludesSheetSize")} (VND)
                                            <span className="required">*</span>
                                        </Typography>
                                        <TextField
                                            size="small"
                                            sx={{ width: '212px', height: '48px', gap: '4px' }}
                                            value={formatCurrencyWithoutSymbol(priceIncludeSheetSize)}
                                            onChange={(event) => handlePriceIncludeSheetSizeChange(event)}
                                            error={errorMessagePriceIncludeSheetSize ? true : false}
                                            helperText={errorMessagePriceIncludeSheetSize ? errorMessagePriceIncludeSheetSize : ""}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: '20px',
                                    gap: '3px'
                                }}>
                                    <Box>
                                        <Typography className="tiletypography">
                                            {t("standardSizeRollPrice")} (VND)
                                            <span className="required">*</span>
                                        </Typography>
                                        <TextField
                                            size="small"
                                            sx={{ width: '212px', height: '48px', gap: '4px' }}
                                            value={formatCurrencyWithoutSymbol(priceStandardRoll)}
                                            onChange={(event) => handlePriceStandardRollChange(event)}
                                            error={errorMessagePriceStandardRoll ? true : false}
                                            helperText={errorMessagePriceStandardRoll ? errorMessagePriceStandardRoll : ""}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography className="tiletypography">
                                            {t("priceIncludesRollSize")} (VND)
                                            <span className="required">*</span>
                                        </Typography>
                                        <TextField
                                            size="small"
                                            sx={{ width: '212px', height: '48px', gap: '4px' }}
                                            value={formatCurrencyWithoutSymbol(priceIncludeRollSize)}
                                            onChange={(event) => handlePriceIncludeRollSizeChange(event)}
                                            error={errorMessagePriceIncludeRollSize ? true : false}
                                            helperText={errorMessagePriceIncludeRollSize ? errorMessagePriceIncludeRollSize : ""}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ marginLeft: '2px', marginTop: '20px' }}>
                                    <Typography className="tiletypography">
                                        {t("allowableDifference")} (%)
                                        <span className="required">*</span>
                                    </Typography>
                                    <TextField
                                        error={errorMessageAllowableDifference ? true : false}
                                        id={errorMessageAllowableDifference ? "outlined-error-helper-text" : "outlined-required"}
                                        helperText={errorMessageAllowableDifference ? errorMessageAllowableDifference : ""}
                                        placeholder={t("enterTheAllowableDifference")}
                                        size="small"
                                        sx={{ width: '212px', height: '48px', gap: '2px' }}
                                        onChange={(event) => handleAllowableDeviationChange(event)}
                                        value={allowableDeviation}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box className='setPaddingGroupDebtRim' sx={{
                            height: '64px',
                            background: colors.paleblueColor,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            mt: 4,
                        }}>
                            <Typography sx={{ marginRight: "15px", fontSize: "0.75rem" }} color="error"
                                className="error-message">
                                {errorsMessage}
                            </Typography>
                            <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                                {t("cancel")}
                            </Button>
                            <Button onClick={handleSubmit} variant="contained" className="confirmButton"
                                sx={{ marginRight: '28px' }}>
                                {isEdit ? t("save") : t("add")}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
