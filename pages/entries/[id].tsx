import { ChangeEvent, useState, useMemo, FC } from 'react';
import { GetServerSideProps } from 'next';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, TextField, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts';
import { Entry, EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const [inputValue, setinputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const onInputValueChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        setinputValue( event.target.value );
    }

    const onStatusChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        console.log( event.target.value );
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {

    }

    return (

        <Layout title={ inputValue.substring(0, 20) + ' ...' }>
            <Grid 
                container 
                justifyContent='center'
                sx={{ marginTop:2 }} >

                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${inputValue}`}
                            subheader={`Creada hace ... minutos`} />

                        <CardContent>
                            <TextField 
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                value={ inputValue }
                                onBlur={ () => setTouched(true) } 
                                onChange={ onInputValueChange }
                                helperText={ isNotValid && 'Ingrese un valor' }
                                error={ isNotValid }
                                />

                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup 
                                    row 
                                    value={ status }
                                    onChange={ onStatusChange } >
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel 
                                                key={option}
                                                value={option}
                                                control={ <Radio/> }
                                                label={ capitalize(option) } />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button 
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained' 
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0 } >
                                    Save
                                </Button>
                        </CardActions>

                    </Card>
                </Grid>

            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}>
                <DeleteOutlinedIcon />
            </IconButton>

        </Layout>

    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // const { data } = await   your fetch function here 
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;
