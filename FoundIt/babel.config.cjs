module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}],["@babel/preset-react", {"runtime": "automatic"}],'@babel/preset-typescript',"module:metro-react-native-babel-preset"],
	plugins: [["@babel/plugin-transform-react-jsx", {"runtime": "automatic"}]]
  };
};
