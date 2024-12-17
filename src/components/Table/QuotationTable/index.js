import React from 'react';
import {useTranslation} from 'react-i18next';
import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';
import colors from "../../../constants/colors"
import {formatCurrencyWithoutSymbol} from "../../../common/common";
import TableContainer from "@mui/material/TableContainer";

const styles = {
    sttColumnHeader: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        width: '3%',
        textAlign: 'center',
        p: '4px',

    },
    columnDescriptionCode: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        width: '9%',
        textAlign: 'center',
        p: '4px',

    },
    columnName: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        width: '8%',
        textAlign: 'center',
        p: '4px',

    },
    columnNameDescribeDetail: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        width: '21%',
        textAlign: 'center',
        p: '4px',

    },
    columnLogo: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        width: '5%',
        textAlign: 'center',
        lineHeight: '14px',
        p: '4px',

    },
    columnSpecifications: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        width: '7%',
        textAlign: 'center',
        p: '4px',
        lineHeight: '14px',

    },
    columnPrice: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        textAlign: 'center',
        p: '4px',


    },
    subPrice: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        textAlign: 'center',
        lineHeight: '14px',
        p: '4px',

    },
    columnNotes: {
        border: '1px solid black',
        fontSize: 10,
        bgcolor: colors.blueceruleanColor,
        color: colors.lilywhiteColor,
        width: '21%',
        textAlign: 'center',
        p: '4px',

    },
    groupRow:{
        border: '1px solid black',
        height:'20px',
        fontSize: 10,
        backgroundColor: colors.peachPuffColor,
        p:1,
    },
    cellSTTText: {
        border: '1px solid black',
        fontSize: 10,
        textAlign: 'center',
        p: '4px',

    },
    cellDescriptionCode: {
        border: '1px solid black',
        fontSize: 10,
        p: '4px',

    },
    cellName: {
        border: '1px solid black',
        fontSize: 10,
        textAlign: 'center',
        p: '4px',

    },
    cellDescribeDetail: {
        border: '1px solid black',
        fontSize: 10,
        p: '4px',

    },
    cellLogo: {
        border: '1px solid black',
        fontSize: 10,
        textAlign: 'center',
        p: '4px',

    },
    cellSpecifications: {
        border: '1px solid black',
        fontSize: 10,
        textAlign: 'center',
        p: '4px',

    },
    cellPrice: {
        border: '1px solid black',
        fontSize: 10,
        textAlign: 'center',
        p: '4px',

    },
    cellNotes: {
        border: '1px solid black',
        fontSize: 10,
        p: '4px',

    },

};
const QuotationTable = ({data, isMobile}) => {
    const {t} = useTranslation();
    const groupByGroupId = (list, keyGetter) => {
        const map = new Map();
        if (list) {
            list.forEach(item => {
                const key = keyGetter(item);
                if (key !== undefined && key !== null) {
                    const collection = map.get(key);
                    if (!collection) {
                        map.set(key, [item]);
                    } else {
                        collection.push(item);
                    }
                }
            });
        }
        return map;
    };

    const groupedProducts = groupByGroupId(data, item => item.product.product_group?.id);

    const groupIdToName = new Map();

    data?.forEach(item => {
        groupIdToName.set(item.product.product_group?.id, item.product.product_group.product_group_name);
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{height: '50px',background:colors.steelBlueColor}}>
                    <TableRow>
                        <TableCell row p={0} sx={styles.sttColumnHeader} rowSpan={2}>#</TableCell>
                        <TableCell sx={styles.columnDescriptionCode} rowSpan={2}>{t('descriptionCode')}</TableCell>
                        <TableCell sx={styles.columnName} rowSpan={2}>{t('name')}</TableCell>
                        <TableCell sx={styles.columnNameDescribeDetail}
                                   rowSpan={2}>{t('productDescription')}</TableCell>
                        <TableCell sx={styles.columnLogo} rowSpan={2}>{t('brandLogo')}</TableCell>
                        <TableCell sx={styles.columnSpecifications} rowSpan={2}>{t('specificationsUnit')}</TableCell>
                        <TableCell sx={styles.columnPrice}
                                   colSpan={4}>{t('unitPriceNotVAT')}</TableCell>
                        <TableCell sx={styles.columnNotes} rowSpan={2}>{t('note')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={styles.subPrice}>{t('standardSizeSheet')}</TableCell>
                        <TableCell sx={styles.subPrice}>{t('includesSizeSheet')}</TableCell>
                        <TableCell sx={styles.subPrice}>{t('standardSizeRoll')}</TableCell>
                        <TableCell sx={styles.subPrice}>{t('includesSizeRoll')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...groupedProducts].map(([groupId, products], groupIndex) => (
                        <React.Fragment key={groupIndex}>
                            <TableRow><TableCell sx={styles.groupRow} colSpan={11}>{groupIdToName.get(groupId)}</TableCell></TableRow>
                            {products.map((item, index) => (
                                <TableRow key={index} sx={{ height: '50px',backgroundColor: item.check ? colors.lilywhiteColor : colors.lightCoralColor, }}>
                                    <TableCell sx={styles.cellSTTText}>{index + 1}</TableCell>
                                    <TableCell sx={styles.cellDescriptionCode}>{item.product.code}</TableCell>
                                    <TableCell sx={styles.cellName}>{item.product.product_name}</TableCell>
                                    <TableCell sx={styles.cellDescribeDetail}>{item.product.description}</TableCell>
                                    <TableCell sx={styles.cellLogo}></TableCell>
                                    <TableCell sx={styles.cellSpecifications}>
                                        {`${parseFloat(item.product.width).toString().replace(/\.0+$/, '')} * ${parseFloat(item.product.length).toString().replace(/\.0+$/, '')}`}
                                    </TableCell>
                                    <TableCell sx={{
                                        ...styles.cellPrice,
                                        backgroundColor: !item.check_price_standard_sheet_adjustment ? colors.redColor : undefined,
                                        fontWeight: !item.check_price_standard_sheet_adjustment ? 700 : undefined,
                                    }}>
                                        {formatCurrencyWithoutSymbol(item.price_standard_sheet_adjustment)}
                                    </TableCell>
                                    <TableCell sx={{
                                        ...styles.cellPrice,
                                        backgroundColor: !item.check_price_include_sheet_size_adjustment ? colors.redColor : undefined,
                                        fontWeight: !item.check_price_include_sheet_size_adjustment ? 700 : undefined,
                                    }}>
                                        {formatCurrencyWithoutSymbol(item.price_include_sheet_size_adjustment)}
                                    </TableCell>
                                    <TableCell sx={{
                                        ...styles.cellPrice,
                                        backgroundColor: !item.check_price_standard_roll_adjustment ? colors.redColor : undefined,
                                        fontWeight: !item.check_price_standard_roll_adjustment ? 700 : undefined,
                                    }}>
                                        {formatCurrencyWithoutSymbol(item.price_standard_roll_adjustment)}
                                    </TableCell>
                                    <TableCell sx={{
                                        ...styles.cellPrice,
                                        backgroundColor: !item.check_price_include_roll_size_adjustment ? colors.redColor : undefined,
                                        fontWeight: !item.check_price_include_roll_size_adjustment ? 700 : undefined,
                                    }}>
                                        {formatCurrencyWithoutSymbol(item.price_include_roll_size_adjustment)}
                                    </TableCell>
                                    <TableCell sx={styles.cellNotes}>{item.description}</TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default QuotationTable;
