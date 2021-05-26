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
import { connectWallet } from './eth';

enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}
// TODO: adress type ?
let connectedAdress: string = '';
let status: ConnectionStatus = ConnectionStatus.DISCONNECTED;
let truncatedAdress: string;
let connectBtnLabel: string;

async function onConnect() {
  console.log('on connect');
  const connection = await connectWallet();
  console.log(connection);
  if (connection) {
    status = ConnectionStatus.CONNECTED;
    connectedAdress = connection.result[0];
  }
}

$: { truncatedAdress =
  `${connectedAdress.substring(0, 4)}...${connectedAdress.substring(connectedAdress.length-4)}`;
}
$: connectBtnLabel = connectedAdress ? truncatedAdress : 'Connect';
</script>
