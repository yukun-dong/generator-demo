interface Input{
    type: 'project'| 'sample'| 'block';
    url: string;
    appScenario: string;
    language: string;
    projectName?: string;
    sampleName?: string;
    folder: string;
}