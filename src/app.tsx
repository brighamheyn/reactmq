import React from 'react';
import './style.scss';

import Channel from 'features/channel';

const App: React.FC = () => {
  return (
    <div className="h-100p w-100p bg-alabaster grid">
      <div className="col-xs-12-12">
        <div className="flex-col flex-1 bg-straw h-150">

        </div>
      </div>
      <div className="col-xs-3-12 bg-swans-down h-100vh">
        <div>Tools</div>
      </div>
      <div className="col-xs-9-12">
        <Channel />
      </div>
    </div>
  );
}

export default App;
