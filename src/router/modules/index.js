import basicRoutes from './basic'
import { routes as systemRoutes } from './system'
import { exampleRoutes } from './example'
import { chartsRoutes } from './charts'
import { iopRoutes } from './iop'

export default [...basicRoutes, ...systemRoutes, ...exampleRoutes, ...chartsRoutes, ...iopRoutes]
