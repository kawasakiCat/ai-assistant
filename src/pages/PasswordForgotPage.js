import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import PasswordForgot from '../features/auth/components/PasswordForgotForm';
import PasswordChangeForm from '../features/auth/components/PasswordChangeForm';

const PassewordForgotPage = () => {
    return (
        <>
			<Navigation />
            <h1>パスワードをお忘れですか？</h1>
            <PasswordForgot />
            <PasswordChangeForm />
        </>
    );
}

export default PassewordForgotPage;