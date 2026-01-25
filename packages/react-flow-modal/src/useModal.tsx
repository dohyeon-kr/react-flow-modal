import React, { Fragment } from "react";
import { useModalContext } from "./useModalContext";

export const useModal = () => {
    const { setStack } = useModalContext();

    const pop = () => {
        setStack((prev) => prev.slice(0, -1));
    };

    const push = (element: React.ReactNode) => {
        setStack((prev) => [...prev, element]);
    };

    /**
     * 모달을 열고 닫는 함수
     * @caution 모달을 열고 닫는 함수는 비동기 함수이므로, 모달을 열고 닫는 함수를 호출하면, 반드시 resolve 또는 reject 함수를 호출해야 합니다. 
     * 그렇지 않으면 pending 상태가 되어 무한 대기 상태가 됩니다.
     * @param key - 모달의 고유 키
     * @param render - 모달을 렌더링하는 함수
     * @returns - 모달 컴포넌트가 반환하는 값을 반환하는 Promise
     */
    const open = <T,>(key: string, render: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => React.ReactNode) => {
        return new Promise<T>((resolve, reject) => {
            const element = render((value) => {
                resolve(value);
                pop();
            }, (reason) => {
                reject(reason);
                pop();
            });
            push(element);
        });
    };

    return { open };
};