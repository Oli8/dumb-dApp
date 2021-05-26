// TODO: decorator if window.ethereum...
// TODO: error management

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
