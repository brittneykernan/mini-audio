import type { AddTrack } from 'react-native-track-player';

// todo: fix eslint issue, dont ignore
/* eslint-disable global-require */
const tracks: AddTrack[] = [
  {
    title: 'Lofi Music HipHop',
    artist: 'DELO',
    artwork: require('../../assets/photo-1729420477981-fb92a9c5bca2.jpg'),
    url: 'https://cdn.pixabay.com/audio/2025/02/06/audio_a03861049b.mp3',
  },
  {
    title: 'Good Night',
    artist: 'Fass',
    artwork: require('../../assets/photo-1693967901821-dfa5ae7bdd1e.jpg'),
    url: 'https://cdn.pixabay.com/audio/2023/07/30/audio_e0908e8569.mp3',
  },
  {
    title:
      'IA : Microsoft investit 10 milliards dans Open AI pour tout dominer ?',
    artist: 'Choses à savoir TECH',
    artwork: require('../../assets/photo-1738494610263-4e27d9d4e201.jpg'),
    url: 'https://traffic.megaphone.fm/FODL8281657475.mp3?updated=1673441802',
  },
  {
    title: '143 - Intelligenza Artificiale Generativa con Jacopo Perfetti',
    artist: 'Hacking Creativity',
    artwork: require('../../assets/108164_0_idF_idE_500x500.jpg'),
    url: 'https://chtbl.com/track/9E947E/api.spreaker.com/download/episode/52096290/def_hc_perfetti_v2_loud.mp3',
  },
  {
    title: 'Lettera a un nemico',
    artist: 'Serafina',
    artwork: require('../../assets/2142935_0_idF_idE_500x500.jpg'),
    url: 'https://api.spreaker.com/download/episode/43447400/letteraoreste.mp3',
  },
];

export default tracks;
