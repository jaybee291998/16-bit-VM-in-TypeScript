export default class Memory {
    private sizeInBytes: number;
    private arrayBuffer: ArrayBuffer;
    private dataView: DataView;
    constructor(sizeInBytes: number){
        this.sizeInBytes = sizeInBytes;
        this.arrayBuffer = new ArrayBuffer(sizeInBytes);
        this.dataView = new DataView(this.arrayBuffer);
    }

    getUint8(addr: number): number {
        if(addr >= this.sizeInBytes) {
            throw new Error(`Address out of bounds: ${addr}`);
        }

        return this.dataView.getUint8(addr);
    }

    getUint16(addr: number): number {
        if(addr >= this.sizeInBytes - 1) {
            throw new Error(`Address out of bounds: ${addr}`);
        }

        return this.dataView.getUint16(addr);
    }

    setUint8(addr: number, value: number): void {
        if(addr >= this.sizeInBytes) {
            throw new Error(`Address out of bounds: ${addr}`);
        }

        this.dataView.setUint8(addr, value);
    }

    setUint16(addr: number, value: number): void {
        if(addr >= this.sizeInBytes - 1) {
            throw new Error(`Address out of bounds: ${addr}`);
        }

        this.dataView.setUint16(addr, value);
    }

    viewMemoryAt(address: number, width: number): string {
        if(address >= this.sizeInBytes) {
            throw new Error(`viewMemoryAt: address out of bounds ${address}`);
        }

        let lastAddress = address + width;
        if(lastAddress >= this.sizeInBytes) {
            lastAddress = this.sizeInBytes - 1;
        }
        let result = `0x${address.toString(16).padStart(4, '0')}: `;
        for(let i = address; i <= lastAddress; i++) {
            result += `0x${this.dataView.getUint8(i).toString(16).padStart(2, '0')} `;
        }
        return result;
    }

    clear(): void {
        for(let i = 0; i < this.sizeInBytes; i++) {
            this.dataView.setUint8(i, 0);
        }
    }
}