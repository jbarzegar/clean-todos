let package = require("./package.json");
let tsConfig = require("./tsconfig.json");

module.exports = {
  webpack: (config) => {
    config.entry.main = package.main;

    config.resolve = {
      extensions: [".ts", ".js", ".json"],
    };
    config.resolve.modules = ["node_modules", tsConfig.compilerOptions.baseUrl];

    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
    });

    return config;
  },
};
