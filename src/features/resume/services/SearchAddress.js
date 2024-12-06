
// 郵便番号検索
export function searchAddress(name, handleAddress, postalCodeInput, address) {
	const postalCode = postalCodeInput.replace(/[^\d]/g, '');
    // console.log(postalCodeInput);
    // console.log(postalCode);
        if (postalCode.length === 7) {
            fetchAddress(name, handleAddress, postalCode, address);
        } else {
            alert('正しい郵便番号を入力してください');
        }
}

// 郵便番号検索API呼び出し
async function fetchAddress(name, handleAddress, postalCode, addressInput) {
	try {
		const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`);
		const data = await response.json();
		if (data.results) {
			const result = data.results[0];
			const address = `${result.address1}${result.address2}${result.address3}`;
            // console.log(address);
            handleAddress(name, address);
			// addressInput.value = address;
		} else {
			alert('住所が見つかりませんでした');
		}
	} catch (error) {
		console.error('Error:', error);
		alert('エラーが発生しました')
	}
}