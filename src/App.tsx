import React, { FC, useState } from 'react';
import { Routing } from './components/Routing';
import { ContextColorShadow, ContextProgress } from './utils/context';

const App: FC = () => {
  const [progress, setProgress] = useState<boolean>(false);
  const [colorShadow, setColorShadow] = useState<string>('');

  return (
    <ContextProgress.Provider value={{ progress, setProgress }}>
      <ContextColorShadow.Provider value={{ colorShadow, setColorShadow }}>
        <Routing />
      </ContextColorShadow.Provider>
    </ContextProgress.Provider>
  );
};

export default App;
