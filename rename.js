const fs = require('fs');

(async () => {
    const emojilist = await fetch("https://raw.githubusercontent.com/misskey-dev/misskey/ad6844ac4a5c0b84917c171f401178941e0af552/packages/frontend/src/emojilist.json").then(r => r.json());

    emojilist.forEach(e => {
        let res = "";
        for (const c of e.char) {
            const code = c.codePointAt(0);
            if (code < 0xD800 || code > 0xDFFF) {
                if (res != "") res += "-"
                res += code.toString(16)
            }
        }
        console.log(res);

        var src = 'svg/emoji_u' + res.replaceAll("-", "_") + '.svg';
        if (!fs.existsSync(src))
            src = 'svg/' + e.name.replaceAll("_", " ") + '.svg';

        if (fs.existsSync(src)) {
            try {
                fs.rename(src, "svg/" + res + ".svg", () => { })
                console.log(e.char, res + ".svg", src);
            }
            catch (e) {
                console.error(e);
            }
        }
    })
})();