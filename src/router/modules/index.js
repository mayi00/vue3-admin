import { baseRoutes } from './base'
import { loginRoutes } from './login'
import { portalRoutes } from './portal'

export default [...baseRoutes, ...loginRoutes, ...portalRoutes]
