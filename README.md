# pane-registry

An index to hold all loaded solid panes, whether statically or dynamically loaded

# Adendum

The pane registry is a crucial part of the Solid Panes system. It is where any pane inserts itself or is inserted. In the standard working of SolidOS, there is one place in solid-panes where all the normal panes are loaded into the pane registry (see: [registerPanes.js](https://github.com/solid/solid-panes/blob/main/src/registerPanes.js) in solid-panes). But other apps, and especially developers developing new panes can insert their own panes. And so we hope we will end up with panes dynamically laoded according to user configuration preferences. 
