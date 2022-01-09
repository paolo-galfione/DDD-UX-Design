export function viewError(statement: Function) {
    try {
        statement();
      } catch(e) {
        window.alert(e);
      }
}