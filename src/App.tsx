import '@/sheets/sheets';

import { useEffect } from 'react';
import { SheetManager, SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';

import podcasts from '@/data/tracks';

import Playlist from './components/Playlist';

const App = () => {
  const onSelectTrack = async (trackIndex: number) => {
    await TrackPlayer.skip(trackIndex);
  };

  useEffect(() => {
    // todo: replace settimeout with the appropriate
    // state change event, need to find one for SheetManager
    // or use a different library
    setTimeout(() => {
      SheetManager.show('drawer');
    }, 100);
  }, []);

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
