const add = (left: number, right: number) => {
	return left + right;
}

const substract = (left: number, right: number) => {
	return left - right;
}

const sumUp = (initialValue: number, list: Array<number>, operator: (a: number, b:number) => number) => {
	let sum = initialValue;
	for (let i = 0; i < list.length; i++) {
		sum = operator(sum, list[i]);
	}
	return sum;
}

const numberList = [1, 3, 13, 4, 6, 18, 12];

interface ServerResponse {
	error?: string;
	serverData?: string;
}

const fetchServerData = (callback: (data: ServerResponse) => void) => {
	setTimeout(() => {
		const hasError = Math.random() * 2 > 1;
		if (hasError) {
			callback({error: 'Fancy error message'});
		} else {
			callback({serverData: 'Some random text'});
		}
	}, Math.random() * 5000);
}

fetchServerData((data: ServerResponse) => {
	if (data.error) {
		console.log(data.error);
	} else {
		console.log(data.serverData);
	}
})
