import { blockLink, templateLink } from "./constant";
import { GeneratorFactory } from "./generator/generatorFactory";

const input: Input = {
    type: "project",
    url: templateLink,
    folder: "./templates",
    projectName: "generate-test",
};
const generator = GeneratorFactory.createGenerator(input);
generator.generate().then (() => {});