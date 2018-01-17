export function processCandles(data) {
	return data.map(el => {
		el.date = new Date(el.open_time * 1000);
		el.volume = parseFloat(el.volume);
		return el;
	})
}

// TODO: lots of duplicate data. Please clean up

export function mergeCandles(oldData, newData) {
	if(!oldData) return newData;
	if(!newData || newData.length === 0) return oldData;
	while(oldData.length > 0 && oldData[oldData.length - 1].close_time > newData[0].open_time) oldData.pop();
	return oldData.concat(newData);
}

export function mergeBalance(oldData, newData) {
	if(!oldData) return newData;
	if(!newData || newData.length === 0) return oldData;
	let ret = {};
	for(const balance of oldData) ret[balance.valuta.id] = balance;
	for(const balance of newData) ret[balance.valuta.id] = balance;
	return ret;
}

export function mergeOrders(oldData, newData) {
	if(!oldData) return newData;
	if(!newData || newData.length === 0) return oldData;
	let ret = {};
	for(const order of oldData) ret[order.id] = order;
	for(const order of newData) ret[order.id] = order;
	return ret;
}

export function mergeMarkets(oldData, newData) {
	if(!oldData) return newData;
	if(!newData || newData.length === 0) return oldData;
	let ret = {};
	for(const market of oldData) ret[market.id] = market;
	for(const market of newData) ret[market.id] = market;
	return ret;
}

export function mergeHistory(oldData, newData) {
	if(!oldData) return newData;
	if(!newData || newData.length === 0) return oldData;
	while(oldData.length > 0 && oldData[oldData.length - 1].time > newData[0].time) oldData.pop();
	return oldData.concat(newData); // TODO: merge ones with the same time
}