import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from 'store';

const MessageTable: React.FC = () => {

    const messages = useSelector((state: AppState) => {
        return Array.from(state.channel.messages);
    });

    return (
        <div className="flex-col">
            <div className="fs-2vh">CHANNEL</div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>exchange</th>
                        <th>route</th>
                        <th>data</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(([id, msg], index) => 
                    <tr key={index}>
                        <td>{id}</td>
                        <td>{msg.exchange}</td>
                        <td>{msg.route}</td>
                        <td>
                            <pre>{JSON.stringify(msg.data, null, 2)}</pre>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MessageTable;