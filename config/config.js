import { BACKEND_URL } from 'react-native-dotenv'
 
var backend = {
  
	// Students API - '/api/Students'
	students: BACKEND_URL + '/api/Students',
	loginMoodle: BACKEND_URL + '/api/Students/loginMoodle',	
	studentAdvices: BACKEND_URL + '/api/StudentAdvices',
	getAttendance: BACKEND_URL + '/api/Students/getAttendance',
	

	messages: BACKEND_URL + '/api/Messages',
	//groupStudents: BACKEND_URL + '/groupStudents',
}

var config = {
	backend_url: BACKEND_URL,
	backend: backend
}

module.exports = config;