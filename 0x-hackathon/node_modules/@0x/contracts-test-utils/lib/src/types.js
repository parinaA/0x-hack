"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Invalid"] = 0] = "Invalid";
    OrderStatus[OrderStatus["InvalidMakerAssetAmount"] = 1] = "InvalidMakerAssetAmount";
    OrderStatus[OrderStatus["InvalidTakerAssetAmount"] = 2] = "InvalidTakerAssetAmount";
    OrderStatus[OrderStatus["Fillable"] = 3] = "Fillable";
    OrderStatus[OrderStatus["Expired"] = 4] = "Expired";
    OrderStatus[OrderStatus["FullyFilled"] = 5] = "FullyFilled";
    OrderStatus[OrderStatus["Cancelled"] = 6] = "Cancelled";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var ContractName;
(function (ContractName) {
    ContractName["TokenRegistry"] = "TokenRegistry";
    ContractName["MultiSigWalletWithTimeLock"] = "MultiSigWalletWithTimeLock";
    ContractName["Exchange"] = "Exchange";
    ContractName["ZRXToken"] = "ZRXToken";
    ContractName["DummyERC20Token"] = "DummyERC20Token";
    ContractName["EtherToken"] = "WETH9";
    ContractName["DutchAuction"] = "DutchAuction";
    ContractName["AssetProxyOwner"] = "AssetProxyOwner";
    ContractName["AccountLevels"] = "AccountLevels";
    ContractName["EtherDelta"] = "EtherDelta";
    ContractName["Arbitrage"] = "Arbitrage";
    ContractName["TestAssetDataDecoders"] = "TestAssetDataDecoders";
    ContractName["TestAssetProxyDispatcher"] = "TestAssetProxyDispatcher";
    ContractName["TestLibs"] = "TestLibs";
    ContractName["TestSignatureValidator"] = "TestSignatureValidator";
    ContractName["ERC20Proxy"] = "ERC20Proxy";
    ContractName["ERC721Proxy"] = "ERC721Proxy";
    ContractName["DummyERC721Receiver"] = "DummyERC721Receiver";
    ContractName["DummyERC721Token"] = "DummyERC721Token";
    ContractName["TestLibBytes"] = "TestLibBytes";
    ContractName["TestWallet"] = "TestWallet";
    ContractName["Authorizable"] = "Authorizable";
    ContractName["Whitelist"] = "Whitelist";
    ContractName["Forwarder"] = "Forwarder";
    ContractName["BalanceThresholdFilter"] = "BalanceThresholdFilter";
})(ContractName = exports.ContractName || (exports.ContractName = {}));
// Combinatorial testing types
var FeeRecipientAddressScenario;
(function (FeeRecipientAddressScenario) {
    FeeRecipientAddressScenario["BurnAddress"] = "BURN_ADDRESS";
    FeeRecipientAddressScenario["EthUserAddress"] = "ETH_USER_ADDRESS";
})(FeeRecipientAddressScenario = exports.FeeRecipientAddressScenario || (exports.FeeRecipientAddressScenario = {}));
var OrderAssetAmountScenario;
(function (OrderAssetAmountScenario) {
    OrderAssetAmountScenario["Zero"] = "ZERO";
    OrderAssetAmountScenario["Large"] = "LARGE";
    OrderAssetAmountScenario["Small"] = "SMALL";
})(OrderAssetAmountScenario = exports.OrderAssetAmountScenario || (exports.OrderAssetAmountScenario = {}));
var TakerScenario;
(function (TakerScenario) {
    TakerScenario["CorrectlySpecified"] = "CORRECTLY_SPECIFIED";
    TakerScenario["IncorrectlySpecified"] = "INCORRECTLY_SPECIFIED";
    TakerScenario["Unspecified"] = "UNSPECIFIED";
})(TakerScenario = exports.TakerScenario || (exports.TakerScenario = {}));
var ExpirationTimeSecondsScenario;
(function (ExpirationTimeSecondsScenario) {
    ExpirationTimeSecondsScenario["InPast"] = "IN_PAST";
    ExpirationTimeSecondsScenario["InFuture"] = "IN_FUTURE";
})(ExpirationTimeSecondsScenario = exports.ExpirationTimeSecondsScenario || (exports.ExpirationTimeSecondsScenario = {}));
var AssetDataScenario;
(function (AssetDataScenario) {
    AssetDataScenario["ERC20ZeroDecimals"] = "ERC20_ZERO_DECIMALS";
    AssetDataScenario["ZRXFeeToken"] = "ZRX_FEE_TOKEN";
    AssetDataScenario["ERC20FiveDecimals"] = "ERC20_FIVE_DECIMALS";
    AssetDataScenario["ERC20NonZRXEighteenDecimals"] = "ERC20_NON_ZRX_EIGHTEEN_DECIMALS";
    AssetDataScenario["ERC721"] = "ERC721";
})(AssetDataScenario = exports.AssetDataScenario || (exports.AssetDataScenario = {}));
var TakerAssetFillAmountScenario;
(function (TakerAssetFillAmountScenario) {
    TakerAssetFillAmountScenario["Zero"] = "ZERO";
    TakerAssetFillAmountScenario["GreaterThanRemainingFillableTakerAssetAmount"] = "GREATER_THAN_REMAINING_FILLABLE_TAKER_ASSET_AMOUNT";
    TakerAssetFillAmountScenario["LessThanRemainingFillableTakerAssetAmount"] = "LESS_THAN_REMAINING_FILLABLE_TAKER_ASSET_AMOUNT";
    TakerAssetFillAmountScenario["ExactlyRemainingFillableTakerAssetAmount"] = "EXACTLY_REMAINING_FILLABLE_TAKER_ASSET_AMOUNT";
})(TakerAssetFillAmountScenario = exports.TakerAssetFillAmountScenario || (exports.TakerAssetFillAmountScenario = {}));
var BalanceAmountScenario;
(function (BalanceAmountScenario) {
    BalanceAmountScenario["Exact"] = "EXACT";
    BalanceAmountScenario["TooLow"] = "TOO_LOW";
    BalanceAmountScenario["Higher"] = "HIGHER";
})(BalanceAmountScenario = exports.BalanceAmountScenario || (exports.BalanceAmountScenario = {}));
var AllowanceAmountScenario;
(function (AllowanceAmountScenario) {
    AllowanceAmountScenario["Exact"] = "EXACT";
    AllowanceAmountScenario["TooLow"] = "TOO_LOW";
    AllowanceAmountScenario["Higher"] = "HIGHER";
    AllowanceAmountScenario["Unlimited"] = "UNLIMITED";
})(AllowanceAmountScenario = exports.AllowanceAmountScenario || (exports.AllowanceAmountScenario = {}));
//# sourceMappingURL=types.js.map