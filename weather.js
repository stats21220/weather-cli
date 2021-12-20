#!/usr/bin/env node
import {getArgs} from './helpers/args.js'
import {printSuccess, printError, printHelp, printWeather} from './services/log.service.js'
import {saveKeyValue, TOKEN_DICTIONARY} from './services/storage.services.js'
import {getIcon, getWeather} from './services/api.service.js'

// const keyToken = '1eab8bb37b8298bf32f6c8c4d7f40ad7'

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан токен')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('Токен сохранен')
	} catch (e) {
		printError(e.message)
	}
}

const saveCity = async (city) =>{
	if (!city.length) {
		printError('Не передан город')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess('Городы сохранен')
	} catch (e) {
		printError(e.message)
	}
}

const getForecast = async () => {
	try {
		const weather = await getWeather()
		printWeather(weather, getIcon(weather.weather[0].icon))
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('Неверно указан город')
		}
		else if (e?.response?.status === 401) {
			printError('Неверно задан API - ключ')
		} else {
			printError(e.message)
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv)
	// console.log(process.env)
	if (args.s) {
		// сохранить город
		return saveCity(args.s)
	}
	if (args.h) {
		// помощь
		return printHelp()
	}
	if (args.t) {
		// сохранить токен
		return saveToken(args.t)
	}
	return getForecast()
	// getWeather('vladimir')
}
initCLI()
