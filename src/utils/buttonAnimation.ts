export const buttonAnimation = {
    animations: {
        hover: {
            props: {
                scale: { x: 1.03, y: 1.03 },
                y: -1,
            },
            duration: 100,
        },
        pressed: {
            props: {
                scale: { x: 0.95, y: 0.95 },
                y: 5,
            },
            duration: 100,
        },
    },
};
