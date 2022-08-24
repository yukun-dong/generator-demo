import { Generator } from "./generator";
export class SampleGenerator extends Generator{
    constructor(input: Input) {
        super(input);
        this.url=input.url;
        this.path=input.folder+input.sampleName!;
    }
}