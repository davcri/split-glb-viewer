export function showError(msg: string) {
  alert(msg);
  throw new Error(msg);
}
