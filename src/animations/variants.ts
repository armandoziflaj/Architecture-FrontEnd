import type { Transition, Variants } from 'framer-motion';

const easeOut: Transition['ease'] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: easeOut },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: easeOut },
    },
};

export const staggerContainer = (staggerDelay = 0.1): Variants => ({
    hidden: {},
    visible: {
        transition: { staggerChildren: staggerDelay },
    },
});

export const viewportOnce = { once: true, amount: 0.2 } as const;

/**
 * Reduced-motion pages should still reach their final visible state, just
 * without the transform/duration choreography (fades to instant fades).
 */
export const withReducedMotion = (variants: Variants, reduceMotion: boolean): Variants => {
    if (!reduceMotion) return variants;

    const stripped: Variants = {};
    for (const key of Object.keys(variants)) {
        const state = variants[key];
        if (typeof state === 'object' && state !== null) {
            stripped[key] = { ...state, y: 0, x: 0, scale: 1, transition: { duration: 0.15 } };
        } else {
            stripped[key] = state;
        }
    }
    return stripped;
};
