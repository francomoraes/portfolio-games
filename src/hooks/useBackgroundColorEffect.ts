import { useEffect } from 'react';

export const useBackgroundColorEffect = (
    selector: string,
    controlVariable: any,
    effectColor: string,
    afterColor: string
) => {
    useEffect(() => {
        const elem = document.querySelector(selector) as HTMLElement | null;
        if (elem) {
            elem.style.backgroundColor = effectColor;
            setTimeout(() => {
                elem.style.backgroundColor = afterColor;
            }, 500);
        }
    }, [controlVariable]);
};
