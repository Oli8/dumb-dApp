export async function connectWallet() {
  console.log('oki');
  if ('ethereum' in window) {
    const wallet = await window.ethereum.send('eth_requestAccounts');
    const w3 = window.web3 = new Web3(window.ethereum); // useful ?
    return wallet;
  }

  return false;
}