import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import { Form } from "@unform/web"
import * as yup from 'yup';

import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetahes"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { VtextField } from "../../shared/forms"
import { VuseForm } from "../../shared/forms/VUseForm"
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";

export interface IFormData {
    name: string
}

const formValidationShema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required().min(3),
})

export const DetalhesDeCidades: React.FC = () => {
    const { id = "nova" } = useParams<"id">()

    const [isLoading, setIsloading] = useState(false)
    const [pageTitle, setPageTitle] = useState("")

    const { formRef, save, isSaveAndClose, saveAndClose } = VuseForm()

    const navigate = useNavigate()

    useEffect(() => {
        if (id !== "nova") {
            setIsloading(true)
            CidadesService.getById(id)
                .then((result) => {
                    setIsloading(false)
                    if (result instanceof Error) {
                        alert("Erro ao obter informações da pessoa")
                        navigate("/cidades")
                    } else {
                        setPageTitle(result.name)

                        formRef.current?.setData(result)
                    }
                }
                )
        } else {
            formRef.current?.setData({
                name: "",
            })
        }
    }, [formRef, id, navigate])

    const handleDelete = (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        const userConfirmed = confirm("tem certeza que deseja apagar o registro?")

        if (userConfirmed) {
            CidadesService.deleteById(id).then((result) => {
                if (result instanceof Error) {
                    console.log(result)
                    alert("Erro ao deletar registro !!")
                }
                else {
                    alert("Registro deletado com sucesso !!")
                    navigate("/cidades")
                }
            })
        }
    }

    const handleSave = (data: IFormData) => {

        formValidationShema
            .validate(data, { abortEarly: false })
            .then(validationData => {
                setIsloading(true)

                if (id === "nova") {
                    CidadesService
                        .create(validationData)
                        .then((result) => {
                            setIsloading(false)
                            if (result instanceof Error) {
                                alert("Erro salvar registro !!")
                                navigate("/cidades")
                            } else {
                                if (isSaveAndClose())
                                    navigate("/cidades")
                                else
                                    navigate("/cidades/detalhe/" + result)
                            }
                        })
                } else {
                    CidadesService
                        .updateById(id, validationData)
                        .then((result) => {
                            setIsloading(false)
                            if (result instanceof Error) {
                                alert("Erro salvar registro !!")
                                navigate("/cidades")
                            } else {
                                if (isSaveAndClose()) navigate("/cidades")
                            }
                        })
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {}
                errors.inner.forEach(error => {
                    if (error.path) {
                        validationErrors[error.path] = error.message
                    }
                })
                formRef.current?.setErrors(validationErrors)
            })
    }

    return (
        <LayoutBaseDePagina
            titulo={id !== "nova" ? pageTitle : "Nova Cidade"}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    textoBotaoNovo="Nova"
                    mostarBotaoApagar={id !== "nova"}
                    mostarBotaoNovo={id !== "nova"}
                    mostarBotaoSalvarEvoltar
                    aoClicarBotaoNovo={() => { navigate("/cidades/detalhe/nova") }}
                    aoClicarBotaoVoltar={() => navigate("/cidades")}
                    aoClicarBotaoSalvar={save}
                    aoClicarBotaoSalvarEVoltar={saveAndClose}
                    aoClicarBotaoApagar={() => handleDelete(id)}
                />
            }
        >
            <Form
                ref={formRef}
                onSubmit={handleSave}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <Box
                    component={Paper}
                    display="flex"
                    flexDirection="column"
                    margin={1}
                    variant="outlined"
                >
                    <Grid container direction="column" margin={2} spacing={2}>
                        <Grid item>
                            {isLoading && (
                                <LinearProgress variant="indeterminate" />
                            )}
                        </Grid>

                        <Grid item>
                            <Typography variant="h6">
                                Geral
                            </Typography>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item xs={10} md={6} lg={4} xl={2}>
                                <VtextField
                                    fullWidth
                                    label="name"
                                    placeholder="Picos"
                                    name="name"
                                    disabled={isLoading}
                                    onChange={e => id !== "nova" && setPageTitle(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Form>
        </LayoutBaseDePagina>
    )
}