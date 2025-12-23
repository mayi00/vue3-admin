import { baseRoutes } from './base'
import { loginRoutes } from './login'
import { portalRoutes } from './portal'
import { screenRoutes } from './screen'

export default [...loginRoutes, ...portalRoutes, ...screenRoutes, ...baseRoutes]
