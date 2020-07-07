const webpack = require("webpack");
const withCSS = require('@zeit/next-css')
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')

module.exports = phase => withCSS({
      webpack(config){
            config.module.rules.push({
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                }
            })
            
        return config
      },
      env: env(phase),
      target: 'serverless'
  })

  const env = phase => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    // when `next build` or `npm run build` is used
    const isStaging =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

    const env = {
        AUTH_REDIRECT_URI: (() => {
            if (isDev) return 'http://localhost:3000'
            if (isProd) return 'https://alidadkashani.com'
            if (isStaging) return 'TO DO'
            return 'AUTH_REDIRECT_URI: not (isDev,isProd && !isStaging,isProd && isStaging)'
        })(),
        AUTH_DOMAIN: (() => {
            if (isDev) return 'meportfolio-local.eu.auth0.com'
            if (isProd) return 'meportfolio-prd.eu.auth0.com'
            if (isStaging) return 'TO DO'
            return 'AUTH_DOMAIN: not (isDev,isProd && !isStaging,isProd && isStaging)'
        })(),
        AUTH_CLIENT_ID: (() => {
            if (isDev) return 'ACyyo0ATAICYYOP1eBt8TwA5Jg2PmGJl'
            if (isProd) return 'OIzTEfR0L54OJuw6fhG0bZTxDXxaBVVF'
            if (isStaging) return 'TO DO'
            return 'AUTH_CLIENT_ID: not (isDev,isProd && !isStaging,isProd && isStaging)'
        })()
    }
  return env
}