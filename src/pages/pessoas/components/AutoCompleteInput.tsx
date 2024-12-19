import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { useSearchParams } from 'react-router-dom';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';

type optionsData = {
    id: string
    label: string
}

export const AutoCompleteInput: React.FC = () => {
    const [searchParams,setSearchParams] = useSearchParams()

    const [options, setOptions] = useState<optionsData[]>([])
    const [isloading, setIsLoading] = useState(true)

    const debounce = useDebounce(300)

    const busca = useMemo(() => {
        return searchParams.get("busca") || ""
    }, [searchParams])

    const pagina = useMemo(() => {
        return searchParams.get("pagina") || "1"
    }, [searchParams])

    useEffect(() => {
        setIsLoading(true)
        debounce(() => {
            CidadesService.getAll(1, busca).then(result => {
                if (result instanceof Error) alert(result.message)
                else {
                    console.log(result)

                    setOptions(
                        result.cidades.map( cidade => {return {id: cidade.id, label: cidade.name}})
                    )
                    
                    setIsLoading(false)
                }
            })
        })
    }, [busca, pagina, debounce])

    return (
        <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Cidade" />}
        />
    );
}