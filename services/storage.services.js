import {homedir} from 'os' // показывает путь к домашней директории
import {
	join /*join конкатинирует путь*/
	/*basename, /!*basename показывает последней файл(папка) в путе*!/
		dirname, /!*dirname показывает путь указонного файла*!/
		extname ,/!*extname показывает расширение файла*!/
		relative, /!*relative from, to указывает какой нужно сделать шаг чтоб добрать до to*!/
		isAbsolute, /!*isAbsolute возвращает true если путь абсолютный*!/
		resolve, /!*resolve позволяет посмотреть от текущей директории выполняя шаг*!/
		sep /!*sep показывает какой разделитель путя*!/*/
} from 'path'
import {promises} from 'fs'

const filePath = join(homedir(), 'weather-data.json')
const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city'
}

const saveKeyValue = async (key, value) => {
	let data = {}
	if ( await isExist(filePath )) {
		const file = await promises.readFile(filePath)
		data = JSON.parse(file.toString())
	}
	data[key] = value
	await promises.writeFile(filePath, JSON.stringify(data))
	console.log(filePath)
}

const getKeyValue = async (key) => {
	if ( await isExist(filePath )) {
		const file = await promises.readFile(filePath)
		const data = JSON.parse(file.toString())
		return data[key]
	}
	return undefined
}

const isExist = async (path) => {
	try {
		await promises.stat(path)
		return true
	} catch (e) {
		return false
	}
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY}
