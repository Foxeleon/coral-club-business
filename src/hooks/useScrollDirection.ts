import { useState, useEffect } from 'react';

/**
 * * Custom hook to determine the page scroll direction.
 *  * @returns 'up' | 'down' | null - Scroll direction, or null if there has not been a scroll yet.
 *  */
export function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction = scrollY > lastScrollY ? "down" : "up";

            // We set the direction only if it has changed and the scroll is greater than a certain threshold (to avoid "shaking" at the top of the page)
            if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener("scroll", updateScrollDirection);

        return () => {
            window.removeEventListener("scroll", updateScrollDirection);
        };
    }, [scrollDirection]);

    return scrollDirection;
}