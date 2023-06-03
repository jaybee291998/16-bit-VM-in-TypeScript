import Memory from "./memory.js";
import instructions from "./instructions.js";

export default class InstructionLoader {
    private programAddr: number;
    private ram: Memory;
    constructor(ram: Memory, programAddr: number) {
        this.programAddr = programAddr;
        this.ram = ram;
    }
    
    get getProgramAddr(): number {
        return this.programAddr;
    }

    MOV_LIT_REG(litVal: number, regIndex: number): void {
        this.ram.setUint8(this.programAddr++, instructions.MOV_LIT_REG);
        this.ram.setUint16(this.programAddr++, litVal);
        this.programAddr++;
        this.ram.setUint8(this.programAddr++, regIndex);
    }
    
    MOV_REG_REG(reg1: number, reg2: number): void {
        this.ram.setUint8(this.programAddr++, instructions.MOV_REG_REG);
        this.ram.setUint8(this.programAddr++, reg1);
        this.ram.setUint8(this.programAddr++, reg2);
    }
    
    MOV_REG_MEM(regIndex: number, addr: number): void {
        this.ram.setUint8(this.programAddr++, instructions.MOV_REG_MEM);
        this.ram.setUint8(this.programAddr++, regIndex);
        this.ram.setUint16(this.programAddr++, addr);
        this.programAddr++;
    }
    
    MOV_MEM_REG(addr: number, regIndex: number): void {
        this.ram.setUint8(this.programAddr++, instructions.MOV_MEM_REG);
        this.ram.setUint16(this.programAddr++, addr);
        this.programAddr++;
        this.ram.setUint8(this.programAddr++, regIndex);
    }
    
    ADD_REG_REG(reg1: number, reg2: number): void {
        this.ram.setUint8(this.programAddr++, instructions.ADD_REG_REG);
        this.ram.setUint8(this.programAddr++, reg1);
        this.ram.setUint8(this.programAddr++, reg2);
    }
    
    JMP_NOT_EQ(litVal: number, addr: number): void {
        this.ram.setUint8(this.programAddr++, instructions.JMP_NOT_EQ);
        this.ram.setUint16(this.programAddr++, litVal);
        this.programAddr++;
        this.ram.setUint16(this.programAddr++, addr);
        this.programAddr++;
    }
    
    HALT():void {
        this.ram.setUint8(this.programAddr++, instructions.HALT);
    }
    
    MOV_LIT_MEM(litVal: number, addr: number): void {
        this.ram.setUint8(this.programAddr++, instructions.MOV_LIT_MEM);
        this.ram.setUint16(this.programAddr++, litVal);
        this.programAddr++;
        this.ram.setUint16(this.programAddr++, addr);
        this.programAddr++;
    }
}