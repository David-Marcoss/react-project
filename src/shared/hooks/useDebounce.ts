import { useCallback, useRef } from "react"

// hook personalizado que controla a execulção da função de busca 
export const useDebounce = (delay=300, notDelayInFirstTime=true) =>{

    const isFirstTime = useRef(notDelayInFirstTime)
    const timeOut = useRef<NodeJS.Timeout>()

    const debounce = useCallback((func: () => void) =>{

        if(isFirstTime.current){
            isFirstTime.current = false
            func()
        }else{
            if(timeOut.current){
                clearTimeout(timeOut.current)
            }

            timeOut.current = setTimeout( () => func(), delay)
        }
    },[delay])
    
    return debounce
}