<main class="border-2 border-blue-400 mt-20 w-4/6 mx-auto p-5">
  › Send Ethers
  <form>
    <input class="b-input" class:border-red-600={recipient && !validRecipient}
          type="text" maxlength="42"
           bind:value={recipient} placeholder="Recipient adress"/>
    {#if recipient && !validRecipient}
      <span class="text-red-600">✗ Not a valid ethereum adress</span>
    {/if}
    <input class="b-input" class:border-red-600={amount && !isAmountAvailable}
           type="number" bind:value={amount} placeholder="Amount"/>
    {#if amount && !isAmountAvailable}
      <span class="text-red-600">✗ Unsufficient eth balance</span>
    {/if}
    <button class="b-button p-3 rounded"
            class:cursor-not-allowed={!canSend} disabled={!canSend}
            on:click|preventDefault={send}>
      Send
    </button>
  </form>
</main>

<script lang="ts">
import type adress from '../types/adress';
import { createEventDispatcher } from 'svelte';
import { notifier } from '@beyonk/svelte-notifications';
import { sendTransaction } from '../eth/index';
import { utils } from 'ethers';
import type { providers, Transaction } from 'ethers';
// TODO: through global state ?
export let connectedAdress: adress;
export let ethBalance: number = 0;
export let provider: providers.Web3Provider;

let recipient: adress;
let validRecipient: boolean = null;
let amount: number = null;
let isAmountAvailable: boolean;
let canSend: boolean;

const dispatch = createEventDispatcher();

async function send() {
  dispatch('txPending');
  const txHash = await sendTransaction({
    from: connectedAdress,
    to: recipient,
    amount,
  });
  dispatch('txWalletAction');

  if(txHash) {
    dispatch('txSubmit', { hash: txHash });
    recipient = null;
    amount = null;
    provider.once(txHash, (_t: Transaction) => {
      notifier.success('Transaction confirmed!');
    });
  }
}

$: validRecipient = utils.isAddress(recipient);
$: isAmountAvailable = amount !== null && amount < ethBalance;
$: canSend = validRecipient && isAmountAvailable;
</script>
