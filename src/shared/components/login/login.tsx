import { useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Typography } from "@mui/material"

import { Form } from "@unform/web"
import * as yup from 'yup';

import { useAuthContext } from "../../contexts/AuthContext"
import { IAuthData } from "../../services/api/auth/AuthService"

import { VtextField } from "../../forms";
import { FormHandles } from "@unform/core";

interface ILoginProps {
    children: React.ReactNode
}

const formValidationShema: yup.Schema<IAuthData> = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),

})


export const Login: React.FC<ILoginProps> = ({ children }) => {

    const formRef = useRef<FormHandles>(null)

    const { isAuthenticated, login } = useAuthContext()
    const [isLoading, setIsloading] = useState(false)


    const handleLogin = (data: IAuthData) => {
        setIsloading(true)
        formValidationShema.validate(data, { abortEarly: false }).then(validData => {
            login(validData)
            console.log(isAuthenticated)
            setIsloading(false)
        }).catch((errors: yup.ValidationError) => {
            const validationErrors: { [key: string]: string } = {}
            errors.inner.forEach(error => {
                if (error.path) {
                    validationErrors[error.path] = error.message
                }
            })
            formRef.current?.setErrors(validationErrors)
            setIsloading(false)
        })

    }

    if (isAuthenticated) {
        return (
            <>
                {children}
            </>
        )
    }
    return (
        <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            height={"100vh"}
            width={"100vw"}
        >

            <Card>
                <Form
                ref={formRef}
                    onSubmit={handleLogin}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    <CardContent>
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={2}
                            width={300}
                            height={250}
                        >
                            <Typography variant="h5" textAlign={"center"}>
                                Login
                            </Typography>

                            <VtextField
                                fullWidth
                                label="E-mail"
                                placeholder="example@email.com"
                                name="email"
                                disabled={isLoading}
                            />

                            <VtextField
                                fullWidth
                                label="senha"
                                placeholder="sua senha"
                                name="password"
                                disabled={isLoading}
                                onKeyDown={() => formRef.current?.setErrors({})}
                            />
                        </Box>
                    </CardContent>

                    <CardActions>
                        <Box
                            display="flex"
                            flexDirection={"column"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            width={"100%"}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                            >   
                                {isLoading ? (
                                    <Typography variant="button">
                                        <CircularProgress size={30}/>
                                        Entrando ...
                                    </Typography>
                                ) : (
                                    <Typography variant="button">
                                        Entrar
                                    </Typography>
                                )}
                            
                            </Button>
                        </Box>
                    </CardActions>
                </Form>
            </Card>
        </Box>
    )
}

