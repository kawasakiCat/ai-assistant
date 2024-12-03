import React from 'react';
import ResumeForm from '../features/resume/components/ResumeForm/ResumeForm';
import Navigation from '../components/Navigation/Navigation';

const ResumePage = () => {
    return (
			<div>
				<Navigation />
				<h1>履歴書作成ページ</h1>
				<ResumeForm />
			</div>
	);
};

export default ResumePage;
