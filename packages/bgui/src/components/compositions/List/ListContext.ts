import { createContext, useContext } from "react";
import type { ListContextValue } from "./List.types";

export const ListContext = createContext<ListContextValue | null>(null);

export const useListContext = () => useContext(ListContext);
