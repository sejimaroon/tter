const path = require('path');
const clientConfig = {
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
            }
          }
        },

        {
          test: /\.(js|jsx)$/, 
          exclude: /node_modules/, 
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images", // Specify the output directory for images
              },
            },
          ],
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          }
      ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx', '.jsx', '.json' ],
    alias: {
      react: require.resolve('react'),
    },
  },
  devServer: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
};
const serverConfig = {
  target: 'node',
  entry: "./server/server.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
            }
          }
        },
        {
          test: /\.(js|jsx)$/, 
          exclude: /node_modules/, 
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"],
            },
          },
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  outputPath: "images", // Specify the output directory for images
                },
              },
            ],
          },
      ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx', '.jsx', '.json' ],
    alias: {
      react: require.resolve('react'),
    },
  },
  devServer: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
};

module.exports =[clientConfig, serverConfig];