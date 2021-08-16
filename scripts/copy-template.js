const fs = require("fs");
const path = require("path");

const CWD = process.cwd();
const templatePath = path.resolve(CWD, "src/template.html");
const indexPath = path.resolve(CWD, "index.html");

const template = fs.readFileSync(templatePath, "utf8");

fs.writeFileSync(indexPath, template);
