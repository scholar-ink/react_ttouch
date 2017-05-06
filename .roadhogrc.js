/**
 * Created by zhouchao on 17/2/13.
 */
import pxtorem from 'postcss-pxtorem';
import React from 'react';

//配置svg-sprite-loader
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: "src/index.js",
  disableCSSModules: false,
  publicPath: "/",
  autoprefixer: {
    browsers: [
      "iOS >= 8",
      "Android >= 4"
    ]
  },
  extraBabelPlugins: [
    "transform-runtime",
    ["import", { "libraryName": "antd-mobile", "style": "css" }]
  ],
  svgSpriteLoaderDirs: svgSpriteDirs,
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
      ]
    }
  },
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),
  ],
};