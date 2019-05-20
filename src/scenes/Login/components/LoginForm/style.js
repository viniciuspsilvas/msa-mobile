import React, { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'stretch',
    margin: 20,
  },

  keyboardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20,
  },

  linkForgotPassword: {
    color: '#3d3d3d',
    alignItems: 'center',
    flexGrow: 1,
    //justifyContent: 'center',
    marginTop: 10,
    fontSize: 15,
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: -120,
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