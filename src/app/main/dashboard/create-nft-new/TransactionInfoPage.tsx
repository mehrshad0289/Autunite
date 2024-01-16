import React from "react";
import { getChainScanHeader } from "../helper";

const TransactionInfoPage = ({ transactionHash }) => {
  const chainScanHeader = getChainScanHeader();

  return (
    <a
      target="_blank"
      href={`https://${chainScanHeader}/tx/${transactionHash}`}
    >
      {transactionHash}
    </a>
  );
};

export default TransactionInfoPage;
