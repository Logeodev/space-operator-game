import { StyleSheet } from 'react-native';

const colors = {
  primary:'#7abdc5',
  secondary:'#b5cee2',
  lightBg:'#f4faff',
  darkBG:'#d9d9d9'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.lightBg
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 16,
    marginBottom: 10
  },
  text: {
    fontSize: 14,
    marginBottom: 20
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%'
  },
  btnPrimary: {
    margin: 4,
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 2
  },
  btnSecondary: {
    margin: 4,
    padding: 5,
    backgroundColor: colors.secondary,
    borderRadius: 2
  },
  playerList: {
    backgroundColor:colors.darkBG,
    borderRadius:2,
    padding:5,
    minWidth:100,
    alignItems:'center'
  }
});

export default styles;