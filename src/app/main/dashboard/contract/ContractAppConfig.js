import ContractList from "./ContractList";

const ContractAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'contracts',
      element: <ContractList />,
    },
  ],
};

export default ContractAppConfig;
