const BACKEND_PORT= "3000";
const BACKEND_URL= "http://192.168.43.7";
//const BACKEND_URL= "http://10.0.0.6";


const FULL_BACKEND_URL = BACKEND_URL + ":"+ BACKEND_PORT;

var backend = {
	students: FULL_BACKEND_URL + '/students',
	groupStudents: FULL_BACKEND_URL + '/groupStudents',
	messages: FULL_BACKEND_URL + '/messages',
	login: FULL_BACKEND_URL + '/api/CustomUsers/loginMoodle',
	userAdvices: FULL_BACKEND_URL + '/api/UserAdvices',
	
}

var config = {
	backend_port: BACKEND_PORT,
	backend_url: FULL_BACKEND_URL,
	backend: backend
}

module.exports = config;