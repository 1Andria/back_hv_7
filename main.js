const fs = require("fs/promises");
const path = require("path");
const { json } = require("stream/consumers");
// 1) File Organizer CLI:
// Goal: Create a script that organizes files in a specified directory into subfolders based on their file extension (e.g., .jpg, .png -> images/, .pdf -> documents/, .mp3 -> audio/).
// Usage: node organize.js <directory_path>
// Concepts: process.argv (get directory path), fs.readdir (list files), fs.stat (check if item is file/directory),check type, fs.mkdir (create subfolders), fs.rename (move files).

// const [, , filePath] = process.argv;

// const folders = {
//   document: ["pdf", "txt"],
//   audio: ["mp3"],
//   img: ["jpg", "png"],
// };

// let folderPath = filePath === "." || !filePath ? __dirname : filePath;

// async function main() {
//   const dirs = await fs.readdir(folderPath);
//   for (let dir of dirs) {
//     const ext = dir.split(".")[1];
//     if (folders.img.includes(ext)) {
//       if (dir !== "images") {
//         await fs.mkdir("images");
//       }
//       await fs.rename(`${folderPath}/${dir}`, `${folderPath}/images/${dir}`);
//     }
//     if (folders.audio.includes(ext)) {
//       if (dir !== "audio") {
//         await fs.mkdir("audio");
//       }
//       await fs.rename(`${folderPath}/${dir}`, `${folderPath}/audio/${dir}`);
//     }
//     if (folders.document.includes(ext)) {
//       if (dir !== "document") {
//         await fs.mkdir("document");
//       }
//       await fs.rename(`${folderPath}/${dir}`, `${folderPath}/document/${dir}`);
//     }
//   }
// }

// main();

// 2) Directory Content Search:
// Goal: Create a tool that searches for a specific text string within all files (e.g., .txt, .js) in a given directory.
// Usage: node search.js <directory_path> "search_term"
// Concepts: process.argv (get path and term), fs.readdir (list directory contents), fs.readFile (read file content), string.includes() (or regex for searching), potentially recursive function calls to search subdirectories.

// const [, , directory_path, search_term] = process.argv;

// async function main(fullPath) {
//   const dirs = await fs.readdir(fullPath);
//   for (let dir of dirs) {
//     const stat = await fs.stat(path.join(fullPath, dir));
//     if (stat.isDirectory()) {
//       const fullpathh = path.join(fullPath, dir);
//       await main(fullpathh);
//     } else if (stat.isFile()) {
//       const read = await fs.readFile(path.join(fullPath, dir), "utf-8");
//       if (read.includes(search_term)) {
//         console.log(`${search_term} in ${path.join(fullPath, dir)}`);
//       }
//     }
//   }
// }

// main(directory_path);

// 3) Code Line Counter:
// Goal: Count the total number of lines in all .js files within a specified directory (optionally excluding blank lines and comments).
// Usage: node linecount.js <directory_path>
// Concepts: process.argv (get path), fs.readdir, fs.readFile (read file contents), string splitting (.split('\n')) and filtering logic. Bonus: Make it recursive for subdirectories.

const [, , directory_path] = process.argv;
let counter = 0;
async function main(fullPath) {
  const dirs = await fs.readdir(fullPath);
  for (let dir of dirs) {
    const stat = await fs.stat(path.join(fullPath, dir));
    if (stat.isDirectory()) {
      const fullpathh = path.join(fullPath, dir);
      await main(fullpathh);
    } else if (stat.isFile() && dir.slice(-3) === ".js") {
      const read = await fs.readFile(path.join(fullPath, dir), "utf-8");
      for (let i = 0; i < read.split(`\n`).length; i++) {
        counter++;
      }
    }
  }
  console.log(counter);
}
main(directory_path);
