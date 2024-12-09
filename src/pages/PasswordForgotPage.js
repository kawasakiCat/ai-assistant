import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import PasswordForgot from '../features/auth/components/PasswordForgotForm';
import PasswordForgotChange from '../features/auth/components/PasswordForgotChangeForm';


const PassewordForgotPage = () => {
    return (
        <>
			<Navigation />
            <h1>パスワードをお忘れですか？</h1>
            <PasswordForgot />
            <PasswordForgotChange />
        </>
    );
}

export default PassewordForgotPage;