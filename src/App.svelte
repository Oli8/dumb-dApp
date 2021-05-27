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
         getEthBalance } from './eth';

onMount(async () => {
  window.ethereum.on('accountsChanged', ([account]) => {
    if (!account) {
      connectedAdress = null;
    } else {
      connect(account);
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
let readAbleEthBalance: string = '0';

async function onConnect() {
  const account = await connectWallet();
  if (account) {
    connect(account);
  }
}

function connect(account: adress): void {
  connectedAdress = account;
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
