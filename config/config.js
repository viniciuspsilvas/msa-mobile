const BACKEND_PORT= "3000";
//const BACKEND_URL= "http://192.168.43.7";
const BACKEND_URL= "http://10.0.0.6";

const FULL_BACKEND_URL = BACKEND_URL + ":"+ BACKEND_PORT;

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