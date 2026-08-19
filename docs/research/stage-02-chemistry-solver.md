# Stage 02 — Chemistry Solver

## Database scale
- Species: 425
- Active reactions: 592
- Reaction families include simple reactions, acid/base variants, salt solution reactions, equilibria, phase changes and half-reactions.

## Confirmed scientific subsystems
- Stoichiometric reaction database.
- Acid/base chemistry with explicit H+ and OH- species.
- Weak-acid/base constants via Ka/Kb fields.
- Solubility and precipitation using Ksp-like values and temperature-dependent solubility tables.
- Thermal data including enthalpy of formation, entropy, molar heat capacity and latent heat.
- Conductivity contributions for many ions.
- Gas atmosphere defaults.
- Reversible/equilibrium reactions with K and reference temperature.

## Verified examples
- Acetic acid Ka: about 1.7539e-5.
- AgCl Ksp-like value: about 1.77e-10.
- Water liquid→gas at 100 °C with latent heat about 40650 J/mol.
- Water solid→liquid at 0 °C with latent heat about 6010 J/mol.

## Reaction controls
Decoded flags include high-confidence mappings for minimum/maximum temperature, pH gates, catalyst requirement, gas-fraction limits and maximum water content. Some flags remain unresolved and must not be guessed in the production engine.

## Validation findings
- All 592 active reactions were atom-balanced in the repaired validation pass.
- One exact species reference mismatch was observed for `C12H22O11[l]`.
- Legacy solubility data contains malformed/suspicious values and must be curated instead of copied blindly.

## Production requirements
1. Canonical amount unit = mol.
2. Internal scientific units = SI.
3. Fast equilibrium/speciation and slower kinetic reactions must be separated.
4. Computed scientific properties are read-only.
5. Scientific data pack must be versioned, validated and hashed.
6. Known legacy defects must be documented as intentional deviations when corrected.

## Open questions
- Exact kinetic rate law for every legacy simple-reaction control combination.
- Exact interpretation of partially decoded control flags.
- Exact interpolation details for all legacy solubility tables.
- Some legacy heat-transfer constants.

Do not implement unresolved behavior by title-specific hard coding.