import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { backgroundColor: '#f4f5fb', flex: 1 },
  wrapper: { backgroundColor: '#FFF', paddingHorizontal: 15, flex: 1 },
  headerContent: { marginTop: 20 },
  headerTitle: { fontSize: 20, color: '#212529', marginBottom: 8 },
  headerDescription: { fontSize: 16, color: '#212529', marginBottom: 16 },
  content: {
    backgroundColor: '#f4f5fb',
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: { flex: 3.33 },
  leftContentWrapper: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e6ecf3',
    paddingVertical: 16,
  },
  chooseUsername: { marginBottom: 24 },
  chooseUsernameText: {
    marginBottom: 8,
    fontSize: 16,
    color: '#212529',
    paddingHorizontal: 5,
  },
  mainContent: { flex: 6.67 },
  channelHeader: {
    paddingHorizontal: 15,
    height: 65,
    paddingTop: 20,
  },
  channelText: { fontSize: 18, fontWeight: '500', paddingHorizontal: 5 },
});

export default styles;
