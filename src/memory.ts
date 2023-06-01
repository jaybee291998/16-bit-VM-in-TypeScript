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
}