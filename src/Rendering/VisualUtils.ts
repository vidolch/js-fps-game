export class VisualUtils {
    static shadeBlendConvert(p: number, from: string, to?: string): string {
        let i: Function = parseInt;
        let r: Function = Math.round;
        let h: boolean = from.length > 9;
        h = typeof to === "string" ? to.length > 9 ? true : to === "c" ? !h : false : h;
        let b: boolean = p < 0;
        p = b ? p * -1 : p;
        to = to && to !== "c" ? to : b ? "#000000" : "#FFFFFF";
        let f: number[] = VisualUtils.sbcRip(from, i, r);
        let t: number[] = VisualUtils.sbcRip(to, i, r);

        if (h) {
            return "rgb(" + r((t[0] - f[0]) * p + f[0]) +
                    "," + r((t[1] - f[1]) * p + f[1]) +
                    "," + r((t[2] - f[2]) * p + f[2]) +
                        (f[3] < 0 && t[3] < 0 ? ")" :
                            "," + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000
                                : t[3] < 0 ? f[3] : t[3]) + ")");
        } else {
            // tslint:disable-next-line:max-line-length
            return "#" + (0x100000000 + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255) * 0x1000000 + r((t[0] - f[0]) * p + f[0]) * 0x10000 + r((t[1] - f[1]) * p + f[1]) * 0x100 + r((t[2] - f[2]) * p + f[2])).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
        }
    }

    static sbcRip(d: string, i: Function, r: Function): number[] {
        var l: number = d.length;
        var RGB: number[] = [];

        if (l > 9) {
            var ds: string[] = d.split(",");

            RGB[0] = i(ds[0].slice(4));
            RGB[1] = i(ds[1]), RGB[2] = i(ds[2]);
            RGB[3] = ds[3] ? parseFloat(ds[3]) : -1;
        } else {

            if (l < 6) {
                d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + "" + d[4] : "");
            }

            var dsi: number = i(d.slice(1), 16);
            // tslint:disable-next-line:no-bitwise
            RGB[0] = dsi >> 16 & 255;
            // tslint:disable-next-line:no-bitwise
            RGB[1] = dsi >> 8 & 255, RGB[2] = dsi & 255;
            // tslint:disable-next-line:no-bitwise
            RGB[3] = l === 9 || l === 5 ? r(((dsi >> 24 & 255) / 255) * 10000) / 10000 : -1;
        }

        return RGB;
    }
}