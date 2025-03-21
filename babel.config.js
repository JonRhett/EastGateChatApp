module.exports = function (api) { 
  api.cache(true); 
  return { 
    presets: ["babel-preset-expo"], 
    plugins: [
      "react-native-reanimated/plugin",
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }],
      // 'expo-router/babel' removed as it's deprecated in SDK 50+
      // Support for alias imports
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
    ] 
  }; 
};
