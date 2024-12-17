const paramKeys = {
  USER_NAME: 'username',
  PASSWORD: 'password',
  REFRESH_TOKEN: 'refresh_token',

  //app get district by province id
  PROVINCE_ID: 'province_id',

  //app get ward by district id
  DISTRICT_ID: 'district_id',

  //customer get list with condition
  SORT_BY: 'sort_by',
  PAGE: 'page',
  CUSTOMER_NAME: 'customer_name',
  COMPANY_NAME: 'company_name',
  PHONE_NUMBER: 'phone_number',
  DEBT_AGE_ID: 'debt_age_id',
  DEBT_GROUP_ID: 'debt_group_id',
  ADDRESS_BRANCHES: 'address_branches',
  ADDRESS_OFFICES: 'address_offices',
  ADDRESS_FACTORIES: 'address_factories',
  PROVINCE_ID_SEARCH_CONDITION: 'province_id',
  DISTRICT_ID_SEARCH_CONDITION: 'district_id',
  WARD_ID_SEARCH_CONDITION: 'ward_id',
  TYPE: 'type',
  CUSTOMER_RANK_IDS: 'customer_rank_ids',
  COMPANY_TYPE_IDS: 'company_type_ids',
  PRODUCT_APPLICATION_IDS: 'product_application_ids',
  INDUSTRY_GROUP_IDS: 'industry_group_ids',

  //create customer
  DEBT_LIMIT: 'debt_limit',
  ZALO_NUMBER: 'zalo_number',
  ADDRESSES: 'addresses',
  SALE_IN_CHANGE: 'user_ids',

  //customer ID
  CUSTOMER_ID: 'id',

  //config get list debt group
  DEBT_GROUP: 'id',
  DEBT_GROUP_NAME: 'debt_group_name',
  START_DAY: 'start_day',
  END_DAY: 'end_day',
  OVERWRITE: 'overwrite',

  //config get list debt age
  DEBT_AGE: 'id',
  DEBT_AGE_NAME: 'debt_age_name',
  DAYS_ALLOWED: 'days_allowed',

  //config get list quote
  QUOTE_ID: 'id',
  SEARCH_QUOTATION: 'search_quotation',
  PRODUCT_ID: 'product_id',
  PRODUCT_NAME: 'product_name',
  PRICE: 'price',
  ALLOWABLE_DEVIATION: 'allowable_deviation',
  PRODUCT_CODE: 'code',
  PRODUCT_SUPPLIER: 'supplier',
  PRICE_STANDARD_SHEET: 'price_standard_sheet',
  PRICE_INCLUDE_SHEET_SIZE: 'price_include_sheet_size',
  PRICE_STANDARD_ROLL: 'price_standard_roll',
  PRICE_INCLUDE_ROLL_SIZE: 'price_include_roll_size',

  //claim
  CLAIM_CUSTOMER_ID: 'customer_id',
  DESCRIPTION: 'description',
  CAUSE: 'cause',
  SOLUTION: 'solution',
  CLAIM_STATUS_ID: 'claim_status_id',
  PERSON_IN_CHARGE: 'user_id',
  CLAIM_PROBLEM_ID: 'claim_problem_id',
  DEPARTMENTS_ID: 'department_ids',
  IMAGE_VIDEOS: 'image_videos',

  //customer create quote
  QUOTATION_ID: 'id',
  QUOTATION_CUSTOMER_ID: 'customer_id',
  PRODUCT_MANAGEMENTS: 'product_managements',
  EFFECTIVE_DATE: 'effective_date',

  //oder get list
  ODER_ID: 'id',
  ODER_CODE: 'code',
  CREATE_AT_ODER: 'created_at',
  ODER_DELEVERY_DATE: 'delivery_date',
  ODER_STATUS: 'status',

  //create oder
  ODER_CUSTOMER_ID: 'customer_id',
  ODER_ADDRESS_BRANCH_ID: 'address_branch_id',
  ODER_ADDRESS_ID: 'address_id',
  ODER_PROVINCE_ID: 'province_id',
  ODER_DISTRICT_ID: 'district_id',
  ODER_WARD_ID: 'ward_id',
  ODER_ADDRESS_DETAIL: 'detail',
  ODER_PAYMENT_ID: 'payment_method_id',
  ODER_DELEVERY_SHIFT_ID: 'delivery_shift_id',
  ODER_PRODUCT_ITEMS: 'product_items',
  ODER_PRODUCT_FORM_ID: 'product_form_id',
  ODER_LENGTH: 'length',
  ODER_WIDTH: 'width',
  ODER_QUANTITY: 'quantity',
  ODER_FINISHED_PRODUCT_FORM_ID: 'finished_product_form_id',
  ODER_PRICE: 'price',
  ODER_AMOUNT: 'amount',
  ODER_DELIVERY_CHARGE: 'delivery_charges',
  ODER_DISCOUNT: 'discount',
  ODER_TAX_TYPE: 'tax_type',
  ODER_TAX_AMOUNT: 'tax_amount',
  ODER_TOTAL_COST: 'total_cost',
  ODER_TAG_ID: 'tag_ids',
  ORDER_ADDRESS_DELIVERY_ID: 'address_delivery_id',
  DELIVERY_TIME: 'delivery_time',
  INTERNAL_DESCRIPTION: 'internal_description',
  TAX_PERCENT: 'tax_percent',

  //role
  ROLE_ID: 'id',
  ROLE_NAME: 'role_name',
  DISPLAY_NAME: 'display_name',
  ROLE_TYPE: 'role_type',
  PERMISSIONS: 'permissions',

  //user
  USER_ID: 'id',
  SEARCH_USER: 'search_user',
  SEARCH_USER_ROLE: 'role_id',
  USER_GMAIL: 'email',
  USER_FULL_NAME: 'name',
  USER_ROLE_NAME: 'role_name',
  USER_ROLE_ID: 'role_id',
  USER_PASSWORD: 'password',
  BRANCH_ID: 'branch_id',
  DEPARTMENT_ID: 'department_id',

  //get list customer with debts
  DASHBOARD_CUSTOMER_NAME: 'customer_name',
  DASHBOARD_DEBT_GROUP: 'debt_group',
  DASHBOARD_TOTAL_DEBT: 'total_debt',
  DASHBOARD_OVERDUE_AMOUNT: 'overdue_amount',
  DASHBOARD_NUMBER_DAY_OVERDUE: 'number_day_overdue',

  //get all dashboard sale for salespeople
  DASHBOARD_SALE_CURRENT_MONTH: 'current_month',
  DASHBOARD_SALE_CURRENT_YEAR: 'current_year',
  DASHBOARD_SALE_REMAINING_DAYS: 'remaining_days',
  DASHBOARD_SALE_TOTAL_REVENUE: 'total_revenue_for_the_month',
  DASHBOARD_SALE_TOTAL_KPI: 'total_kpi_for_the_month',
  DASHBOARD_SALE_PERCENT_KPI: 'percent_kpi_for_the_month',
  DASHBOARD_SALE_REVENUE_TODAY: 'revenue_today',
  DASHBOARD_SALE_ORDERS_TODAY: 'orders_today',
  DASHBOARD_SALE_TOTAL_REVENUE_FOR_YEAR: 'total_revenue_for_the_year',
  DASHBOARD_SALE_TOP_SALESPERSON: 'top_salesperson',

  //DASHBOARD sale for admin
  FROM_DATE: 'from_date',
  TO_DATE: 'to_date',
  REVENUE_BY_REGION: 'revenue_by_region',
  TOTAL_REVENUE: 'total_revenue',
  ORDER_QUANTITY: 'order_quantity',
  TOTAL_PROFIT: 'total_profit',
  TOP_CUSTOMERS: 'top_customers',
  PRODUCT_CODE_TOP_SELLING: 'code',
  PRODUCT_NAME_TOP_SELLING: 'product_name',
  PRODUCT_REVENUE_EACH_MONTH: 'product_revenue_each_month',

  //list product by customer
  PRODUCT_WIDTH: 'width',
  PRODUCT_LENGTH: 'length',
  PRODUCT_QUANTITY: 'quantity',

  //list Adjustment Voucher
  ADJUSTMENT_VOUCHER_ID: 'id',
  ADJUSTMENT_VOUCHER_ODER_ID: 'order_id',
  ADJUSTMENT_VOUCHER_PRICE: 'adjustment_prices',

  //list Compensation Voucher
  COMPENSATION_VOUCHER_QUANTITIES: 'compensation_quantities',
  COMPENSATION_VOUCHER_ID: 'id',

  //list order for production management
  ORDER_STATUS: 'order_status_id',
  TOTAL_COST_GREATER_THAN_EQUAL: 'total_cost_greater_than_equal',
  TOTAL_COST_LESS_THAN_EQUAL: 'total_cost_less_than_equal',

  //list manufacture
  MANUFACTURE_ORDER_ID: 'order_id',
  MANUFACTURE_PLAN_ID: 'plan_id',
  MANUFACTURE_ORDER_STATUS: 'manufacture_order_status_id',

  //list machines
  NAME: 'name',
  MACHINES_TYPE_ID: 'machine_type_id',
  WORKER_ARRANGE_ID: 'worker_arrange_id',
  MANUFACTURER: 'manufacturer',
  BUY_DATE: 'buy_date',
  MAINTENANCE_DATE: 'maintenance_date',
  MACHINES_ID: 'id',
  MACHINE_ID: 'machine_id',

  //setting for manufacture management
  MANUFACTURE_PRODUCTIVITY_BELOW_DAY: 'manufacture_productivity_below_day',
  MANUFACTURE_PRODUCTIVITY_EXCEED_DAY: 'manufacture_productivity_exceed_day',
  TRANSPORT_PRODUCTIVITY_BELOW_DAY: 'transport_productivity_below_day',
  TRANSPORT_PRODUCTIVITY_EXCEED_DAY: 'transport_productivity_exceed_day',
  QUANTITY_ORDER_RETURN_WEEK: 'quantity_order_return_week',
  QUANTITY_ORDER_RETURN_MONTH: 'quantity_order_return_month',
  QUANTITY_CLAIM_WEEK: 'quantity_claim_week',
  QUANTITY_CLAIM_MONTH: 'quantity_claim_month',
  TIME_WORKER_LEAVE: 'time_worker_leave',
  TIME_MACHINE_MAINTENANCE: 'time_machine_maintenance',
  MINUTES_MANUFACTURE_ORDER_BEHIND_SCHEDULE: 'minutes_manufacture_order_behind_schedule',
  MINUTES_DELIVERY_BEHIND_SCHEDULE: 'minutes_delivery_behind_schedule',
  MINUTES_CHANGE_PROCESS: 'minutes_change_process',
  INVENTORY_PROCESS_SAW_CUT: 'inventory_process_saw_cut',
  INVENTORY_PROCESS_CUT_TRIM: 'inventory_process_cut_trim',

  //list workers
  WORKER_CODE: 'code',
  WORKER_NAME: 'name',
  WORKER_AGE: 'age',
  YEARS_EXPERIENCE: 'years_experience',
  WORKER_ID: 'id',
  WORKER_DETAILS_ID: 'user_id',
  LIST_WORKER_ID: 'worker_id',
  DATE: 'date',

  //delete claim
  CLAIM_ID: 'id',

  // zalo
  ZALO_CODE: 'code',

  //warehouse
  DATE_WEIGHT_INVENTORY: 'date_weight_inventory',
  DATE_LENGTH_INVENTORY: 'date_length_inventory',
  SEARCH_WAREHOUSE: 'search_warehouse',
  SEARCH_WAREHOUSE_LOCATION: 'search_warehouse_location',
  WAREHOUSE_ID: 'warehouse_id',
  WAREHOUSE_PRIMARY_ID: 'id',
  WAREHOUSE_NAME: 'warehouse_name',
  DATE_WEIGHT_IMPORT_WAREHOUSE: 'date_weight_import_warehouse',
  DATE_LENGTH_IMPORT_WAREHOUSE: 'date_length_import_warehouse',
  WAREHOUSE_LOCATION_TYPE_ID: 'warehouse_location_type_id',
  WAREHOUSE_LOCATION_TYPE: 'warehouse_location_type',
  DATE_SQUARE_METER_IMPORT_WAREHOUSE: 'date_square_meter_import_warehouse',
  HEIGHT: 'height',
  LENGTH: 'length',
  WIDTH: 'width',
  LIMIT_INVENTORY_LENGTH: 'limit_inventory_length',
  LIMIT_INVENTORY_SQUARE_METER: 'limit_inventory_square_meter',

  //search product warehouse
  SEARCH_PRODUCT_WAREHOUSE: 'search_product_warehouse',
  FROM_PRICE: 'from_price',
  TO_PRICE: 'to_price',
  SUPPLIER_ID: 'supplier_id',
  SUPPLIER_TAX_ID: 'supplier_tax_id',
  PRODUCT_TYPE_ID: 'product_type_id',
  PRODUCT_GROUP_ID: 'product_group_id',
  WAREHOUSE_LOCATION_ID: 'warehouse_location_id',
  PRODUCT_WAREHOUSE_ID: 'product_warehouse_id',

  // customer handbook all
  HANDBOOK_CUSTOMER_ID: 'customer_id',
  WEBSITE_ADDRESS: 'website_address',
  FANPAGE_ADDRESS: 'fanpage_address',
  OFFICE_ADDRESS: 'office_address',
  ENTERPRISE_ESTABLISHMENT_DATE: 'enterprise_establishment_date',
  CUSTOMER_CONTACTS: 'customer_contacts',
  PRODUCT_GROUP_IDS: 'product_group_ids',
  FREQUENCY_PURCHASE_MONTHLY: 'frequency_purchase_monthly',
  INDUSTRY_GROUP_ID: 'industry_group_ids',
  REGION: 'region',
  PRODUCT_SUBSTITUTABILITY: 'product_substitutability',
  ORDER_PLAN: 'order_plan',
  QUALITY_REQUIRE: 'quality_require',
  PRODUCT_APPLICATION: 'product_application',
  FREQUENCY_COMPANY_VISIT: 'frequency_company_visit',
  ENTERPRISE_BIRTHDAY: 'enterprise_birthday',
  DOMESTIC_TRAVEL: 'domestic_travel',
  INTERNATIONAL_TRAVEL: 'international_travel',
  DISCOUNT_POLICY: 'discount_policy',
  PERSONALITY: 'personality',
  SPECIAL_NOTE: 'special_note',
  ADDRESS_DELIVERIES: 'address_deliveries',

  // detail product
  PRODUCT_DETAIL_ID: 'id',
  PRODUCT_GROUP_NAME: 'product_group_name',

  // update product config
  LENGTH_INVENTORY_MIN: 'length_inventory_min',
  LENGTH_INVENTORY_MAX: 'length_inventory_max',
  ROLL_INVENTORY_MIN: 'roll_inventory_max',
  LENGTH_SELL_WEEK: 'length_sell_week',
  LENGTH_SELL_MONTH: 'length_sell_month',

  // location detail
  LOCATION_ID: 'id',

  // location modal
  WAREHOUSE_LOCATION_NAME: 'warehouse_location_name',
  LIMIT_INVENTORY_WEIGHT: 'limit_inventory_weight',

  // list proposal debt age
  PROPOSAL_STATUS_ID: 'proposal_status_id',
  DEBT_AGE_CUSTOMER_ID: 'customer_id',
  PROPOSAL_ID: 'id',
  REASON: 'reason',

  //quotation history
  QUOTATION_HISTORY_ID: 'id',

  //proposal debt age
  PROPOSAL_DEBT_AGE_ID: 'id',

  //proposal quotation
  PROPOSAL_QUOTATION_ID: 'id',
  FILE_PATH: 'file_path',

  ID_OF_CUSTOMER: 'customer_id',
  PERSONNEL_SACELE_ID: 'personnel_scale_id',
  FACTORY_SCALE_ID: 'factory_scale_id',
  COMPANY_TYPE_ID: 'company_type_id',
  IMAGE_HANDBOOKS: 'image_handbooks',
  PRODUCT_SUBSTITUTABILITY_ID: 'product_substitutability_id',
  ORDER_PLAN_HANDBOOK_ID: 'order_plan_handbook_id',
  QUALITY_REQUIRE_ID: 'quality_require_id',
  PRODUCT_APPLICATION_ID: 'product_application_ids',
  FREQUENCY_COMPANY_VISIT_ID: 'frequency_company_visit_id',
  INCENTIVE_POLICY_ID: 'incentive_policy_id',
  CONSULTATION_HISTORIES: 'consultation_histories',
  DEVICE_MACHINES: 'device_machines',

  //calendar
  TITLE_CALENDAR: 'title',
  DATE_CALENDAR: 'date',
  START_TIME_CALENDAR: 'start_time',
  END_TIME_CALENDAR: 'end_time',
  DESCRIPTION_CALENDAR: 'description',
  USER_IDS: 'user_ids',
  END_DATE: 'end_date',

  //DEPARTMENT
  DEPARTMENT_NAME: 'department_name',
  ACCOUNT_DEPARTMENT_ID: 'id',

  // get all calendar by user id
  USER_ID_CALENDAR: 'user_id',

  // delete calendar
  CALENDAR_ID: 'id',

  // approve calendar
  CALENDAR_STATUS_ID: 'calendar_status_id',

  //consultation history mobile
  CONSULTATION_HISTORY_ID: 'id',
  CONSULTATION_DATE: 'consultation_date',
  CONSULTATION_HISTORY_PROBLEM_ID: 'consultation_history_problem_id',
  INFORMATION_PROVIDER: 'information_provider',
  CONSULTANT: 'consultant',
  RESULT: 'result',
  CUSTOMER_HANDBOOK_ID: 'customer_handbook_id',

  //OFFSET
  OFFSET: 'offset',

  // Get list all user param
  EXCEPT_AUTH: 'except_auth',

  WAREHOUSE_IMPORT_ORDER_CODE: 'search_warehouse_import_order',
  WAREHOUSE_IMPORT_ORDER_ID: 'id',
  SEARCH_SUPPLIER: 'search_supplier',
  WAREHOUSE_EXPORT_ORDER_CODE: 'search_warehouse_export_order',
  WAREHOUSE_IMPORT_ORDER_QR_ID: 'warehouse_import_order_id',

  //Product
  CODE: 'code',
  NOTE: 'note',
  SPECIFICATIONS: 'specifications',
  SUPPLIER_CODE: 'supplier_code',
  VN_PRODUCT_CATEGORY_NAME: 'vn_product_category_name',
  EN_PRODUCT_CATEGORY_NAME: 'en_product_category_name',
  PRICE_M2: 'price_m2',

  SURFACE_TYPE: 'surface_type',
  SURFACE_QUANTIFICATION: 'surface_quantification',
  SURFACE_QUANTIFICATION_TOLERANCE: 'surface_quantification_tolerance',
  SURFACE_QUANTIFICATION_TOLERANCE_TYPE_ID: 'surface_quantification_tolerance_type_id',

  SURFACE_THICKNESS: 'surface_thickness',
  SURFACE_THICKNESS_TOLERANCE: 'surface_thickness_tolerance',
  SURFACE_THICKNESS_TOLERANCE_TYPE_ID: 'surface_thickness_tolerance_type_id',

  ADHESIVE_TYPE: 'adhesive_type',
  ADHESIVE_MEASUREMENT: 'adhesive_measurement',
  ADHESIVE_MEASUREMENT_TOLERANCE: 'adhesive_measurement_tolerance',
  ADHESIVE_MEASUREMENT_TOLERANCE_TYPE_ID: 'adhesive_measurement_tolerance_type_id',

  ADHESIVE_THICKNESS: 'adhesive_thickness',
  ADHESIVE_THICKNESS_TOLERANCE: 'adhesive_thickness_tolerance',
  ADHESIVE_THICKNESS_TOLERANCE_TYPE_ID: 'adhesive_thickness_tolerance_type_id',

  BASE_TYPE: 'base_type',
  BASE_MEASUREMENT: 'base_measurement',
  BASE_MEASUREMENT_TOLERANCE: 'base_measurement_tolerance',
  BASE_MEASUREMENT_TOLERANCE_TYPE_ID: 'base_measurement_tolerance_type_id',

  BASE_THICKNESS: 'base_thickness',
  BASE_THICKNESS_TOLERANCE: 'base_thickness_tolerance',
  BASE_THICKNESS_TOLERANCE_TYPE_ID: 'base_thickness_tolerance_type_id',

  ADHESIVE_FORCE: 'adhesive_force',
  ADHESIVE_FORCE_TOLERANCE: 'adhesive_force_tolerance',
  ADHESIVE_FORCE_TOLERANCE_TYPE_ID: 'adhesive_force_tolerance_type_id',

  TEMPERATURE_FROM: 'temperature_from',
  TEMPERATURE_TO: 'temperature_to',
  EXPIRY_YEAR: 'expiry_year',
  ADVANTAGE: 'advantage',
  DISADVANTAGE: 'disadvantage',
  BONDING_ENVS: 'bonding_envs',
  SURFACE_MATERIALS: 'surface_materials',
  PRINTERS: 'printers',
  NOT_SUITABLE_FOR: 'not_suitable_for',
  PRODUCTS_ID: 'id',
  TOTAL_SQUARE_METER: 'total_square_meter_product_children',
  MIN_INVENTORY: 'min_inventory',
  MAX_INVENTORY: 'max_inventory',
  PDFS: 'pdfs',

  //product management
  PRODUCT_MANAGEMENT_ID: 'product_management_id',
  SEARCH_PRODUCT_MANAGEMENT: 'search_product_management',
  DETAIL_SUPPLIER_ID: 'id',
  PRODUCT_WAREHOUSES: 'product_warehouses',
  SUPPLIER_TAX: 'supplier_tax',

  //PURCHASE
  PURCHASE_ORDER_STATUS_ID: 'purchase_order_status_id',
  FILE_PURCHASE_ORDERS: 'file_purchase_orders',
  PURCHASE_ORDER_PRODUCTS: 'purchase_order_products',

  PURCHASE_ID: 'id',
  STATUS_ID: 'status_id',
  START_DATE: 'start_date',

  //warehouse registration
  WAREHOUSE_IMPORT_ORDER_STATUS_ID: 'warehouse_import_order_status_id',
  PURCHASE_ORDER_ID: 'purchase_order_id',
  RECEIVING_LOCATION_ID: 'receiving_location_id',
  IMPORT_TIME: 'import_time',
  IMPORT_DATE: 'import_date',
  PRODUCT_WAREHOUSE_WAREHOUSE_IMPORT_ORDER: 'product_warehouse_warehouse_import_order',
  SUPPLIER_NAME: 'supplier_name',
  ABBREVIATION: 'abbreviation',
  PERSON_IN_CHARGES: 'person_in_charge',
  TAX_CODE: 'tax_code',
  ADDRESS: 'address',
  SUPPLIER_TYPE_ID: 'supplier_type_id',
  CURRENCY_UNIT_ID: 'currency_unit_id',
  MANUFACTURE_ORDER_PRODUCT_WAREHOUSE: 'manufacture_order_product_warehouse',
  SEARCH: 'search',
  ID: 'id',
}

export default paramKeys
