import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';

import App from './src/App';
import playbackService from './src/services/TrackPlayer';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => playbackService);
