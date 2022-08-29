import AdmZip from "adm-zip";
import { defaultTimeoutInMs, defaultTryLimits } from "../constant";
import { fetchZipFromUrl, renderTemplateFileName, unzip } from "../util";
import fs from "fs-extra";
import path from "path";
import { renderTemplateContent } from "../util";

export class Generator {
    url!: string;
    path!: string;
    renderView?: { [key: string]: string };
    constructor(input: Input) {
    }
    async generate() {
        const zip = await this.download(this.url);
        await this.unzip(zip);
    }
    async download(url: string): Promise<AdmZip> {
        console.log("downloading...");
        return await fetchZipFromUrl(url, defaultTryLimits, defaultTimeoutInMs);
    }
    async unzip(zip: AdmZip) {
        console.log("unzipping and rendering...");
        await unzip(zip, this.path, this.renderView);
    }
}