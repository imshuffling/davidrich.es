const withPWA = require('next-pwa')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net']
  },
  pwa: {
    dest: 'public'
  }
})