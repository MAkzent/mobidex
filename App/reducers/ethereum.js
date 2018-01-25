import * as _ from "lodash";
import { handleActions } from "redux-actions";
import * as Web3 from "web3";
import { ZeroEx } from "0x.js";
import { getClient, ContractDefinitionLoader } from "web3-contracts-loader";
import * as Actions from "../constants/actions";

function getActiveInitialState() {
  const web3 = new Web3(web3.currentProvider);

  return {
    account: null,
    web3: web3,
    zeroEx: new ZeroEx(web3.currentProvider),
    active: true,
    transactions: []
  }
}

function getInactiveInitialState() {
  return {
    account: null,
    web3: null,
    zeroEx: null,
    active: false,
    transactions: []
  }
}

function getInitialState() {
  if (typeof web3 !== "undefined") {
    return getActiveInitialState();
  } else {
    return getInactiveInitialState();
  }
}

export default handleActions({
  [Actions.CHANGE_ACCOUNT]: (state, action) => {
    if (action.payload) {
      state.account = action.payload;
    } else {
      state.account = null;
    }
    return state;
  },
  [Actions.ADD_TRANSACTIONS]: (state, action) => {
    state.transactions = _.union(state.transactions, action.payload);
    return state;
  }
}, getInitialState());