import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from './App';
import VeeValidate from 'vee-validate';

// Import components
import Register from './components/pages/Register.vue';
import Hello from './components/pages/Hello.vue';
import Login from './components/pages/Login.vue';
import Users from './components/pages/Users.vue';
import Notes from './components/pages/Notes.vue';
import NoteSingle from './components/pages/NoteSingle.vue';
import Verify from './components/pages/Verify.vue';
import ForgotPassword from './components/pages/ForgotPassword.vue';
import ResetPassword from './components/pages/ResetPassword.vue';

//Auth Setup
// Check the user's auth status when the app starts
import auth from './auth'
auth.checkAuth();
Vue.use(VeeValidate);
Vue.use(Resource);
Vue.use(Router);

// Routes
export var router = new Router({
	mode: 'history',
	routes: [
		{ path: '/', component: Hello },
		{ path: '/users', component: Users, meta: { requiresAuth: true, requiresAdmin: true } },
		{ path: '/register', component: Register, meta: { checksAuth: true } },
		{ path: '/login', component: Login, meta: { checksAuth: true } },
		{ path: '/notes', component: Notes },
		{ path: '/verify', component: Verify },
		{ path: '/forgotpassword', component: ForgotPassword },	
		{ path: '/reset/:token', component: ResetPassword },	
		{ path: '/verify/:id/:token', component: Verify },
		{ name: 'noteSingle', path: '/notes/:id', component: NoteSingle }
	]
});

Vue.http.options.root = 'http://localhost:3000/api';
// console.log(auth.getAuthHeader());
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';

//Protect authenticated routes with Route Meta tags.
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!auth.user.authenticated) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	}
	if (to.matched.some(record => record.meta.requiresAdmin)) {
		console.log(auth.user);
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (auth.user.role == 'admin') {
			next()
		} else {
			next({
				path: '/',
				query: { redirect: to.fullPath }
			})
		}
	}
	if (to.matched.some(record => record.meta.checksAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (auth.user.authenticated) {
			next({
				path: '/',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next() // make sure to always call next()!
	}
})

//Build app into #app div
const app = new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app')
