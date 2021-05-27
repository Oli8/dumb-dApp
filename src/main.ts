import App from './App.svelte';

declare global {
  interface Window {
    ethereum: any;
    Web3: any;
  }
}

const app = new App({
	target: document.body,
});

export default app;