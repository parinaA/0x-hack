import {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    Order,
    orderHashUtils,
    signatureUtils,
  } from '0x.js';
  import Web3 from 'web3';
  import axios from 'axios';
  import { MetamaskSubprovider } from '@0x/subproviders';
  import { Web3Wrapper } from '@0x/web3-wrapper';
  import { RINKEBY_CONFIGS, TX_DEFAULTS } from './configs';
  import { DECIMALS, NULL_ADDRESS, ZERO } from './constants';
  import { contractAddresses } from './contracts';
  

/**
 * Returns an amount of seconds that is greater than the amount of seconds since epoch.
 */
export const getRandomFutureDateInSeconds = () => {
    // return new BigNumber(Date.now() + TEN_MINUTES_MS).div(ONE_SECOND_MS).ceil();
};

export const sendDataToContract= (baseToken,quoteToken,strikePrice,numberOfBaseTokens,premium,expiry) =>{


}

export const createOrderFunc = (baseToken,quoteToken,strikePrice,numberOfBaseTokens,premium,expiry) =>{
    const extradata = {
        baseToken,
        quoteToken,
        strikePrice,
        numberOfBaseTokens,
        premium
    }
    
    const providerEngine = Web3.givenProvider;
    const contractWrappers = new ContractWrappers(providerEngine, { networkId: RINKEBY_CONFIGS.networkId });
    const web3Wrapper = new Web3Wrapper(providerEngine);
    const maker = web3.eth.accounts.toString();         //no change
    const expirationTimeSeconds = new BigNumber(expiry);
    const zrxTokenAddress = contractAddresses.zrxToken;
    const etherTokenAddress = contractAddresses.etherToken;
    const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(15), DECIMALS); //number of option tokens = number of base tokens
    const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.01), DECIMALS); //premium amount
    const makerAssetData = assetDataUtils.encodeERC20AssetData(zrxTokenAddress);  //option token address
    const takerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress); // quote token address

    // Allow the 0x ERC20 Proxy to move ZRX on behalf of makerAccount
    contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(zrxTokenAddress, maker)
      .then(makerZRXApprovalTxHash => {
        console.log(makerZRXApprovalTxHash);
        const exchangeAddress = contractAddresses.exchange;
        const feeRecipientAddress = "0xb046140686d052fff581f63f8136cce132e857da";
        // Create the order
        var order = {
          exchangeAddress,
          makerAddress: maker,
          takerAddress: NULL_ADDRESS,
          senderAddress: NULL_ADDRESS,
          feeRecipientAddress: NULL_ADDRESS,
          expirationTimeSeconds,
          salt: generatePseudoRandomSalt(),
          makerAssetAmount,
          takerAssetAmount,
          makerAssetData,
          takerAssetData,
          makerFee: ZERO,
          takerFee: ZERO,
        };
        const orderHashHex = orderHashUtils.getOrderHashHex(order);
        signatureUtils.ecSignHashAsync(new MetamaskSubprovider(providerEngine), orderHashHex, maker)
          .then(sign => {
            console.log("signature callback", sign);
            order.signature = sign;
            console.log("order", order);
            axios.post('http://localhost:3000/v2/order',{order:order,extra: extradata} ).then(result => {
              console.log("result from post request ", result);
            })
              .catch(err => {
                console.log("err", err);
              })
          })
      })
      .catch(err => {
        console.log("contract wrapper .erc20");
        console.log(err);
      });
}

export const timeConverter = (UNIX_timestamp) => {
  console.log(UNIX_timestamp);
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  console.log(time);
  return time;
}
