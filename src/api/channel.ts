import { AnyAction } from 'redux';
import { BatchAction } from 'redux-batched-actions';

import { AppState } from 'store';
import { Method, Command, Handler, batch } from 'api';
import { Queue, Message, createMessage } from 'store/channel';

export const publish: Command<Message.Publish, void> = <T>(data: T, exchange: string = "", route: string = "") => {

    let msg = createMessage(data, exchange, route);

    return (dispatch: Handler<Message.Publish>): void => {
        dispatch({type: "message.publish", data: msg} as Message.Publish);
    }
}

export const consume: Command<Message.Consume, void> = (messageId: string) => {
    return (dispatch: Handler<Message.Consume>): void => {
        dispatch({type: "message.consume", data: messageId} as Message.Consume);
    }
}

export const bindQueue: Command<Queue.BindExchange, void> = (queue: string, exchange: string) => {
    return (dispatch: Handler<Queue.BindExchange>): void => {
        dispatch({type: "queue.bind-exchange", data: {queue, exchange}} as Queue.BindExchange);
    }
}