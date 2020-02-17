import React from 'react';

import Producer from './producer';
import Consumer from './consumer';
import MessageTable from './message-table';

const Channel: React.FC = () => {


    return (
        <div className="flex-col bdr-1 p-4vh">
            <div className="bdr-1 bdr-denim">
                <Producer />
            </div>
            <div className="bdr-1 bdr-concrete">
                <MessageTable />
            </div>
            <div className="bdr-1 bdr-concrete">
                <Consumer />
            </div>
        </div>
    );
}

export default Channel;