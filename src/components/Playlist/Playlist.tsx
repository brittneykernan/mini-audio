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

type PlaylistProps = {
  tracks: AddTrack[];
  onSelectTrack: () => void;
};
const Playlist = ({ tracks, onSelectTrack }: PlaylistProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.cover} />
        <Text style={styles.title}>Playlist 1</Text>
        <Text style={styles.author}>By Mini Audio</Text>
      </View>
      <ScrollView style={styles.list}>
        {/* todo: move into Track component */}
        {tracks.map(({ artwork, artist, title }) => {
          return (
            <TouchableOpacity
              key={title}
              onPress={onSelectTrack}
              style={styles.track}
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
