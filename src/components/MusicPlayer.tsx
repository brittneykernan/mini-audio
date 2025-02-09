import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {
  PlaybackState as BasePlaybackState,
  ResourceObject,
} from 'react-native-track-player';
import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

import podcasts from '../data/music';

const { width } = Dimensions.get('window');

// todo: move to design system file, use design token
const padding = 30;
const primaryColor = '#fff';
const secondaryColor = '#ddd';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWrapper: {
    width,
    height: width,
    padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  songText: {
    paddingLeft: padding,
    paddingRight: padding,
    height: 70,
  },
  songContent: {
    textAlign: 'center',
    color: primaryColor,
  },
  songTitle: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '600',
  },
  songArtist: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
  },
  progressBar: {
    alignSelf: 'stretch',
    marginTop: padding - 10,
    marginLeft: padding,
    marginRight: padding,
  },
  progressLevelDuration: {
    width,
    paddingLeft: padding,
    paddingRight: padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: secondaryColor,
  },
  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: padding,
    marginBottom: 0,
    width: '60%',
  },
});

// todo: move to helper
function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

type PlaybackState = BasePlaybackState | { state: undefined };

function MusicPlayer() {
  const podcastsCount = podcasts.length;
  const [playerInitialized, setPlayerInitialized] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackTitle, setTrackTitle] = useState<string>();
  const [trackArtist, setTrackArtist] = useState<string>();
  const [trackArtwork, setTrackArtwork] = useState<ResourceObject>();

  const playBackState = usePlaybackState();

  const progress = useProgress();
  const durationRemaining = secondsToMinutes(progress.duration);
  const durationProgressed = secondsToMinutes(progress.position);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);

      if (!track) {
        return;
      }

      const { title = '', artwork, artist = '' } = track;

      // eslint-disable-next-line no-console
      console.log('PlaybackTrackChanged', event.nextTrack);
      setTrackIndex(event.nextTrack);
      setTrackTitle(title);
      setTrackArtist(artist);
      // todo: handle types without casting
      setTrackArtwork(artwork as unknown as ResourceObject);
    }
  });

  const gettrackdata = async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack();

    if (!trackIndex) {
      return;
    }

    const trackObject = await TrackPlayer.getTrack(trackIndex);

    if (!trackObject) {
      return;
    }

    // eslint-disable-next-line no-console
    console.log('gettrackdata', trackIndex);
    setTrackIndex(trackIndex);
    setTrackTitle(trackObject.title);
    setTrackArtist(trackObject.artist);
    // todo: handle types without casting
    setTrackArtwork(trackObject.artwork as unknown as ResourceObject);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const togglePlayBack = async (playBackState: PlaybackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (
        playBackState.state === State.Paused ||
        playBackState.state === State.Ready
      ) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const nexttrack = async () => {
    if (trackIndex < podcastsCount - 1) {
      await TrackPlayer.skipToNext();
    } else {
      await TrackPlayer.skip(0);
    }
    gettrackdata();
  };

  const previoustrack = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
    } else {
      await TrackPlayer.skip(podcastsCount - 1);
    }
    gettrackdata();
  };

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
          ],
        });
        await TrackPlayer.add(podcasts);
        await gettrackdata();
        await TrackPlayer.play();
        setPlayerInitialized(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    if (!playerInitialized) {
      setupPlayer();
    }
  }, [playerInitialized]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          {trackArtwork ? (
            <Image source={trackArtwork} style={styles.imageWrapper} />
          ) : null}
        </View>
        <View style={styles.songText}>
          <Text
            style={[styles.songContent, styles.songTitle]}
            numberOfLines={3}
          >
            {trackTitle}
          </Text>
          <Text
            style={[styles.songContent, styles.songArtist]}
            numberOfLines={2}
          >
            {trackArtist}
          </Text>
        </View>
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity onPress={previoustrack}>
            <Ionicons
              name="play-skip-back-sharp"
              size={35}
              color={primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState.state === State.Playing
                  ? 'ios-pause-sharp'
                  : 'ios-play-sharp'
              }
              size={75}
              color={primaryColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nexttrack}>
            <Ionicons
              name="play-skip-forward-sharp"
              size={35}
              color={primaryColor}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor={primaryColor}
            minimumTrackTintColor={primaryColor}
            maximumTrackTintColor="#444"
            onSlidingComplete={async (value) => TrackPlayer.seekTo(value)}
          />
          <View style={styles.progressLevelDuration}>
            <Text style={styles.progressLabelText}>{durationProgressed}</Text>
            <Text style={styles.progressLabelText}>{durationRemaining}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MusicPlayer;
