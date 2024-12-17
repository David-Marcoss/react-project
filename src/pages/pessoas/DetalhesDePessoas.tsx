import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import { Form } from "@unform/web"
import * as yup from 'yup';

import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetahes"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { VtextField } from "../../shared/forms"
import { VuseForm } from "../../shared/forms/VUseForm"

export interface IFormData {
    nomeCompleto: string
    email: string
    cidadeId: string
}

const formValidationShema: yup.Schema<IFormData> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.string().required(),
})

export const DetalhesDePessoas: React.FC = () => {
    const { id = "nova" } = useParams<"id">()

    const [isLoading, setIsloading] = useState(false)
    const [pageTitle, setPageTitle] = useState("")

    const { formRef, save, isSaveAndClose, saveAndClose } = VuseForm()

    const navigate = useNavigate()

    useEffect(() => {
        if (id !== "nova") {
            setIsloading(true)
            PessoasService.getById(id)
                .then((result) => {
                    setIsloading(false)
                    if (result instanceof Error) {
                        alert("Erro ao obter informações da pessoa")
                        navigate("/pessoas")
                    } else {
                        setPageTitle(result.nomeCompleto)

                        formRef.current?.setData(result)
                    }
                }
                )
        } else {
            formRef.current?.setData({
                nomeCompleto: "",
                email: "",
                cidadeId: ""
            })
        }
    }, [formRef, id, navigate])

    const handleDelete = (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        const userConfirmed = confirm("tem certeza que deseja apoagar o registro?")

        if (userConfirmed) {
            PessoasService.deleteById(id).then((result) => {
                if (result instanceof Error) {
                    console.log(result)
                    alert("Erro ao deletar registro !!")
                }
                else {
                    alert("Registro deletado com sucesso !!")
                    navigate("/pessoas")
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
                    PessoasService
                        .create(validationData)
                        .then((result) => {
                            setIsloading(false)
                            if (result instanceof Error) {
                                alert("Erro salvar registro !!")
                                navigate("/pessoas")
                            } else {
                                if (isSaveAndClose())
                                    navigate("/pessoas")
                                else
                                    navigate("/pessoas/detalhe/" + result)
                            }
                        })
                } else {
                    PessoasService
                        .updateById(id, validationData)
                        .then((result) => {
                            setIsloading(false)
                            if (result instanceof Error) {
                                alert("Erro salvar registro !!")
                                navigate("/pessoas")
                            } else {
                                if (isSaveAndClose()) navigate("/pessoas")
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
            titulo={id !== "nova" ? pageTitle : "Nova Pesssoa"}
            barraDeFerramentas={
                <FerramentasDeDetalhes
                    textoBotaoNovo="Nova"
                    mostarBotaoApagar={id !== "nova"}
                    mostarBotaoNovo={id !== "nova"}
                    mostarBotaoSalvarEvoltar
                    aoClicarBotaoNovo={() => { navigate("/pessoas/detalhe/nova") }}
                    aoClicarBotaoVoltar={() => navigate("/pessoas")}
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
                                    label="Nome Clompleto"
                                    placeholder="joaozinho"
                                    name="nomeCompleto"
                                    disabled={isLoading}
                                    onChange={e => id !== "nova" && setPageTitle(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row">
                            <Grid item xs={10} md={6} lg={4} xl={2}>
                                <VtextField
                                    fullWidth
                                    label="E-mail"
                                    placeholder="example@gmail.com"
                                    name="email"
                                    type="email"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="row">
                            <Grid item xs={10} md={6} lg={4} xl={2}>
                                <VtextField
                                    fullWidth
                                    label="Cidade"
                                    placeholder="Picos"
                                    name="cidadeId"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </Form>
        </LayoutBaseDePagina>
    )
}