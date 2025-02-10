import Slider from '@react-native-community/slider';
import { useCallback, useEffect, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {
  PlaybackState as BasePlaybackState,
  Track as BaseTrack,
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

import podcasts from '@/data/music';
import { primaryColor, secondaryColor } from '@/styles/colors';
import { secondsToMinutes } from '@/utils/time';

import styles from './MusicPlayer.styles';

export type Track = Omit<BaseTrack, 'artwork'> & {
  artwork?: ImageSourcePropType;
};

const podcastsCount = podcasts.length;

type PlaybackState = BasePlaybackState | { state: undefined };

function MusicPlayer() {
  const [playerInitialized, setPlayerInitialized] = useState<boolean>(false);
  const [track, setTrack] = useState<Track | undefined>();

  const playBackState = usePlaybackState();
  // todo: if loading, disable click states, and visually represent the loading state
  // or better, cache data so the loading time user wait time is reduced
  const uiColor =
    playBackState.state === State.Loading ? secondaryColor : primaryColor;

  const progress = useProgress();
  const durationRemaining = secondsToMinutes(progress.duration);
  const durationProgressed = secondsToMinutes(progress.position);

  const gettrackdata = async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack();

    if (!trackIndex) {
      return;
    }

    const track = await TrackPlayer.getTrack(trackIndex);

    if (!track) {
      return;
    }

    setTrack({
      ...track,
      artwork: track.artwork as ImageSourcePropType,
      index: trackIndex,
    });
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

  // todo: move away from deprecated type
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.nextTrack === null || event.type !== Event.PlaybackTrackChanged) {
      return;
    }

    const track = await TrackPlayer.getTrack(event.nextTrack);

    if (!track) {
      return;
    }

    setTrack({
      ...track,
      artwork: track.artwork as ImageSourcePropType,
      index: event.nextTrack,
    });
  });

  const togglePlayBack = async (playBackState: PlaybackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack === null) {
      return;
    }

    if (
      playBackState.state === State.Paused ||
      playBackState.state === State.Ready
    ) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

  const nexttrack = useCallback(async () => {
    if (!track) {
      return;
    }

    if (track.index < podcastsCount - 1) {
      await TrackPlayer.skipToNext();
    } else {
      await TrackPlayer.skip(0);
    }
    gettrackdata();
  }, [track]);

  const previoustrack = useCallback(async () => {
    if (!track) {
      return;
    }

    if (track.index > 0) {
      await TrackPlayer.skipToPrevious();
    } else {
      await TrackPlayer.skip(podcastsCount - 1);
    }
    gettrackdata();
  }, [track]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          {track?.artwork ? (
            <Image source={track.artwork} style={styles.imageWrapper} />
          ) : null}
        </View>
        <View style={styles.songText}>
          <Text
            style={[styles.songContent, styles.songTitle]}
            numberOfLines={3}
          >
            {track?.title}
          </Text>
          <Text
            style={[styles.songContent, styles.songArtist]}
            numberOfLines={2}
          >
            {track?.artist}
          </Text>
        </View>
        <View style={styles.musicControlsContainer}>
          <TouchableOpacity onPress={previoustrack}>
            <Ionicons name="play-skip-back-sharp" size={35} color={uiColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState.state === State.Playing
                  ? 'ios-pause-sharp'
                  : 'ios-play-sharp'
              }
              size={75}
              color={uiColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nexttrack}>
            <Ionicons
              name="play-skip-forward-sharp"
              size={35}
              color={uiColor}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Slider
            style={styles.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor={uiColor}
            minimumTrackTintColor={uiColor}
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
