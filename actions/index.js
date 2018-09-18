import { createAction } from 'redux-actions';
import * as Actions from '../constants/actions';

export const addActiveTransactions = createAction(
  Actions.ADD_ACTIVE_TRANSACTIONS
);
export const addAssets = createAction(Actions.ADD_ASSETS);
export const addOrders = createAction(Actions.ADD_ORDERS);
export const addTransactions = createAction(Actions.ADD_TRANSACTIONS);
export const notProcessing = createAction(Actions.NOT_PROCESSING);
export const processing = createAction(Actions.PROCESSING);
export const removeActiveTransactions = createAction(
  Actions.REMOVE_ACTIVE_TRANSACTIONS
);
export const setAllowances = createAction(Actions.SET_ALLOWANCES);
export const setBalances = createAction(Actions.SET_BALANCES);
export const setError = createAction(Actions.SET_ERROR);
export const setForexCurrency = createAction(Actions.SET_FOREX_CURRENCY);
export const setNetwork = createAction(Actions.SET_NETWORK);
export const setOrderbook = createAction(Actions.SET_ORDERBOOK);
export const setOrders = createAction(Actions.SET_ORDERS);
export const setProducts = createAction(Actions.SET_PRODUCTS);
export const setWallet = createAction(Actions.SET_WALLET);
export const setTransactionHash = createAction(Actions.SET_TRANSACTION_HASH);
export const toggleShowForex = createAction(Actions.TOGGLE_SHOW_FOREX);
export const updateForexTicker = createAction(Actions.UPDATE_FOREX_TICKER);
export const updateTokenTicker = createAction(Actions.UPDATE_TOKEN_TICKER);
