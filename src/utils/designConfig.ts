/** Minimum screen width before the resizing function shrinks the view. */
const minWidth = 1200;
/** Minimum screen height before the resizing function shrinks the view. */
const minHeight = 900;

const innerWidth = 580;
/** Object to store all configuration values for the out of gameplay design logic. */
export const designConfig = {
    content: {
        width: minWidth,
        height: minHeight,
        innerWidth,
    },
    head: {
        size: 50,
    },
    grid: {
        x: 60,
        y: 60,
    },
};
