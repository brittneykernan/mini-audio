import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';

import playbackService from './src/services/TrackPlayer';
import App from './src/templates/App';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => playbackService);
