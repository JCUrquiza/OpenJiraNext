import React, { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { v4 as uuidv4} from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../apis/entriesApi';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
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

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] Entry-Updated', payload: entry });
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-Data', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,
            // Methods
            addNewEntry,
            updateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}
