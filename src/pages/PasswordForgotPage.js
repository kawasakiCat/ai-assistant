import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import PasswordForgot from '../features/auth/components/PasswordForgot';

const PassewordForgotPage = () => {
    return (
        <>
			<Navigation />
			{/* <h1>ログインページ</h1> */}
            <PasswordForgot />
        </>
    );
}

export default PassewordForgotPage;