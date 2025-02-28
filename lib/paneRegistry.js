"use strict";
// paneRegistry.ts (Replacement for paneRegistry.js)
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaneRegistry = void 0;
/**
 * PaneRegistry class manages a collection of PaneDefinitions.
 */
class PaneRegistry {
    constructor() {
        this.list = [];
        this.paneForIcon = {};
        this.paneForPredicate = {};
    }
    /**
     * Registers a new PaneDefinition.
     * @param pane - The PaneDefinition to register.
     * @param requireQueryButton - Whether a query button is required for this pane.
     */
    register(pane, requireQueryButton) {
        pane.requireQueryButton = requireQueryButton;
        if (!pane.name) {
            console.log('***     No name for pane!');
            return;
        }
        console.log('  registering pane: ' + pane.name);
        if (!pane.label) {
            console.log('***     No label for pane!');
            return;
        }
        this.list.push(pane);
        if (!(pane.name in this)) {
            // don't overwrite methods
            // @ts-ignore
            this[pane.name] = pane;
        }
        if (pane.icon) {
            this.paneForIcon[pane.icon] = pane;
        }
        if (pane.predicates) {
            for (const x in pane.predicates) {
                this.paneForPredicate[x] = { pred: x, code: pane.predicates[x] };
            }
        }
    }
    /**
     * Retrieves a PaneDefinition by its name.
     * @param name - The name of the PaneDefinition to find.
     * @returns The PaneDefinition if found, null otherwise.
     */
    byName(name) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name === name)
                return this.list[i];
        }
        console.warn(`No view with name ${name} found in the registry of views (aka paneRegistry)`);
        return null;
    }
}
exports.PaneRegistry = PaneRegistry;
/**
 * Creates and exports a singleton instance of the PaneRegistry.
 */
const paneRegistry = new PaneRegistry();
exports.default = paneRegistry;
