module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/userApi": {
        target: "http://10.6.71.44:10017",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import \"@/styles/common.scss\";",
      },
    },
  },
  // chainWebpack: (config) => {},
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === "production") {
  //   } else {
  //   }
  // },
};
