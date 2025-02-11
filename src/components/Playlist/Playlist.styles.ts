import { Platform, StatusBar, StyleSheet } from 'react-native';

const paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    paddingTop,
    backgroundColor: '#333831',
  },
  header: {
    flex: 1,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    height: 200,
    width: 200,
    backgroundColor: 'red',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    lineHeight: 48,
  },
  author: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 30,
  },
  list: {
    flex: 1,
    padding: 20,
    // todo: handle height of scrollview better,
    // so playlist isn't cut off by bottom sheet
    // and all items are visible across platforms
    marginBottom: 110,
  },
  track: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    gap: 15,
    flexDirection: 'row',
  },
  trackArtwork: { height: 60, width: 60 },
  trackText: {
    flex: 1,
    flexShrink: 1,
    gap: 5,
  },
  trackTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  trackArtist: {
    color: '#fff',
  },
});

export default styles;
