import '@/sheets/sheets';

import { useEffect, useState } from 'react';
import { SheetManager, SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import podcasts from '@/data/music';

import Playlist from './components/Playlist';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onSelectTrack = () => {
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      SheetManager.show('drawer');
    }
  }, [isDrawerOpen]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <SheetProvider context="global">
          <Playlist tracks={podcasts} onSelectTrack={onSelectTrack} />
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
