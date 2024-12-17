import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import colors from "../../../../constants/colors";
import TabContext from "@mui/lab/TabContext";
import FinishedProductWarehouseTable from "../../../Table/OrderTable/FinishedProductWarehouseTable";
import Button from "@mui/material/Button";
import RetailWarehouseTable from "../../../Table/OrderTable/RetailWarehouseTable";
import GoodsWarehouseTable from "../../../Table/OrderTable/GoodsWarehouseTable";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {parsePricePerSquareMeter} from "../../../../common/common";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '958px',
  maxHeight: '90vh',
  maxWidth: '95vw',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto',
};

export default function ChooseMaterialsModal(props) {
  const { open, handleClose, data ,closeModal, handleCreateChooseMaterials, dataListProductWarehouseByProductManagementId} = props
  const { t } = useTranslation();
  const [ valueTabs, setValueTabs ] = useState('1')
  const [ checkboxSelected, setCheckboxSelected ] = useState([]);
  const [ finishedProductWarehouseData, setFinishedProductWarehouseData ] = useState([]);
  const [ retailWarehouseData, setRetailWarehouseData ] = useState([]);
  const [ goodsWarehouseData, setGoodsWarehouseData ] = useState([]);
  const [dataChooseMaterials, setDataChooseMaterials] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setFinishedProductWarehouseData(data?.product_warehouse_finished_warehouse);
      setRetailWarehouseData(data?.product_warehouse_retail_warehouse);
      setGoodsWarehouseData(data?.product_warehouse_merchandise_warehouse);
    }
  }, [ data]);

  useEffect(() => {
    if (dataListProductWarehouseByProductManagementId && Object.keys(dataListProductWarehouseByProductManagementId).length > 0) {

      const initialSelected = dataListProductWarehouseByProductManagementId.map(item => item.id);
      setCheckboxSelected(initialSelected);
      setDataChooseMaterials(dataListProductWarehouseByProductManagementId.map(item => ({
        product_warehouse_id: item.id,
        square_meter: parsePricePerSquareMeter(item.square_meter),
        scrap: item.scrap === '-' ? -1 : item.scrap,
      })));
    }
  }, [dataListProductWarehouseByProductManagementId]);

  const handleSelectOne = (data) => {
    const isSelected = checkboxSelected.includes(data.id.label);
    const newSelected = isSelected
      ? checkboxSelected.filter((item) => item !== data.id.label)
      : [...checkboxSelected, data.id.label];

    setCheckboxSelected(newSelected);

    setDataChooseMaterials((prevData) => {
      if (isSelected) {
        return prevData.filter((item) => item.product_warehouse_id !== data.id.label);
      } else {
        return [
          ...prevData,
          {
            product_warehouse_id: data.id.label,
            square_meter: parsePricePerSquareMeter(data.squareMeter.label),
            scrap: data.percentScrap.label === '-' ? -1 : data.percentScrap.label,
          },
        ];
      }
    });
  };

  const handleCloseModal = () => {
    setError('');
    setValueTabs('1')
    setCheckboxSelected([])
    setFinishedProductWarehouseData([])
    setRetailWarehouseData([])
    setGoodsWarehouseData([])
    setDataChooseMaterials([])
    handleClose();
  }

  useEffect(() => {
    if(closeModal){
      handleCloseModal()
    }
  }, [ closeModal]);

  const handleChangeTabs = (event, newValue) => {
    setValueTabs(newValue)
  }
  const handleSubmit = () => {
    if (dataChooseMaterials.length === 0) {
      setError(t('pleaseSelectTheProduct'));
      return;
    }
    setError('');
    handleCreateChooseMaterials(dataChooseMaterials)
  };

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
          timeout: 500
        } }
      >
        <Box sx={ style }>
          <Typography component="p" className="claim-title">
            { t('titleChooseMaterials') }
          </Typography>
          <TabContext value={ valueTabs }>
            <Box sx={ { p: 2, width: '100%', } }>
              <TabList onChange={ handleChangeTabs } className="tab-list">
                <Tab
                  className={ `button-tab btn-tab-material-private ${ valueTabs === '1' ? 'button-tab-selected' : 'button-tab-unselected' }` }
                  label={ t('finishedProductsWarehouse') }
                  value="1"
                />
                <Tab
                  className={ `button-tab btn-tab-material-private ${ valueTabs === '2' ? 'button-tab-selected' : 'button-tab-unselected' }` }
                  label={ t('retailWarehouse') }
                  value="2"
                />
                <Tab
                  className={ `button-tab btn-tab-material-private ${ valueTabs === '3' ? 'button-tab-selected' : 'button-tab-unselected' }` }
                  label={ t('goodsWarehouse') }
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel value="1" sx={ { padding: '0 16px' } }>
              <FinishedProductWarehouseTable
                data={ finishedProductWarehouseData }
                checkboxSelected={ checkboxSelected }
                handleSelectOne={ handleSelectOne }
              />
            </TabPanel>
            <TabPanel value="2" sx={ { padding: '0 16px' } }>
              <RetailWarehouseTable
                data={ retailWarehouseData }
                checkboxSelected={ checkboxSelected }
                handleSelectOne={ handleSelectOne }
              />
            </TabPanel>
            <TabPanel value="3" sx={ { padding: '0 16px' } }>
              <GoodsWarehouseTable
                data={ goodsWarehouseData }
                checkboxSelected={ checkboxSelected }
                handleSelectOne={ handleSelectOne }
              />
            </TabPanel>
          </TabContext>
          <Box
            sx={ {
              position: 'sticky',
              display: 'flex',
              justifyContent: 'space-between',
              bottom: 0,
              zIndex: 1,
              p: '8px 16px',
              backgroundColor: colors.paleblueColor,
              alignItems: 'center',
            } }
          >
            <Typography>{ t('selected') }: { checkboxSelected.length }</Typography>
            {error &&
              <Typography sx={{ ml: '15px' }} variant="body1" color="error" className="error-message">
                {error}
              </Typography>
            }
            <Box>
              <Button onClick={ handleCloseModal } className="cancelButton">
                { t('cancel') }
              </Button>
              <Button variant="contained" onClick={ handleSubmit } className="confirmButton">
                { t('confirm') }
                <ArrowForwardIcon/>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}