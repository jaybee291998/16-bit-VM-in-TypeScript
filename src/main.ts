import Memory from './memory.js'
import RegisterBank16 from './registerbank.js';
import CPU from './cpu.js';
import instructions from './instructions.js';
import InstructionLoader from './instructionloader.js';
let acc = 1;
let r1 = 2;
let r2 = 3;
let r3 = 4;

const ram = new Memory(256*256);
const cpu = new CPU(ram);
const il = new InstructionLoader(ram, 0);
// variable addresses
// num1 * num2
const stepSize = 0x4545;
const num1 = stepSize + 2;
const num2 = num1 + 2;
const counter = num2 + 2;
const result = counter + 2;

il.MOV_LIT_MEM(0x0001, stepSize);
il.HALT();

function step():void {
    if(!cpu.isCPUHalted()) {
        cpu.step();
        console.log(cpu.dumpRegisters());
        // console.log(cpu.peek());
        // console.log(cpu.viewMemoryAt(stepSize));
        printVariable(num1, "num1");
        printVariable(num2, "num2");
        printVariable(result, "result");
    }
}

function printVariable(variable: number, name: string): void {
    console.log(`${name}: 0x${ram.getUint16(variable).toString(16).padStart(4, '0')}`);
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


let btn = document.getElementById('step') as HTMLButtonElement;
let runBtn = document.getElementById('run') as HTMLButtonElement;

btn.addEventListener('click', step);
runBtn.addEventListener('click', run);
