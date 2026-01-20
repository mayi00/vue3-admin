import { sys } from './sys'
import { example } from './example'
import { charts } from './charts'
import { extLink } from './extLink'
import { screen } from './screen'

export const menus = [sys, example, charts, ...extLink, ...screen]
