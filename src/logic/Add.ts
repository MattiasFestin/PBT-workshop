export const add = (a: number, b: number) => a + b;

export const badAdd1 = (a: number, b: number) => Math.round(a) + Math.round(b);
export const badAdd2= (a: number, b: number) => Math.abs(a) + Math.abs(b);
export const badAdd3= (a: number, b: number) => a + b + Math.random() / 1e9;