import React, { useState } from 'react'
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer'
import MyCustomFontBold from '../../asset/font/Tinos-Bold.ttf'
import MyCustomFontLight from '../../asset/font/Tinos-Regular.ttf'
import MyCustomFontLightItalicBold from '../../asset/font/Tinos-BoldItalic.ttf'
import MyCustomFontLightItalic from '../../asset/font/Tinos-Italic.ttf'
import assets from '../../asset/index'
import { formatPhoneNumber, formatCurrencyWithoutSymbol } from '../../common/common'
import dayjs from 'dayjs'
import {useTranslation} from "react-i18next";

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
    marginTop: '40px'
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
    marginBottom: 5,
    textDecoration: 'underline'
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
    marginLeft: '20px'
  },
  textHeaders: {
    textAlign: 'left',
    fontFamily: 'Tinos-Light',
    textTransform: 'uppercase',
    fontSize: 8,
    width: '50px'
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
    width: '80px'
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
    textTransform: 'uppercase',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10
  },
  date: {
    textAlign: 'center',
    fontFamily: 'Tinos-Italic',
    fontSize: 8
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
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: '40px',
    display: 'flex',
    justifyContent: 'center'
  },
  textHeader: {
    textAlign: 'left',
    fontFamily: 'Tinos-Light',
    fontSize: 10,
    marginBottom: 10,
    marginTop: 5,
    width: '100%'
  },
  textCentrer: {
    textAlign: 'center',
    fontFamily: 'Tinos-Light',
    fontSize: 10,
    marginBottom: 5,
    color: '#405E99'
  },
  sttColumnHeader: {
    width: '3%',
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
  columnNameDescribeDetail: {
    paddingTop: '23px',
    width: '21%',
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
  columnName: {
    paddingTop: '23px',
    width: '16%',
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
  columnLogo: {
    paddingTop: '15px',
    width: '5%',
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
  columnSpecifications: {
    width: '6%',
    paddingTop: '18px',
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
  columnHeader: {
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
  cellName: {
    paddingLeft: 1,
    paddingRight: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    width: '16%',
    height: '40px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingBottom: 4
  },
  cellDescribeDetail: {
    paddingLeft: 1,
    paddingRight: 1,
    lineHeight: '100%',
    textAlign: 'left',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    width: '21%',
    height: '40px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingBottom: 4
  },
  cellLogo: {
    paddingLeft: 1,
    paddingRight: 1,
    textAlign: 'center',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    width: '5%',
    height: '40px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingBottom: 4
  },
  cellSpecifications: {
    paddingLeft: 1,
    paddingRight: 1,
    textAlign: 'left',
    fontFamily: 'Tinos-Italic',
    fontSize: 7,
    width: '6%',
    height: '40px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingBottom: 4
  },
  cellColumn1: {
    paddingLeft: 1,
    paddingRight: 1,
    textAlign: 'center',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    width: '7.75%',
    height: '40px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingBottom: 4
  },
  cellSTTText: {
    width: '3%',
    textAlign: 'center',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    height: '40px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 1,
    paddingRight: 1
  },

  groupHeader: {
    textAlign: 'left',
    fontFamily: 'Tinos-Bold',
    fontSize: 8,
    paddingVertical: 5,
    paddingLeft: 5,
    backgroundColor: '#FCE4D6',
    minHeight: '20px',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
  },
  cellText: {
    paddingLeft: 1,
    paddingRight: 1,
    flex: 1,
    textAlign: 'left',
    fontFamily: 'Tinos-Light',
    fontSize: 7,
    paddingVertical: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    height: '40px',
    paddingTop: 4,
    paddingBottom: 4
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 12,
    marginLeft: 300,
    marginTop: 50
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
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
    width: '500px',
    alignSelf: 'center'
  },
  priceColumn: {
    height: '60px',
    width: '31%'
  },
  subColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderTopStyle: 'solid'
  },
  subColumnHeader: {
    paddingTop: '10px',
    textAlign: 'center',
    fontFamily: 'Tinos-Bold',
    fontSize: 7,
    height: '30px',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid'
  },
  subColumn1: {
    flex: 1,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    textAlign: 'center',
    fontFamily: 'Tinos-Italic',
    fontSize: 7,
    paddingTop: '10px',
    height: '30px',
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    borderBottomStyle: 'solid'
  },
  subColumn2: {
    flex: 1,
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderRightStyle: 'solid',
    textAlign: 'center',
    fontFamily: 'Tinos-Italic',
    fontSize: 7,
    paddingTop: '6px',
    height: '30px',
    borderBottomColor: 'black',
    borderBottomWidth: 1.5,
    borderBottomStyle: 'solid'
  }
})

const PDFComponent = ({ data, dataProduct, getProfile }) => {
  const { customer_name, company_name, email: customer_email, phone_number: customer_phone } = data
  const { name, phone_number: profile_phone, email: profile_email } = getProfile
  const formattedProfilePhone = formatPhoneNumber(profile_phone)
  const formattedCustomerPhone = formatPhoneNumber(customer_phone)
  const today = dayjs().format('DD/MM/YYYY')
  const { t } = useTranslation()
  const groupByGroupId = (list, keyGetter) => {
    const map = new Map()
    if (list) {
      list.forEach((item) => {
        const key = keyGetter(item)
        if (key !== undefined && key !== null) {
          const collection = map.get(key)
          if (!collection) {
            map.set(key, [item])
          } else {
            collection.push(item)
          }
        }
      })
    }
    return map
  }

  const productQuotationHistory = dataProduct?.product_management_quotation_history || []
  const groupedProducts = groupByGroupId(productQuotationHistory, (item) => item.product.product_group?.id)

  const groupIdToName = new Map()
  if (Array.isArray(productQuotationHistory)) {
    productQuotationHistory.forEach((item) => {
      if (item.product.product_group) {
        groupIdToName.set(item.product.product_group.id, item.product.product_group.product_group_name)
      }
    })
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
              <Text style={styles.address}>TẬN TÂM - TRUNG THỰC - NIỀM TIN</Text>
            </View>
            <View style={styles.extraLogosContainer}>
              <Image src={assets.images.logoLabel} style={styles.extraLogo} />
              <Image src={assets.images.logoTrademark} style={styles.extraLogo} />
              <Image src={assets.images.logoUPM} style={styles.extraLogo} />
            </View>
          </View>
        </View>
        <Text style={styles.textCentrer}>
          TƯ VẤN - CUNG CẤP DECAL CHO NGÀNH IN - GIA CÔNG SA XUẤT TEM NHÃN TẠI VIỆT NAM
        </Text>
        <Text style={styles.textCentrer}>SỬ DỤNG MÁY IN: OFFSET - LABEL - LETTERPRESS - FLEXO</Text>
        <Text style={styles.textCentrer}>MÁY IN DIGITAL: KONICA - FUJI - RICOH - TOSHIBA</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.logoContainer}>
          <View>
            <View style={styles.logoContainer}>
              <Text style={styles.companyInfoBold}>{t('VP')}:</Text>
              <Text style={styles.phoneNumber}> Số 3 Đội Nhân - P. Vĩnh Phúc - Q. Ba Đình - Hà Nội</Text>
            </View>
            <View style={styles.logoContainer}>
              <Text style={styles.companyInfoBold}>{t('factory')}:</Text>
              <Text style={styles.phoneNumber}> Km số 10 Đại Lộ Thăng Long - Cụm CN An Khánh - Hoài Đức - Hà Nội</Text>
            </View>
          </View>
          <View style={{ marginLeft: '50px' }}>
            <View style={styles.logoContainer}>
              <Text style={styles.companyInfoBold}>{t('Web')}:</Text>
              <Text style={styles.titleItalic}> https://linhhieudecal.vn/</Text>
            </View>
            <View style={styles.logoContainer}>
              <Text style={styles.companyInfoBold}>{t('ĐT')}:</Text>
              <Text style={styles.phoneNumber}> 024.3761.785</Text>
            </View>
          </View>
        </View>
        <Text style={styles.title}>{t('tablePriceQuotation')}</Text>
        <Text style={styles.date}>( {t('applyDate')} {dataProduct.effective_date} )</Text>
        <View style={styles.tableContainer}>
          <View style={styles.logoContainer}>
            <View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('dateSent')}:</Text>
                <Text style={styles.text}>{today}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('sender')}:</Text>
                <Text style={styles.text}>{name}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('phone')}:</Text>
                <Text style={styles.text}>{formattedProfilePhone}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('email')}:</Text>
                <Text style={styles.text}>{profile_email}</Text>
              </View>
            </View>
            <View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('dear')}:</Text>
                <Text style={styles.text}>{company_name}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('grandparents')}:</Text>
                <Text style={styles.text}>{customer_name}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('phone')}:</Text>`
                <Text style={styles.text}>{formattedCustomerPhone}</Text>
              </View>
              <View style={styles.logoContainer}>
                <Text style={styles.textHeaders}>{t('email')}:</Text>
                <Text style={styles.text}>{customer_email}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.textHeader}>{t('thanksQuotation')}:</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: '#2F74B5', color: 'white' }]}>
              <Text style={styles.sttColumnHeader}>#</Text>
              <Text style={styles.columnName}>{t('name')}</Text>
              <Text style={styles.columnNameDescribeDetail}>{t('productDescription')}</Text>
              <Text style={styles.columnLogo}>{t('brandLogo')}</Text>
              <Text style={styles.columnSpecifications}>{t('specificationsUnit')}</Text>
              <View style={styles.priceColumn}>
                <Text style={styles.subColumnHeader}>{t('unitPriceNotVAT')}</Text>
                <View style={styles.subColumns}>
                  <Text style={styles.subColumn1}>{t('standardSizeSheet')}</Text>
                  <Text style={styles.subColumn1}>{t('includesSizeSheet')}</Text>
                  <Text style={styles.subColumn2}>{t('standardSizeRoll')}</Text>
                  <Text style={styles.subColumn2}>{t('includesSizeRoll')}</Text>
                </View>
              </View>
              <Text style={styles.columnHeader}>{t('note')}</Text>
            </View>
            {[...groupedProducts].map(([groupId, products], index) => (
              <View key={index}>
                <Text style={styles.groupHeader}>{groupIdToName.get(groupId)}</Text>
                {products.map((product, idx) => (
                  <View key={index} style={styles.tableRowBody}>
                    <Text style={styles.cellSTTText}>{idx + 1}</Text>
                    <Text style={styles.cellName}>{product.product.product_name}</Text>
                    <Text style={styles.cellDescribeDetail}>
                      {product.product.description}
                    </Text>
                    <Text style={styles.cellLogo}></Text>
                    <Text style={styles.cellSpecifications}>
                      {parseFloat(product.product.width).toFixed(2).replace(/\.00$/, '')} *{' '}
                      {parseFloat(product.product.length).toFixed(2).replace(/\.00$/, '')}
                    </Text>
                    <Text style={styles.cellColumn1}>
                      {formatCurrencyWithoutSymbol(product.price_standard_sheet_adjustment)} VNĐ
                    </Text>
                    <Text style={styles.cellColumn1}>
                      {formatCurrencyWithoutSymbol(product.price_include_sheet_size_adjustment)} VNĐ
                    </Text>
                    <Text style={styles.cellColumn1}>
                      {formatCurrencyWithoutSymbol(product.price_standard_roll_adjustment)} VNĐ
                    </Text>
                    <Text style={styles.cellColumn1}>
                      {formatCurrencyWithoutSymbol(product.price_include_roll_size_adjustment)} VNĐ
                    </Text>
                    <Text style={styles.cellText}>{product.description}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <View style={styles.logoContainer}>
              <Text style={styles.textBottomInfoBold}>{t('note')}:</Text>
              <Text style={styles.textBottom}>Đơn giá trên chưa bao gồm VAT</Text>
            </View>
            <View style={styles.logoContainer}>
              <Text style={styles.textBottomInfoBold}>{t('deliveryTime')}:</Text>
              <Text style={styles.textBottom}></Text>
            </View>
            <View style={styles.logoContainer}>
              <Text style={styles.textBottomInfoBold}>{t('deliveryConditions')}:</Text>
              <Text style={styles.textBottom}>Miễn phí giao hàng trong nội thành Hà Nội</Text>
            </View>
            <View style={styles.logoContainer}>
              <Text style={styles.textBottomInfoBold}>{t('paymentConditions')}:</Text>
              <Text style={styles.textBottom}>TT ngay sau khi nhận được hàng và hoá đơn GTGT/TT theo hợp đồng</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.footerText}>{t('quoteMaker')}</Text>
          <Text style={styles.footerText}>{name}</Text>
        </View>
      </Page>
    </Document>
  )
}
export default PDFComponent
