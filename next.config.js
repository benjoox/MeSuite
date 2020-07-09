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
        })(),
        AUTH_PUBLIC_KEY: (() => {
            if (isDev) return DEV_AUTH_PUBLIC_KEY
            if (isProd) return PRD_AUTH_PUBLIC_KEY
            if (isStaging) return 'TO DO'
            return 'AUTH_CLIENT_ID: not (isDev,isProd && !isStaging,isProd && isStaging)'
        })()
    }
  return env
}


const DEV_AUTH_PUBLIC_KEY = `-----BEGIN CERTIFICATE-----
MIIDFzCCAf+gAwIBAgIJHKa+FikctJSXMA0GCSqGSIb3DQEBCwUAMCkxJzAlBgNV
BAMTHm1lcG9ydGZvbGlvLWxvY2FsLmV1LmF1dGgwLmNvbTAeFw0yMDA3MDcwNzQ1
MDdaFw0zNDAzMTYwNzQ1MDdaMCkxJzAlBgNVBAMTHm1lcG9ydGZvbGlvLWxvY2Fs
LmV1LmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOOC
FRh4nbR05Q9TDsk7/17WYP2Y5sL/J2PzX/dhZK2sq9PykwNGzdOdLVqCCsZ2gXf3
cji32V7kgSk2zMeDQxobdYL+hBTsVSNJL1jCazBI6EYouBl/2FtsOWzFIVCnyGfA
bNKs4hCT41TOT9XdsvpNrcsulipLFX1T/Z27e8Ql5hT1BOnalSiMvp7fRl8XFgu0
F6Qh684X38aHhxjM6+evohNhMDy4yW43uGq7HYkOiNAfyR3494hgdV+VVXMQ44Xo
tZz2UxROreIUxUoX0U+Nl8Vm/Jc/XKfXpkXIaBBkCpeKEG3ZMoexEt/8JckUel6K
Qx2pio5r+ajIgBp7cZsCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4E
FgQUR1rRkvKzpLQeb2K5y6RSh9/lZuIwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3
DQEBCwUAA4IBAQCFSHlynIp1NMWxCUGa3ZbtaafVeVelqp710aubKXcrzN10c9W+
PXrSyIlSnIsw+P/74csxBI18J3rQGZg8mYTQPvzFytlGd86M9lqt5EsFGX4FxZid
9jQs2HVR3UIx0h9PWKRp7w32/ZT0Axh7+hantPV4a6GKS8ZH7BH+YDEUuVPedrBQ
5u/aYlToRpYfiqlVR1Ta4/xc0JY7D7V7HR7cbf87l1NDM2+ZO1v/wnw7aq+v0tYu
xx2O1x7LAJT+R8uapWqnGV94vFKA9DW0A0/aduyYsvYScCE6QYgFMqwDiamZD0dP
qo5c2u0l2KDSCiGo88+jGikY99wPaBpWhnVF
-----END CERTIFICATE-----`

const PRD_AUTH_PUBLIC_KEY = `-----BEGIN CERTIFICATE-----
MIIDEzCCAfugAwIBAgIJGFQbkfobj1HUMA0GCSqGSIb3DQEBCwUAMCcxJTAjBgNV
BAMTHG1lcG9ydGZvbGlvLXByZC5ldS5hdXRoMC5jb20wHhcNMjAwNzA3MDczNDE3
WhcNMzQwMzE2MDczNDE3WjAnMSUwIwYDVQQDExxtZXBvcnRmb2xpby1wcmQuZXUu
YXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5Urxvgeq
KtvNgv2KXlqG1tn1cgIb4hy3jrcLLmH5gdcll5iobMPBigFW58F+Pi1x9y2Lxpyg
G2dALBXUU9XapOl/4HvXKTRNVpiNVJhVpp+Ro9+cvbF7yCqi2fiibM/txAwumlcr
os+sASzmSRW2b9+CA95RJl38DZ9PLk3fZRkYMsNq+6h9MEKBH22KLYzBjfdrjDlO
iHjbCC2U8hY4ftD2IfGHWo/GTkULx9BgdnKaxDqGpR/cyzYf6u6Bi+nMhCQ00kOP
upZyBz9Wv2RKyXgBXxEFWPZxXAwxdQFkhtA5UAJXU71ND8LmgLA6UwrNEH2cTCbQ
86kmvvYo/GibswIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBSg
ewx1DffyeVh5ywGOlwNHad+wijAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQEL
BQADggEBANiypHk5Nm+Rlzxz9cbLDCMRyIl9AKJM/oa+RRqUobhO5rrNH5n2Ak6E
OafVOQyctgyS/mCErFv0RdXd4X4K4xLKEPrAkTdnc3V3eTlFpMsO3K46nCzfR+a9
5TBwHRoY1lGaCJq188Ncucwdj90WSQYbXQvQT7Cx5w5rZt9UQWgVaLTabU0TVYvF
mhoSaDv5E4SnKdtebkWmM4GSD+/7rlKMUJbZJgSeqripZvx9WuoSWH8a4GJtN8b2
SpTGOQwjN1f3BmltIZgzPxoPXFANi8jhiXZswYynVlpAI4Sj2BZVpDfvqACGiPPo
Oa60D6ic2Vji6P3py4G1PFqNyIp3UD4=
-----END CERTIFICATE-----`