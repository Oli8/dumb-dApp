<Tailwind />
<nav class="border-b-2 border-blue-400 bg-blue p-5">
  <h1 class="inline">Dumb dApp</h1>
  <button on:click={onConnect}
          class="float-right mr-4 border-dotted border-2 border-blue-400 rounded p-1 relative bottom-1 cursor-pointer">
    {connectBtnLabel}
  </button>
</nav>

<script lang="ts">
import Tailwind from './Tailwind.svelte';
import { onMount } from 'svelte';
import type adress from './types/adress';
import { connectWallet, getConnectedWallet } from './eth';

enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

onMount(async () => {
  window.ethereum.on('accountsChanged', ([account]) => {
    if (!account) {
      connectedAdress = null;
      status = ConnectionStatus.DISCONNECTED;
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
let status: ConnectionStatus = ConnectionStatus.DISCONNECTED;
let truncatedAdress: string;
let connectBtnLabel: string;

async function onConnect() {
  const account = await connectWallet();
  if (account) {
    connect(account);
  }
}

function connect(account: adress): void {
  status = ConnectionStatus.CONNECTED;
  connectedAdress = account;
}

$: if (connectedAdress) {
  truncatedAdress = `${connectedAdress.substring(0, 4)}...${connectedAdress.substring(connectedAdress.length-4)}`;
}
$: connectBtnLabel = connectedAdress ? truncatedAdress : 'Connect';
</script>
