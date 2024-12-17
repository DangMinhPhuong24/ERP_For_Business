import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {formatCurrencyWithoutSymbol} from "../../../../../common/common";
import BasicTable from "../../../../BasicTable";

const CustomerListDoesNotGenerateOrdersTable = ({data}) => {
    const {t} = useTranslation();

    const headers = useMemo(
        () => [
            {
                key: 'customer',
                label: t('customer'),
                align: 'left',
                fontWeight: 700
            },
            {
                key: 'totalRevenues',
                label: t('totalRevenues'),
                align: 'right',
                fontWeight: 700
            },
            {
                key: 'numberOfDaysWithoutPurchase',
                label: t('numberOfDaysWithoutPurchase'),
                align: 'right',
                fontWeight: 700
            },
        ],
        [t]
    )

    const rows = useMemo(() => {
        const dataArray = data && typeof data === 'object' && !Array.isArray(data) ? [data] : [];
        return dataArray.map((row) => ({
            customer: {
                label: row.customer_name
            },
            totalRevenues: {
                label: formatCurrencyWithoutSymbol(row.total_revenue)
            },
            numberOfDaysWithoutPurchase: {
                label: row.days_without_purchase
            },
            id: {
                label: row.id
            }
        }))
    }, [data])

    return (
        <BasicTable
            headers={headers}
            rows={rows}
            showIndex
        />
    );
};

export default CustomerListDoesNotGenerateOrdersTable;