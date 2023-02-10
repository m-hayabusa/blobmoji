const fs = require('fs');

const lines = fs.readFileSync("emoji-test.txt").toString().split("\n").filter(e => { return !e.startsWith("#") }).filter(e => e != "")

for (const line of lines) {
    const row = line.split(/[#;]/).map(e => e.trim().toLowerCase().replace(/.*e\d+\.\d+/, "").trim())
    const original = row[2].replaceAll(":", " ").replaceAll(",", " ").replaceAll("  ", " ") + ".svg";
    const result = "emoji_u" + row[0].replaceAll(" ", "_") + ".svg";
    if (fs.existsSync("svg/" + original)) {
        fs.renameSync("svg/" + original, "svg/" + result);
        console.log(original, result);
    }
}
