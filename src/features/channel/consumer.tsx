import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';
import { consume } from 'api/channel';

const Consumer: React.FC = () => {

    const dispatch = useDispatch();

    const messageIds = useSelector((state: AppState) => {
        return Array.from(state.channel.messages.keys());
    });

    const [messageId, setMessageId] = useState(messageIds[0] || "");

    const consumeEvent = () => dispatch(consume(messageId));

    return (
        <div className="flex-col">
            <div>EVENT CONSUMER</div>
            <div className="p-2vh">
                <select value={messageId} onChange={e => setMessageId(e.target.value)}>
                    <option key="-1" value=""></option>
                    {messageIds.map((messageId, index) => {
                        return <option key={index} value={messageId}>{messageId}</option>
                    })}
                </select>
            </div>
            <button onClick={consumeEvent}>Consume</button>
        </div>
        
    );
}

export default Consumer;