// @ts-nocheck
import { isEmpty } from 'lodash'
import { isFirstCharacterZero, isNumeric, isValidDimension, urlRegex } from '../common/common'
import { isCanShowAllCustomers } from './auth'

export const validateCustomer = (customer, t, userRole, isSuperAdmin) => {
  const errors = {}
  if (!customer.customer_name || customer.customer_name.trim() === '') {
    errors.customer_name = t('pleaseEnterCustomerName')
  }

  if (!customer.company_name || customer.company_name.trim() === '') {
    errors.company_name = t('pleaseEnterCompanyName')
  }

  if (!customer.phone_number) {
    errors.phone_number = t('fieldPhoneRequired')
  } else if (customer.phone_number && !isNumeric(customer.phone_number)) {
    errors.phone_number = t('onlyNumber')
  } else if (
    !isFirstCharacterZero(customer.phone_number) ||
    customer.phone_number.length > 10 ||
    customer.phone_number.length < 10
  ) {
    errors.phone_number = t('phoneNumberWrongTyper')
  }

  if (customer.zalo_number && !isNumeric(customer.zalo_number)) {
    errors.zalo_number = t('onlyNumber')
  } else if (
    customer.zalo_number &&
      (!isFirstCharacterZero(customer.zalo_number) || (customer.zalo_number.length > 10 || customer.zalo_number.length < 10))
  ) {
    errors.zalo_number = t('zaloNumberWrongTyper')
  }
  let errorBranches = [];
  if (customer.address_branches && customer.address_branches.length > 0) {
    errorBranches = customer.address_branches.map((address_branch) => {
      let errorAddressBranch = {};
      if (!address_branch.address_branch_name || address_branch.address_branch_name.trim() === '') {
        errorAddressBranch.address_branch_name = t('pleaseEnterBranch');
      }
      return errorAddressBranch;
    });
    const hasErrors = errorBranches.some(error => !isEmpty(error.address_branch_name));
    if (hasErrors) {
      errors.address_branches = errorBranches;
    }
  }
  if ((isSuperAdmin || isCanShowAllCustomers(userRole)) && (!customer.user_ids || customer.user_ids.length === 0)) {
    errors.user_id = t('pleaseChoicePersonInCharge')
  }

  return errors
}

export const validateCustomerHandbook = (customer, t) => {
  const errors = {}

  if (customer.website_address && urlRegex(customer.website_address) !== true) {
    errors.website_address = t('pleaseEnterTheCorrectWebAddressFormat')
  }
  if (customer.fanpage_address && urlRegex(customer.fanpage_address) !== true) {
    errors.fanpage_address = t('pleaseEnterTheCorrectWebAddressFormat')
  }
  let errorContactInfo = []
  if (customer.customer_contacts && customer.customer_contacts.length > 0) {
    customer.customer_contacts.forEach((contact, index) => {
      let contactInfo = {}
      if (!contact.name || contact.name.trim() === '') {
        contactInfo.contact_name = t('nameIsRequired')
      }
      if (contact.phone_number !== null && contact.phone_number !== '') {
        if (!isValidDimension(contact.phone_number)) {
          contactInfo.phone_number = t('onlyNumber')
        } else {
          if (!isFirstCharacterZero(contact.phone_number) || contact.phone_number.length !== 10) {
            contactInfo.phone_number = t('phoneNumberWrongTyper')
          }
        }
      } else {
        contactInfo.phone_number = t('phoneNumberIsRequired')
      }
      if (!isEmpty(contactInfo)) {
        errorContactInfo.push(contactInfo)
      }
    })
  }

  if (!isEmpty(errorContactInfo)) {
    errors.contacts_info = errorContactInfo
  }

  return errors
}

export const validateCreateOrder = (order, t) => {
  const errors = {}
  let flag = true
  let errorMessages = []
  if (!order.address_delivery_id) {
    if (!order.province_id) {
      errors.province_id = t('requiredField')
      flag = false
    } else if (!order.district_id) {
      errors.district_id = t('requiredField')
      flag = false
    } else if (!order.ward_id) {
      errors.ward_id = t('requiredField')
      flag = false
    }
  }
  if (!order.customer_id) {
    errors.customer_id = t('pleaseEnterCustomerName')
    flag = false
  }
  if (!order.address_branch_id) {
    errors.address_branch_id = t('pleaseEnterBranchName')
    flag = false
  }
  if (!order.delivery_date) {
    errors.delivery_date = t('pleaseSelectDeliveryDate')
    flag = false
  }
  if (!order.payment_method_id) {
    errors.payment_method_id = t('pleaseChoosePaymentMethod')
    flag = false
  }

  order.product_items.forEach((item, index) => {
    let productError = {}
    if (!item.product_management_id) {
      productError.product_management_id = t('requiredField')
      flag = false
    }
    if (!item.length) {
      productError.length = t('requiredField')
      flag = false
    } else if (item.length && !isValidDimension(item.length)) {
      productError.length = t('onlyNumber')
      flag = false
    } else {
      const lengthNumber = parseFloat(item.length)
      if (lengthNumber <= 0) {
        productError.length = t('enterNumberGreaterThanZero')
        flag = false
      }
    }
    if (!item.width) {
      productError.width = t('requiredField')
      flag = false
    } else if (item.width && !isValidDimension(item.width)) {
      productError.width = t('onlyNumber')
      flag = false
    } else {
      const widthNumber = parseFloat(item.width)
      if (widthNumber <= 0) {
        productError.width = t('enterNumberGreaterThanZero')
        flag = false
      }
    }
    if (!item.price) {
      productError.price = t('requiredField')
      flag = false
    } else if (item.price && !isValidDimension(item.price)) {
      productError.price = t('onlyNumber')
      flag = false
    } else {
      const widthNumber = parseFloat(item.price)
      if (widthNumber <= 0) {
        productError.price = t('enterNumberGreaterThanZero')
        flag = false
      }
    }
    if (!item.quantity) {
      productError.quantity = t('requiredField')
      flag = false
    } else if (item.quantity && !isValidDimension(item.quantity)) {
      productError.quantity = t('onlyNumber')
      flag = false
    } else {
      const quantityNumber = parseFloat(item.quantity)
      if (quantityNumber <= 0) {
        productError.quantity = t('enterNumberGreaterThanZero')
        flag = false
      }
    }
    if (!item.finished_product_form_id) {
      productError.finished_product_form_id = t('requiredField')
      flag = false
    }
    if (!item.length_standard && (item.product_form_id === 2 || item.product_form_id === '2')) {
      productError.length_standard = t('requiredField')
      flag = false
    } else if (item.length_standard && !isValidDimension(item.length_standard)) {
      productError.length_standard = t('onlyNumber')
      flag = false
    } else {
      const widthNumber = parseFloat(item.length_standard)
      if (widthNumber <= 0) {
        productError.length_standard = t('enterNumberGreaterThanZero')
        flag = false
      }
    }
    if (!item.width_standard && (item.product_form_id === 2 || item.product_form_id === '2')) {
      productError.width_standard = t('requiredField')
      flag = false
    } else if (item.width_standard && !isValidDimension(item.width_standard)) {
      productError.width_standard = t('onlyNumber')
      flag = false
    } else {
      const widthNumber = parseFloat(item.width_standard)
      if (widthNumber <= 0) {
        productError.width_standard = t('enterNumberGreaterThanZero')
        flag = false
      }
    }
    if (!item.quantity_standard && (item.product_form_id === 2 || item.product_form_id === '2')) {
      productError.quantity_standard = t('requiredField')
      flag = false
    } else if (item.quantity_standard && !isValidDimension(item.quantity_standard)) {
      productError.width_standard = t('onlyNumber')
      flag = false
    } else {
      const widthNumber = parseFloat(item.quantity_standard)
      if (widthNumber <= 0) {
        productError.quantity_standard = t('enterNumberGreaterThanZero')
        flag = false
      }
    }
    errorMessages.push(productError)
  })
  if (!isEmpty(errorMessages)) {
    errors.product_items = errorMessages
  }

  return [flag, errors]
}

export const getErrorMessageByName = (errors, name) => {
  if (errors[name] && typeof errors[name] === 'string') {
    return errors[name]
  } else if (errors[name] && typeof errors[name] === 'object') {
    return Object.values(errors[name])
  } else return ''
}
