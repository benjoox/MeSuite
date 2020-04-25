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

        const env = Object.keys(process.env).reduce((acc, current) => {
          acc[`process.env.${current}`] = JSON.stringify(process.env[current]);
          return acc;
        }, {});

        config.plugins.push(new webpack.DefinePlugin(env));
        return config
      },
      target: 'serverless'
  })

