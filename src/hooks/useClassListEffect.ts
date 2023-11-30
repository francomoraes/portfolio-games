import { useEffect } from 'react';

export const useClassListEffect = (
    selector: string,
    controlVariable: any,
    effectClass: string,
    afterClass: string
) => {
    useEffect(() => {
        const elem = document.querySelector(selector) as HTMLElement | null;
        if (elem) {
            elem.classList.add(effectClass);
            setTimeout(() => {
                elem.classList.remove(effectClass);
                elem.classList.add(afterClass);
            }, 1000);
        }
    }, [controlVariable]);
};
