import Memory from "./memory.js";

export default class RegisterBank16 {
    private registerMap: RegisterMap;
    private memory: Memory;
    private registerNames: string[];
    constructor(registerNames: string[]) {
        this.registerNames = registerNames;
        const totalMemoryToAllocateInBytes = this.registerNames.length * 2;
        this.memory = new Memory(totalMemoryToAllocateInBytes);
        this.registerMap = registerNames.reduce<RegisterMap>((map, name, i) => {
            map[name] = i * 2;
            return map;
        }, {});
    }

    getRegister(name: string): number {
        if(!(name in this.registerMap)) {
            throw new Error(`getRegister: No such register '${name}'`);
        }
        const registerAddr = this.registerMap[name];
        return this.memory.getUint16(registerAddr);
    }

    getRegisterByIndex(index: number): number {
        if(index >= this.registerNames.length) {
            throw new Error(`getRegister: No such register with index of '${index}'`);
        }
        const registerName = this.registerNames[index];
        return this.getRegister(registerName);
    }

    setRegister(name: string, value: number): void {
        if(!(name in this.registerMap)) {
            throw new Error(`getRegister: No such register '${name}'`);
        }
        const registerAddr = this.registerMap[name];
        this.memory.setUint16(registerAddr, value);
    }

    setRegisterByIndex(index: number, value: number): void {
        if(index >= this.registerNames.length) {
            throw new Error(`getRegister: No such register with index of '${index}'`);
        }
        const registerName = this.registerNames[index];
        this.setRegister(registerName, value);
    }

    dump(): string {
        return this.registerNames.reduce((strRes, name) => {
            strRes += `${name}: 0x${this.getRegister(name).toString(16).padStart(4, '0')}\n`
            return strRes;
        }, '');    
    }
}

interface RegisterMap {
    [key: string] : number
}