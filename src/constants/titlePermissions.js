export const permissionGroup = {
  MODULE_SALE: 'module_sales',
  MODULE_PRODUCT: 'module_product',
  MODULE_WAREHOUSE: 'module_inventory',
  MODULE_PURCHASING: 'module_purchasing'
}

export const permissionActions = {
  MOBILE: 'module_sales.mobile.login',
  DASHBOARD_CUSTOMER: 'module_sales.dashboard',
  LIST_CUSTOMER: 'module_sales.customer_management.index',
  SHOW_CUSTOMER: 'module_sales.customer_management.show',
  ADD_CUSTOMER: 'module_sales.customer_management.store',
  UPDATE_CUSTOMER: 'module_sales.customer_management.update',
  DELETE_CUSTOMER: 'module_sales.customer_management.destroy',

  LIST_PRODUCT: 'module_product.product_management.index_product_management',
  ADD_PRODUCT: 'module_product.product_management.store_product_management',
  UPDATE_PRODUCT: 'module_product.product_management.update_product_management',
  DELETE_PRODUCT: 'module_product.product_management.destroy_product_management',
  DETAIL_PRODUCT: 'module_product.product_management.show_product_management',

  LIST_PRODUCT_GROUP: 'module_product.product_group_management.index_product_group',
  ADD_PRODUCT_GROUP: 'module_product.product_group_management.store_product_group',
  UPDATE_PRODUCT_GROUP: 'module_product.product_group_management.update_product_group',
  DELETE_PRODUCT_GROUP: 'module_product.product_group_management.destroy_product_group',
  DETAIL_PRODUCT_GROUP: 'module_product.product_group_management.show_product_group',

  LIST_SUPPLIER: 'module_product.supplier_management.index_supplier',
  ADD_SUPPLIER: 'module_product.supplier_management.store_supplier',
  UPDATE_SUPPLIER: 'module_product.supplier_management.update_supplier',
  DELETE_SUPPLIER: 'module_product.supplier_management.destroy_supplier',
  DETAIL_SUPPLIER: 'module_product.supplier_management.show_supplier',

  LIST_ORDER: 'module_sales.order_management.index',
  ADD_ORDER: 'module_sales.order_management.store',
  UPDATE_ORDER: 'module_sales.order_management.update',
  DELETE_ORDER: 'module_sales.order_management.destroy',
  DETAIL_ORDER: 'module_sales.order_management.show',

  DASHBOARD_WAREHOUSE: 'module_inventory.dashboard',
  LIST_WAREHOUSES_EXPORT: 'module_inventory.warehouses_export_order',
  LIST_WAREHOUSES_IMPORT: 'module_inventory.warehouses_import_order',
  WAREHOUSE_LOCATION: 'module_inventory.warehouses_locations',
  WAREHOUSE_PARAMETER_MANAGEMENT: 'module_inventory.parameter_management',
  WAREHOUSE_CONFIG: 'module_inventory.warehouse_config',
  LIST_PRODUCT_WAREHOUSE: 'module_inventory.products',

  LIST_CONFIG_DEBT_GROUP: 'module_sales.setting.debt_group_management.index_debt_group',
  CREATE_DEBT_GROUP: 'module_sales.setting.debt_group_management.store_debt_group',
  UPDATE_DEBT_GROUP: 'module_sales.setting.debt_group_management.update_debt_group',
  DELETE_DEBT_GROUP: 'module_sales.setting.debt_group_management.destroy_debt_group',
  LIST_CONFIG_DEBT_AGE: 'module_sales.setting.debt_age_management.index_debt_age',
  CREATE_DEBT_AGE: 'module_sales.setting.debt_age_management.store_debt_age',
  UPDATE_DEBT_AGE: 'module_sales.setting.debt_age_management.update_debt_age',
  DELETE_DEBT_AGE: 'module_sales.setting.debt_age_management.destroy_debt_age',
  LIST_CONFIG_QUOTATION: 'module_sales.setting.quotation_management.index_quotation',
  UPDATE_QUOTATION: 'module_sales.setting.quotation_management.update_quotation',

  LIST_PURCHASING_ORDER: 'module_purchasing.purchasing_order.index_purchasing_order',
  CREATE_PURCHASING_ORDER: 'module_purchasing.purchasing_order.store_purchasing_order',
  UPDATE_PURCHASING_ORDER: 'module_purchasing.purchasing_order.update_purchasing_order',
  DELETE_PURCHASING_ORDER: 'module_purchasing.purchasing_order.destroy_purchasing_order',
  DETAIL_PURCHASING_ORDER: 'module_purchasing.purchasing_order.show_purchasing_order',
  LIST_REGISTER_TO_IMPORT_WAREHOUSE:
    'module_purchasing.register_to_import_warehouse.index_register_to_import_warehouse',
  CREATE_REGISTER_TO_IMPORT_WAREHOUSE:
    'module_purchasing.register_to_import_warehouse.store_register_to_import_warehouse',
  UPDATE_REGISTER_TO_IMPORT_WAREHOUSE:
    'module_purchasing.register_to_import_warehouse.update_register_to_import_warehouse',
  DELETE_REGISTER_TO_IMPORT_WAREHOUSE:
    'module_purchasing.register_to_import_warehouse.destroy_register_to_import_warehouse',
  DETAIL_REGISTER_TO_IMPORT_WAREHOUSE:
    'module_purchasing.register_to_import_warehouse.show_register_to_import_warehouse',
  LIST_ORDER_ALERTS: 'module_purchasing.order_alerts.list_of_products_with_inventory_below_the_minimum_level',
  CREATE_ORDER_ALERTS: 'module_purchasing.order_alerts.create_purchase_orders_based_on_inventory_products'
}
