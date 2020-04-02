const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin  = require('clean-webpack-plugin').CleanWebpackPlugin;

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');
const path = require('path');

const ROOT = path.resolve(__dirname);

module.exports  = (_, argv) => {

  const devMode = !argv.mode || argv.mode === 'development';
  return {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.join(ROOT, 'dist'),
      publicPath: '/',
      filename: 'presentation.bundle.js'
    },
    resolve: {
      // the fewer directories, the faster module resolution is
      modules: ['./node_modules'],
      alias: {
      }
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                hmr: devMode,
              },
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(svg|gif|png|jpe?g)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                  limit: 8192, // in bytes
                  esModule: false,
                  name: devMode ? '[name].[ext]' : '[name].[hash].[ext]',
                  outputPath: 'images'
              },
            },
          ],
        },
        {
          test: /\.(eot|woff|woff|ttf)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                  limit: 8192, // in bytes
                  esModule: false,
                  name: devMode ? '[name].[ext]' : '[name].[hash].[ext]',
                  outputPath: 'fonts'
              },
            },
          ],
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        inject: 'body',
        minify: 'auto',
        hash: true
      }),
      new CopyWebpackPlugin([
        {
          from: 'assets/**/**',
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: 'markdown/**/**',
          to: path.resolve(__dirname, 'dist')
        },
      ]),
      new ImageminPlugin({
        pngquant: ({quality: '50-50'}),
        plugins: [imageminMozjpeg({quality: 50})]
      }),
      new ExtractCssChunks({
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      new webpack.ProvidePlugin({
        'Reveal': 'reveal.js',
      }),
      //new webpack.optimize.LimitChunkCountPlugin({
      //  maxChunks: 1,
      //}),
      new OptimizeCSSAssetsPlugin({}),
      new CompressionPlugin(),

      // use for development time hot-swap of only modified modules that the webpack client will load up
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: !devMode
      })
    ],
    devServer: {
      contentBase: __dirname,
    }
  };
}

