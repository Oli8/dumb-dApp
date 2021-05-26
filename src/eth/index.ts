// TODO: decorator if window.ethereum...
// TODO: error management

export async function connectWallet(): Promise<[string] | boolean> {
  if ('ethereum' in window) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      return accounts;
    } catch (error) {
      return false;
    }
  }

  return false;
}

export async function getConnectedWallet() {
  if ('ethereum' in window) {
    try {
      const account = await window.ethereum.request({
        method: 'eth_accounts'
      });
      return account;
    } catch (error) {
      return false;
    }
  }

  return false;
}