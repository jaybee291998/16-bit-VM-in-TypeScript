import Memory from './memory.js'
import RegisterBank16 from './registerbank.js';
import CPU from './cpu.js';
import instructions from './instructions.js';

const ram = new Memory(256*256);
const cpu = new CPU(ram);
let acc = 1;
let r1 = 2;
let r2 = 3;
let r3 = 4;
// loadLoop(ram);
loadMultiplyProgram(ram);
let btn = document.getElementById('step') as HTMLButtonElement;
let runBtn = document.getElementById('run') as HTMLButtonElement;
console.log(cpu.dumpRegisters());
console.log(cpu.peek());
console.log(cpu.viewMemoryAt(0x4545));

function step():void {
    if(!cpu.isCPUHalted()) {
        cpu.step();
        console.log(cpu.dumpRegisters());
        console.log(cpu.peek());
        console.log(cpu.viewMemoryAt(0x4545));
    }
}

function run(): void {
    console.time('looper')
    console.log(cpu.dumpRegisters());
    console.log(cpu.peek());
    while(!cpu.isCPUHalted()) {
        cpu.step();
    }
    console.log(cpu.dumpRegisters());
    console.log(cpu.peek());
    console.timeEnd('looper')

}

btn.addEventListener('click', step);
runBtn.addEventListener('click', run);

function loadLoop(memory: Memory): void {
    let i = 0;
    ram.setUint8(i++, instructions.MOV_LIT_REG);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x01);
    ram.setUint8(i++, r1);
    
    ram.setUint8(i++, instructions.MOV_MEM_REG);
    ram.setUint8(i++, 0x01);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, r2);
    
    ram.setUint8(i++, instructions.ADD_REG_REG);
    ram.setUint8(i++, r1);
    ram.setUint8(i++, r2);
    
    ram.setUint8(i++, instructions.MOV_REG_MEM);
    ram.setUint8(i++, acc);
    ram.setUint8(i++, 0x01);
    ram.setUint8(i++, 0x00);
    
    ram.setUint8(i++, instructions.JMP_NOT_EQ);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x04);
    ram.setUint8(i++, instructions.HALT);
}

function loadMultiplyProgram(ram: Memory): void {
    let i = 0;
    cpu.reset();
    ram.clear();

    // load 1 to r1
    ram.setUint8(i++, instructions.MOV_LIT_REG);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x01);
    ram.setUint8(i++, r1);

    // load r1 to 0x4545
    ram.setUint8(i++, instructions.MOV_REG_MEM);
    ram.setUint8(i++, r1);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x45);

    // loaded value to be added to itself
    ram.setUint8(i++, instructions.MOV_LIT_REG);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, r1);

    ram.setUint8(i++, instructions.MOV_REG_MEM);
    ram.setUint8(i++, r1);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x49);

    ram.setUint8(i++, instructions.MOV_LIT_REG);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, r1);

    ram.setUint8(i++, instructions.MOV_REG_MEM);
    ram.setUint8(i++, r1);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x4b);

    ram.setUint8(i++, instructions.MOV_MEM_REG);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x47);
    ram.setUint8(i++, r2);

    ram.setUint8(i++, instructions.MOV_MEM_REG);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x49);
    ram.setUint8(i++, r1);

    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x47);
    ram.setUint8(i++, r2);

    ram.setUint8(i++, instructions.ADD_REG_REG);
    ram.setUint8(i++, r1);
    ram.setUint8(i++, r2);

    ram.setUint8(i++, instructions.MOV_REG_MEM);
    ram.setUint8(i++, acc);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x46);

    ram.setUint8(i++, instructions.MOV_MEM_REG);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, r1);

    ram.setUint8(i++, instructions.MOV_MEM_REG);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x4b);
    ram.setUint8(i++, r2);

    ram.setUint8(i++, instructions.ADD_REG_REG);
    ram.setUint8(i++, r1);
    ram.setUint8(i++, r2);

    ram.setUint8(i++, instructions.MOV_REG_MEM);
    ram.setUint8(i++, acc);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x4b);

    ram.setUint8(i++, instructions.JMP_NOT_EQ);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x45);
    ram.setUint8(i++, 0x00);
    ram.setUint8(i++, 0x16);

    ram.setUint8(i++, instructions.HALT);
}
