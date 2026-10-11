"use client";

import { createContext, useContext } from "react";

const CmsDataContext = createContext({});
const CmsSharedContext = createContext([]);

// Hands server-fetched `home/<name>/` payloads to client sections so the
// first render (and the HTML crawlers see) already contains CMS content.
// Nested providers merge with their parent. `shared` names blocks that
// appear on many pages (layout header/footer/CTA, article templates).
export function CmsDataProvider({ data, shared = [], children }) {
    const parent = useContext(CmsDataContext);
    const parentShared = useContext(CmsSharedContext);
    return (
        <CmsDataContext.Provider value={{ ...parent, ...data }}>
            <CmsSharedContext.Provider value={shared.length ? [...parentShared, ...shared] : parentShared}>
                {children}
            </CmsSharedContext.Provider>
        </CmsDataContext.Provider>
    );
}

export function useCmsInitial(name) {
    return useContext(CmsDataContext)[name];
}

// True when a <CmsSection shared> above this block lists it.
export function useCmsShared(name) {
    return useContext(CmsSharedContext).includes(name);
}
