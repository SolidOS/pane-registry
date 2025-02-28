import type { PaneDefinition } from './types';
/**
 * PaneRegistry class manages a collection of PaneDefinitions.
 */
export declare class PaneRegistry {
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
    /**
     * Registers a new PaneDefinition.
     * @param pane - The PaneDefinition to register.
     * @param requireQueryButton - Whether a query button is required for this pane.
     */
    register(pane: PaneDefinition, requireQueryButton?: boolean): void;
    /**
     * Retrieves a PaneDefinition by its name.
     * @param name - The name of the PaneDefinition to find.
     * @returns The PaneDefinition if found, null otherwise.
     */
    byName(name: string): PaneDefinition | null;
}
/**
 * Creates and exports a singleton instance of the PaneRegistry.
 */
declare const paneRegistry: PaneRegistry;
export default paneRegistry;
