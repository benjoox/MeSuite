const webpack = require("webpack");
const withCSS = require('@zeit/next-css')

module.exports = () => withCSS({
      webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }){
          config.module.rules.push({
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              use: {
                  loader: 'url-loader',
              }
          });

        
        return config
      },
      target: 'serverless'
  })

