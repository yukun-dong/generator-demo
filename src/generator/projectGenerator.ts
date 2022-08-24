import { Generator } from "./generator";
export class ProjectGenerator extends Generator{
    constructor(input: Input) {
        super(input);
        this.url=input.url;
        this.path=input.folder+'/'+input.projectName!;
    }
}