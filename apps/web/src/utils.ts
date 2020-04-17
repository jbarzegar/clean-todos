export let sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), timeout));
