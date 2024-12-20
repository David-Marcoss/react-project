import React, { useCallback, useContext, useState, createContext } from "react";

interface IDrawerOptionData{
    label: string,
    icon: string,
    to: string,
}

interface IDrawerContextData {
    drawerOpen: boolean;
    drawerOptions: IDrawerOptionData[],
    setDrawerOptions: (options:IDrawerOptionData[]) => void
    toggleDrawerOpen: () => void;
}

interface IDrawerContextProps {
    children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<IDrawerContextProps> = ({ children }) => {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerOptions,setDrawerOptions] = useState<IDrawerOptionData[]>([])

    const toggleDrawerOpen = useCallback(() => {
        setDrawerOpen(oldValue => !oldValue);
    }, []);

    const handlerSetDrawerOptions = useCallback((options:IDrawerOptionData[]) => {
        setDrawerOptions(options)
    },[])

    return (
        <DrawerContext.Provider value={{ 
            drawerOpen, 
            drawerOptions,
            toggleDrawerOpen,
            setDrawerOptions: handlerSetDrawerOptions}}>

            {children}
        </DrawerContext.Provider>
    );
}
