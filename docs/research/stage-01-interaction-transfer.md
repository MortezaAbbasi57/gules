# Stage 01 — Scene, Interaction and Transfer Engine

## Scope
Reverse-engineering findings for scene manipulation, attachments, liquid/gas transfer, tubing and laboratory interactions.

## Confirmed architecture
- Scene supports selection, move, rotate, resize, z-order, locking, overlap tracking and attachment ties.
- Chemistry uses explicit vessel/content semantics instead of generic falling-body physics.
- Core classes observed include `OverlapTracker`, `AttachmentTie`, `OpenVessel`, `ClosedVessel`, `TransferManager`, `Stream`, `Stopper`, `Pipette`, and `Burette`.
- Transfer validates source capability, target acceptance and free capacity before mutation.
- Vessel contents are treated as well-mixed for ordinary liquids/powders; suspended/precipitated solids have separate behavior.
- Tube connections are logical links with start/end pads plus visual routing geometry.
- Moving connected parts can reroute the tube without changing logical connectivity.

## Important equipment behavior
- Burette: 50 mL, flow/drop controls and make-to-volume behavior.
- Pasteur pipette: 10 mL style transfer control.
- Gas syringe: 100 cm³.
- Gas collector: 100 mL with water/gas displacement semantics.
- Delivery tube: gas/stream transfer and bubbling output.
- Condenser: vapor-to-liquid transfer semantics.
- Filter paper: passes liquid while retaining suspended solids.
- Tap: pure-water source with adjustable flow.
- Stopper/funnel/probe: attachment depends on compatible vessel geometry and overlap/position state.

## Vessel actions observed
- `chemistry/action/transfer_volume`
- `empty_vessel`
- `add_drop`
- `fill_to_level`

## Simulation rule
Simulation speed is a multiplier over simulation time; scientific state should not depend on renderer frame rate.

## Compatibility requirements for the new engine
1. UI pointer gestures must become validated engine actions.
2. Contents cannot be mutated directly by React components.
3. Transfer must preserve species amounts except for explicitly modeled loss/overflow.
4. Logical link topology must be independent from visual route geometry.
5. Attachment state must be deterministic and serializable.

## Still unresolved / black-box candidates
- Exact snap distance.
- Exact stopper pop pressure.
- Exact per-tick transfer constants.
- Exact attachment lifecycle thresholds.

Confidence labels: architecture and named actions/classes are confirmed from files/binary evidence; unresolved constants require runtime black-box capture.