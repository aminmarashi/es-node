# evanw

This is a helper command to run TypeScript applications easily using [esbuild](https://esbuild.github.io/).

`esbuild` is super fast and makes it possible to build and run TypeScript files on the fly. Even though I use this mainly for TypeScript, there are more languages supported by `esbuild`, you can find the list in their website (link above).

This is mostly useful for running one time scripts and testing things locally, and it is **not recommended** to use this module in production.

## Usage without installation

Using `npx` you don't need to install anything, run your application right away:

```bash
npx evanw /path/to/file.ts
```

If you don't want to use `npx` follow the global installation section.

## Usage inside npm scripts

You can install `evanw` as a development dependency and use it in your npm scripts.

```bash
npm install --save-dev evanw
```

```json
  "scripts": {
    "test": "evanw ./tests"
  },
```

## Global installation

`evanw` does not come with `esbuild` itself, so you would have to install that separately using your favorite package manager.

```bash
# you can do this with npm
npm install -g esbuild
```

Then you can go ahead and install `evanw`

```bash
npm install -g evanw
```

## Running

Now you can run TypeScript applications the same way you would run them with node, all the node options are also available.

```bash
evanw /path/to/file.ts
```

## Changing esbuild options

By default the options used for building the app are `--bundle` and `--platform=node`, you can replace those options by setting the `ESBUILD_OPTIONS` environment variable.

```bash
export ESBUILD_OPTIONS='--bundle --platform=node --outfile=x.js'
evanw /path/to/file.ts
```

## Reasoning

I created this script mostly because it's a common use-case for me to build and run TypeScript applications, there are other solutions that work perfectly fine (e.g. `ts-node`), however the performance gain by `esbuild` tempted me to have this command with `esbuild`.

## Name

Initially I called this script `es-node`, but because a package existed with a similar name, NPM didn't allow me to publish that, so I decided to name this after the creator of `esbuild`, [Evan W.](https://github.com/evanw), I hope he doesn't mind :)

## Contributions

If you faced any problem that you couldn't find a solution for, and/or you want to improve this script, feel free to create an issue on GitHub. Contributions are welcome :)