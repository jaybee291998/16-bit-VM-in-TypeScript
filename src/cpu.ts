import Memory from "./memory.js";
import RegisterBank16 from "./registerbank.js";
import instructions from "./instructions.js";

export default class CPU {
    private ram: Memory;
    private registers: RegisterBank16;
    private registerNames: string[] = ['ip', 'acc', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8'];
    constructor(ram: Memory) {
        this.ram = ram;
        this.registers = new RegisterBank16(this.registerNames);
    }

    fetch8():number {
        const nextIntructionAddress = this.registers.getRegister('ip');
        const nextInstruction = this.ram.getUint8(nextIntructionAddress);
        this.registers.setRegister('ip', nextIntructionAddress + 1);
        return nextInstruction;
    }

    fetch16():number {
        const nextIntructionAddress = this.registers.getRegister('ip');
        const nextInstruction = this.ram.getUint16(nextIntructionAddress);
        this.registers.setRegister('ip', nextIntructionAddress + 2);
        return nextInstruction;
    }

    execute(instruction: number): void {
        switch(instruction) {
            // move literal into r1
            case instructions.MOV_LIT_R1: {
                const literal = this.fetch16();
                this.registers.setRegister('r1', literal);
                return;
            }
            case instructions.MOV_LIT_R2: {
                const literal = this.fetch16();
                this.registers.setRegister('r2', literal);
                return;
            }
            case instructions.ADD_REG_REG: {
                const r1 = this.fetch8();
                const r2 = this.fetch8();
                const registerValue1 = this.registers.getRegisterByIndex(r1);
                const registerValue2 = this.registers.getRegisterByIndex(r2);
                this.registers.setRegister('acc', registerValue1 + registerValue2);
                return;
            }
            default:
                return;
        }
    }

    step(): void {
        const instruction = this.fetch8();
        this.execute(instruction);
    }

    dumpRegisters(): string {
        return this.registers.dump();
    }
}