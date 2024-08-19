import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";

interface IFerramentasDeDetalhesProps {
    textoBotaoNovo?: string;

    mostarBotaoNovo?: boolean;
    mostarBotaoSalvar?: boolean;
    mostarBotaoSalvarEvoltar?: boolean;
    mostarBotaoApagar?: boolean;
    mostarBotaoVoltar?: boolean;

    mostarBotaoNovoCarregando?: boolean;
    mostarBotaoSalvarCarregando?: boolean;
    mostarBotaoSalvarEvoltarCarregando?: boolean;
    mostarBotaoApagarCarregando?: boolean;
    mostarBotaoVoltarCarregando?: boolean;

    aoClicarBotaoNovo?: () => void;
    aoClicarBotaoSalvar?: () => void;
    aoClicarBotaoSalvarEVoltar?: () => void;
    aoClicarBotaoApagar?: () => void;
    aoClicarBotaoVoltar?: () => void;
}

export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
    aoClicarBotaoNovo,
    aoClicarBotaoSalvar,
    aoClicarBotaoSalvarEVoltar,
    aoClicarBotaoApagar,
    aoClicarBotaoVoltar,

    textoBotaoNovo = "Novo",

    mostarBotaoNovo = true,
    mostarBotaoSalvar = true,
    mostarBotaoSalvarEvoltar = false,
    mostarBotaoApagar = true,
    mostarBotaoVoltar = true,

    mostarBotaoNovoCarregando = false,
    mostarBotaoSalvarCarregando = false,
    mostarBotaoSalvarEvoltarCarregando = false,
    mostarBotaoApagarCarregando = false,
    mostarBotaoVoltarCarregando = false,
}) => {
    const theme = useTheme();

    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))

    return (
        <Box
            component={Paper}
            display={"flex"}
            alignItems={"center"}
            marginX={1}
            padding={1}
            paddingX={2}
            gap={1}
            height={theme.spacing(5)}
        >
            {(mostarBotaoSalvar && !mostarBotaoSalvarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    startIcon={<Icon>save</Icon>}
                    onClick={() => aoClicarBotaoSalvar?.()}
                >
                    <Typography variant="button" textOverflow={"ellipsis"} overflow={"hidden"} >
                        Salvar
                    </Typography>
                </Button>
            )}

            {mostarBotaoSalvarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostarBotaoSalvarEvoltar && !mostarBotaoSalvarEvoltarCarregando && !smDown && !mdDown) 
            && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>save</Icon>}
                    onClick={() => aoClicarBotaoSalvarEVoltar?.()}
                >
                    <Typography variant="button" textOverflow={"ellipsis"} overflow={"hidden"} >
                        Salvar e Voltar
                    </Typography>
                </Button>
            )}

            {(mostarBotaoSalvarEvoltarCarregando && !smDown && !mdDown) && (
                <Skeleton width={140} height={60} />
            )}

            {(mostarBotaoNovo && !mostarBotaoNovoCarregando && !smDown) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>add</Icon>}
                    onClick={() => aoClicarBotaoNovo?.()}
                >
                    <Typography variant="button" textOverflow={"ellipsis"} overflow={"hidden"} >
                        {textoBotaoNovo}
                    </Typography>
                </Button>
            )}

            {(mostarBotaoNovoCarregando && !smDown) && (
                <Skeleton width={110} height={60} />
            )}

            {(mostarBotaoApagar && !mostarBotaoApagarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>delete</Icon>}
                    onClick={() => aoClicarBotaoApagar?.()}
                >
                    <Typography variant="button" textOverflow={"ellipsis"} overflow={"hidden"} >
                        Apagar
                    </Typography>
                </Button>
            )}

            {mostarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            <Divider variant="middle" orientation="vertical" />

            {(mostarBotaoVoltar && !mostarBotaoVoltarCarregando) && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={() => aoClicarBotaoVoltar?.()}
                >
                    <Typography variant="button" textOverflow={"ellipsis"} overflow={"hidden"} >
                        Voltar
                    </Typography>
                </Button>
            )}

            {mostarBotaoVoltarCarregando && (
                <Skeleton width={110} height={60} />
            )}
        </Box>
    );
};
