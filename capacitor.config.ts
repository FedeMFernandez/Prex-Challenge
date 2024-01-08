import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prex.cinema',
  appName: 'CinemApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
};

export default config;
