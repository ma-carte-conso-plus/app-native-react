import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 0,
    width: '100%'
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 10,
    padding: 5,
    marginBottom: 0,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.35,
  },
  logoutButton: {
    alignSelf: 'stretch',
    resizeMode: 'contain',
    width: 60,
    height: 60
  }
});