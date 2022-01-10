import 'reflect-metadata'

export function Disabled (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let disabled : string[] = Reflect.getMetadata("state:disabled", target) || [];
    if (!disabled.includes(propertyKey)) {
        disabled.push(propertyKey);
        Reflect.defineMetadata("state:disabled", disabled, target);
    }
}