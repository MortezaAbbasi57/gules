# Stage 07 — Editor and Authoring Engine

## Command architecture
Legacy authoring uses command objects for mutations and undo/redo. Observed concepts include add/delete/move/resize/rotate/link/association/property/proxy/copy/paste/z-order/undo/redo commands.

## Required modern design
All authoring mutations should pass through a Command Bus with:
- execute
- undo
- redo
- transaction

A multi-part gesture must undo as one transaction.

## Selection and transforms
Observed behavior includes click selection, shift-add, marquee selection, resize handles, rotation handle, orientation snapping and z-order operations.

## Locks
Separate locks exist for properties, position, size and orientation. Property locks must also block in-scene controls and associated presentation controls where applicable.

## Scenes
Legacy documentation describes a small scene count limit; the modern editor should not preserve that arbitrary limit. Scene configuration includes dimensions, background, grid/snap and simulation timing controls.

## Property editing
Three concepts were observed:
1. common Properties pane
2. direct in-scene controls
3. advanced properties

Property schema must decide type, unit, editability, validators and computed/read-only status.

## Associations
Authoring can bind a control to another part property. Modern implementation should use typed property references, not raw UI callbacks.

## Popups/sub-scenes
Some parts own nested scene-like popups; chemical electrodes use this pattern for hidden electrical substructure. The normalized model should support owned nested components without exposing legacy XML implementation details.

## Clipboard/custom parts
Copy/paste is model-based. Custom parts use prototype inheritance plus overridden properties. Modern custom parts should serialize definitions separately from instances.

## Two editor tiers
- Teacher Authoring Studio: safe scene/experiment editing.
- Expert/Domain Studio: part definitions, property schemas, scientific data and migrations.

Teachers should never edit raw solver/database XML.