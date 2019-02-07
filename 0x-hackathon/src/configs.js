import { GANACHE_NETWORK_ID, KOVAN_NETWORK_ID, RINKEBY_NETWORK_ID, ROPSTEN_NETWORK_ID } from './constants';

export const TX_DEFAULTS = { gas: 400000 };
export const MNEMONIC = 'concert load couple harbor equip island argue ramp clarify fence smart topic';
export const BASE_DERIVATION_PATH = `44'/60'/0'/0`;
export const GANACHE_CONFIGS= {
    rpcUrl: 'http://127.0.0.1:8545',
    networkId: GANACHE_NETWORK_ID,
};
export const KOVAN_CONFIGS = {
    rpcUrl: 'https://kovan.infura.io/',
    networkId: KOVAN_NETWORK_ID,
};
export const ROPSTEN_CONFIGS = {
    rpcUrl: 'https://ropsten.infura.io/',
    networkId: ROPSTEN_NETWORK_ID,
};
export const RINKEBY_CONFIGS  = {
    rpcUrl: 'https://rinkeby.infura.io/',
    networkId: RINKEBY_NETWORK_ID,
};
export const NETWORK_CONFIGS = GANACHE_CONFIGS; // or KOVAN_CONFIGS or ROPSTEN_CONFIGS or RINKEBY_CONFIGS
