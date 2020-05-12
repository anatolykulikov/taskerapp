import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, errorOccured, editTask, vieweTask, addTask } from 'actions/tasks.js';

const initialState = {
    loading: false,
    data: [],
    selectedTask: -1,
    error: false
}

export const reducer = handleActions({
    [loadStart]: (state) => {
        return {
            ...state,
            loading: true
        };
    },
    [dataReceived]: (state, action) => {
        return {
            ...state,
            loading: false,
            data: action.payload
        };
    },
    [errorOccured]: (state) => {
        return {
            ...state,
            loading: false,
            error: true
        };
    },
    [editTask]: (state, action) => {
        return {
            ...state,
            data: action.payload
        }
    },
    [vieweTask]: (state, action) => {
        return {
            ...state,
            selectedTask: action.payload
        }
    },
    [addTask]: (state, action) => {
        return {
            ...state,
            data: action.payload
        }
    }
}, initialState);