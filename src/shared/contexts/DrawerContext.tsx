import React, { useCallback, useContext, useState, createContext } from "react";

interface IIDrawerOptionData{
    label: string,
    icon: string,
    to: string,
}

interface IDrawerContextData {
    drawerOpen: boolean;
    drawerOptions: IIDrawerOptionData[],
    setDrawerOptions: (options:IIDrawerOptionData[]) => void
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

    const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
    const [drawerOptions,setDrawerOptions] = useState<IIDrawerOptionData[]>([])

    const toggleDrawerOpen = useCallback(() => {
        setDrawerOpen(oldValue => !oldValue);
    }, []);

    const handlerSetDrawerOptions = useCallback((options:IIDrawerOptionData[]) => {
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
