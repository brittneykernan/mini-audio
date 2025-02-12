import { useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MusicPlayer from '@/components/MusicPlayer';
import type { Mode } from '@/components/MusicPlayer/MusicPlayer';

const snapPointsPerMode = {
  mini: 15,
  full: 100,
} as const;
const modes = Object.keys(snapPointsPerMode);
const snapPoints = Object.values(snapPointsPerMode);

const Drawer = () => {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<Mode>('mini');

  return (
    <ActionSheet
      backgroundInteractionEnabled
      closable={false}
      containerStyle={{
        // todo: move to style file
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222831',
      }}
      disableDragBeyondMinimumSnapPoint
      drawUnderStatusBar
      gestureEnabled
      id="drawer"
      indicatorStyle={{
        width: 150,
      }}
      isModal={false}
      safeAreaInsets={insets}
      snapPoints={snapPoints}
      onSnapIndexChange={(snapIndex: number) => {
        // todo: better type casting
        setMode((modes[snapIndex] as Mode) ?? 'mini');
      }}
    >
      <MusicPlayer mode={mode} />
    </ActionSheet>
  );
};

export default Drawer;
