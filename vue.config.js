const path = require("path");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = {
  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.exclude.add(path.join(__dirname, "node_modules", "@ckeditor"));
    config.module
      .rule("cke-svg")
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use("raw-loader")
      .loader("raw-loader");
    config.module
      .rule("cke-css")
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use("postcss-loader")
      .loader("postcss-loader")
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
          },
          minify: true,
        });
      });
    config.plugins.delete("prefetch");
  },
  pluginOptions: {
    compression: {
      brotli: {
        filename: "[path].br[query]",
        algorithm: "brotliCompress",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          level: 11,
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: "[path].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      },
    },
  },
  devServer: {
    proxy: process.env.API_URL,
  },
  outputDir: "../../public_html/admin",
  indexPath:
    process.env.NODE_ENV === "production"
      ? "../../backend/resources/views/admin.blade.php"
      : "index.html",
};
