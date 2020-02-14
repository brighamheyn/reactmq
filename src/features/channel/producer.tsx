import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { publish } from 'api/channel';

const Producer: React.FC = () => {

    const dispatch = useDispatch();

    const [exchange, setExchange] = useState("");

    const [route, setRoute] = useState("");

    const [data, setData] = useState("");

    return (
        <div className="flex-col">
            <div>EVENT EMITTER</div>
            <div className="p-2vh">
                <input type="text" value={exchange} onChange={e => setExchange(e.target.value)} />
            </div>
            <div className="p-2vh">
                <input type="text" value={route} onChange={e => setRoute(e.target.value)} />
            </div>
            <div className="p-2vh">
                <input type="text" value={data} onChange={e => setData(e.target.value)} />
            </div>
            <button onClick={e => dispatch(publish(data, exchange, route))}>Send</button>
        </div>
        
    );
}

export default Producer;