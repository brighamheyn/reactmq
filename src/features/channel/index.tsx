import React from 'react';

import Producer from './producer';
import Consumer from './consumer';
import MessageTable from './message-table';

const Channel: React.FC = () => {


    return (
        <div className="flex-col bdr-1 p-4vh">
            <Producer />
            <MessageTable />
            <Consumer />
        </div>
    );
}

export default Channel;