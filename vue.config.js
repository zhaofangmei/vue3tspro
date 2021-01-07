// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/styles/variables.less")],
    });
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  chainWebpack: () => {
    config => {
      // 移除 prefetch 插件
      config.plugins.delete("prefetch");
      // 或者
      // 修改它的选项：
      config.plugin("prefetch").tap(options => {
        options[0].fileBlacklist = options[0].fileBlacklist || [];
        options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/);
        return options;
      });
      const types = ["vue-modules", "vue", "normal-modules", "normal"];
      types.forEach((type) =>
        addStyleResource(config.module.rule("less").oneOf(type))
      );
    };
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".ts", ".vue", ".json"], //请求本地json
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views"),
          "@p": path.resolve(__dirname, "./src/pages")
        } // 别名配置
      }
    });
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/styles/variables.less') // 变量文件位置
      ],
    }
  },
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?是否在构建样式地图，false将提高构建速度
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true, //less 配置
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 80,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://47.100.47.3/',
        /* 允许跨域 */
        changeOrigin: true,
      },
    },
  }
};