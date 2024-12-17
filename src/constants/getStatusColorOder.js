import colors from './colors';

export const getStatusColorOder = (status) => {
    switch (status) {
        case 'Hoàn thành':
            return colors.greenColor;
        case 'Chưa tạo lệnh':
            return colors.greyColor;
        case 'Đã huỷ':
            return colors.redColor;
        default:
            return colors.oceanblueColor;
    }
};

