import React, { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  keyboardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20,
  },

  linkForgotPassword: {
    color: '#dd3233',
    alignItems: 'center',
    flexGrow: 1,
    //justifyContent: 'center',
    marginTop: 20,
    fontSize: 20,
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 0,
  },

  logo: {
    height: 150,
    width: 150
  },


  footer: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },


  footerContainer: {
    height: 60,
    backgroundColor: '#dd3233',
    justifyContent: 'flex-end',


  },



});