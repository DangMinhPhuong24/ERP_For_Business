import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  CreateCustomerRequest extends Request {
    static Keys = {
        CUSTOMER_NAME: paramKeys.CUSTOMER_NAME,
        COMPANY_NAME: paramKeys.COMPANY_NAME,
        PHONE_NUMBER: paramKeys.PHONE_NUMBER,
        DEBT_AGE_ID: paramKeys.DEBT_AGE_ID,
        DEBT_LIMIT: paramKeys.DEBT_LIMIT,
        ZALO_NUMBER: paramKeys.ZALO_NUMBER,
        SALE_IN_CHANGE: paramKeys.SALE_IN_CHANGE,
        ADDRESSES: paramKeys.ADDRESSES,
        WEBSITE_ADDRESS: paramKeys.WEBSITE_ADDRESS,
        FANPAGE_ADDRESS: paramKeys.FANPAGE_ADDRESS,
        OFFICE_ADDRESS: paramKeys.OFFICE_ADDRESS,
        ENTERPRISE_ESTABLISHMENT_DATE: paramKeys.ENTERPRISE_ESTABLISHMENT_DATE,
        PERSONNEL_SACELE_ID: paramKeys.PERSONNEL_SACELE_ID,
        FACTORY_SCALE_ID: paramKeys.FACTORY_SCALE_ID,
        COMPANY_TYPE_ID: paramKeys.COMPANY_TYPE_ID,
        CUSTOMER_CONTACTS: paramKeys.CUSTOMER_CONTACTS,
        IMAGE_HANDBOOKS: paramKeys.IMAGE_HANDBOOKS,
        INDUSTRY_GROUP_ID: paramKeys.INDUSTRY_GROUP_ID,
        REGION: paramKeys.REGION,
        PRODUCT_SUBSTITUTABILITY_ID: paramKeys.PRODUCT_SUBSTITUTABILITY_ID,
        ORDER_PLAN_HANDBOOK_ID: paramKeys.ORDER_PLAN_HANDBOOK_ID,
        QUALITY_REQUIRE_ID: paramKeys.QUALITY_REQUIRE_ID,
        PRODUCT_APPLICATION_ID: paramKeys.PRODUCT_APPLICATION_ID,
        FREQUENCY_COMPANY_VISIT_ID: paramKeys.FREQUENCY_COMPANY_VISIT_ID,
        ENTERPRISE_BIRTHDAY: paramKeys.ENTERPRISE_BIRTHDAY,
        INCENTIVE_POLICY_ID: paramKeys.INCENTIVE_POLICY_ID,
        DISCOUNT_POLICY: paramKeys.DISCOUNT_POLICY,
        PERSONALITY: paramKeys.PERSONALITY,
        SPECIAL_NOTE: paramKeys.SPECIAL_NOTE,
        CONSULTATION_HISTORIES: paramKeys.CONSULTATION_HISTORIES,
        DEVICE_MACHINES: paramKeys.DEVICE_MACHINES,
        ADDRESS_DELIVERIES: paramKeys.ADDRESS_DELIVERIES,
        ADDRESS_OFFICES: paramKeys.ADDRESS_OFFICES,
        ADDRESS_BRANCHES: paramKeys.ADDRESS_BRANCHES,
        ADDRESS_FACTORIES: paramKeys.ADDRESS_FACTORIES
    };
}
