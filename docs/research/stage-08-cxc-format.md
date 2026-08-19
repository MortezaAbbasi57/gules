# Stage 08 — CXC Format, Serialization and Importer

## Corpus findings
- 144 CXC files inspected.
- 143 are chemistry lesson-kit files plus one internal product file.
- 272 total scenes across all CXC files; 269 belong to the 143 lesson files.
- 4390 `part` elements, 910 `pad`, 400 `link`, 70 `popup` elements.

## Format
CXC is plain UTF-8 XML, not a ZIP/binary container.

Typical hierarchy:
`document → metadata/commands/definitions/model → scene → part/link/popup/...`

## Prototype model
CXC usually stores class identity plus overrides, not complete part definitions. Correct load order is:
1. class registry
2. prototype inheritance
3. instantiate defaults
4. apply CXC overrides

Direct XML→JSON conversion is insufficient.

## Versions and migration
The shipped 605 corpus includes both current-style and older legacy metadata generations. Importer must be domain-version aware and run explicit migrations.

## Typed values
Observed codecs include string, double, int, bool, maps/arrays, resources, element/property references, points and colours. Older documents may omit explicit type and require schema inference.

## References
References are XPath-like document paths. Link endpoints also refer to pads through relative paths. Nodes must be instantiated first and references resolved in a later pass.

## Embedded pixmap codec
All 298 embedded records validated with this structure:
`Base64(uint32_be(uncompressed_size) || zlib(image_bytes))`.

## Runtime snapshot issue
CXC can mix authored initial state with serialized runtime/computed state. Modern importer should support:
- Authoring Initial State mode: default; recompute derived science.
- Legacy Snapshot Resume mode: compatibility/debug only.

## Import pipeline
Strict XML → normalize metadata → compatibility gate → class registry → prototype resolver → typed codec → instantiate graph → resources → reference resolution → links/popups/proxies → persisted commands → scientific rebuild → validation report → normalized experiment.

## Compatibility rule
Unknown nodes/attributes should be preserved for audit/round-trip where possible instead of silently dropped.