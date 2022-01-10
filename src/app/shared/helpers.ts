export function viewError(statement: Function) {
    try {
        statement();
      } catch(e) {
        window.alert(e);
      }
}

export function errorIf(expression: () => boolean, message: string) {
  if (expression()) {
    throw new Error(message);
  }
}

export function setModalShowEvent(modalId: string, event: any) {
  const modal = document.getElementById(modalId);
  if( modal ) {
    addEventListener("shown.bs.modal", event);
  }
}