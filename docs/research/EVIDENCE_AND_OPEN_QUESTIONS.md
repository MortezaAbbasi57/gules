# Evidence and Open Questions

## Confirmed corpus facts

- 221 visible chemistry parts plus presentation parts.
- 425 species.
- 592 reactions.
- 116 half-reactions.
- 143 chemistry lesson-kit CXC files.
- CXC is XML-based scene/simulation serialization.
- Parts use class/prototype inheritance with serialized overrides.
- 79 lessons use structured instructions with 477 guide steps.
- 20 lessons use graph instances.
- Flowchart/event/action infrastructure exists independently of the chemistry solver.
- Electrodes bridge chemistry state to an internal electrical network model.
- Faraday constant found in the legacy electrochemistry engine: 96485.0.
- Embedded CXC pixmaps use Base64 over a 4-byte big-endian uncompressed-size prefix plus zlib payload.
- The supplied CXC corpus is structurally healthy after prototype-aware reference resolution.

## Confirmed legacy data defects

These values must not be copied blindly into the modern data pack:

- chemistry datafile XML contains a missing whitespace between attributes around the SO2/SO3 reaction.
- LiNO3 solubility table contains malformed value `0.65.7`.
- CuSO4(H2O)5 contains suspicious solubility value `1240`.
- Ba(OH)2 contains suspicious fraction-like solubility value `1.010`.
- one reaction references `C12H22O11[l]` without an exact matching species record.

## Strong but not fully proven behavior

- Reaction control flag F is strongly associated with surface/contact-area dependence.
- Some other legacy control flags remain partially decoded.
- Exact transfer-per-tick behavior and certain attachment thresholds are not fully known.
- Exact electrochemical competition weighting and geometry-to-resistance behavior are not fully proven.

## Open questions requiring black-box comparison

1. Exact kinetic rate law used by each reaction family.
2. Remaining control flags B/C/D/E/N/O/P.
3. Exact solubility interpolation behavior in all legacy cases.
4. Exact heating acceleration behavior around boiling.
5. Stopper pop pressure/criteria.
6. Detailed overflow/loss semantics for vessel transfer.
7. Exact probe immersion geometry threshold.
8. Electrode competition weighting, polarization/overpotential assumptions.
9. Exact legacy visual timing for bubble/flame/explosion events.
10. Exact snap/attachment distances and some editor gesture thresholds.

## Implementation policy for unknowns

Unknown behavior must be handled explicitly:

- preserve raw legacy values and provenance;
- create a compatibility test or black-box capture task;
- implement a scientifically defensible modern behavior where legacy behavior cannot be established;
- document intentional deviations;
- never hide an approximation behind a claim of exact compatibility.
