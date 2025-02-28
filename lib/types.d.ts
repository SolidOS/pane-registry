declare module 'rdflib';
declare module 'solid-logic';

import type { LiveStore, NamedNode } from 'rdflib';
import type { SolidLogic } from 'solid-logic';
export interface DataBrowserSession {
    paneRegistry: PaneRegistry;
    store: LiveStore;
    logic: SolidLogic;
}
export interface DataBrowserContext {
    dom: Document|HTMLDocument;
    getOutliner: (dom: Document|HTMLDocument) => unknown;
    session: DataBrowserSession;
}
export interface PaneDefinition {
    icon: string;
    global?: boolean;
    name: string;
    audience?: NamedNode[];
    label: (subject: NamedNode, context: DataBrowserContext) => string | null;
    render: (subject: NamedNode, context: DataBrowserContext, options?: unknown) => HTMLElement;
    shouldGetFocus?: (subject: NamedNode) => boolean;
    requireQueryButton?: boolean;
    mintClass?: NamedNode;
    mintNew?: (context: DataBrowserContext, options: NewPaneOptions) => Promise<NewPaneOptions & {
        newInstance: NamedNode;
    }>;
    predicates?: {
        [key: string]: number;
    };
    classes?: {
        [key: string]: number;
    };
}
export interface NewPaneOptions {
    appPathSegment?: string;
    div: HTMLElement;
    dom: HTMLDocument;
    folder: NamedNode;
    iconEle: HTMLImageElement;
    me?: NamedNode;
    newBase: string;
    newInstance?: NamedNode;
    noIndexHTML: boolean;
    noun: string;
    pane: PaneDefinition;
    refreshTarget?: HTMLTableElement;
}
export interface PaneRegistry {
    list: PaneDefinition[];
    paneForIcon: {
        [key: string]: PaneDefinition;
    };
    paneForPredicate: {
        [key: string]: {
            pred: string;
            code: number;
        };
    };
    register(pane: PaneDefinition, requireQueryButton?: boolean): void;
    byName(name: string): PaneDefinition | null;
    [key: string]: any;
}
