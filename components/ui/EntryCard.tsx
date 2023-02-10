import { FC, DragEvent, useContext } from 'react';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);

    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData('text', entry._id);
        // TODO: Modificar el estado para indicar que estoy haciendo drag
        startDragging();
    }

    const onDragEnd = () => {
        // TODO: Cancelar onDrag
        endDragging();
    }

    return (
        <Card 
            sx={{ marginBottom: 1 }}
            // Eventos Drag
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
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
