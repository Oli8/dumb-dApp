<style global lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.box {
  @apply float-right mr-4 border-dotted border-2 border-blue-400 rounded p-1 relative bottom-1;
}

.b-input {
  @apply border block w-full my-3 border block w-full my-3;
}

.b-button {
  @apply w-full my-3 block bg-blue-100 uppercase text-lg p-3 rounded;
}
</style>
