import webpack, { Configuration } from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../../webpack.config'
import { config } from '../util'

const compiler = webpack(webpackConfig as Configuration)
const middleware = [
  devMiddleware(compiler, {
    serverSideRender: true,
    publicPath: config.BASE_PATH
  }),
  hotMiddleware(compiler)
]

export default middleware
