import { useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  type AddTrack,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { Event } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Playlist.styles';

const playlistCoverImage = require('@/assets/premium_photo-1739145827332-01a282c97339.jpg');

type PlaylistProps = {
  tracks: AddTrack[];
  onSelectTrack: (trackIndex: number) => void;
};
const Playlist = ({ tracks, onSelectTrack }: PlaylistProps) => {
  // todo: consider passing state down from App for
  // more pure components and state flow, for easier debugging
  const [currentTrackId, setCurrentTrackId] = useState<number>(0);
  const playBackState = usePlaybackState();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.nextTrack === null || event.type !== Event.PlaybackTrackChanged) {
      return;
    }
    setCurrentTrackId(event.nextTrack);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={playlistCoverImage} style={styles.cover} />
        <Text style={styles.title}>Vibes</Text>
        <Text style={styles.author}>by Mini Audio</Text>
      </View>
      <ScrollView style={styles.list}>
        {/* todo: move into Track component */}
        {tracks.map(({ artwork, artist, title }, index) => {
          const isLastTrack = index === tracks.length - 1;
          const isCurrentTrack = currentTrackId === index;
          return (
            <TouchableOpacity
              key={title}
              onPress={() => onSelectTrack(index)}
              style={{
                ...styles.track,
                marginBottom: isLastTrack ? 150 : 20,
              }}
            >
              <Text style={styles.playIndicator}>
                {isCurrentTrack ? (
                  <Ionicons
                    name={
                      playBackState.state === State.Playing
                        ? 'ios-play-circle'
                        : 'ios-pause-circle'
                    }
                    size={20}
                    color="#fff"
                  />
                ) : (
                  ''
                )}
              </Text>
              {artwork ? (
                <Image
                  // todo: properly cast this
                  source={artwork as ImageSourcePropType}
                  style={styles.trackArtwork}
                />
              ) : null}
              <View style={styles.trackText}>
                <Text style={{ ...styles.trackTitle }} numberOfLines={2}>
                  {title}
                </Text>
                <Text style={styles.trackArtist} numberOfLines={1}>
                  {artist}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Playlist;
