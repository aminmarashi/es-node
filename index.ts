#!/usr/bin/env node
import { exec, spawn } from 'child_process';
import { existsSync } from 'fs';

const esbuildOptions = process.env.ESBUILD_OPTIONS || '--bundle --platform=node --sourcemap=inline'
const maxBuffer = process.env.JS_MAX_BUFFER || 1024^2 * 20; // 20 MB
const outfile = process.env.EVANW_OUTFILE || `/tmp/${Math.random().toString(26).split('.')[1]}.js`;
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
exec(`esbuild ${esbuildOptions} ${filename} --outfile=${outfile}`, { maxBuffer: Number(maxBuffer) }, (error, builtCode) => {
  if (error) {
    console.error('Cannot run esbuild,', error);
    if (error.code === 127) {
      console.error('Please make sure esbuild is installed: npm install --save-dev esbuild')
    }
    return;
  }
  spawn('node', [...nodeArgs, outfile], { stdio: [process.stdin, process.stdout, process.stderr]});
});
