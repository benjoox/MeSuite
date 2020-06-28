const webpack = require("webpack");
const withCSS = require('@zeit/next-css')
const GenerateAwsLambda = require('next-aws-lambda-webpack-plugin');

module.exports = () => withCSS({
      webpack(config, nextConfig){
          config.module.rules.push({
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              use: {
                  loader: 'url-loader',
              }
          })
          config.plugins.push(new GenerateAwsLambda(nextConfig))
        
        return config
      },
      target: 'serverless'
  })

