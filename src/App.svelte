<Tailwind />
<NotificationDisplay timeout={5000} />
<nav class="border-b-2 border-blue-400 p-5">
  <h1 class="inline">Dumb dApp</h1>
  {#if connectedAdress}
    <div class="box bottom-1">
      {readAbleEthBalance}
      <img src="eth_logo.png"
           alt="ethers"
           class="float-right relative top-1 ml-1"
           width="10" />
    </div>
  {/if}
  <button on:click={onConnect}
          class="box bottom-1 cursor-pointer">
    {connectBtnLabel}
  </button>
</nav>

{#if connectedAdress}
  <SendingForm {connectedAdress} {ethBalance} {provider}
               on:txSubmit={onTxSubmit} />
{/if}

<dialog bind:this={modal} class="text-center px-10 text-lg">
  <p class="text-blue-300">✓ Transaction submitted!</p>
  <p>
    <a class="underline"
       href={`https://ropsten.etherscan.io/tx/${txHash}`}
       target="_blank">Show in explorer ➚</a>
  </p>
  <button class="b-button p-3 rounded mt-5"
          on:click={() => modal.close()}>
    Close
  </button>
</dialog>

<script lang="ts">
import Tailwind from './Tailwind.svelte';
import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';
import { providers } from 'ethers';
import { onMount } from 'svelte';
import type adress from './types/adress';
import * as eth from './eth';
import SendingForm from './components/SendingForm.svelte';

const ropstenChainId: string = '0x3';
const wrongChainMessage: string = 'This network is not supported. Please switch to Ropsten network';
let provider: providers.Web3Provider;
//TODO: event to react to balance change

onMount(async () => {
  if (ethereumEnabled) {
    provider = new providers.Web3Provider(window.ethereum);

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
        notifier.warning(wrongChainMessage);
        logOut();
      }
    });

    const account = await eth.getConnectedWallet();
    if (account) {
      connect(account);
    }
  }
});

const ethereumEnabled: boolean = 'ethereum' in window;
let connectedAdress: adress;
let truncatedAdress: string;
let connectBtnLabel: string;
let ethBalance: number;
let readAbleEthBalance: string;
let modal: HTMLDialogElement;
let txHash: string;

async function checkChain(): Promise<boolean> {
  const chainId = await eth.getChain();
  return chainId === ropstenChainId;
}

async function onConnect() {
  if (!ethereumEnabled)
    return;

  const account = await eth.connectWallet();
  if (account) {
    connect(account);
  }
}

async function connect(account: adress) {
  if (!await checkChain())
    return notifier.warning(wrongChainMessage);
  connectedAdress = account;
}

function logOut() {
  connectedAdress = null;
}

function onTxSubmit({ detail }) {
  txHash = detail.hash;
  modal.showModal();
}

async function getConnectedAdressEthBalance() {
  ethBalance = await eth.getEthBalance(connectedAdress);
  readAbleEthBalance = ethBalance.toLocaleString('fullwide', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
}

$: if (connectedAdress) {
  truncatedAdress = `${connectedAdress.substring(0, 4)}...${connectedAdress.substring(connectedAdress.length-4)}`;
}
$: {
  if (!ethereumEnabled) {
    connectBtnLabel = 'Install MetaMask to connect'
  }
  else if (connectedAdress) {
    connectBtnLabel = truncatedAdress;
  } else {
    connectBtnLabel = 'Connect';
  }
}
$: if (connectedAdress) { getConnectedAdressEthBalance(); }
</script>
