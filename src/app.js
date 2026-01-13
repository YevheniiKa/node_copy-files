/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = process.argv[2];
const copyPath = process.argv[3];

if (!path || !copyPath) {
  console.error('Error: Please provide source and destination paths');
}

if (path === copyPath) {
  console.error('Error: Source and destination paths are the same');
}

try {
  const stats = fs.statSync(path);

  if (!stats.isFile()) {
    console.error('Error: Source path is not a file');
  }

  if (fs.existsSync(copyPath)) {
    const destStats = fs.statSync(copyPath);

    if (destStats.isDirectory()) {
      console.error('Error: Destination path is a directory');
    }
  }

  const data = fs.readFileSync(path);

  fs.writeFileSync(copyPath, data);

  console.log(`File copied from "${path}" to "${copyPath}" successfully`);
} catch (err) {
  console.error(`Error: ${err}`);
}
