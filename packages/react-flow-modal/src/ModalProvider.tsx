'use client';


import React, { createContext, PropsWithChildren, ReactElement, useContext, useState } from 'react';
import { createStore, ExtractState, StoreApi, useStore } from 'zustand';

type ModalState = {
    stack: Map<string, ReactElement>;
    appendStack: (key: string, element: ReactElement) => void;
    removeStack: (key: string) => void;
};



const createModalStore = (initialState?: Partial<ModalState>) => createStore<ModalState>((set) => {
    return {
        stack: initialState?.stack ?? new Map<string, ReactElement>(),

        appendStack: (key: string, element: ReactElement) => set((state) => ({ stack: new Map(state.stack).set(key, element) })),

        removeStack: (key: string) => set((state) => {
            const newStack = new Map(state.stack);
            newStack.delete(key);
            return { stack: newStack };
        }),
    }
});

const ModalStoreContext = createContext<StoreApi<ModalState> | null>(null);

type ProviderProps = {
    initialState?: Partial<ModalState>;
}


export const ModalProvider: React.FC<PropsWithChildren<ProviderProps>> = ({ children, initialState }) => {
    // 여러번 호출되어도 store가 하나만 생성되도록 함
    const [store] = useState(createModalStore(initialState));

    return (
        <ModalStoreContext.Provider value={store}>
            {children}
        </ModalStoreContext.Provider>
    );
};


export const useModalStore = <T,>(selector: (state: ExtractState<StoreApi<ModalState>>) => T) => {
    const store = useContext(ModalStoreContext);
    if (!store) throw new Error('DashboardStoreProvider missing');
    return useStore(store, selector);
};