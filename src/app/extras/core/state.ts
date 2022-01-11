export abstract class State {
    public abstract _stato: any; 

    enabled(comando: string): boolean {
        const disabled = Reflect.getMetadata("state:disabled", this._stato);
        return disabled ? !disabled.includes(comando) : true;
    }
}