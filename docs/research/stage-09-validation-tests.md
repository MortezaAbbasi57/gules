# Stage 09 — Validation, Failure Modes and Compatibility Tests

## Static validation results
- 144/144 shipped CXC files are well-formed XML.
- Broken link endpoints in the shipped CXC corpus: 0.
- Typed scalar errors in shipped CXC: 0.
- Embedded resources verified: 298/298.
- Direct unresolved references after prototype-aware validation: 0.
- Three raw XML property references require prototype/schema-aware resolution.

## Chemistry database validation
The legacy chemistry data file contains a confirmed strict-XML defect near an SO2/SO3 reaction where whitespace is missing between attributes. A recover parser may silently lose attributes; production import must never rely on recover mode for scientific source data.

Additional known defects/anomalies:
- malformed LiNO3 solubility pair `0.65.7`
- suspicious CuSO4(H2O)5 solubility value `1240`
- suspicious Ba(OH)2 fraction `1.010`
- missing exact `C12H22O11[l]` species record for one reference

All 592 validated active reactions were atom-balanced after the single XML syntax repair used only for analysis. Half-reaction charge/electron consistency also passed the extracted corpus validation.

## Compatibility suite
60 baseline tests were defined across:
- Importer
- Chemistry
- Electrochemistry
- Interaction
- Learning Runtime
- Visual state
- Authoring

## Release gates
- G0 Import/Security
- G1 Structural Fidelity
- G2 Scientific Core
- G3 Electrochemistry
- G4 Interaction/Learning
- G5 Visual
- G6 Authoring

## Security requirements
- disable DTD/external entities/network XML resolution
- restrict reference grammar instead of evaluating arbitrary XPath from untrusted files
- cap embedded resource decompression size and ratio
- registered class IDs only; unknown classes become inert placeholders
- sanitize rich guide HTML
- reject NaN/Inf and extreme unsafe scientific values

## Legacy black-box capture
The old Windows application could not be executed in the analysis environment. Numeric runtime values must be captured later on Windows at fixed simulation-time checkpoints for priority experiments.

## Decision rule
Scientific correctness outranks a proven legacy data bug. Intentional differences must be documented, not hidden.