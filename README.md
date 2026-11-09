# Lumi AR Dragon

Lumi is a small blue-and-white baby dragon for SPECS, built with Lens Studio. Place Lumi on a virtual table, offer a snack, or start a short ball game. The dragon and controls stay anchored in world space, so you can observe them from different angles.

## Open and run

1. Install **Lens Studio 5.23.2**. This project was saved with build `26081320`.
2. Clone or download this repository and open **Lumi523.esproj**.
3. Let Lens Studio import the assets, unpack the bundled packages and compile TypeScript. Review any package trust prompts before loading packages.
4. Keep the bundled **SpectaclesInteractionKit 2.0.0** and **SpectaclesUIKit 2.0.0**. This demo was validated with those versions; do not upgrade them for this delivery.
5. In the Preview panel, select a SPECS stereo device and an **Interactive Preview** scene. No physical glasses are required for the preview demo.
6. Look slightly down toward the table. Point at **Colocar Lumi**, allow the hover target to settle, then click.

Lens Studio regenerates the excluded caches, support declarations and workspace files. The repository includes the scene, scripts, render assets, materials, meshes, bundled packages and their `.meta` files. No external APIs, credentials or services are required by Lumi. Local debug/signing keys are deliberately excluded; generate a local key through Lens Studio if required.

## Controls

The interface is in Portuguese:

| Button | Action |
| --- | --- |
| Colocar Lumi | Place Lumi at the fixed marker on the virtual table. |
| Alimentar | Start an approximately 3-second feeding sequence. |
| Brincar | Start an approximately 4-second ball game. |
| Reiniciar | Immediately return to placement, including during an animation. |

Feeding and playing disable both action buttons until Lumi returns to rest. Reset remains available. The tabletop measures 70 x 45 cm, and Lumi is approximately 12 cm tall. Placement uses a fixed virtual marker, not real surface recognition.

## Verification and limitations

This delivery received **manual verification in Lens Studio Interactive Preview**, including simulated pointer clicks and observation of runtime state. The final TypeScript compilation succeeded and the final runtime log check reported no errors.

Observed checks covered placement, world anchoring after moving the preview camera sideways by 25 cm, feeding completion and snack cleanup, playing completion and ball cleanup, action buttons disabled while busy, and reset during feeding with no objects reappearing after more than 20 seconds.

**All five LEAF tests are blocked and were not executed. None passed.** LEAF 4.0.0 required `InteractionKit.lspkg`, while this project uses `SpectaclesInteractionKit.lspkg` 2.0.0. The incompatible LEAF package was removed to preserve the working Lens Studio 5.23.2 demo without upgrading the project or interaction kit.

The [manual checklist](Assets/LumiManualChecklist.md) records evidence and remaining checks for the five completion criteria. Visual confirmation of blinking and reset during the ball game remain pending. Long-session comfort and real hand tracking have not been validated on physical glasses. This version does not recognize real tables, use voice, persist state or support multiplayer.

## Included files

- `Lumi523.esproj`: Lens Studio project manifest.
- `Assets/Scene.scene`: authored scene and script bindings.
- `Assets/Scripts/LumiMain.ts`: state machine and action timing.
- `Assets/Scripts/LumiActionsUI.ts`: UIKit controls.
- `Assets/Scripts/LumiDragonMesh.ts`: articulated dragon, props and animation.
- `Packages/`: bundled Lens Studio packages and metadata; package terms apply.
- [Approved design brief](devpost/design-brief.md).
- [Manual verification checklist](Assets/LumiManualChecklist.md).

Caches, temporary exports, backups, private keys and personal editor/agent settings are excluded by `.gitignore`. This is a source-project delivery, not a Lens catalog submission.
