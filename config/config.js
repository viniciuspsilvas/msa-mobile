import { BACKEND_URL, BACKEND_PORT } from 'react-native-dotenv'


const FULL_BACKEND_URL = BACKEND_URL + (BACKEND_PORT ?  ":"+ BACKEND_PORT : "");

var backend = {

	// Students API - '/api/Students'
	students: FULL_BACKEND_URL + '/api/Students',
	loginMoodle: FULL_BACKEND_URL + '/api/Students/loginMoodle',	
	studentAdvices: FULL_BACKEND_URL + '/api/StudentAdvices',
	getAttendance: FULL_BACKEND_URL + '/api/Students/getAttendance',
	

	messages: FULL_BACKEND_URL + '/api/Messages',
	//groupStudents: FULL_BACKEND_URL + '/groupStudents',
}

var config = {
	backend_port: BACKEND_PORT,
	backend_url: FULL_BACKEND_URL,
	backend: backend
}

module.exports = config;