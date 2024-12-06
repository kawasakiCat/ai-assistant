//import React from 'react';
//// import axios from 'axios';
//import Button from '../../../../components/common/Button/Button';

//const DynamicFileDownload = (data) => {
//  const handleDownload = async () => {
//	// APIからデータを取得
//    const data = await fetch("https://ai-assistant.core-akita.ac.jp/api/resume/excel"), {
//		method: "POST",
//		headers: {
//			"Content-Type": "application/json"
//		},
//		body: JSON.stringify({name: name,})
//	}
//    const blob = new Blob([data], { type: 'text/plain' });
//    const url = URL.createObjectURL(blob);

//    const anchor = document.createElement('a');
//    anchor.href = url;
//    anchor.download = 'out.xxlsx'; // ダウンロード時のファイル名
//    anchor.click();

//    // メモリリークを防ぐためURLを解放
//    URL.revokeObjectURL(url);
//  };

//  return (
//    <Button onClick={handleDownload}>ダウンロード</Button>
//  );
//};

//export default DynamicFileDownload;
