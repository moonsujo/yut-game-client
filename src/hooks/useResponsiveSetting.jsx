import { useSetAtom } from "jotai";
import mediaValues from "../dictionaries/mediaValues";
import { useEffect } from "react";
import { deviceAtom } from "../GlobalState";
import { subscribeToResize, unsubscribeFromResize } from "./useWindowSize";

export default function useResponsiveSetting() {
    // Responsive UI
    const setDevice = useSetAtom(deviceAtom)
    const handleResize = () => {
        if (window.innerWidth < mediaValues.landscapeCutoff) {
            setDevice("portrait")
        } else {
            setDevice("landscapeDesktop")
        }
    }

    useEffect(() => {
        // Initial call
        handleResize();
        
        // Subscribe to centralized resize handler
        subscribeToResize(handleResize);
        
        return () => {
            unsubscribeFromResize(handleResize);
        };
    }, []);
}