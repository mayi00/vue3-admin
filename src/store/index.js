import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { useAppStore } from './modules/app'
import { useUserStore } from './modules/user'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store
export { useAppStore, useUserStore }
