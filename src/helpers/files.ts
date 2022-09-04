import fs   from 'fs';
import path from 'path';

export const getFiles = (dir: string, base = ''): string[] => {
  const files: string[] = [];

  const dirents = fs.readdirSync(dir, { withFileTypes: true, });
  for (const dirent of dirents) {
    const { name, } = dirent;
    if (dirent.isDirectory()) {
      const temp = getFiles(path.join(dir, name));
      if (temp.length > 0) {
        files.push(...temp.map(file => path.join(base, dirent.name, file)));
      }
    } else {
      files.push(path.join(base, name));
    }
  }

  return files;
};

