import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import fs from "fs";
import path from "path";

const pkg = JSON.parse(
  require("fs").readFileSync(require("path").resolve("./package.json"), "utf-8")
);

const configPath = path.resolve("./etendo.config.json");

// Check if the external configuration file exists
if (!fs.existsSync(configPath)) {
  throw new Error(
    `The configuration file ${configPath} does not exist. Please create the file and define the output path.`
  );
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const external = Object.keys(pkg.dependencies || {});

export default {
  input: "./App.tsx",
  output: [
    {
      file: config.outputPath + "/" + config.bundleFileName,
      format: "cjs",
      exports: "auto",
      strict: false,
      sourcemap: "inline",
    },
  ],
  plugins: [peerDepsExternal(), json({ compact: true }), typescript()],
  external,
};
