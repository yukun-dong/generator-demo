import { Generator } from "./generator";
import * as uuid from "uuid";
export class SampleGenerator extends Generator {
    constructor(input: Input) {
        super(input);
        this.url = input.url;
        this.path = input.folder + input.sampleName!;
        this.renderView = { projectId: uuid.v4() };
    }
}