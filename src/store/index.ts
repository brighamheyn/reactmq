import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';

import * as Counter from './counter'
import * as Channel from './channel';



export type Guid = string;

export const createGuid = (): Guid => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export type Entity<T> = T & {id: Guid}

export interface AppState
{
    counter: Counter.CounterState,
    channel: Channel.State,
}

const initialState: AppState = {
    counter: Counter.initialState,
    channel: Channel.initialState,
}

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const rootReducer = combineReducers({
    counter: Counter.reducer,
    channel: Channel.reducer,
});

const batchEnabledReducer = enableBatching(rootReducer);

const middlewares = [thunk];

export const store = createStore(batchEnabledReducer, initialState, applyMiddleware(...middlewares));