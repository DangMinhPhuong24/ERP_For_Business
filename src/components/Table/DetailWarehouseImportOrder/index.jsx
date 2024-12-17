// @ts-nocheck
import { useTranslation } from 'react-i18next'
import { Link, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material'
import { formatNumber } from '../../../common/common'
import PrintableContent from "../../Buttons/PrintableContent";

const styles = {
  rowLabel: {
    padding: '4px 0 !important',
    border: 'none',
    width: '30%',
    fontSize: '16px'
  },
  rowInfo: {
    padding: '4px 0 !important',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700'
  },
  labelHeader: {
    fontSize: '16px !important',
    fontWeight: '700',
    textDecoration: 'underline',
    margin: '10px 0'
  },
  columnHeaderTable: {
    padding: '10px',
    border: '1px solid #AAAAAA',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: '700'
  },
  cellItemTable: {
    padding: '10px',
    border: '1px solid #AAAAAA',
    fontSize: '12px'
  },
  cellItemTableAlign: {
    textAlign: 'center'
  }
}

export default function DetailWarehouseImportOrderTable(props) {
  const { isExport, dataTable, dataPrintQR } = props
  const { t } = useTranslation()

  const handle = (id) => {
    const url = `/purchase/detail-purchase-view?id=${id}`
    window.open(url, '_blank')
  }

  const handleExport = (id) => {
    const url = `/purchase/detail-purchase-view?id=${id}`
    window.open(url, '_blank')
  }

  const productWarehouseOrder = isExport
    ? 'product_warehouse_warehouse_export_order'
    : 'product_warehouse_warehouse_import_order'

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.rowLabel}>{isExport ? t('productionOrder') : t('origin')}</TableCell>
            <TableCell sx={styles.rowInfo}>
              <Link
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault()
                  if (isExport) {
                    handleExport(dataTable.origin?.id)
                  } else {
                    handle(dataTable.origin?.id)
                  }
                }}
              >
                {isExport ? dataTable.origin?.origin_name : dataTable.origin?.origin_name}
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.rowLabel}>{t('from')}</TableCell>
            <TableCell sx={styles.rowInfo}>{isExport ? dataTable.from : dataTable.from}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.rowLabel}>{t('come')}</TableCell>
            <TableCell sx={styles.rowInfo}>{isExport ? dataTable.to : dataTable.to}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.rowLabel}>{t('time')}</TableCell>
            <TableCell sx={styles.rowInfo}>
              {isExport
                ? `${dataTable?.export_time ?? ''} ${dataTable?.export_date ?? ''}`
                : `${dataTable?.import_time ?? ''} ${dataTable?.import_date ?? ''}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.rowLabel}>{t('status')}</TableCell>
            <TableCell sx={styles.rowInfo}>
              {isExport
                ? dataTable.warehouse_export_order_status?.warehouse_export_order_status_name
                : dataTable.warehouse_import_order_status?.warehouse_import_order_status_name}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography sx={styles.labelHeader} variant="h6">
          {t('rawMaterials')}
        </Typography>
        {!isExport && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PrintableContent data={dataPrintQR} />
          </Box>
        )}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={styles.columnHeaderTable}>{t('format')}</TableCell>
            <TableCell sx={styles.columnHeaderTable}>{t('materialName')}</TableCell>
            <TableCell sx={styles.columnHeaderTable}>{`${t('width')} (cm)`}</TableCell>
            <TableCell sx={styles.columnHeaderTable}>{`${t('length')} (m)`}</TableCell>
            <TableCell sx={styles.columnHeaderTable}>{t('quantity')}</TableCell>
            <TableCell sx={styles.columnHeaderTable}>{t('from')}</TableCell>
            <TableCell sx={styles.columnHeaderTable}>{t('come')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable[productWarehouseOrder]?.map((item, index) => (
            <TableRow key={index}>
              <TableCell width="5%" sx={styles.cellItemTable}>
                {item.finished_product_form?.finished_product_form_name}
              </TableCell>
              <TableCell width="35%" sx={styles.cellItemTable}>
                {item.product?.product_name}
              </TableCell>
              <TableCell width="10%" sx={{ ...styles.cellItemTable, ...styles.cellItemTableAlign }}>
                {formatNumber(item.width)}
              </TableCell>
              <TableCell width="10%" sx={{ ...styles.cellItemTable, ...styles.cellItemTableAlign }}>
                {formatNumber(item.length)}
              </TableCell>
              <TableCell width="10%" sx={{ ...styles.cellItemTable, ...styles.cellItemTableAlign }}>
                {formatNumber(item.quantity)}
              </TableCell>
              <TableCell width="18%" sx={{ ...styles.cellItemTable, ...styles.cellItemTableAlign }}>
                {item.from}
              </TableCell>
              <TableCell width="18%" sx={{ ...styles.cellItemTable, ...styles.cellItemTableAlign }}>
                {item.to}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
