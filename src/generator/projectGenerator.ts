import { Generator } from "./generator";
import * as uuid from "uuid";
export class ProjectGenerator extends Generator {
    constructor(input: Input) {
        super(input);
        this.url = input.url;
        this.path = input.folder + '/' + input.projectName!;
        this.renderView = { appName: input.projectName!, projectId: uuid.v4() };
    }
}