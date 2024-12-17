import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from "xlsx";
import { GrDownload } from "react-icons/gr";
import Button from "@mui/material/Button";

function DownloadExcel({ data, actionGetData, flagGetDetail, csvHeader, filename, updateFlagCallBack }) {
    const { t } = useTranslation();
    useEffect(() => {
        if (flagGetDetail) {
            let header = [];
            csvHeader.forEach((element) => {
                header.push(t(element));
            });
            const branchCount = data[0]?.address_branches ? Object.keys(data[0].address_branches).length : 0;
            const addressFactoriesCount = data[0]?.address_factories ? Object.keys(data[0].address_factories).length : 0;
            const addressOfficesCount = data[0]?.address_offices ? Object.keys(data[0].address_offices).length : 0;
            const usersCount = data[0]?.users ? Object.keys(data[0].users).length : 0;
            const shiftIndexUsers = 9;
            const columnSpacing = 5;
            const shiftIndexBranches = shiftIndexUsers + usersCount + columnSpacing;
            const shiftIndexOffices = shiftIndexBranches + branchCount;
            const shiftIndexFactories = shiftIndexOffices + addressOfficesCount;

            const shiftedHeader = [...header];
            if (usersCount > 1) {
                shiftedHeader.splice(shiftIndexUsers + 1, 0, ...Array(usersCount - 1).fill(''));
            }
            if (branchCount > 1) {
                shiftedHeader.splice(shiftIndexBranches + 1, 0, ...Array(branchCount - 1).fill(''));
            }
            if (addressOfficesCount > 1) {
                shiftedHeader.splice(shiftIndexOffices + 1, 0, ...Array(addressOfficesCount - 1).fill(''));
            }
            if (addressFactoriesCount > 1) {
                shiftedHeader.splice(shiftIndexFactories + 1, 0, ...Array(addressFactoriesCount - 1).fill(''));
            }
            const flattenObject = (obj) => {
                const flattened = {};
                for (const key in obj) {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        Object.assign(flattened, flattenObject(obj[key]));
                    } else {
                        flattened[key] = obj[key];
                    }
                }
                return flattened;
            };
            const flattenedData = data ? data.map(flattenObject) : [];
            const csvData = [shiftedHeader, ...flattenedData.map(obj => Object.values(obj))];

            const ws = XLSX.utils.aoa_to_sheet(csvData);

            if (usersCount > 0 || branchCount > 0 || addressOfficesCount > 0 || addressFactoriesCount > 0) {
                ws['!merges'] = [];
                if (usersCount > 1) {
                    ws['!merges'].push({ s: { c: shiftIndexUsers, r: 0 }, e: { c: shiftIndexUsers + usersCount - 1, r: 0 } });
                }
                if (branchCount > 1) {
                    ws['!merges'].push({ s: { c: shiftIndexBranches, r: 0 }, e: { c: shiftIndexBranches + branchCount - 1, r: 0 } });
                }
                if (addressOfficesCount > 1) {
                    ws['!merges'].push({ s: { c: shiftIndexOffices, r: 0 }, e: { c: shiftIndexOffices + addressOfficesCount - 1, r: 0 } });
                }
                if (addressFactoriesCount > 1) {
                    ws['!merges'].push({ s: { c: shiftIndexFactories, r: 0 }, e: { c: shiftIndexFactories + addressFactoriesCount - 1, r: 0 } });
                }
            }

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, filename);
            updateFlagCallBack();
        }
    }, [flagGetDetail]);

    const handleExportExcel = () => {
        actionGetData();
    };

    return (
        <Button
            className="modalButton"
            sx={{ lineHeight: '16.94px !important', gap: '0 8px' }}
            onClick={handleExportExcel}
        >
            <GrDownload style={{ fontSize: '16px', marginBottom: '2px' }} />
            {t('downloadExcel')}
        </Button>
    );
}

export default DownloadExcel;
