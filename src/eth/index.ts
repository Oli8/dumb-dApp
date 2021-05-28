// TODO: decorator if window.ethereum...
// TODO: error management
import { utils } from 'ethers';
import type adress from '../types/adress';

export async function connectWallet() {
  if ('ethereum' in window) {
    try {
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      return account;
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

      return Number(utils.formatEther(balance));
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

export async function sendTransaction({from, to, amount}: {
  from: adress,
  to: adress,
  amount: number
}) {
  if ('ethereum' in window) {
    try {
      const weiAmount = utils.parseEther(String(amount))
                             .toHexString()
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from,
          to,
          value: weiAmount,
        }]
      });

      return tx;
    } catch (error) {
      return false;
    }
  }

  return false;
}
