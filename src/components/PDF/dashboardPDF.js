import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import MyCustomFontBold from "../../asset/font/BeVietnamPro-Bold.ttf";
import MyCustomFontLight from "../../asset/font/BeVietnamPro-Light.ttf";
import assets from "../../asset/index";
import { format } from 'date-fns';

Font.register({
    family: 'BeVietnamPro-Bold',
    src: MyCustomFontBold
});

Font.register({
    family: 'BeVietnamPro-Light',
    src: MyCustomFontLight
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    logo: {
        width: '45px',
        height: '45px',
        marginRight: 5,
    },
    companyName: {
        fontFamily: "BeVietnamPro-Bold",
        fontSize: 14,
    },
    redText: {
        color: 'red',
    },
    blackText: {
        color: 'black',
    },
    address: {
        fontFamily: "BeVietnamPro-Light",
        fontSize: 10,
        marginBottom: 5,
        textDecoration: 'underline',
    },
    phoneNumber: {
        fontFamily: "BeVietnamPro-Light",
        fontSize: 12,
    },
    title: {
        textAlign: 'center',
        fontFamily: "BeVietnamPro-Bold",
        fontSize: 24,
        marginBottom: 10,
    },
    date: {
        textAlign: 'center',
        fontFamily: "BeVietnamPro-Light",
        fontSize: 12,
        marginBottom: 20,
    },

    footerText: {
        textAlign: 'center',
        fontFamily: "BeVietnamPro-Light",
        fontSize: 12,
        marginLeft:300,
        marginTop:50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    capturedImage: {
        width: '50%',
    },
});

const DashboardPDFComponent = ({ chart1Image, chart2Image, chart3Image, chart4Image, selectedRange }) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} tháng ${currentDate.getMonth() + 1} năm ${currentDate.getFullYear()}`;
    const formattedSelectedRange = `${format(new Date(selectedRange[0]), 'dd-MM-yyyy')} - ${format(new Date(selectedRange[1]), 'dd-MM-yyyy')}`;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.logoContainer}>
                        <Image src={assets.images.logo} style={styles.logo} />
                        <View>
                            <Text style={styles.companyName}>
                                <Text style={styles.redText}>LINH HIEU</Text>
                                <Text style={styles.blackText}> CO., LTD</Text>
                            </Text>
                            <Text style={styles.address}>TẬN TÂM - TRUNG THỰC - NIỀM TIN</Text>
                            <Text style={styles.phoneNumber}>ĐIỆN THOẠI: 02337617851</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.title}>BẢNG DASHBOARD BÁN HÀNG</Text>
                <Text style={styles.date}>Khoảng thời gian: {formattedSelectedRange}</Text>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Image src={chart1Image} style={styles.capturedImage} />
                        <Image src={chart4Image} style={styles.capturedImage} />
                    </View>
                    <View style={styles.row}>
                        <Image src={chart2Image} style={styles.capturedImage} />
                        <Image src={chart3Image} style={styles.capturedImage} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.footerText}>Ngày {formattedDate}</Text>
                    <Text style={styles.footerText}>
                        PHÒNG BÁN HÀNG
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default DashboardPDFComponent;