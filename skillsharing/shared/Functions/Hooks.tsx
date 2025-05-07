import { useState } from 'react';

export const useThrottling = (callback: () => void, interval: number = 500) => {
    const [index, setIndex] = useState(-1);
    const [deferedFunc, setDeferedFunc] = useState<() => void>();

    return () => {
        if (index === -1) {
            callback();

            setIndex(
                setTimeout(() => {
                    if (deferedFunc === undefined) {
                        setIndex(-1);
                        setTimeout();
                    }

                    setDeferedFunc(undefined);
                }, interval),
            );
        } else {
            setDeferedFunc(() => callback());
        }
    };
};
