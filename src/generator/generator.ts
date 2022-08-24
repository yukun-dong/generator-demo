import AdmZip from "adm-zip";
import { defaultTimeoutInMs, defaultTryLimits } from "../constant";
import { fetchZipFromUrl } from "../util";

export class Generator {
    url!: string;
    path!: string;
    constructor(input: Input){
    }
    async generate() {
        const zip = await this.download(this.url);
        this.unzip(zip, this.path);
        this.render();
    }
    async download(url: string): Promise<AdmZip> {
        console.log("downloading...");
        return await fetchZipFromUrl(url, defaultTryLimits, defaultTimeoutInMs);
    }
    async unzip(zip: AdmZip, path: string) {
        console.log("unzipping...");
        zip.extractAllTo(path, true);
    }
    render() {
        console.log("rendering...");
    }
}