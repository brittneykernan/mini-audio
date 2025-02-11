import ActionSheet from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MusicPlayer from '@/components/MusicPlayer';

const Drawer = () => {
  const insets = useSafeAreaInsets();

  return (
    <ActionSheet
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
      indicatorStyle={{
        width: 150,
      }}
      safeAreaInsets={insets}
      snapPoints={[30, 100]}
    >
      <MusicPlayer />
    </ActionSheet>
  );
};

export default Drawer;
