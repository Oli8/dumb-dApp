// TODO: decorator if window.ethereum...
// TODO: error management
import { utils } from 'ethers';
import type adress from '../types/adress';

export async function connectWallet() {
  try {
    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    return account;
  } catch (error) {
    return false;
  }
}

export async function getConnectedWallet() {
  try {
    const [account] = await window.ethereum.request({
      method: 'eth_accounts'
    });

    return account;
  } catch (error) {
    return false;
  }
}

export async function getEthBalance(account: adress) {
  try {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account]
    });

    return Number(utils.formatEther(balance));
  } catch (error) {
    return 0;
  }
}

export async function getChain() {
  try {
    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    return chainId;
  } catch (error) {
    return false;
  }
}

export async function sendTransaction({from, to, amount}: {
  from: adress,
  to: adress,
  amount: number
}) {
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
