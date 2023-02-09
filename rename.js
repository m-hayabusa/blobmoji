const fs = require('fs');

const lines = fs.readFileSync("./emoji-test.txt").toString().split("\n").filter(e => { return !e.startsWith("#") }).filter(e => e != "")

for (const line of lines) {
    const row = line.split(/[#;]/).map(e => e.trim().toLowerCase().replace(/.*e\d+\.\d+/, "").trim())
    const original = row[2].replaceAll(":", " ").replaceAll(",", " ").replaceAll("  ", " ") + ".svg";
    const result = row[0].replaceAll(" ", "-") + ".svg";
    if (fs.existsSync("svg/" + original)) {
        fs.renameSync("svg/" + original, "svg/" + result);
        console.log(original, result);
    }
}

const files = fs.readdirSync("./svg").filter(file => file.startsWith("emoji_u"));

for (const original of files) {
    const result = original.slice("emoji_u".length).replaceAll("_", "-");

    if (fs.existsSync("svg/" + original)) {
        fs.renameSync("svg/" + original, "svg/" + result);
        console.log(original, result);
    }
}
