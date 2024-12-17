import HomePage from '../containers/Home/HomePage'
import CustomerInformationPage from '../containers/Sale/CustomerInformation/index'
import OrderPage from '../containers/Sale/Order/index'
import ConfigPage from '../containers/Sale/Config/index'
import PersonnelPage from '../containers/Personnel/index'
import ProductionPage from '../containers/Production/index'
import ProductionIcon from '../asset/icon/Production.svg.js'
import Warehouse from '../containers/Warehouse/index'
import ManufacturePage from '../containers/Manufacture/index'
import TransportPage from '../containers/Transport/index'
import AssessmentPage from '../containers/Assessment/index'
import SalePageLayout from '../containers/Sale'
import AccountingPage from '../containers/Accounting'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManagementPageLayout from '../containers/AccountManagement'
import RolesPage from '../containers/AccountManagement/Roles'
import ManagementPage from '../containers/AccountManagement/Management'
import DashboardSalePage from '../containers/Sale/Dashboard/DashboardSale'
import DashboardAdminPage from '../containers/Sale/Dashboard/DashboardAdmin'
import OrderListPage from '../containers/Production/OrderList'
import DashboardProductionPage from '../containers/Production/Dashboard'
import ManageProductionOrdersPage from '../containers/Production/ManageProductionOrders'
import ManageProductionPlansPage from '../containers/Production/ManageProductionPlans'
import MaterialsManagementPage from '../containers/Production/MaterialsManagement'
import ResourceManagementPage from '../containers/Production/ResourceManagement'
import ManageProductionParametersPage from '../containers/Production/ManageProductionParameters'
import SettingPage from '../containers/Production/Setting'
import WarehouseProductManagementPage from '../containers/Warehouse/ProductManagement'
import WarehouseSettingPage from '../containers/Warehouse/Setting'
import WarehouseParameterPage from '../containers/Warehouse/Parameter'
import WarehouseAreaManagementPage from '../containers/Warehouse/WarehouseAreaManagement'
import ImportWarehouseManagementPage from '../containers/Warehouse/ImportWarehouseManagement'
import ExportWarehouseManagementPage from '../containers/Warehouse/ExportWarehouseManagement'
import DashboardWarehousePage from '../containers/Warehouse/Dashboard'
import SettingZalo from '../containers/Sale/SettingZalo'
import HomeIcon from '../asset/icon/Home.svg'
import colors from '../constants/colors'
import SaleIcon from '../asset/icon/Sale.svg.js'
import CalculateIcon from '../asset/icon/Calculate.svg.js'
import ShoppingCartIcon from '../asset/icon/ShoppingCart.svg.js'
import CrowdIcon from '../asset/icon/Crowd.svg'
import GiteIcon from '../asset/icon/Gite.svg'
import ElectricBoltIcon from '../asset/icon/ElectricBolt.svg'
import CarIcon from '../asset/icon/Car.svg'
import ChartIcon from '../asset/icon/Chart.svg'
import ProposedIcon from '../asset/icon/Proposed.svg'
import ProposedPage from '../containers/Proposal'
import CalendarPage from '../containers/Calendar'
import { isMobile } from '../common/common'
import CustomerInfo from '../containers/Sale/Mobile/CustomerInfo/index'
import KPIPage from '../containers/KPISettings'
import TargetIcon from '../asset/icon/Target.svg'
import CalendarIcon from '../asset/icon/Calendar.svg'
import DepartmentPage from '../containers/AccountManagement/Department'
import ProductManagementPageLayout from '../containers/ProductManagement'
import GroupProductPage from '../containers/ProductManagement/GroupProduct'
import SupplierPage from '../containers/ProductManagement/Supplier'
import ProductPage from '../containers/ProductManagement/Product'
import ProductIcon from 'asset/icon/Product.svg'
import CustomerDetailMobile from '../containers/Sale/Mobile/CustomerInfo/CustomerDetailMobile'
import CustomerDetail from '../containers/Sale/CustomerInformation/CustomerDetail'
import OderDetail from '../containers/Sale/Order/OderDetail'
import LocationDetail from '../containers/Warehouse/WarehouseAreaManagement/LocationDetail'
import CreateOrUpdateRole from '../containers/AccountManagement/CreateOrUpdateRole/index'
import CreateOrUpdateProductPage from '../containers/ProductManagement/Product/CreateOrUpdateProduct'
import ViewDetailProductPage from '../containers/ProductManagement/Product/ViewDetailProduct'
import WarehouseDetails from '../containers/Warehouse/WarehouseAreaManagement/WarehouseDetails'
import { permissionActions, permissionGroup } from '../constants/titlePermissions'
import ProductDetail from '../containers/Warehouse/ProductManagement/ProductDetail'
import React from 'react'
import WarehouseRegistration from 'containers/Purchase/WarehouseRegistration'
import OrderWarning from 'containers/Purchase/OrderWarning'
import PurchasePageLayout from '../containers/Purchase/index'
import PurchaseOrderPage from '../containers/Purchase/PurchaseOrder/index'
import ViewDetailPurchaseOrderPage from '../containers/Purchase/ViewDetailPurchaseOrder'
import CreateOrUpdatePurchaseOrderPage from '../containers/Purchase/CreateOrUpdatePurchaseOrderPage'
import CreateOrUpdateOrder from "../containers/Sale/Order/CreateOrUpdateOrder"

const appRoutes = [
  {
    group: '',
    index: true,
    path: '/home',
    element: <HomePage />,
    state: 'home',
    sidebarProps: {
      displayText: 'homepage',
      icon: <HomeIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    group: permissionGroup.MODULE_SALE,
    path: '/sale',
    element: <SalePageLayout />,
    state: 'sale',
    sidebarProps: {
      displayText: 'sale',
      icon: <SaleIcon style={{ color: colors.lavenderGrayColor }} />
    },
    child: [
      {
        role: permissionActions.DASHBOARD_CUSTOMER,
        path: '/sale/dashboard',
        element: <DashboardSalePage />,
        state: 'sale.dashboardSale',
        sidebarProps: {
          displayText: 'dashboard'
        },
        parent: '/sale'
      },
      {
        role: permissionActions.DASHBOARD_CUSTOMER,
        path: '/sale/admin/dashboard',
        element: <DashboardAdminPage />,
        state: 'sale.dashboardAdmin',
        sidebarProps: {
          displayText: 'dashboard'
        },
        parent: '/sale'
      },
      {
        role: permissionActions.LIST_CUSTOMER,
        path: '/sale/information',
        element: isMobile ? <CustomerInfo /> : <CustomerInformationPage />,
        state: 'sale.information',
        sidebarProps: {
          displayText: 'customerInformation'
        },
        parent: '/sale'
      },
      {
        role: permissionActions.SHOW_CUSTOMER,
        path: '/sale/information/customer-detail',
        element: isMobile ? <CustomerDetailMobile /> : <CustomerDetail />,
        state: 'sale.information',
        sidebarProps: {
          displayText: ''
        },
        parent: '/sale'
      },
      {
        role: permissionActions.LIST_ORDER,
        path: '/sale/order',
        element: <OrderPage />,
        state: 'sale.order',
        sidebarProps: {
          displayText: 'order'
        },
        parent: '/sale'
      },
      {
        role: permissionActions.ADD_ORDER,
        path: '/sale/create-order',
        element: <CreateOrUpdateOrder />,
        state: 'sale.createOrUpdateOrder',
        sidebarProps: {
          displayText: ''
        },
        parent: '/sale'
      },
      {
        role: permissionActions.DETAIL_ORDER,
        path: '/sale/order/order-detail',
        element: <OderDetail />,
        state: 'sale.order',
        sidebarProps: {
          displayText: ''
        },
        parent: '/sale'
      },
      {
        role: [
          permissionActions.LIST_CONFIG_DEBT_GROUP,
          permissionActions.LIST_CONFIG_DEBT_AGE,
          permissionActions.LIST_CONFIG_QUOTATION
        ],
        path: '/sale/config',
        element: <ConfigPage />,
        state: 'sale.config',
        sidebarProps: {
          displayText: 'config'
        },
        parent: '/sale'
      },
      {
        role: 'superadmin',
        path: '/sale/setting',
        element: <SettingZalo />,
        state: 'sale.setting',
        sidebarProps: {
          displayText: 'SettingZaloOA'
        },
        parent: '/sale'
      }
    ]
  },
  {
    role: 'module',
    path: '/accounting',
    element: <AccountingPage />,
    state: 'accounting',
    sidebarProps: {
      displayText: 'accounting',
      icon: <CalculateIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    group: permissionGroup.MODULE_PURCHASING,
    path: '/purchase',
    element: <PurchasePageLayout />,
    state: 'purchase',
    sidebarProps: {
      displayText: 'purchase',
      icon: <ShoppingCartIcon style={{ color: colors.lavenderGrayColor }} />
    },
    child: [
      {
        role: permissionActions.LIST_PURCHASING_ORDER,
        path: '/purchase/order-list',
        element: <PurchaseOrderPage />,
        state: 'purchase.orderList',
        sidebarProps: {
          displayText: 'purchaseForm'
        },
        parent: '/purchase'
      },
      {
        role: permissionActions.CREATE_PURCHASING_ORDER,
        path: '/purchase/create',
        element: <CreateOrUpdatePurchaseOrderPage />,
        state: 'purchase.orderList',
        sidebarProps: {
          displayText: ''
        },
        parent: '/purchase'
      },
      {
        role: permissionActions.UPDATE_PURCHASING_ORDER,
        path: '/purchase/edit',
        element: <CreateOrUpdatePurchaseOrderPage />,
        state: 'purchase.orderList',
        sidebarProps: {
          displayText: ''
        },
        parent: '/purchase'
      },
      {
        role: permissionActions.LIST_REGISTER_TO_IMPORT_WAREHOUSE,
        path: '/purchase/warehouse-registration',
        element: <WarehouseRegistration />,
        state: 'purchase.warehouse-registration',
        sidebarProps: {
          displayText: 'warehouseRegistration'
        },
        parent: '/purchase'
      },
      {
        role: permissionActions.LIST_ORDER_ALERTS,
        path: '/purchase/order-warning',
        element: <OrderWarning />,
        state: 'purchase.order-warning',
        sidebarProps: {
          displayText: 'orderWarning'
        },
        parent: '/purchase'
      },
      {
        role: permissionActions.CREATE_PURCHASING_ORDER,
        path: '/purchase/quick-create',
        element: <CreateOrUpdatePurchaseOrderPage />,
        state: 'purchase.orderList',
        sidebarProps: {
          displayText: ''
        },
        parent: '/purchase'
      },
      {
        role: permissionActions.DETAIL_PURCHASING_ORDER,
        path: '/purchase/detail-purchase-view',
        element: <ViewDetailPurchaseOrderPage />,
        state: 'purchase.orderList',
        sidebarProps: {
          displayText: ''
        },
        parent: '/purchase'
      }
    ]
  },
  {
    role: 'module',
    path: '/personnel',
    element: <PersonnelPage />,
    state: 'Personnel',
    sidebarProps: {
      displayText: 'personnel',
      icon: <CrowdIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    group: 'module',
    path: '/production',
    element: <ProductionPage />,
    state: 'Production',
    sidebarProps: {
      displayText: 'production',
      icon: <ProductionIcon style={{ color: colors.lavenderGrayColor }} />
    },
    child: [
      {
        role: 'module',
        path: '/production/dashboard',
        element: <DashboardProductionPage />,
        state: 'production.dashboardProduction',
        sidebarProps: {
          displayText: 'dashboard'
        },
        parent: '/production'
      },
      {
        role: 'module',
        path: '/production/order-list',
        element: <OrderListPage />,
        state: 'production.order-list',
        sidebarProps: {
          displayText: 'orderList'
        },
        parent: '/production'
      },
      {
        role: 'module',
        path: '/production/manage-production-orders',
        element: <ManageProductionOrdersPage />,
        state: 'production.manage-production-orders',
        sidebarProps: {
          displayText: 'manageProductionOrders'
        },
        parent: '/production'
      },
      {
        role: 'module',
        path: '/production/manage-production-plans',
        element: <ManageProductionPlansPage />,
        state: 'production.manage-production-plans',
        sidebarProps: {
          displayText: 'manageProductionPlans'
        },
        parent: '/production'
      },
      {
        role: 'module',
        path: '/production/materials-management',
        element: <MaterialsManagementPage />,
        state: 'production.materials-management',
        sidebarProps: {
          displayText: 'materialsManagement'
        },
        parent: '/production'
      },
      {
        role: 'module',
        path: '/production/resource-management',
        element: <ResourceManagementPage />,
        state: 'production.resource-management',
        sidebarProps: {
          displayText: 'resourceManagement'
        },
        parent: '/production'
      },
      {
        role: 'module',
        path: '/production/manage-production-parameters',
        element: <ManageProductionParametersPage />,
        state: 'production.manage-production-parameters',
        sidebarProps: {
          displayText: 'manageProductionParameters'
        },
        parent: '/production'
      },
      {
        role: 'module',
        path: '/production/setting',
        element: <SettingPage />,
        state: 'production.setting',
        sidebarProps: {
          displayText: 'setting'
        },
        parent: '/production'
      }
    ]
  },
  {
    group: permissionGroup.MODULE_WAREHOUSE,
    path: '/warehouse',
    element: <Warehouse />,
    state: 'warehouse',
    sidebarProps: {
      displayText: 'warehouse',
      icon: <GiteIcon style={{ color: colors.lavenderGrayColor }} />
    },
    child: [
      {
        role: permissionActions.DASHBOARD_WAREHOUSE,
        path: '/warehouse/dashboard',
        element: <DashboardWarehousePage />,
        state: 'warehouse.dashboardWarehouse',
        sidebarProps: {
          displayText: 'dashboard'
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.LIST_WAREHOUSES_EXPORT,
        path: '/warehouse/export-warehouse-management',
        element: <ExportWarehouseManagementPage />,
        state: 'warehouse.export-warehouse-management',
        sidebarProps: {
          displayText: 'exportWarehouseManagement'
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.LIST_WAREHOUSES_IMPORT,
        path: '/warehouse/import-warehouse-management',
        element: <ImportWarehouseManagementPage />,
        state: 'warehouse.import-warehouse-management',
        sidebarProps: {
          displayText: 'importWarehouseManagement'
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.WAREHOUSE_LOCATION,
        path: '/warehouse/warehouse-area-management',
        element: <WarehouseAreaManagementPage />,
        state: 'warehouse.warehouse-area-management',
        sidebarProps: {
          displayText: 'warehouseAreaManagement'
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.WAREHOUSE_LOCATION,
        path: '/warehouse/warehouse-area-management/warehouse-details',
        element: <WarehouseDetails />,
        state: 'warehouse.warehouse-area-management',
        sidebarProps: {
          displayText: ''
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.WAREHOUSE_LOCATION,
        path: '/warehouse/warehouse-area-management/location-detail',
        element: <LocationDetail />,
        state: 'warehouse.warehouse-area-management',
        sidebarProps: {
          displayText: ''
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.LIST_PRODUCT_WAREHOUSE,
        path: '/warehouse/productManagement',
        element: <WarehouseProductManagementPage />,
        state: 'warehouse.productManagement',
        sidebarProps: {
          displayText: 'productManagement'
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.LIST_PRODUCT_WAREHOUSE,
        path: '/warehouse/productManagement/product-detail',
        element: <ProductDetail />,
        state: 'warehouse.productManagement',
        sidebarProps: {
          displayText: ''
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.WAREHOUSE_PARAMETER_MANAGEMENT,
        path: '/warehouse/parameter',
        element: <WarehouseParameterPage />,
        state: 'warehouse.parameter',
        sidebarProps: {
          displayText: ''
        },
        parent: '/warehouse'
      },
      {
        role: permissionActions.WAREHOUSE_CONFIG,
        path: '/warehouse/setting',
        element: <WarehouseSettingPage />,
        state: 'warehouse.setting',
        sidebarProps: {
          displayText: ''
        },
        parent: '/warehouse'
      }
    ]
  },
  {
    role: 'module',
    path: '/manufacture',
    element: <ManufacturePage />,
    state: 'manufacture',
    sidebarProps: {
      displayText: 'manufacture',
      icon: <ElectricBoltIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    role: 'module',
    path: '/transport',
    element: <TransportPage />,
    state: 'transport',
    sidebarProps: {
      displayText: 'transport',
      icon: <CarIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    role: 'module',
    path: '/assessment',
    element: <AssessmentPage />,
    state: 'assessment',
    sidebarProps: {
      displayText: 'assessment',
      icon: <ChartIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    group: 'superadmin',
    path: '/account',
    element: <ManagementPageLayout />,
    state: 'account',
    sidebarProps: {
      displayText: 'accountManagement',
      icon: <ManageAccountsIcon style={{ color: colors.lavenderGrayColor }} />
    },
    child: [
      {
        role: 'superadmin',
        path: '/account/management',
        element: <ManagementPage />,
        state: 'account.management',
        sidebarProps: {
          displayText: 'accountManagement'
        },
        parent: '/account'
      },
      {
        role: 'superadmin',
        path: '/account/roles',
        element: <RolesPage />,
        state: 'account.roles',
        sidebarProps: {
          displayText: 'roles'
        },
        parent: '/account'
      },
      {
        role: 'superadmin',
        path: '/account/roles/edit',
        element: <CreateOrUpdateRole />,
        state: 'account.roles',
        sidebarProps: {
          displayText: ''
        },
        parent: '/account'
      },
      {
        role: 'superadmin',
        path: '/account/roles/show',
        element: <CreateOrUpdateRole />,
        state: 'account.roles',
        sidebarProps: {
          displayText: ''
        },
        parent: '/account'
      },
      {
        role: 'superadmin',
        path: '/account/roles/create',
        element: <CreateOrUpdateRole />,
        state: 'account.roles',
        sidebarProps: {
          displayText: ''
        },
        parent: '/account'
      },
      {
        role: 'superadmin',
        path: '/account/department',
        element: <DepartmentPage />,
        state: 'account.department',
        sidebarProps: {
          displayText: 'departmentManagement'
        },
        parent: '/account'
      }
    ]
  },
  {
    role: 'module',
    path: '/proposal',
    element: <ProposedPage />,
    state: 'proposal',
    sidebarProps: {
      displayText: 'proposal',
      icon: <ProposedIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    role: 'superadmin',
    path: '/KPIsettings',
    element: <KPIPage />,
    state: 'KPIsettings',
    sidebarProps: {
      displayText: 'KPIsettings',
      icon: <TargetIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    role: '',
    path: '/calendar',
    element: <CalendarPage />,
    state: 'calendar',
    sidebarProps: {
      displayText: 'workPlan',
      icon: <CalendarIcon style={{ color: colors.lavenderGrayColor }} />
    }
  },
  {
    group: permissionGroup.MODULE_PRODUCT,
    path: '/product',
    element: <ProductManagementPageLayout />,
    state: 'product',
    sidebarProps: {
      displayText: 'productManagement',
      icon: <ProductIcon style={{ color: colors.lavenderGrayColor }} />
    },
    child: [
      {
        role: permissionActions.LIST_PRODUCT,
        path: '/product',
        element: <ProductPage />,
        state: 'product.product-management',
        sidebarProps: {
          displayText: 'productManagement'
        },
        parent: '/product'
      },
      {
        role: permissionActions.ADD_PRODUCT,
        path: '/product/create',
        element: <CreateOrUpdateProductPage />,
        state: 'product.product-management',
        sidebarProps: {
          displayText: ''
        },
        parent: '/product'
      },
      {
        role: permissionActions.UPDATE_PRODUCT,
        path: '/product/edit',
        element: <CreateOrUpdateProductPage />,
        state: 'product.product-management',
        sidebarProps: {
          displayText: ''
        },
        parent: '/product'
      },
      {
        role: permissionActions.DETAIL_PRODUCT,
        path: '/product/details/view',
        element: <ViewDetailProductPage />,
        state: 'product.product-management',
        sidebarProps: {
          displayText: ''
        },
        parent: '/product'
      },
      {
        role: permissionActions.LIST_PRODUCT_GROUP,
        path: '/product/group-product',
        element: <GroupProductPage />,
        state: 'product.group-product-management',
        sidebarProps: {
          displayText: 'groupProductManagement'
        },
        parent: '/product'
      },
      {
        role: permissionActions.LIST_SUPPLIER,
        path: '/product/supplier',
        element: <SupplierPage />,
        state: 'product.supplier-management',
        sidebarProps: {
          displayText: 'supplierManagement'
        },
        parent: '/product'
      }
    ]
  }
]
export default appRoutes
