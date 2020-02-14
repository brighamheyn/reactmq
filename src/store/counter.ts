import { Reducer, AnyAction } from 'redux';
import produce, { Draft } from 'immer';

export enum CounterActions
{
    increment = "increment",
    decrement = "descrement",
}

export interface Increment extends AnyAction
{
    type: CounterActions.increment,
    step: number,
}

export interface Decrement extends AnyAction
{
    type: CounterActions.decrement,
    step: number,
}

export interface CounterState {
    count: number,
}

export const initialState: CounterState = {
    count: 0,
}

export const reducer: Reducer<CounterState, AnyAction> = (state: CounterState = initialState, action: AnyAction) => {
    return produce<CounterState>(state, (draft: Draft<CounterState>) => {
        switch (action.type) {
            case CounterActions.increment: {
                draft.count += action.step;
                return draft;
            }
            case CounterActions.decrement: {
                draft.count -= action.step;
                return draft;
            }
            default: {
                return state;
            }
        }
    });
}
