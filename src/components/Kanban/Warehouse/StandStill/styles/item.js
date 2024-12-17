import * as React from 'react'
import { useState } from 'react'
import styled from '@xstyled/styled-components'
import { useTranslation } from 'react-i18next'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import colors from '../../../../../constants/colors'
import gifImage from '../../../../../asset/images/2acfa2de9ac1fcc35985c6cbcc66ec23.gif'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  detailWarehouseExportOrdersState,
  detailWarehouseImportOrdersState,
  listWarehouseExportQROrdersState
} from '../../../../../redux/warehouse/warehouse.selectors'
import {
  getDetailWarehouseExportOrdersAction,
  getDetailWarehouseImportOrdersAction,
  getListWarehouseExportQROrdersAction
} from '../../../../../redux/warehouse/warehouse.actions'
import DetailWarehouseImportOrderModal from '../../../../Modal/Warehouse/DetailWarehouseImportOrder'

const Container = styled.a`
  cursor: pointer;
`


const LightTooltip = styled(({ className, ...props }) => <Tooltip { ...props } classes={ { popper: className } }/>)(
  ({ theme }) => ( {
    [`& .${ tooltipClasses.tooltip }`]: {
      backgroundColor: colors.lilywhiteColor,
      color: colors.redColor,
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      fontSize: 14,
      fontWeight: 700,
      borderRadius: 5,
      maxWidth: 'none',
      whiteSpace: 'nowrap'
    }
  } )
)

const GifImage = styled.img`
  width: 27px;
  height: 23px;
`

const Content = styled.div`
  //height: 70px;
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 8px;
  border-radius: 3px;
  margin-bottom: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Code = styled.small`
  font-size: 12px;
  margin: 1px;
  flex-grow: 1;
  font-weight: 700;
  padding: 4px;
`

const Author = styled.small`
  font-size: 10px;
  font-weight: normal;
  padding-left: 4px;
  font-style: italic;
`

const Status = styled.div`
  margin: 1px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 10px;
  width: min-content;
  color: #202124;
`

function QuoteItem(props) {
  const { t } = useTranslation()
  const { quote, isFirstColumn, isSecondColumn, isThirdColumn, isExport } = props
  const [ modalOpen, setModalOpen ] = useState(false)
  const detailWarehouseImportOrders = useSelector(detailWarehouseImportOrdersState)
  const detailWarehouseExportOrders = useSelector(detailWarehouseExportOrdersState)
  const listWarehouseExportQROrders = useSelector(listWarehouseExportQROrdersState)
  const dispatch = useDispatch()

  const handleOpen = (id) => {
    if (isExport) {
      dispatch(getDetailWarehouseExportOrdersAction(id))
    } else {
      dispatch(getListWarehouseExportQROrdersAction(id))
      dispatch(getDetailWarehouseImportOrdersAction(id))
    }
    setModalOpen(true)
  }

  const handleClose = () => setModalOpen(false)

  return (
    <>
      <Container onClick={ () => handleOpen(quote.id) }>
        <Content>
          <Footer>
            <Code
              style={ { color: isSecondColumn ? colors.oceanblueColor : isThirdColumn ? colors.greenColor : 'normal' } }
            >
              { isExport ? quote.warehouse_export_order_name : quote.warehouse_import_order_name }
            </Code>
            <Box sx={ { display: 'flex', flexDirection: 'column' } }>
              <Box flex={ 1 }>
                { isFirstColumn && quote.warning && (
                  <>
                    <LightTooltip title={ quote.warning } TransitionProps={ { timeout: 0 } }>
                      <GifImage src={ gifImage } alt="gif"/>
                    </LightTooltip>
                  </>
                ) }
              </Box>
            </Box>
          </Footer>
          <Footer>
            <Status>
              <Author>
                { t('from') }: { quote.from }
              </Author>
              <Author>
                { t('come') }: { quote.to }
              </Author>
            </Status>
            <Author style={ { color: quote.warning ? colors.redColor : colors.charcoalBlack } }>
              { isExport ? quote.export_time : quote.import_time }
            </Author>
          </Footer>
        </Content>
      </Container>
      <DetailWarehouseImportOrderModal
        isExport={ isExport }
        warehouseOrderName={ isExport ? quote.warehouse_export_order_name : quote.warehouse_import_order_name }
        open={ modalOpen }
        dataDetail={ isExport ? detailWarehouseExportOrders : detailWarehouseImportOrders }
        handleCloseModal={ handleClose }
        dataPrintQR={ listWarehouseExportQROrders }
      />
    </>
  )
}

export default React.memo(QuoteItem)
