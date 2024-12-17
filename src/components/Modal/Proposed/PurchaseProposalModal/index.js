import {useTranslation} from "react-i18next";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import React, {useMemo, useState} from "react";
import {Box, Grid, InputLabel, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import PolygonIcon from "../../../../asset/icon/Polygon.svg";
import colors from "../../../../constants/colors";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefuseIcon from "../../../../asset/icon/Refuse.svg";
import BasicTable from "../../../BasicTable";
import {formatNumber} from "../../../../common/common";
import selectedCase from "../../../../constants/selectedCase";
import IconButton from "@mui/material/IconButton";
import {VisibilityOutlined} from "@mui/icons-material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxWidth: '60vw',
  maxHeight: '80h',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto',
};


export default function PurchaseProposalModal({open, nameTitle, handleCloseModal, data , dataTable, handleSuccess,handleCancelModal}){
  const { t } = useTranslation();

  const handleSubmit = () =>{
    handleSuccess();
  }
  const handleCancel = () =>{
    handleCancelModal();
  }

  const headers = useMemo(
    () => [
      {
        key: 'commodityDode',
        label: t('commodityDode'),
        align: 'left',
        w: '15vw'
      },
      {
        key: 'purchaseQuantity',
        label: (
          <>
            {t('purchaseQuantity')} <span>(m<sup>2</sup>)</span>
          </>
        ),
        align: 'center',
        lineHeight: '17.25px'
      },
      {
        key: 'currentInventoryOfGoods',
        label: (
          <>
            {t('currentInventoryOfGoods')} <span>(m<sup>2</sup>)</span>
          </>
        ),
        align: 'center',
        lineHeight: '17.25px'
      },
      {
        key: 'quantityCreatedHasNotYetBeenWarehoused',
        label: (
          <>
            {t('quantityCreatedHasNotYetBeenWarehoused')} <span>(m<sup>2</sup>)</span>
          </>
        ),
        align: 'center',
        lineHeight: '17.25px'
      },
    ],
    [t]
  )

  const rows = useMemo(() => {
    return dataTable.map((row, index) => ({
      commodityDode: {
        label: row.lh_code,
      },
      purchaseQuantity: {
        label: formatNumber(row.m2),
      },
      currentInventoryOfGoods: {
        label: formatNumber(row.total_square_meter_product_children),
      },
      quantityCreatedHasNotYetBeenWarehoused: {
        label: formatNumber(row.total_square_meter_product_not_in_warehouse),
      },
    }))
  }, [dataTable])

  return(
    <Box>
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
        <Box
          sx={style}
        >
          <Typography component="p" className="claim-title">
            {nameTitle}
          </Typography>
          <Box p={2}>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={2}>{t('supplier')}</Grid>
              <Grid item>{data?.supplier?.supplier_name}</Grid>
            </Grid>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={2}>{t('proposer')}</Grid>
              <Grid item>{data?.user?.name}</Grid>
            </Grid>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={2}>{t('creationTime')}</Grid>
              <Grid item>{data.created_at}</Grid>
            </Grid>
            <Box p={2}>
              {dataTable?.length > 0 && (
                <BasicTable
                  headers={headers}
                  rows={rows}
                  showIndex
                  currentPage={1}
                  isTaxAndTotalValue={data}
                  totalValue={data.purchase_order_product_total}
                />
              )}
            </Box>
            {data.status?.id === selectedCase.canceled ? (
              <Grid container xs={12} alignItems='baseline'>
                <Grid item xs={1}>
                  <InputLabel className="inputLabel-modal">{t('reasons')}:</InputLabel>
                </Grid>
                <Grid item>
                  <Typography className="typography-propose" component="p">
                    {data.reason}
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
          </Box>
          {data.status?.id === 1 && (
            <Box
              sx={{
                position: 'sticky',
                bottom: '0',
                display: 'flex',
                justifyContent: 'flex-end',
                p: '8px 16px',
                bgcolor: colors.paleblueColor,
                zIndex: 1
              }}
            >
              <>
                <Button onClick={handleCancel} className="cancelButton">
                  {t("refuse")}
                  <RefuseIcon />
                </Button>
                <Button variant="contained" onClick={handleSubmit} className="confirmButton">
                  {t("accept")}
                  <ArrowForwardIcon />
                </Button>
              </>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  )
}