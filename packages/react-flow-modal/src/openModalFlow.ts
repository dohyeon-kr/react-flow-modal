type ModalFlowStack<Element> = {
    reserve: (key: string) => boolean;
    append: (key: string, element: Element) => void;
    remove: (key: string) => void;
};

export const openModalFlow = <T, Element>(
    key: string,
    render: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => Element,
    stack: ModalFlowStack<Element>,
) => {
    return new Promise<T>((resolve, reject) => {
        if (!stack.reserve(key)) {
            reject(new Error(`A modal with the key "${key}" is already open.`));
            return;
        }

        let settled = false;
        const settle = (settlePromise: () => void) => {
            if (settled) return;

            settled = true;
            stack.remove(key);
            settlePromise();
        };

        try {
            const element = render(
                (value) => settle(() => resolve(value)),
                (reason) => settle(() => reject(reason)),
            );

            if (!settled) stack.append(key, element);
        } catch (error) {
            settle(() => reject(error));
        }
    });
};
