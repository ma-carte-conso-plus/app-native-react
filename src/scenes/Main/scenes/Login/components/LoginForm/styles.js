import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    flexDirection: 'row'
  },
  left: {
    alignItems: 'flex-start'
  },
  top: {
    justifyContent: 'flex-start'
  },
  button : {
    alignSelf: 'center',
  },

  error: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'red',
    padding: 20
  }
});