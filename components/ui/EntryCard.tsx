import { FC } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    return (
        <Card 
            sx={{ marginBottom: 1 }}
            // Eventos Drag
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{ entry.createAt }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
