import React, { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 20,
    marginRight: 20,
  },

  label: {
    marginTop: 5,
    color: 'black',
    fontSize: 20,
  },

  labelError: {
    marginTop: 5,
    fontSize: 20,
    color: 'red',
  },

  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 5,
    fontSize: 20,
    color: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    textDecorationLine: 'none'
  },

  inputError: {
    height: 50,
    borderColor: 'red',
    borderWidth: 2,
    backgroundColor: 'white',
    marginTop: 5,
    fontSize: 20,
    color: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    textDecorationLine: 'none'
  },

  buttonSubmit: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EC1C24',
    marginTop: 25
  },

  textButton: {
    color: 'white',
    fontSize: 20,
  },

  labelErrorSmall: {
    fontSize: 12,
    color: '#EC1C24',
  }

});