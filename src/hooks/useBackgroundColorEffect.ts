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
            elem.classList.add(`bg-[${effectColor}]`);
            elem.style.backgroundColor = effectColor;
            setTimeout(() => {
                elem.style.backgroundColor = afterColor;
            }, 1000);
        }
    }, [controlVariable]);
};
