import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { CircularProgress } from '@mui/material';
import { useField } from '@unform/core';

type optionsData = {
    id: string
    label: string
}

interface AutoCompleteInputProps {
    isExternalLoading?: boolean
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ isExternalLoading = false }) => {
    //cofiguração de integração do input com unform
    const {
        fieldName,
        registerField,
        error,
        clearError,
        defaultValue
    } = useField("cidadeId")
    const [search, setSearch] = useState("")

    const [options, setOptions] = useState<optionsData[]>([])
    const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(defaultValue)
    const [isloading, setIsLoading] = useState(true)

    const debounce = useDebounce(300)


    useEffect(() => {
        registerField({
            name: fieldName,
            setValue: (_, newValue) => setSelectedOptionId(newValue),
            getValue: () => selectedOptionId
        })
    }, [fieldName, registerField, selectedOptionId])

    useEffect(() => {
        setIsLoading(true)
        debounce(() => {
            CidadesService.getAll(1, search).then(result => {
                if (result instanceof Error) alert(result.message)
                else {
                    setOptions(
                        result.cidades.map(cidade => { return { id: cidade.id, label: cidade.name } })
                    )
                }
                setIsLoading(false)
            })
        })
    }, [search, debounce])

    const getSelectedOption = useMemo(() => {
        if (!selectedOptionId) return null
        const optionSelected = options.find(option => option.id === selectedOptionId)

        return optionSelected ? optionSelected : null

    }, [options, selectedOptionId])

    return (
        <Autocomplete
            value={getSelectedOption}
            options={options}
            loading={isloading}
            disabled={isExternalLoading}
            popupIcon={isloading ? <CircularProgress size={28} /> : undefined}
            onChange={(_, newValue) => { 
                setSelectedOptionId(newValue?.id)
                setSearch("")
                clearError() 
            }}
            onInputChange={(_, newValue) => setSearch(newValue)}
            renderInput={(params) => {
                return <TextField 
                    {...params}
                    label="Cidade" 
                    error = { error !== undefined}
                    helperText = {error}
                />
            }}
        />
    );
}