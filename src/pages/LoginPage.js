import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import LoginForm from '../features/auth/components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
		<div>
			<Navigation />
			<h1>ログインページ</h1>
			<LoginForm />
			<Link to="/pwforgot">パスワードをお忘れの方</Link>
            <Link to="/signup">アカウントをお持ちでない方</Link>

		</div>
	);
};

export default LoginPage;
