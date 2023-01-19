module.exports = (type) => {
	const data = require(`./${type}.json`);
	
	return (key = null) => {
		if(data[key]){
			return data[key]
		}
		return data['standart_error'];
	}
}