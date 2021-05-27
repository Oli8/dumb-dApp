// TODO: decorator if window.ethereum...
// TODO: error management
import type adress from '../types/adress';

export async function connectWallet() {
  if ('ethereum' in window) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      return accounts[0];
    } catch (error) {
      return false;
    }
  }

  return false;
}

export async function getConnectedWallet() {
  if ('ethereum' in window) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });
      return accounts[0];
    } catch (error) {
      return false;
    }
  }

  return false;
}

export async function getEthBalance(account: adress) {
  if ('ethereum' in window) {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account]
      });

      return window.Web3.utils.fromWei(balance);
    } catch (error) {
      return false;
    }
  }

  return false;
}

export async function getChain() {
  if ('ethereum' in window) {
    try {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      return chainId;
    } catch (error) {
      return false;
    }
  }

  return false;
}