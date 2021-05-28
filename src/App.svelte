<Tailwind />
<nav class="border-b-2 border-blue-400 p-5">
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

{#if connectedAdress}
  <main class="border-2 border-blue-400 mt-20 w-4/6 mx-auto p-5">
    › Send Ethers
    <form>
      <input class="border block w-full my-3" type="text" maxlength="42"
             bind:value={recipient} placeholder="Recipient adress"/>
      <input class="border block w-full my-3" type="number"
             bind:value={amount} placeholder="Amount"/>
      <input class="cursor-pointer w-full block uppercase text-lg p-3 rounded"
             type="submit" value="Send" on:click|preventDefault={send}/>
    </form>
  </main>
{/if}

<script lang="ts">
import Tailwind from './Tailwind.svelte';
import { utils } from 'ethers';
import { onMount } from 'svelte';
import type adress from './types/adress';
import { connectWallet, getConnectedWallet,
         getEthBalance, getChain, sendTransaction } from './eth';

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
let recipient: adress;
let amount: number;

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

async function send() {
  console.log('send eths!!', amount, recipient);
  const tx = await sendTransaction({
    from: connectedAdress,
    to: recipient,
    amount,
  });
  console.log(tx);
  // TODO: display etherscan tx
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
