<dialog bind:this={modal} class="text-center px-10 text-lg">
  <p class="text-blue-300">✓ Transaction submitted!</p>
  <p>
    <a class="underline"
       href={`https://ropsten.etherscan.io/tx/${txHash}`}
       target="_blank"
       on:click={close}>Show in explorer ➚</a>
  </p>
  <button class="b-button p-3 rounded mt-5"
          on:click={close}>
    Close
  </button>
</dialog>

<script lang="ts">
export let show: boolean = false;
export let txHash: string;

let modal: HTMLDialogElement;

function close() {
  modal.close();
}

$: if (show) {
  modal.showModal();
  show = false;
}
</script>
