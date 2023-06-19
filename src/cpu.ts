import Memory from "./memory.js";
import RegisterBank16 from "./registerbank.js";
import instructions from "./instructions.js";

export default class CPU {
    private ram: Memory;
    private registers: RegisterBank16;
    private registerNames: string[] = ['ip', 'acc', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'sp', 'fp'];
    private isHalt: boolean = false;
    private stackFrameSize: number;
    constructor(ram: Memory) {
        this.ram = ram;
        this.registers = new RegisterBank16(this.registerNames);
        this.stackFrameSize = 0;
        this.registers.setRegister('sp', 0xfffd);
        this.registers.setRegister('fp', 0xfffd);
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

    push(value: number): void {
        // set the value of the memory where the stack pointer is pointing
        this.ram.setUint16(this.registers.getRegister('sp'), value);
        // decrement the sp
        this.registers.setRegister('sp', this.registers.getRegister('sp') - 2);
    }

    execute(instruction: number): void {
        switch(instruction) {
            // move literal into reg
            case instructions.MOV_LIT_REG: {
                const literal = this.fetch16();
                const registerIndex = this.fetch8();
                this.registers.setRegisterByIndex(registerIndex, literal);
                return;
            }
            // move reg to reg
            case instructions.MOV_REG_REG: {
                const fromRegIndex = this.fetch8();
                const toRegIndex = this.fetch8();
                const fromRegValue = this.registers.getRegisterByIndex(fromRegIndex);
                this.registers.setRegisterByIndex(toRegIndex, fromRegValue);
                return;
            }

            // move from reg to mem
            case instructions.MOV_REG_MEM: {
                const regIndex = this.fetch8();
                const address = this.fetch16();
                const regValue = this.registers.getRegisterByIndex(regIndex);
                this.ram.setUint16(address, regValue);
                return;
            }

            // move from mem to reg
            case instructions.MOV_MEM_REG: {
                const memAddress = this.fetch16();
                const memValue = this.ram.getUint16(memAddress);
                const regIndex = this.fetch8();
                this.registers.setRegisterByIndex(regIndex, memValue);
                return;
            }

            // move lit to mem
            case instructions.MOV_LIT_MEM: {
                const litValue = this.fetch16();
                const memAddr = this.fetch16();
                this.ram.setUint16(memAddr, litValue);
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

            // jump not equal
            case instructions.JMP_NOT_EQ: {
                const literal = this.fetch16();
                const address = this.fetch16();

                if(literal != this.registers.getRegister('acc')) {
                    this.registers.setRegister('ip', address);
                }
                return;
            }

            // push a literal to the stack
            case instructions.PUSH_LIT: {
                const literalValue = this.fetch16();
                this.push(literalValue);
                return;
            }

            // push a value from a specified register
            case instructions.PUSH_REG: {
                const registerIndex = this.fetch8();
                const registerValue = this.registers.getRegisterByIndex(registerIndex);
                this.push(registerValue);
                return;
            }

            // halt
            case instructions.HALT: {
                this.isHalt = true;
                return;
            }
            default:
                return;
        }
    }

    step(): void {
        if(this.isHalt){
            throw new Error(`the CPU is halted`)
        }
        const instruction = this.fetch8();
        this.execute(instruction);
    }

    isCPUHalted():boolean {
        return this.isHalt;
    }

    dumpRegisters(): string {
        return this.registers.dump();
    }

    peek(): string {
        return this.ram.viewMemoryAt(this.registers.getRegister('ip'), 8);
    }

    viewMemoryAt(address: number): string {
        return this.ram.viewMemoryAt(address, 8);
    }

    reset(): void {
        this.registers.clear();
    }
}