/**
 * Created by zhouchao on 17/2/13.
 */
import pxtorem from 'postcss-pxtorem';
import React from 'React';

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
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "lodash"
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