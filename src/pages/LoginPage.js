import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage = () => {
    return (
		<div>
			<Navigation />
			<h1>ログインページ</h1>
			<LoginForm />
		</div>
	);
};

export default LoginPage;