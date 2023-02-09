import { EntriesState } from './'

type EntriesActionType = 
| { type: 'UI - Open Sidebar' }
| { type: 'UI - Close Sidebar' }

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch (action.type) {
        //case 'UI - Open Sidebar':
          //  return {
            //     ...state,
               // sidemenuOpen: true
            //}
        default:
            return state;
    }

}
