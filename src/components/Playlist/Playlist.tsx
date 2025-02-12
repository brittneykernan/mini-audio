import type { ImageSourcePropType } from 'react-native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { AddTrack } from 'react-native-track-player';

import styles from './Playlist.styles';

const playlistCoverImage = require('@/assets/premium_photo-1739145827332-01a282c97339.jpg');

type PlaylistProps = {
  tracks: AddTrack[];
  onSelectTrack: (trackIndex: number) => void;
};
const Playlist = ({ tracks, onSelectTrack }: PlaylistProps) => {
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
          return (
            <TouchableOpacity
              key={title}
              onPress={() => onSelectTrack(index)}
              style={{
                ...styles.track,
                marginBottom: isLastTrack ? 150 : 20,
              }}
            >
              {artwork ? (
                <Image
                  // todo: properly cast this
                  source={artwork as ImageSourcePropType}
                  style={styles.trackArtwork}
                />
              ) : null}
              <View style={styles.trackText}>
                <Text style={styles.trackTitle} numberOfLines={2}>
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
