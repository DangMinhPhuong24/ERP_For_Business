import React, {useEffect, useState} from 'react';
import {Box, TextField, MenuItem, Typography, InputLabel} from '@mui/material';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import colors from '../../../constants/colors';
import Autocomplete from '@mui/material/Autocomplete';
import { HiChevronDown } from "react-icons/hi2";
import { HiChevronUp } from "react-icons/hi2";
import Fade from "@mui/material/Fade";
import {IoSearchOutline} from "react-icons/io5";
import PolygonIcon from "../../../asset/icon/Polygon.svg";

const SearchFormProductWarehouse = ({ dataAllSupplier, dataProductType, dataListAllWarehouseLocation, dataListAllWarehouse, datalistAllProducts, onClear, onSubmit, flagResetForm }) => {
    const [productName, setProductName] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [supplier, setSupplier] = useState("");
    const [productGroup, setProductGroup] = useState("");
    const [warehouseLocation, setWarehouseLocation] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [boxHeight, setBoxHeight] = useState('auto');

    useEffect(() => {
        handleClear();
    }, [flagResetForm])

    const handleClickToggle = () => {
        setShowSearch(!showSearch);
        setBoxHeight(showSearch ? 'auto' : '70px');
    }
    const handleSubmit = () => {
        let paramSearch = {
            searchProduct: productName,
            fromPrice: priceFrom,
            toPrice: priceTo,
            supplierId: supplier,
            productGroupId: productGroup,
            warehouseId: warehouse,
            warehouseLocationId: warehouseLocation,
        }
        onSubmit(paramSearch);
    };

    const handleClear = () => {
        setProductName("");
        setPriceFrom("");
        setPriceTo("");
        setSupplier("");
        setProductGroup("");
        setWarehouseLocation("");
        setWarehouse("");
        onClear()
    };

    const handlePriceFromChange = (value) => {
        if (!isNaN(value)) {
            setPriceFrom(value);
        }
    };

    const handlePriceToChange = (value) => {
        if (!isNaN(value)) {
            setPriceTo(value);
        }
    };

    const onChangeSupplier = (value) => {
        setSupplier(value)
    }

    const onChangeProductGroup = (value) => {
        setProductGroup(value)
    }

    const onChangeLocation = (value) =>{
        setWarehouseLocation(value)
    }

    const onChangeWarehouse = (value) =>{
        setWarehouse(value)
    }
    const {t} = useTranslation();
    return (
        <Box sx={{bgcolor: '#FFFFFF', p: 2, mt: 2, borderRadius: '10px', position: 'relative', height: boxHeight}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6" sx={{color: colors.indigoColor}}>
                    {t('search')}
                </Typography>
                {showSearch ? (
                    <HiChevronDown onClick={handleClickToggle} style={{cursor:'pointer', fontSize: '35px', color: '#B2B2B2'}}/>
                    ) : (
                    <HiChevronUp onClick={handleClickToggle} style={{cursor:'pointer', fontSize: '35px', color: '#B2B2B2'}}/>
                )}
            </Box>
            {!showSearch && (
                <>
                    <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt:1}}>
                        <Box>
                            <InputLabel className="inputLabel-search">{t('nameOrProductCode')}</InputLabel>
                            <TextField fullWidth
                                       InputProps={{
                                           sx: {
                                               height: '35px',
                                               fontSize: '12px',
                                               lineHeight:'15.18px',
                                           },
                                           classes: {
                                               root: 'custom-input-search'
                                           }
                                       }}
                                       value={productName}
                                       onChange={(e) => setProductName(e.target.value)} variant="outlined" size='small'
                            />
                        </Box>
                        <Box>
                            <InputLabel className="inputLabel-search">{t('priceFrom')}</InputLabel>
                            <TextField fullWidth
                                       InputProps={{
                                           sx: {
                                               height: '35px',
                                               fontSize: '12px',
                                               lineHeight:'15.18px',
                                           },
                                           classes: {
                                               root: 'custom-input-search'
                                           }
                                       }}
                                       value={priceFrom}
                                       onChange={(e) => handlePriceFromChange(e.target.value)} variant="outlined"
                                       size='small'
                            />
                        </Box>
                        <Box>
                            <InputLabel className="inputLabel-search">{t('priceTo')}</InputLabel>
                            <TextField fullWidth
                                       InputProps={{
                                           sx: {
                                               height: '35px',
                                               fontSize: '12px',
                                               lineHeight:'15.18px',
                                           },
                                           classes: {
                                               root: 'custom-input-search'
                                           }
                                       }}
                                       value={priceTo}
                                       onChange={(e) => handlePriceToChange(e.target.value)} variant="outlined" size='small'
                            />
                        </Box>
                        <Box>
                            <InputLabel className="inputLabel-search">{t('supplierFullText')}</InputLabel>
                            <Autocomplete
                                popupIcon={<PolygonIcon />}
                                size='small'
                                options={dataAllSupplier}
                                value={dataAllSupplier.find(option => option.id === supplier) || null}
                                onChange={(event, value) => onChangeSupplier(value ? value.id : "")}
                                getOptionLabel={(option) => option.code}
                                renderInput={(params) => <TextField {...params} variant="outlined"
                                                                    placeholder={t("select")}/>}
                                classes={{inputRoot: 'custom-input-search'}}
                                ListboxProps={{sx: { fontSize: '12px' }}}
                            />
                        </Box>
                        <Box>
                            <InputLabel className="inputLabel-search">{t('productGroup')}</InputLabel>
                            <Autocomplete
                                popupIcon={<PolygonIcon />}
                                size='small'
                                options={datalistAllProducts}
                                value={datalistAllProducts.find(option => option.id === productGroup) || null}
                                onChange={(event, value) => onChangeProductGroup(value ? value.id : "")}
                                getOptionLabel={(option) => option.product_group_name}
                                noOptionsText={datalistAllProducts.length === 0 ? <span
                                    style={{color: colors.redColor}}>{t("pleaseSelectCityProvinceFirst")}</span> : "No options"}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder={t("select")}/>
                                )}
                                classes={{inputRoot: 'custom-input-search'}}
                                ListboxProps={{sx: { fontSize: '12px' }}}
                            />
                        </Box>
                        <Box>
                            <InputLabel className="inputLabel-search">{t('warehouses')}</InputLabel>
                            <Autocomplete
                                popupIcon={<PolygonIcon />}
                                size='small'
                                options={dataListAllWarehouse}
                                value={dataListAllWarehouse.find(option => option.id === warehouse) || null}
                                onChange={(event, value) => onChangeWarehouse(value ? value.id : "")}
                                getOptionLabel={(option) => option.warehouse_name}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder={t("select")}/>
                                )}
                                classes={{inputRoot: 'custom-input-search'}}
                                ListboxProps={{sx: { fontSize: '12px' }}}
                            />
                        </Box>
                        <Box>
                            <InputLabel className="inputLabel-search">{t('location')}</InputLabel>
                            <Autocomplete
                                popupIcon={<PolygonIcon />}
                                size='small'
                                options={dataListAllWarehouseLocation}
                                value={dataListAllWarehouseLocation.find(option => option.id === warehouseLocation) || null}
                                onChange={(event, value) => onChangeLocation(value ? value.id : "")}
                                getOptionLabel={(option) => option.warehouse_location_name}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder={t("select")}/>
                                )}
                                classes={{inputRoot: 'custom-input-search'}}
                                ListboxProps={{sx: { fontSize: '12px' }}}
                            />
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', mt:2}}>
                        <Button className="modalButton" onClick={() => {
                            handleSubmit();
                        }} on sx={{mr: 2, gap: '8px'}}>
                            <IoSearchOutline style={{fontSize: '16px'}}/>
                            {t("search")}
                        </Button>
                        <Button onClick={() => {
                            handleClear();
                        }} variant="outlined"
                                sx={{
                                    lineHeight: '17.71px',
                                    color: colors.darkmidnightblueColor,
                                    bgcolor: colors.lightblueColor,
                                    textTransform: 'none',
                                    border:'none',
                                    borderRadius:'8px',
                                }}>
                            {t("delete")}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default SearchFormProductWarehouse;