import FinanceDashboardAppConfig from './finance/FinanceDashboardAppConfig';
import DashboardConfig from "./DashboardConfig";
import profileAppConfig from "./profile/profileAppConfig";
import HelpCenterAppConfig from './support/HelpCenterAppConfig'
import PromoterAppConfig from "./promoter/PromoterAppConfig";
import DepositAppConfig from "./deposit/DepositAppConfig";
import ContractAppConfig from "./contract/ContractAppConfig";
import WalletAppConfig from './wallet/WalletAppConfig';
import PasswordConfig from './password/PasswordConfig';
import MarketAppConfig from "./market/MarketAppConfig";



const dashboardsConfigs = [
    DashboardConfig,
    FinanceDashboardAppConfig,
    profileAppConfig,
    PromoterAppConfig,
    DepositAppConfig,
    ContractAppConfig,
    MarketAppConfig,
    WalletAppConfig,
    PasswordConfig,
];

export default dashboardsConfigs;
