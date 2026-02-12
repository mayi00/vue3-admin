import { setupAuthMock } from './auth'
import { setupDictMock } from './dict'
import { setupMenuMock } from './menu'
import { setupRoleMock } from './role'
import { setupUserMock } from './user'
import { setupOrganizationMock } from './organization'
import { setupNoticeMock } from './notice'

export function setupSysMock(mock, faker) {
  setupAuthMock(mock, faker)
  setupDictMock(mock, faker)
  setupMenuMock(mock, faker)
  setupRoleMock(mock, faker)
  setupUserMock(mock, faker)
  setupOrganizationMock(mock, faker)
  setupNoticeMock(mock, faker)
}
