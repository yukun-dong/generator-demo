import { BlockGenerator } from "./blockGenerator";
import { ProjectGenerator } from "./projectGenerator";
import { SampleGenerator } from "./sampleGenerator";
import { Generator } from "./generator";

export class GeneratorFactory {
    static createGenerator(input: Input): Generator {
        switch (input.type) {
            case "project":
                return new ProjectGenerator(input);
            case "sample":
                return new SampleGenerator(input);
            case "block":
                return new BlockGenerator(input);
            default:
                throw new Error("Unknown generator type: " + input.type);
        }
    }
}