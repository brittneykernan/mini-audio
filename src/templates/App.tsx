import '@/sheets/sheets';

import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SheetManager, SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
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
          <TouchableOpacity
            onPress={openDrawer}
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: '#2563eb',
              paddingHorizontal: 10,
              borderRadius: 10,
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: { width: 0.3 * 4, height: 0.5 * 4 },
              shadowOpacity: 0.2,
              shadowRadius: 0.7 * 4,
              width: '100%',
              marginTop: 100,
              marginBottom: 10,
            }}
          >
            <Text>Select Song</Text>
          </TouchableOpacity>
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
