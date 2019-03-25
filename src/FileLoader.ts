export class FileLoader {
    static async loadJSON(fileName: string): Promise<string> {
        let res: Response = await fetch(fileName);
        return await res.text();
    }
}