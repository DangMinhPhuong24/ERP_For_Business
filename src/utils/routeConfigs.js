export const routeConfigs = [
    {
        routes: ['/production/resource-management', '/production/resource-management/machine-detail'],
        items: ['machinesStateSearch', 'machinesState']
    },
    {
        routes: ['/production/resource-management', '/production/resource-management/worker-detail'],
        items: ['workersStateSearch', 'workersState']
    },
    {
        routes: ['/sale/information', '/sale/information/customer-detail'],
        items: ['customerSearch', 'filterCustomer']
    },
    {
        routes: ['/warehouse/productManagement', '/warehouse/productManagement/product-detail'],
        items: ['selectedWarehouse', 'searchValue']
    },
    {
        routes: ['/warehouse/warehouse-area-management', '/warehouse/warehouse-area-management/warehouse-details', '/warehouse/warehouse-area-management/location-detail'],
        items: ['searchWarehouse', 'branchSearch']
    },
    {
        routes: ['/warehouse/warehouse-area-management/warehouse-details', '/warehouse/warehouse-area-management/location-detail'],
        items: ['searchWarehouseLocation', 'warehouseLocationType']
    },
    {
        routes: ['/product', '/product/details/view'],
        items: ['searchProductValue']
    },
    {
        routes: ['/purchase/order-list', '/purchase/detail-purchase-view'],
        items: ['searchStatusPurchaseOrder', 'selectedRange', 'searchPurchaseOrderValue']
    },
    {
        routes: ['/sale/information', '/sale/create-order', '/sale/order'],
        items: ['formState']
    },
];