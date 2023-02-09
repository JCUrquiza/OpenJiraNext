import React, { FC, useReducer, PropsWithChildren } from 'react';
import { v4 as uuidv4} from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Lorem ipsum',
            status: 'pending',
            createAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'agree in',
            status: 'in-progress',
            createAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'the finish',
            status: 'finished',
            createAt: Date.now() - 10000
        }
    ]
}

type Props = {};
export const EntriesProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer, Entries_INITIAL_STATE );

    const addNewEntry = ( description: string ) => {
   
        const newEntry: Entry = {
            _id: uuidv4(),
            description: description,
            createAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: '[Entry] Add-Entry', payload: newEntry });

    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            // Methods
            addNewEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}
