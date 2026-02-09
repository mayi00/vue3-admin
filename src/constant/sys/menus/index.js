import { sys } from './sys'
import { example } from './example'
import { charts } from './charts'
import { extLink } from './extLink'
import { finance } from './finance'
import { screen } from './screen'

export const menus = [sys, example, charts, finance, ...extLink, ...screen]
