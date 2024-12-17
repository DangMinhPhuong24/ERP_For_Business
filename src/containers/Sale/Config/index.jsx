import Box from '@mui/material/Box'
import HeaderPage from 'components/HeaderPage'
import {useTranslation} from 'react-i18next'
import '../../../resource/style/ConfigStyle.css'
import DebtAgePage from './DebtAge/index'
import GruopDebtPage from './GroupDebt/index'
import QuotePage from './Quote/index'
import {useMemo} from "react";
import {checkAttributeValue} from "../../../common/common";
import {permissionActions} from "../../../constants/titlePermissions";
import {useRoleCheck} from "../../../utils";

function ConfigPage() {
    const {t} = useTranslation()
    const {isSuperAdmin, userInfo} = useRoleCheck();
    const permissionsData = useMemo(
        () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
        [userInfo]
    )

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <HeaderPage title={t('config')}/>
            <Box p={2}>
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
                    {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.LIST_CONFIG_DEBT_GROUP)) && (
                        <Box>
                            <GruopDebtPage/>
                        </Box>
                    )}
                    {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.LIST_CONFIG_DEBT_AGE)) && (
                        <Box>
                            <DebtAgePage/>
                        </Box>
                    )}
                    <Box></Box>
                </Box>
                {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.LIST_CONFIG_QUOTATION)) && (
                    <Box>
                        <QuotePage/>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default ConfigPage
