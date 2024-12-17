import { FormHandles } from "@unform/core"
import { useCallback, useRef } from "react"

//hook personalizado para controlar a submisão de formularios
export const VuseForm = () => {
    // armazena a referencia do form para que possa se acionado fora do fornm
    const formRef = useRef<FormHandles>(null)
    const isSaveAndClose =  useRef(false)


    const handleSave =  useCallback(() => {
        isSaveAndClose.current = false
        formRef.current?.submitForm()
    },[])

    const handleSaveAndClose =  useCallback(() => {
        isSaveAndClose.current = true
        formRef.current?.submitForm()
    },[])

    const handleIsSaveAndClose =  useCallback(() => {
        return isSaveAndClose.current
    },[])

    return {
        formRef,
        save: handleSave,
        saveAndClose: handleSaveAndClose,
        isSaveAndClose: handleIsSaveAndClose
    }
}