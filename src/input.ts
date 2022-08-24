interface Input{
    type: 'project'| 'sample'| 'block';
    url: string;
    projectName?: string;
    sampleName?: string;
    programLanguage?: string;
    folder: string;
}