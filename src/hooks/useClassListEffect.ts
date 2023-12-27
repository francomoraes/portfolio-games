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

export const useMultipleClassListEffects = (
    effectsArray: [string, any, string, string][]
) => {
    useEffect(
        () => {
            effectsArray.forEach(
                ([selector, controlVariable, effectClass, afterClass]) => {
                    const elem = document.querySelector(selector);
                    if (elem) {
                        elem.classList.add(effectClass);
                        setTimeout(() => {
                            elem.classList.remove(effectClass);
                            elem.classList.add(afterClass);
                        }, 1000);
                    }
                }
            );
        },
        effectsArray.map(([, controlVariable]) => controlVariable)
    );
};
