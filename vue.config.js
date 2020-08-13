module.exports = {
  configureWebpack: config => {
    Object.assign(config.resolve.alias, {
      "api": "@/network/api",
      "assets": "@/assets",
      "components": "@/components",
      "plugins": "@/plugins",
      "mixins": "@/mixins",
      "utils": "@/utils",
      "views": "@/views"
    });
    // 判断是否在打包  如果在打包 就去除掉console.log()
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
  chainWebpack: config => {
    config
      .plugin("html")
      .tap(args => {
        args[0].title = process.env.SITE_NAME;
        return args;
      });
  }
}
