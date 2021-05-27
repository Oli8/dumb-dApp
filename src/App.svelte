<Tailwind />
<nav class="border-b-2 border-blue-400 bg-blue p-5">
  <h1 class="inline">Dumb dApp</h1>
  {#if connectedAdress}
    <div class="float-right mr-4 border-dotted border-2 border-blue-400 rounded p-1 relative bottom-1">
      {readAbleEthBalance}
      <img src="eth_logo.png"
           alt="ethers"
           class="float-right relative top-1 ml-1"
           width="10" />
    </div>
  {/if}
  <button on:click={onConnect}
          class="float-right mr-4 border-dotted border-2 border-blue-400 rounded p-1 relative bottom-1 cursor-pointer">
    {connectBtnLabel}
  </button>
</nav>

<script lang="ts">
import Tailwind from './Tailwind.svelte';
import { onMount } from 'svelte';
import type adress from './types/adress';
import { connectWallet, getConnectedWallet,
         getEthBalance, getChain } from './eth';

const ropstenChainId: string = '0x3';
const wrongChainMessage: string = 'This network is not supported. Please switch to Ropsten network';

onMount(async () => {
  window.ethereum.on('accountsChanged', ([account]) => {
    if (!account) {
      connectedAdress = null;
    } else {
      connect(account);
    }
  });

  window.ethereum.on('chainChanged', async (chainId) => {
    // TODO: check if we can ask for a network change
    if (!await checkChain()) {
      alert(wrongChainMessage);
      logOut();
    }
  });

  const account = await getConnectedWallet();
  if (account) {
    connect(account);
  }
});

let connectedAdress: adress;
let truncatedAdress: string;
let connectBtnLabel: string;
let ethBalance: number;
let readAbleEthBalance: string;

async function checkChain(): Promise<boolean> {
  const chainId = await getChain();
  return chainId === ropstenChainId;
}

async function onConnect() {
  if (!await checkChain())
    return alert(wrongChainMessage);

  const account = await connectWallet();
  if (account) {
    connect(account);
  }
}

async function connect(account: adress) {
  if (!await checkChain())
    return alert(wrongChainMessage);
  connectedAdress = account;
}

function logOut() {
  connectedAdress = null;
}

async function getConnectedAdressEthBalance() {
  ethBalance = await getEthBalance(connectedAdress);
  readAbleEthBalance = Number(ethBalance).toLocaleString('fullwide', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
}

$: if (connectedAdress) {
  truncatedAdress = `${connectedAdress.substring(0, 4)}...${connectedAdress.substring(connectedAdress.length-4)}`;
}
$: connectBtnLabel = connectedAdress ? truncatedAdress : 'Connect';
$: if (connectedAdress) { getConnectedAdressEthBalance(); }
</script>
