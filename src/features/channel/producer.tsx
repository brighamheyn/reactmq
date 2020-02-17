import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { publish } from 'api/channel';

import JsonForm from 'features/json-form';

const Producer: React.FC<{data?: any, exchange?: string, route?: string}> = ({data = "", exchange = "", route = ""}) => {

    const dispatch = useDispatch();

    let state = {data, exchange, route}

    const handleChange = (patch: {[key: string]: any}) => {
        state = Object.assign({}, state, patch);
    }

    const handleSubmit = () => {
        let {data, exchange, route} = state;
        dispatch(publish(data, exchange, route))
    }

    return (
        <div className="flex-col">
            <div>PRODUCER</div>
            <div>
                <JsonForm data={{exchange, route, data}} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
        
    );
}

export default Producer;