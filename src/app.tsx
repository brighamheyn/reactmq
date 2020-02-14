import React from 'react';
import './style.scss';

import Channel from 'features/channel';

const App: React.FC = () => {
  return (
    <div className="h-100p w-100p bg-alabaster flex-col flex-1">
      <Channel />
    </div>
  );
}

export default App;
