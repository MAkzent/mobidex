import { BigNumber } from '0x.js';
import ethUtil from 'ethereumjs-util';
import ZeroExClient from '../clients/0x';
import EthereumClient from '../clients/ethereum';
import { TransactionService } from '../services/TransactionService';

export function deposit(address, amount) {
  return async (dispatch, getState) => {
    const {
      wallet: { web3 }
    } = getState();
    const ethereumClient = new EthereumClient(web3);
    const zeroExClient = new ZeroExClient(ethereumClient);
    const txhash = await zeroExClient.depositEther(new BigNumber(amount));
    const activeTransaction = {
      id: txhash,
      type: 'DEPOSIT',
      address,
      amount
    };
    await TransactionService.instance.addActiveTransaction(activeTransaction);
  };
}

export function withdraw(address, amount) {
  return async (dispatch, getState) => {
    const {
      wallet: { web3 }
    } = getState();
    const ethereumClient = new EthereumClient(web3);
    const zeroExClient = new ZeroExClient(ethereumClient);
    const txhash = await zeroExClient.withdrawEther(new BigNumber(amount));
    const activeTransaction = {
      id: txhash,
      type: 'WITHDRAWAL',
      address,
      amount
    };
    await TransactionService.instance.addActiveTransaction(activeTransaction);
  };
}

export function fillOrder(order, fillBaseUnitAmount, amount) {
  async (dispatch, getState) => {
    const {
      wallet: { web3 }
    } = getState();
    const ethereumClient = new EthereumClient(web3);
    const zeroExClient = new ZeroExClient(ethereumClient);
    const zeroEx = await zeroExClient.getZeroExClient();
    const account = await ethereumClient.getAccount();
    const txhash = await zeroEx.exchange.fillOrderAsync(
      order,
      fillBaseUnitAmount,
      true,
      `0x${ethUtil.stripHexPrefix(account.toString().toLowerCase())}`,
      { shouldValidate: true }
    );
    const activeTransaction = {
      ...order,
      id: txhash,
      type: 'FILL',
      amount
    };
    await TransactionService.instance.addActiveTransaction(activeTransaction);
  };
}

export function batchFillOrKill(orderRequests, amount) {
  async (dispatch, getState) => {
    const {
      wallet: { web3 }
    } = getState();
    const ethereumClient = new EthereumClient(web3);
    const zeroExClient = new ZeroExClient(ethereumClient);
    const zeroEx = await zeroExClient.getZeroExClient();
    const account = await ethereumClient.getAccount();
    const txhash = await zeroEx.exchange.batchFillOrKillAsync(
      orderRequests,
      `0x${ethUtil.stripHexPrefix(account.toString().toLowerCase())}`,
      { shouldValidate: true }
    );
    const activeTransaction = {
      id: txhash,
      type: 'BATCH_FILL',
      amount: amount
    };
    await TransactionService.instance.addActiveTransaction(activeTransaction);
  };
}
