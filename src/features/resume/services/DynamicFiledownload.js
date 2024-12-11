// import React from 'react';
// //// import axios from 'axios';
// //import Button from '../../../../components/common/Button/Button';

// const DynamicFileDownload = (data) => {
//  const handleDownload = async () => {
// 	// APIからデータを取得
// //    const data = await fetch("https://ai-assistant.core-akita.ac.jp/api/resume/excel"), {
// // 		method: "POST",
// // 		headers: {
// // 			"Content-Type": "application/json"
// // 		},
// // 		body: JSON.stringify({name: name,})
// // 	}
// //    const blob = new Blob([data], { type: 'text/plain' });
// //    const url = URL.createObjectURL(blob);

// //    const anchor = document.createElement('a');
// //    anchor.href = url;
// //    anchor.download = 'out.xlsx'; // ダウンロード時のファイル名
// //    anchor.click();

// //    // メモリリークを防ぐためURLを解放
// //    URL.revokeObjectURL(url);
//  };

//  return (
//    <Button onClick={handleDownload}>ダウンロード</Button>
//  );
// };

//export default DynamicFileDownload;

export function fetchBinary  (Data)  {
	fetch('https://ai-assistant.core-akita.ac.jp/api/resume/excel', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=UFT-8'
		},
		// body: JSON.stringify({ name: name ,})
	})
	.then(response => response.blob())
	.then(blob => {
	  const url = window.URL.createObjectURL(blob);
	  const a = document.createElement('a');
	  a.style.display = 'none';
	  a.href = url;
	  a.download = 'out.xlsx';
	  document.body.appendChild(a);
	  a.click();
	  window.URL.revokeObjectURL(url);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

export default fetchBinary;