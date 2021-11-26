#!/usr/bin/env node
import { exec, spawnSync } from 'child_process';
import { existsSync } from 'fs';

const esbuildOptions = process.env.ESBUILD_OPTIONS || '--bundle --platform=node'
const maxBuffer = process.env.JS_MAX_BUFFER || 1024^2 * 20; // 20 MB
const args = process.argv.slice(2);
let filename;

const nodeArgs = args.filter(arg => {
  if (arg[0] !== '-') {
    if (filename) {
      throw Error(`Invalid options, only one option can not start with a '-', options: ${args.join(', ')}`)
    } else {
      filename = arg;
      return false;
    }
  }
  return true;
});

if (!filename) {
  throw Error('Please specify a filename to run');
}

if (!existsSync(filename)) {
  throw Error(`Cannot find the file to run: ${filename}`);
}

exec(`esbuild ${esbuildOptions} ${filename}`, { maxBuffer: Number(maxBuffer) }, (error, builtCode) => {
  if (error) {
    console.error('Cannot run esbuild,', error);
    if (error.code === 127) {
      console.error('Please make sure esbuild is installed: npm install --save-dev esbuild')
    }
    return;
  }
  const { stdout, stderr } = spawnSync('node', nodeArgs, { input: builtCode });
  process.stdout.write(stdout.toString());
  process.stderr.write(stderr.toString());
});
