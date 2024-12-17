// @ts-nocheck
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import MyCustomFontBold from '../../asset/font/Tinos-Bold.ttf'
import MyCustomFontLightItalicBold from '../../asset/font/Tinos-BoldItalic.ttf'
import MyCustomFontLightItalic from '../../asset/font/Tinos-Italic.ttf'
import MyCustomFontLight from '../../asset/font/Tinos-Regular.ttf'
import assets from '../../asset/index'
import { formatNumber } from '../../common/common'

Font.register({
  family: 'Tinos-Bold',
  src: MyCustomFontBold
})

Font.register({
  family: 'Tinos-Light',
  src: MyCustomFontLight
})

Font.register({
  family: 'Tinos-ItalicBold',
  src: MyCustomFontLightItalicBold
})

Font.register({
  family: 'Tinos-Italic',
  src: MyCustomFontLightItalic
})

const commonCellStyles = {
  paddingLeft: 2,
  paddingRight: 2,
  fontFamily: 'Tinos-Light',
  fontSize: 7,
  minHeight: '40px',
  borderRightColor: 'black',
  borderRightWidth: 1,
  borderRightStyle: 'solid',
  paddingTop: 4,
  paddingBottom: 4
}

const commonTextAlignLeft = {
  textAlign: 'left',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  flexWrap: 'wrap',
  overflowWrap: 'break-word'
}

const commonTextAlignCenter = {
  textAlign: 'center'
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    paddingTop: 40,
    width: '21.59cm',
    height: '27.94cm'
  },
  mar: {
    marginLeft: '40px'
  },
  section: {
    marginBottom: 5
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10px'
  },
  logo: {
    width: '45px',
    height: '45px',
    marginRight: 5
  },
  companyName: {
    fontFamily: 'Tinos-Bold',
    fontSize: 14
  },
  redText: {
    color: 'red'
  },
  blackText: {
    color: 'black'
  },
  address: {
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    marginBottom: 5
  },
  phoneNumber: {
    fontFamily: 'Tinos-Light',
    fontSize: 8,
    textAlign: 'center'
  },
  textBottom: {
    fontFamily: 'Tinos-Light',
    fontSize: 8,
    textAlign: 'center',
    marginLeft: '0px'
  },
  textHeaders: {
    textAlign: 'left',
    fontFamily: 'Tinos-Light',
    fontSize: 8,
    width: '50px'
  },
  textHeadersOrderDate: {
    textAlign: 'left',
    fontFamily: 'Tinos-Bold',
    fontSize: 10,
    width: '150px',
    marginBottom: '5px'
  },
  textHeadersDeliveryDate: {
    textAlign: 'left',
    fontFamily: 'Tinos-Bold',
    fontSize: 10,
    width: '150px',
    marginLeft: '250px',
    marginBottom: '5px'
  },
  text: {
    fontFamily: 'Tinos-Light',
    fontSize: 8,
    textAlign: 'center',
    width: '230px'
  },
  companyInfoBold: {
    fontFamily: 'Tinos-Bold',
    fontSize: 8
  },
  textBottomInfoBold: {
    fontFamily: 'Tinos-Bold',
    fontSize: 8,
    width: '40px'
  },

  textBottomInfoBold1: {
    fontFamily: 'Tinos-Bold',
    fontSize: 8,
    minWidth: '80px',
    marginLeft: '40px'
  },
  textBottomInfoBold2: {
    fontFamily: 'Tinos-Bold',
    fontSize: 8,
    minWidth: '80px',
    marginLeft: '130px'
  },
  textBottomInfoBold3: {
    fontFamily: 'Tinos-Bold',
    fontSize: 8,
    minWidth: '80px',
    marginLeft: '100px'
  },

  titleItalic: {
    textAlign: 'center',
    fontFamily: 'Tinos-Italic',
    fontSize: 10,
    color: '#5F6E80'
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 24,
    marginBottom: 5,
    marginTop: 10
  },
  date: {
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 10,
    color: 'red'
  },
  tableContainer: {
    marginTop: 10,
    display: 'table'
  },
  table: {
    display: 'table',
    marginBottom: 10,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid'
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: '60px'
  },

  tableRowBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    flexWrap: 'wrap'
  },
  textHeader: {
    textAlign: 'left',
    fontFamily: 'Tinos-Light',
    fontSize: 10,
    marginBottom: 10,
    marginTop: 5,
    width: '100%'
  },
  columnHeaderNo: {
    width: '5%',
    paddingTop: '23px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    height: '60px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderLHCode: {
    width: '15%',
    paddingTop: '23px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderSupplierCode: {
    paddingTop: '23px',
    width: '10%',
    paddingLeft: '2px',
    paddingRight: '2px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderProductType: {
    paddingTop: '23px',
    width: '10%',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderDescription: {
    width: '15%',
    paddingTop: '23px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderWidth: {
    width: '7%',
    paddingTop: '23px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderLength: {
    width: '7%',
    paddingTop: '23px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderPrice: {
    width: '7%',
    paddingTop: '23px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  columnHeaderRemark: {
    flex: 1,
    paddingTop: '23px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    height: '60px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },

  cellSTTText: {
    ...commonCellStyles,
    width: '5%',
    textAlign: 'center',
    paddingLeft: 1,
    paddingRight: 1
  },
  cellLHCode: {
    ...commonCellStyles,
    width: '15%',
    ...commonTextAlignLeft,
    justifyContent: 'center',
    maxWidth: '15%',
    whiteSpace: 'normal'
  },
  cellSupplierCode: {
    ...commonCellStyles,
    width: '10%',
    lineHeight: '100%',
    ...commonTextAlignLeft
  },
  cellProductType: {
    ...commonCellStyles,
    width: '10%',
    ...commonTextAlignLeft
  },
  cellDescription: {
    ...commonCellStyles,
    width: '15%',
    ...commonTextAlignLeft
  },
  cellWidth: {
    ...commonCellStyles,
    width: '7%',
    ...commonTextAlignCenter
  },
  cellLength: {
    ...commonCellStyles,
    width: '7%',
    ...commonTextAlignCenter
  },
  cellPrice: {
    ...commonCellStyles,
    width: '7%',
    ...commonTextAlignCenter
  },
  cellQuantity: {
    ...commonCellStyles,
    width: '7.5%',
    ...commonTextAlignCenter
  },
  cellRemark: {
    ...commonCellStyles,
    textAlign: 'left',
    paddingVertical: 8,
    flex: 1,
    borderRightWidth: 0
  },

  cellSTTTextTotal: {
    ...commonCellStyles,
    width: '5%',
    minHeight: 20,
    ...commonTextAlignCenter,
    paddingLeft: 1,
    paddingRight: 1
  },
  cellLHCodeTotal: {
    ...commonCellStyles,
    width: '15%',
    ...commonTextAlignCenter,
    fontFamily: 'Tinos-Bold',
    maxWidth: '15%',
    whiteSpace: 'normal',
    minHeight: 20
  },
  cellSupplierCodeTotal: {
    ...commonCellStyles,
    width: '10%',
    lineHeight: '100%',
    ...commonTextAlignLeft,
    minHeight: 20
  },
  cellProductTypeTotal: {
    ...commonCellStyles,
    width: '10%',
    ...commonTextAlignLeft,
    minHeight: 20
  },
  cellDescriptionTotal: {
    ...commonCellStyles,
    width: '15%',
    ...commonTextAlignLeft,
    minHeight: 20
  },
  cellWidthTotal: {
    ...commonCellStyles,
    width: '7%',
    ...commonTextAlignCenter,
    minHeight: 20
  },
  cellLengthTotal: {
    ...commonCellStyles,
    width: '7%',
    ...commonTextAlignCenter,
    minHeight: 20
  },
  cellPriceTotal: {
    ...commonCellStyles,
    width: '7%',
    ...commonTextAlignCenter,
    minHeight: 20
  },
  cellQuantityTotal: {
    ...commonCellStyles,
    width: '7.5%',
    ...commonTextAlignCenter,
    fontFamily: 'Tinos-Bold',
    minHeight: 20
  },
  cellRemarkTotal: {
    ...commonCellStyles,
    textAlign: 'left',
    paddingVertical: 8,
    flex: 1,
    minHeight: 20,
    borderRightWidth: 0
  },

  footerText: {
    fontFamily: 'Tinos-Bold',
    fontSize: 12,
    marginLeft: '20px',
    marginTop: 30
  },
  extraLogosContainer: {
    flexDirection: 'row',
    marginLeft: '160px'
  },
  extraLogo: {
    width: '40px',
    height: '40px',
    marginLeft: '10px'
  },
  companyInfo: {
    marginLeft: '10px',
    justifyContent: 'center'
  },

  columnHeaderQuantity: {
    height: '60px',
    width: '15%'
  },
  subColumnHeaderQuantityMerge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderTopStyle: 'solid'
  },
  subColumnHeaderQuantity: {
    paddingTop: '10px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    height: '30px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid'
  },
  subColumnHeaderQuantityOne: {
    flex: 1,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    textAlign: 'center',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    paddingTop: '10px',
    height: '29px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  subColumnHeaderQuantityTwo: {
    flex: 1,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    textAlign: 'center',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    paddingTop: '10px',
    height: '29px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  }
})

const PurchaseOrderPDFComponent = (props) => {
  const { dataPurchaseOrder, typeSupplier } = props
  const deliveryDateFormatted = dataPurchaseOrder.delivery_date
    ? dataPurchaseOrder.delivery_date.replace(/\//g, '-')
    : ''
  const createdAtFormatted = dataPurchaseOrder.created_at
    ? new Date(dataPurchaseOrder.created_at.replace(/(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{4})/, '$4/$3/$5'))
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      .replace(/\//g, '-')
    : ''

  const FOREIGN = 2

  const checkForeignSupplier = typeSupplier === FOREIGN

  const splitText = (text = '', maxLength) => {
    if (typeof text !== 'string') {
      return ['']
    }

    if (text.length <= maxLength) {
      return [text]
    }

    const regex = new RegExp(`.{1,${maxLength}}`, 'g')
    return text.match(regex) || []
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.logoContainer}>
            <Image src={assets.images.logo} style={styles.logo} />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>
                <Text style={styles.redText}>LINH HIEU</Text>
                <Text style={styles.blackText}> CO., LTD</Text>
              </Text>
              <Text style={styles.address}>
                {' '}
                {checkForeignSupplier ? 'To: ' : 'Đến:'}
                {dataPurchaseOrder?.supplier?.supplier_name}
              </Text>
              <Text style={styles.address}></Text>
            </View>
          </View>
        </View>
        <Text style={styles.title}>{checkForeignSupplier ? 'Purchase Order' : 'Đơn mua hàng'}</Text>
        <Text style={styles.date}>No: {dataPurchaseOrder?.code}</Text>
        <View style={styles.tableContainer}>
          <View style={styles.logoContainer}>
            <View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeadersOrderDate}>
                  {checkForeignSupplier ? 'Order date' : 'Ngày đặt hàng'}:{' '}
                  <Text style={{ color: 'red' }}>{createdAtFormatted}</Text>
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeadersDeliveryDate}>
                  {checkForeignSupplier ? 'Delivery date' : 'Ngày giao hàng'}:{' '}
                  <Text style={{ color: 'red' }}>{deliveryDateFormatted}</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow]}>
              <Text style={styles.columnHeaderNo}>{checkForeignSupplier ? 'No' : 'STT'}</Text>
              <Text style={styles.columnHeaderLHCode}>{checkForeignSupplier ? "LH' Code" : 'Mã LH'}</Text>
              <Text style={styles.columnHeaderSupplierCode}>
                {checkForeignSupplier ? 'Supplier product code' : 'Mã hàng nhà cung cấp'}
              </Text>
              <Text style={styles.columnHeaderProductType}>
                {checkForeignSupplier ? 'Product Type' : 'Loại sản phẩm'}
              </Text>
              <Text style={styles.columnHeaderDescription}>{checkForeignSupplier ? 'Description' : 'Mô tả'}</Text>
              <Text style={styles.columnHeaderWidth}>{checkForeignSupplier ? 'Width' : 'Chiều rộng'}</Text>
              <Text style={styles.columnHeaderLength}>{checkForeignSupplier ? 'Length' : 'Chiều dài'}</Text>
              <Text style={styles.columnHeaderPrice}>
                {checkForeignSupplier ? 'Price' : 'Giá'}
                {'\n'}({dataPurchaseOrder?.supplier?.currency_unit?.name}/sqm)
              </Text>

              <View style={styles.columnHeaderQuantity}>
                <Text style={styles.subColumnHeaderQuantity}> {checkForeignSupplier ? 'Quantity' : 'Số lượng'}</Text>
                <View style={styles.subColumnHeaderQuantityMerge}>
                  <Text style={styles.subColumnHeaderQuantityOne}>{checkForeignSupplier ? 'Roll' : 'Cuộn'}</Text>
                  <Text style={styles.subColumnHeaderQuantityTwo}>{checkForeignSupplier ? 'Sqm' : 'M2'}</Text>
                </View>
              </View>
              <Text style={styles.columnHeaderRemark}>{checkForeignSupplier ? 'Remarks' : 'Ghi chú'}</Text>
            </View>
            <View>
              {dataPurchaseOrder?.purchase_order_product?.map((item, index) => (
                <View style={styles.tableRowBody} key={index}>
                  <Text style={styles.cellSTTText}>{index + 1}</Text>
                  <Text style={styles.cellLHCode}>{splitText(item.lh_code, 20).join('\n')}</Text>
                  <Text style={styles.cellSupplierCode}>{splitText(item.supplier_code, 10).join('\n')}</Text>
                  <Text style={styles.cellProductType}>{item.product_category}</Text>
                  <Text style={styles.cellDescription}>{item.description}</Text>
                  <Text style={styles.cellWidth}>
                    {splitText(formatNumber(item.width), 10).join('\n')}
                  </Text>
                  <Text style={styles.cellLength}>
                    {splitText(formatNumber(item.length), 10).join('\n')}
                  </Text>
                  <Text style={styles.cellPrice}>
                    {splitText(formatNumber(item.price_m2), 10).join('\n')}
                  </Text>
                  <Text style={styles.cellQuantity}>
                    {splitText(formatNumber(item.quantity), 10).join('\n')}
                  </Text>
                  <Text style={styles.cellQuantity}>
                    {splitText(formatNumber(item.m2), 10).join('\n')}
                  </Text>
                  <Text style={styles.cellRemark}></Text>
                </View>
              ))}
              <View style={styles.tableRowBody}>
                <Text style={styles.cellSTTTextTotal}></Text>
                <Text style={styles.cellLHCodeTotal}>{checkForeignSupplier ? 'Total' : 'Tổng'}</Text>
                <Text style={styles.cellSupplierCodeTotal}></Text>
                <Text style={styles.cellProductTypeTotal}></Text>
                <Text style={styles.cellDescriptionTotal}></Text>
                <Text style={styles.cellWidthTotal}></Text>
                <Text style={styles.cellLengthTotal}></Text>
                <Text style={styles.cellPriceTotal}></Text>
                <Text style={styles.cellQuantityTotal}>
                  {splitText(formatNumber(dataPurchaseOrder?.total_quantity), 10).join('\n')}
                </Text>
                <Text style={styles.cellQuantityTotal}>
                  {splitText(formatNumber(dataPurchaseOrder?.total_m2), 10).join('\n')}
                </Text>
                <Text style={styles.cellRemarkTotal}></Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View>
            <View style={styles.logoContainer}>
              <Text style={styles.textBottomInfoBold}>{checkForeignSupplier ? 'Note' : 'Ghi chú'}:</Text>
              <Text style={styles.textBottom}>{dataPurchaseOrder?.note}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <View style={styles.logoContainer}>
              <Text style={styles.textBottomInfoBold1}>{checkForeignSupplier ? 'Maker' : 'Người tạo'}</Text>
              <Text style={styles.textBottomInfoBold2}>{checkForeignSupplier ? 'Approver' : 'Người phê duyệt'}</Text>
              <Text style={styles.textBottomInfoBold3}>
                {checkForeignSupplier ? 'Supplier reply' : 'Phản hồi của nhà cung cấp'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.footerText}></Text>
        </View>
      </Page>
    </Document>
  )
}
export default PurchaseOrderPDFComponent
