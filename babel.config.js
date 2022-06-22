module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          src: './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigator': './src/navigator',
          '@routes': './src/routes',
          '@services': './src/services',
        },
      },
    ],
  ],
};
