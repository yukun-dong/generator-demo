import { templateLink } from "./constant";
import { Generator } from "./generator/generator";
import { GeneratorFactory } from "./generator/generatorFactory";

const input: Input = {
    type: "project",
    url: templateLink,
    folder: "./templates",
    projectName: "test",
};
const generator = GeneratorFactory.createGenerator(input);
generator.generate().then (() => {});