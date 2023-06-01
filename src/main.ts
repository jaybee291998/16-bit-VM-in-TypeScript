import Memory from './memory.js'
import RegisterBank16 from './registerbank.js';
import CPU from './cpu.js';
import instructions from './instructions.js';

const ram = new Memory(256);
const cpu = new CPU(ram);

ram.setUint8(0, instructions.MOV_LIT_R1);
ram.setUint8(1, 0x12);
ram.setUint8(2, 0x34);

ram.setUint8(3, instructions.MOV_LIT_R2);
ram.setUint8(4, 0xAB);
ram.setUint8(5, 0xCD);

ram.setUint8(6, instructions.ADD_REG_REG);
ram.setUint8(7, 2);
ram.setUint8(8, 3);


console.log(cpu.dumpRegisters());
cpu.step();

console.log(cpu.dumpRegisters());
cpu.step();

console.log(cpu.dumpRegisters());
cpu.step();

console.log(cpu.dumpRegisters());

// ram.setUint8(0, )
// const ram: Memory = new Memory(8);
// ram.setUint8(0, 0x45);
// console.log(ram.getUint8(0))

// const registers = new RegisterBank16(['ip', 'acc', 'r1', 'r2']);

// registers.setRegister('r1', 0x45);
// const regVal = registers.getRegister('r1');
// console.log({regVal})