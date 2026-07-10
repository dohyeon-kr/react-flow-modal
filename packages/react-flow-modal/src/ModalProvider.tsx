'use client';

import React, { createContext, PropsWithChildren, ReactElement, useContext, useState } from 'react';
import { createStore, ExtractState, StoreApi, useStore } from 'zustand';

type ModalState = {
    stack: Map<string, ReactElement>;
    activeKeys: Set<string>;
    reserveStack: (key: string) => boolean;
    appendStack: (key: string, element: ReactElement) => void;
    removeStack: (key: string) => void;
};

type ModalInitialState = {
    stack?: Map<string, ReactElement>;
    appendStack?: (key: string, element: ReactElement) => void;
    removeStack?: (key: string) => void;
};

const createModalStore = (initialState?: ModalInitialState) => createStore<ModalState>((set) => {
    const stack = new Map(initialState?.stack);

    return {
        stack,
        activeKeys: new Set(stack.keys()),

        reserveStack: (key: string) => {
            let reserved = false;

            set((state) => {
                if (state.activeKeys.has(key)) return state;

                reserved = true;
                return { activeKeys: new Set(state.activeKeys).add(key) };
            });

            return reserved;
        },

        appendStack: (key: string, element: ReactElement) => set((state) => ({ stack: new Map(state.stack).set(key, element) })),

        removeStack: (key: string) => set((state) => {
            const stack = new Map(state.stack);
            const activeKeys = new Set(state.activeKeys);
            stack.delete(key);
            activeKeys.delete(key);
            return { stack, activeKeys };
        }),
    };
});

const ModalStoreContext = createContext<StoreApi<ModalState> | null>(null);

type ProviderProps = {
    initialState?: ModalInitialState;
};


export const ModalProvider: React.FC<PropsWithChildren<ProviderProps>> = ({ children, initialState }) => {
    // 여러번 호출되어도 store가 하나만 생성되도록 함
    const [store] = useState(() => createModalStore(initialState));

    return (
        <ModalStoreContext.Provider value={store}>
            {children}
        </ModalStoreContext.Provider>
    );
};


export const useModalStore = <T,>(selector: (state: ExtractState<StoreApi<ModalState>>) => T) => {
    const store = useContext(ModalStoreContext);
    if (!store) throw new Error('ModalProvider missing');
    return useStore(store, selector);
};
