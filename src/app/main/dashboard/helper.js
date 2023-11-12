import {getAddress} from "viem";
import { bsc,bscTestnet } from 'wagmi/chains';
/* Main Net */
// export function getContractAddress() {
//   return getAddress('0xAA0df662aA9B9afd1276f81967C2765d442E8812');
// }
// export function getChains() {return  [bsc]}
// export function getContractAbi() {
//   return [{"inputs":[{"internalType":"string","name":"_baseURI_","type":"string"},{"internalType":"string","name":"_name_","type":"string"},{"internalType":"string","name":"_symbol_","type":"string"},{"internalType":"address","name":"_minterOwner_","type":"address"},{"internalType":"address","name":"_nftOwner_","type":"address"},{"internalType":"address","name":"_mainWallet_","type":"address"},{"internalType":"address","name":"_BUSD_","type":"address"},{"internalType":"address","name":"_aggregator_","type":"address"},{"internalType":"uint256","name":"_minValue_","type":"uint256"},{"internalType":"uint96","name":"_defaultRoyalty_","type":"uint96"},{"internalType":"bool","name":"_singleNFT_","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Pay","type":"event"},{"inputs":[],"name":"AUT","outputs":[{"internalType":"contract AutuniteNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BNB_USD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amountBUSD","type":"uint256"}],"name":"MintAndPay","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amountBUSD","type":"uint256"}],"name":"PayUp","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"TotalPaidIn","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TotalPaidOut","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"changeBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mainWallet","type":"address"}],"name":"changeMainWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPayUp","type":"uint256"}],"name":"changeMinPayUp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minValue","type":"uint256"}],"name":"changeMinValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeSingleNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deleteDefaultRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"},{"internalType":"uint256[]","name":"amount","type":"uint256[]"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mainWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPayUp","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minValue","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"resetTokenRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint96","name":"feeNumerator","type":"uint96"}],"name":"setDefaultRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint96","name":"feeNumerator","type":"uint96"}],"name":"setTokenRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenInitialValue","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenPayOuts","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AutuniteMinter.TokenPayment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenPayments","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AutuniteMinter.TokenPayment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenTotalPayOut","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
// }
// export function getUSDContractAddress() {
//   return getAddress('0xe9e7cea3dedca5984780bafc599bd69add087d56');
// }
// export function getUSDContractAbi() {
//   return [
//     { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
//     {
//       anonymous: false,
//       inputs: [
//         { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
//         { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
//         { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
//       ],
//       name: 'Approval',
//       type: 'event',
//     },
//     {
//       anonymous: false,
//       inputs: [
//         { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
//         { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
//       ],
//       name: 'OwnershipTransferred',
//       type: 'event',
//     },
//     {
//       anonymous: false,
//       inputs: [
//         { indexed: true, internalType: 'address', name: 'from', type: 'address' },
//         { indexed: true, internalType: 'address', name: 'to', type: 'address' },
//         { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
//       ],
//       name: 'Transfer',
//       type: 'event',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: '_decimals',
//       outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: '_name',
//       outputs: [{ internalType: 'string', name: '', type: 'string' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: '_symbol',
//       outputs: [{ internalType: 'string', name: '', type: 'string' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [
//         { internalType: 'address', name: 'owner', type: 'address' },
//         { internalType: 'address', name: 'spender', type: 'address' },
//       ],
//       name: 'allowance',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { internalType: 'address', name: 'spender', type: 'address' },
//         { internalType: 'uint256', name: 'amount', type: 'uint256' },
//       ],
//       name: 'approve',
//       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
//       name: 'balanceOf',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
//       name: 'burn',
//       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'decimals',
//       outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { internalType: 'address', name: 'spender', type: 'address' },
//         { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
//       ],
//       name: 'decreaseAllowance',
//       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'getOwner',
//       outputs: [{ internalType: 'address', name: '', type: 'address' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { internalType: 'address', name: 'spender', type: 'address' },
//         { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
//       ],
//       name: 'increaseAllowance',
//       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
//       name: 'mint',
//       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'name',
//       outputs: [{ internalType: 'string', name: '', type: 'string' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'owner',
//       outputs: [{ internalType: 'address', name: '', type: 'address' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [],
//       name: 'renounceOwnership',
//       outputs: [],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'symbol',
//       outputs: [{ internalType: 'string', name: '', type: 'string' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: true,
//       inputs: [],
//       name: 'totalSupply',
//       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//       payable: false,
//       stateMutability: 'view',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { internalType: 'address', name: 'recipient', type: 'address' },
//         { internalType: 'uint256', name: 'amount', type: 'uint256' },
//       ],
//       name: 'transfer',
//       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [
//         { internalType: 'address', name: 'sender', type: 'address' },
//         { internalType: 'address', name: 'recipient', type: 'address' },
//         { internalType: 'uint256', name: 'amount', type: 'uint256' },
//       ],
//       name: 'transferFrom',
//       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//     {
//       constant: false,
//       inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
//       name: 'transferOwnership',
//       outputs: [],
//       payable: false,
//       stateMutability: 'nonpayable',
//       type: 'function',
//     },
//   ];
// }

/* Main Net */



/* Test Net */
const tstabi =[
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_baseURI_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol_",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_minterOwner_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_nftOwner_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_mainWallet_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_USDT_",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_minValue_",
        "type": "uint256"
      },
      {
        "internalType": "uint96",
        "name": "_defaultRoyalty_",
        "type": "uint96"
      },
      {
        "internalType": "bool",
        "name": "_singleNFT_",
        "type": "bool"
      },
      {
        "internalType": "address[]",
        "name": "_userAddrs_",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_tokenIds_",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_timestamps_",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_values_",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_mainWallet",
        "type": "address"
      }
    ],
    "name": "ChangeMainWallet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_minPayUp",
        "type": "uint256"
      }
    ],
    "name": "ChangeMinPayUp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_minValue",
        "type": "uint256"
      }
    ],
    "name": "ChangeMinValue",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Pay",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "AUT",
    "outputs": [
      {
        "internalType": "contract AutuniteCollection",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "BNB_USD",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountUSD",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "stableERC20",
        "type": "address"
      }
    ],
    "name": "MintAndPay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountUSD",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "stableERC20",
        "type": "address"
      }
    ],
    "name": "PayUp",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SupportedTokens",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TotalPaidIn",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TotalPaidOut",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "USDT",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "USD_BNB",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "stableERC20",
        "type": "address"
      }
    ],
    "name": "addSupportedToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bnbToToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mainWallet",
        "type": "address"
      }
    ],
    "name": "changeMainWallet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minPayUp",
        "type": "uint256"
      }
    ],
    "name": "changeMinPayUp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minValue",
        "type": "uint256"
      }
    ],
    "name": "changeMinValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddr",
        "type": "address"
      }
    ],
    "name": "changeMultiNFTAddr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "baseURI",
        "type": "string"
      }
    ],
    "name": "changeRoot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "changeSingleNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deleteDefaultRoyalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenId",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amountUSD",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "totalAmountUSD",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "stableERC20",
        "type": "address"
      }
    ],
    "name": "distribute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mainWallet",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minPayUp",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minValue",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "notification",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "note",
        "type": "string"
      }
    ],
    "name": "notify",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userAddr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "stableERC20",
        "type": "address"
      }
    ],
    "name": "removeSupportedToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "resetTokenRoyalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "stableERC20",
        "type": "address"
      }
    ],
    "name": "setBNBToERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint96",
        "name": "feeNumerator",
        "type": "uint96"
      }
    ],
    "name": "setDefaultRoyalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_royaltyManager",
        "type": "address"
      }
    ],
    "name": "setRoyaltyManager",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint96",
        "name": "feeNumerator",
        "type": "uint96"
      }
    ],
    "name": "setTokenRoyalty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenDepositValue",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenInitialValue",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenPayOuts",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct AutuniteMinter.TokenPayment[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenPayments",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "internalType": "struct AutuniteMinter.TokenPayment[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenTotalPayOut",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
export function getChains() {return  [bscTestnet]}
export function getContractAddress() {return  '0x8DCC2554EAfa17dbB7ea4B011303b35CC6e8045a'}
export function getContractAbi(){ return tstabi};
// export function getUSDContractAddress () { return '0x55d398326f99059ff775485246999027b3197955'} *************
export function getUSDContractAbi()  {return [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]}




/* Test Net 11 */
// const tstabi = [{"inputs":[{"internalType":"string","name":"_baseURI_","type":"string"},{"internalType":"string","name":"_name_","type":"string"},{"internalType":"string","name":"_symbol_","type":"string"},{"internalType":"address","name":"_minterOwner_","type":"address"},{"internalType":"address","name":"_nftOwner_","type":"address"},{"internalType":"address","name":"_mainWallet_","type":"address"},{"internalType":"address","name":"_BUSD_","type":"address"},{"internalType":"uint256","name":"_minValue_","type":"uint256"},{"internalType":"uint96","name":"_defaultRoyalty_","type":"uint96"},{"internalType":"bool","name":"_singleNFT_","type":"bool"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Pay","type":"event"},{"inputs":[],"name":"AUT","outputs":[{"internalType":"contract AutuniteNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BUSD","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MintAndPay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PayUp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TotalEntered","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TotalPaidOut","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"changeBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mainWallet","type":"address"}],"name":"changeMainWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPayUp","type":"uint256"}],"name":"changeMinPayUp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minValue","type":"uint256"}],"name":"changeMinValue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"changeSingleNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deleteDefaultRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AutuniteMinter.TokenPayment[]","name":"payments","type":"tuple[]"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mainWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minPayUp","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minValue","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddr","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"resetTokenRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint96","name":"feeNumerator","type":"uint96"}],"name":"setDefaultRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint96","name":"feeNumerator","type":"uint96"}],"name":"setTokenRoyalty","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenInitialValue","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenPayments","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"internalType":"struct AutuniteMinter.TokenPayment[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// export function getContractAddress() {return  '0xAA0df662aA9B9afd1276f81967C2765d442E8812'}
// export function getContractAbi(){ return tstabi};
export function getUSDContractAddress () { return '0xe4C31FC3B577e34af64Aae0D588e8bf3EEe0C01a'}
// export function getUSDContractAbi()  {return [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]}

