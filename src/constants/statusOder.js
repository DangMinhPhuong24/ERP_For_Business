import colors from './colors';

const statusMapping = {
    1: {
        text: "notYetCreatedACommand",
        textColor: colors.grayColor
    },
    2: {
        text: "orders_waiting_manufacture",
        textColor: colors.blackColor
    },
    3: {
        text: "areProducing",
        textColor: colors.oceanblueColor
    },
    4: {
        text: "waitingForQC",
        textColor: colors.oceanblueColor
    },
    5: {
        text: "QC",
        textColor: colors.oceanblueColor
    },
    6: {
        text: "waitingForDelivery",
        textColor: colors.oceanblueColor
    },
    7: {
        text: "beingTransported",
        textColor: colors.oceanblueColor
    },
    8: {
        text: "finished",
        textColor: colors.greenColor
    },
    9: {
        text: "canceled",
        textColor: colors.redColor
    },
};

export default statusMapping;

export const statusOrder = {
    CANCELED: "Đã huỷ",
}