<div>
  <Tailwind />
  <nav class="border-b-2 border-blue-400 bg-blue p-5">
    <h1 class="inline">Dumb dApp</h1>
    <button on:click={onConnect}
            class="float-right mr-4 border-dotted border-2 border-blue-400 rounded p-1 relative bottom-1 cursor-pointer">
      {connectBtnLabel}
    </button>
  </nav>
</div>

<script lang="ts">
import Tailwind from './Tailwind.svelte';
import { onMount } from 'svelte';
import { connectWallet, getConnectedWallet } from './eth';

enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}

onMount(async () => {
  const accounts = await getConnectedWallet();
  if (accounts) {
    status = ConnectionStatus.CONNECTED;
    connectedAdress = accounts[0];
  }
});

// TODO: adress type ?
let connectedAdress: string = '';
let status: ConnectionStatus = ConnectionStatus.DISCONNECTED;
let truncatedAdress: string;
let connectBtnLabel: string;

async function onConnect() {
  const accounts = await connectWallet();
  console.log(accounts);
  if (accounts) {
    status = ConnectionStatus.CONNECTED;
    connectedAdress = accounts[0];
  }
}

$: { truncatedAdress =
  `${connectedAdress.substring(0, 4)}...${connectedAdress.substring(connectedAdress.length-4)}`;
}
$: connectBtnLabel = connectedAdress ? truncatedAdress : 'Connect';
</script>
