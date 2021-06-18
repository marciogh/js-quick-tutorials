const axios = require('axios');

const api_key = '50e72aad29a69a0904a7d833294adaa6'
const url_prefix = 'https://api.openweathermap.org/data/2.5'

async function serial_weather() {

	let cities_weather = {}

	console.log('requesting cities...')
	let cities = await axios.request(
		`${url_prefix}/box/city?bbox=151,-35,155,-30,10&appid=${api_key}`
	)

	for (i = 0; i < cities.data.list.length; i ++) {
		let city = cities.data.list[i]
		console.log(`requesting weather for ${city.name}...`)
		let weather = await axios.request(
			`${url_prefix}/weather?id=${city.id}&appid=${api_key}`
		)
		cities_weather[city.name] = weather.data.weather[0].main
	}

	return cities_weather
}


async function parallel_weather() {

	let cities_weather = {}

	console.log('requesting cities...')
	let cities = await axios.request(
		`${url_prefix}/box/city?bbox=151,-35,155,-30,10&appid=${api_key}`
	)

	let cities_promises = cities.data.list.map(
		city => {
			console.log(`requesting weather for ${city.name}...`)
			return axios.request(
				`${url_prefix}/weather?id=${city.id}&appid=${api_key}`
			)
		}
	)

	let weathers = await Promise.all(cities_promises)

	cities.data.list.forEach (
		(city, idx) => cities_weather[city.name] = weathers[idx].data.weather[0].main
	)
	return cities_weather
}

async function main() {
	//let cities_weather = await serial_weather()
	let cities_weather = await parallel_weather()
	console.log(cities_weather)
}

main()