import { useSetAtom } from "jotai";
import mediaValues from "../dictionaries/mediaValues";
import { useCallback, useEffect } from "react";
import { deviceAtom } from "../GlobalState";
import { useWindowSize } from "./useWindowSize";

export default function useResponsiveSetting() {
    // Responsive UI
    const setDevice = useSetAtom(deviceAtom)
    const handleResize = useCallback(() => {
        if (window.innerWidth < mediaValues.landscapeCutoff) {
            setDevice("portrait")
        } else {
            setDevice("landscapeDesktop")
        }
    }, [setDevice]);

    useEffect(() => {
        // Initial call - only run once on mount
        handleResize();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Subscribe to centralized resize handler
    useWindowSize(handleResize);
}