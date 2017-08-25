"use strict";
var path = require("path");
var webpack = require("webpack");

var PATH = {
    src: path.resolve(__dirname, "src"),
    dist: path.resolve(__dirname),
};

module.exports = {
    devtool: "source-map",
    context: PATH.src,
    entry: {bundle: "index.ts"},
    target: "web",
    output: {
        path: PATH.dist,
        filename: "bundle.js"
    },
    "module": {
        loaders: [
            {
                test:  /(\.ts|\.tsx)$/,
                loaders: ["ts-loader"]
            }
        ]
    },
    resolve: {
        modules: [PATH.src, "node_modules"],
        extensions: [".js", ".ts"]
    }
}
