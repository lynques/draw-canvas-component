module.exports = {
  entry: './src/test',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader?configFileName=tsconfig.spec.json'
        ],
        exclude: /node_modules/
      }
    ]
  },

  devtool: 'inline-source-map'
};
