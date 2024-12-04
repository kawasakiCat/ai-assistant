import React from 'react';
import Settings from '../features/settings/components/Settings';
import Navigation from '../components/Navigation/Navigation';
import PasswordChangeForm from '../features/auth/components/PasswordChangeForm';

const SettingsPage = () => {
    return (
		<div>
			<Navigation />
	    <h1>設定</h1>
			<PasswordChangeForm />
			<Settings />
		</div>
	);
};

export default SettingsPage;