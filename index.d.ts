// This is manually built for now

import { Fetcher, NamedNode, Store, UpdateManager } from 'rdflib'
import {SolidLogic} from 'solid-logic';

declare const list: Array<PaneDefinition>
declare const paneForIcon: { [key: string]: PaneDefinition }
declare const paneForPredicate: {
  [key: string]: {
    pred: NamedNode
    code: number
  }
}

declare function register (
  pane: PaneDefinition,
  requireQueryButton?: boolean
): void

declare function byName (name: string): PaneDefinition | null

export class ConnectedStore extends Store {
  public fetcher: Fetcher
}

export class LiveStore extends ConnectedStore {
  public updater: UpdateManager
}

/**
 * All of the knowledge that a user accumulates throughout the current session
 */
export type DataBrowserSession = {
  paneRegistry: PaneRegistry
  store: LiveStore
  logic: SolidLogic
}

/**
 * The current context that a view is rendered into
 */
export type DataBrowserContext = {
  dom: HTMLDocument
  getOutliner: (dom: HTMLDocument) => unknown // @@ TODO Remove the use of getOutliner - only here as an interim until we have better solution
  session: DataBrowserSession
}

/**
 * Only a placeholder until we get something better going
 */
declare type PaneRegistry = {
  list
  paneForIcon
  paneForPredicate
  register
  byName
}

export interface PaneDefinition {
  icon: string
  global?: boolean
  name: string
  audience?: NamedNode[]
  label: (subject: NamedNode, context: DataBrowserContext) => string | null
  render: (
    subject: NamedNode,
    context: DataBrowserContext,
    options?: unknown
  ) => HTMLElement
  shouldGetFocus?: (subject: NamedNode) => boolean
  requireQueryButton?: boolean
  mintClass?: NamedNode
  mintNew?: (
    context: DataBrowserContext,
    options: NewPaneOptions
  ) => Promise<NewPaneOptions & { newInstance: NamedNode }>
  predicates?: { [key: string]: number }
  classes?: { [key: string]: number }
}

interface NewPaneOptions {
  appPathSegment?: string
  div: HTMLElement
  dom: HTMLDocument
  folder: NamedNode
  iconEle: HTMLImageElement
  me?: NamedNode
  newBase: string
  newInstance?: NamedNode
  noIndexHTML: boolean
  noun: string
  pane: PaneDefinition
  refreshTarget?: HTMLTableElement
}
