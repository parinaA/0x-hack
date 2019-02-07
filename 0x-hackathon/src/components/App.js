import React from 'react';
import axios from 'axios';
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
import { MetamaskSubprovider } from '@0x/subproviders';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { RINKEBY_CONFIGS, TX_DEFAULTS } from '../configs';
import { DECIMALS, NULL_ADDRESS, ZERO } from '../constants';
import { contractAddresses } from '../contracts';
import { getRandomFutureDateInSeconds } from '../utils';

export default class connectApp extends React.Component {

  constructor(props) {
    super(props);
    this.postOrder = this.postOrder.bind(this);
    this.fillOrder = this.fillOrder.bind(this);
    this.unmarshallOrder = this.unmarshallOrder.bind(this);
  }

  postOrder() {

    const providerEngine = Web3.givenProvider;
    const contractWrappers = new ContractWrappers(providerEngine, { networkId: RINKEBY_CONFIGS.networkId });
    const web3Wrapper = new Web3Wrapper(providerEngine);
    const maker = web3.eth.accounts.toString();         
    const zrxTokenAddress = contractAddresses.zrxToken;
    const etherTokenAddress = contractAddresses.etherToken;
    const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(15), DECIMALS);
    const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.01), DECIMALS);
    const makerAssetData = assetDataUtils.encodeERC20AssetData(zrxTokenAddress);
    const takerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress);

    // Allow the 0x ERC20 Proxy to move ZRX on behalf of makerAccount
    contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(zrxTokenAddress, maker)
      .then(makerZRXApprovalTxHash => {
        console.log(makerZRXApprovalTxHash);
        const randomExpiration = getRandomFutureDateInSeconds();
        const exchangeAddress = contractAddresses.exchange;
        const feeRecipientAddress = "0xb046140686d052fff581f63f8136cce132e857da";
        // Create the order
        var order = {
          exchangeAddress,
          makerAddress: maker,
          takerAddress: NULL_ADDRESS,
          senderAddress: NULL_ADDRESS,
          feeRecipientAddress: NULL_ADDRESS,
          expirationTimeSeconds: randomExpiration,
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
            axios.post('http://localhost:3000/v2/order',{order:order,strike:50} ).then(result => {
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
  unmarshallOrder(signedOrderRaw) {

    signedOrderRaw.salt = new BigNumber(signedOrderRaw.salt);
    signedOrderRaw.makerAssetAmount = new BigNumber(signedOrderRaw.makerAssetAmount);
    signedOrderRaw.takerAssetAmount = new BigNumber(signedOrderRaw.takerAssetAmount);
    signedOrderRaw.makerFee = new BigNumber(signedOrderRaw.makerFee);
    signedOrderRaw.takerFee = new BigNumber(signedOrderRaw.takerFee);
    signedOrderRaw.expirationTimeSeconds = new BigNumber(signedOrderRaw.expirationTimeSeconds);
    return signedOrderRaw;
  }


fillOrder() {
    const providerEngine = Web3.givenProvider;
    const contractWrappers = new ContractWrappers(providerEngine, { networkId: RINKEBY_CONFIGS.networkId });
    axios.get("http://localhost:3000/v2/orders")
      .then(body => {
        console.log(body);
        const order = body.data.records[0].order;
        const strikePrice = order.strikePrice;
        delete order.strikePrice;
        const taker = web3.eth.accounts.toString();
        const etherTokenAddress = contractAddresses.etherToken;
        contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(etherTokenAddress, taker)
          .then(() => {
            contractWrappers.etherToken.depositAsync(etherTokenAddress, Web3Wrapper.toBaseUnitAmount(new BigNumber(order.takerAssetAmount / 1000000000000000000), DECIMALS), taker)
              .then(() => {
                console.log(order);
                const ord = this.unmarshallOrder(order);
                console.log(ord);
                contractWrappers.exchange.validateFillOrderThrowIfInvalidAsync(ord, Web3Wrapper.toBaseUnitAmount(new BigNumber(order.takerAssetAmount / 1000000000000000000), DECIMALS), taker)
                  .then(txhash => {
                    console.log("valid suc", txhash);
                    contractWrappers.exchange.fillOrderAsync(ord, Web3Wrapper.toBaseUnitAmount(new BigNumber(order.takerAssetAmount / 1000000000000000000), DECIMALS), taker, {
                      gasLimit: TX_DEFAULTS.gas,
                    })
                    .then(hash => {
                      console.log("exc suc",hash);

                    })
            })
                  .catch(err => {
                    console.log("exchange", err);
                  })
              })
              .catch(err => {
                console.log("weth", err);
              })
          })
          .catch(err => {
            console.log("proxy error", err);
          });
      })
      .catch(err => {
        //axios catch
        console.log("axios error", err);
      })
  }


  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.postOrder}>Post order</button>
        <button className="btn btn-primary" onClick={this.fillOrder}>Fill order</button>
      </div>
    );
  }

}


