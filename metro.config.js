const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@': './src',
  '@/components': './src/components',
  '@/constants': './src/constants',
  '@/assets': './assets',
};

module.exports = config;
