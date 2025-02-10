import { Dimensions, StyleSheet } from 'react-native';

import { primaryColor } from '@/styles/colors';

const { width } = Dimensions.get('window');

// todo: move to design system file, use design token
const padding = 30;

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
    color: '#ccc',
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

export default styles;
