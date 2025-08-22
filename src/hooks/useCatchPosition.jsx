import { useAtomValue } from "jotai";
import { clientAtom, deviceAtom } from "../GlobalState";
import layout from "../layout";

export default function useCatchPosition() {
    const client = useAtomValue(clientAtom)
    const device = useAtomValue(deviceAtom)

    function getCatchPosition (caughtTokenTeam) {
        if (client.team === caughtTokenTeam) {
            return layout[device].game.piecesSection.position
        } else {
            if (caughtTokenTeam === 0) {
                return layout[device].game.team0.position
            } else if (caughtTokenTeam === 1) {
                return layout[device].game.team1.position
            }
        }
    }

    return { getCatchPosition }
}