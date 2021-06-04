<dialog bind:this={modal} class="text-center px-10 text-lg h-48">
  <div class="loader__wrapper">
    <div class="loader"></div>
  </div>
  <p>Confirm the transaction in your wallet.</p>
</dialog>

<script lang="ts">
export let show: boolean = false;
let modal: HTMLDialogElement;

$: if (show) {
  modal.showModal();
} else if (modal) {
  modal.close();
}
</script>

<style>
.loader__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  opacity: 0.6;
}
.loader {
  position: absolute;
  border: 8px solid #cacaca;
  border-top: 8px solid rgba(96, 165, 250);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.2s linear infinite;
  top: 45%;
  left: 45%;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
