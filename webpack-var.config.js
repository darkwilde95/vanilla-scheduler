module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    library: {
      name: "Scheduler",
      type: "var",
      export: "default",
    },
    filename: 'scheduler.var.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.d.ts$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader", options: { injectType: "styleTag" } },
          "css-loader"
        ],
      },
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".js", ".d.ts"]
  },
}