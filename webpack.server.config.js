
// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
module.exports = {
  entry: {
    server: './server.ts',
  },
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  externals: [/(node_modules|main\..*\.js)/,],
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.(ts|js)$/,
        loader: 'regexp-replace-loader',
        options: {
          match: {
            pattern: '\\[(Mouse|Keyboard)Event\\]',
            flags: 'g'
          },
          replaceWith: '[]',

        }
      },
      // {
      //   test: /\.(ts|js)$/,
      //   loader: 'regexp-replace',
      //   query: {
      //     match:
      //     {
      //       pattern: '\\[(Mouse|Keyboard)Event\\]', flags: 'g'
      //     }, replaceWith: '[]',
      //   }
      // }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    ),
  ]

}

// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   entry: { server: './server.ts' },
//   resolve: { extensions: ['.js', '.ts'] },
//   target: 'node',
//   // this makes sure we include node_modules and other 3rd party libraries
//   externals: [/(node_modules|main\..*\.js)/],
//   mode: 'none',
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: '[name].js'
//   },
//   module: {
//     rules: [
//       { test: /\.ts$/, loader: 'ts-loader' },
//       {
//         test: /\.(ts|js)$/,
//         loader: 'regexp-replace-loader',
//         options: {
//           match: {
//             pattern: '\\[(Mouse|Keyboard)Event\\]',
//             flags: 'g'
//           },
//           replaceWith: '[]',

//         }
//       }

//     ]
//   },
//   plugins: [
//     // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
//     // for "WARNING Critical dependency: the request of a dependency is an expression"
//     new webpack.ContextReplacementPlugin(
//       /(.+)?angular(\\|\/)core(.+)?/,
//       path.join(__dirname, 'src'), // location of your src
//       {} // a map of your routes
//     ),
//     new webpack.ContextReplacementPlugin(
//       /(.+)?express(\\|\/)(.+)?/,
//       path.join(__dirname, 'src'),
//       {}
//     )
//   ]
// }
