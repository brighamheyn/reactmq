import { Reducer, AnyAction } from 'redux';
import { produce, Draft } from 'immer';

import { Guid, createGuid, Entity } from 'store';

export interface Channel {
    id: Guid,
}

export interface Message<T> {
    data: T;
    exchange: string;
    route: string;
    timestamp: number;
}

export interface AnyMessage extends Message<any> {}

export declare namespace Message 
{
    export interface Publish extends AnyAction
    {
        type: "message.publish",
        data: AnyMessage,
    }

    export interface Consume extends AnyAction
    {
        type: "message.consume",
        data: string,
    }
}

export const createMessage = <T>(data: T, exchange: string = "", route: string = ""): Message<T> => {
    return {
        data,
        exchange,
        route,
        timestamp: Date.now(),
    }
}

export enum ExchangeType 
{
    direct = "direct",
    topic = "topic",
    fanout = "fanout",
}

export interface Exchange 
{
    name: string,
    type: ExchangeType
}

export declare namespace Exchange
{
    export interface BindQueue extends AnyAction
    {
        type: "exchange.bind-queue",
        data: {queue: string, exchange: string},
    }
}

export interface Queue 
{
    name: string,
}

export declare namespace Queue 
{
    export interface BindExchange extends AnyAction
    {
        type: "queue.bind-exchange",
        data: {queue: string, exchange: string},
    }
}

export interface State
{
    messages: Map<Guid, AnyMessage>,
    queues: Map<Guid, Queue>,
    exchanges: Map<Guid, Exchange>,
    bindings: Map<string, string[]>,
}

export const initialState: State = {
    messages: new Map<Guid, AnyMessage>(),
    queues: new Map<Guid, Queue>(),
    exchanges: new Map<Guid, Exchange>(),
    bindings: new Map<string, string[]>(),
}

export const reducer: Reducer<State, AnyAction> = (state: State = initialState, action: AnyAction) => {
    return produce(state, (draft: Draft<State>) => {
            switch (action.type) {
            case "message.publish" : {
                
                draft.messages.set(createGuid(), action.data);

                return draft;
            }
            case "message.consume" : {

                let messageId = action.data;
                
                draft.messages.delete(messageId);

                return draft;
            }
            case "queue.bind-exchange" : {
                let {queue, exchange} = action.data;

                if (draft.queues.has(queue) && draft.exchanges.has(exchange)) {
                    let bindings = draft.bindings.get(exchange) ?? [];
                    bindings.push(queue);
                    draft.bindings.set(exchange, bindings);
                }

                return draft;
            }
            default: {
                return state;
            }
        }
    })
}
