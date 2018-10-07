import { API_CONFIG } from '../config/ApiConfig.js';
import { LOGS } from '../config/Logs.js';
import { PATTERNS } from '../config/Patterns.js';
import jsSHA from 'jssha';
import { AsyncStorage } from 'react-native';

/**
 * Creates a file object with name, filename, from a base64 data string
 * @param {string} dataURL a data*base64 file string of the file to create
 * @param {string} filename name of the file to be read from base64 string
 */
function dataURLtoFile(dataURL, filename) {
    let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export function postRequestWithFormData(requestData, route, paramsObject) {
    const formData = new FormData();
    for (const key in requestData) {
        if (requestData[key] instanceof Array) {
            for (let i = 0; i < requestData[key].length; i++) {
                formData.append(`${key}[]`, requestData[key][i]);
            }
        }
        else if (key === 'new_attachment') {
            for (let attachment in requestData[key]) {
                if (typeof requestData[key][attachment].path === 'string') {
                    formData.append(`${key}[]`, dataURLtoFile(requestData[key][attachment].path, requestData[key][attachment].name), requestData[key][attachment].name);
                }
                else {
                    formData.append(`${key}[]`, requestData[key][attachment].path);
                }
            }
        }
        else if (key === 'logo') {
            if (requestData[key].path !== null && requestData[key].path !== '') {
                formData.append(`${key}[]`, dataURLtoFile(requestData[key].path, requestData[key].name), requestData[key].name);
            }
        }
        else if (requestData[key] instanceof Object) {
            for (let item in Object.keys(requestData[key])) {
                formData.append(`${key}[]`, requestData[key][item]);
            }
        }
        else {
            if (requestData[key] === null) {
				requestData[key] = '';
            }
            formData.append(key, requestData[key].toString());
        }
    }

    return AsyncStorage.getItem('apiKey').then((res) => {
        formData.append('apiKey', res);
        let params = {
            method: 'POST',
            credentials: 'include',
            body: formData,
        };
        
        return baseRequest(paramsObject, route, params);
    });
}

export function getData(paramsObject, route) {
    let params = {
        credentials: 'include'
    };
    return baseRequest(paramsObject, route, params);
}

function createQueryParamsString(paramsObject) {
    const strArr = [];
	for (const key in paramsObject) {
		if (paramsObject.hasOwnProperty(key) && typeof (key) !== "object") {
			strArr.push(`${encodeURI(key)}=${encodeURI(paramsObject[key])}`);
		}
	}
	return strArr.join("&");
}

function encodeURI(str) {
    return encodeURIComponent(str)
        .replace(PATTERNS.encodeURIChars, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

export function createQueryString(paramsObject, route) {
    let tempParamsObject = JSON.parse(JSON.stringify(paramsObject));
    tempParamsObject.z_ca = Math.floor(Math.random() * 100000);
    tempParamsObject.api_key = API_CONFIG.api_key;
    tempParamsObject = sortParams(tempParamsObject);

    const signature = `${API_CONFIG.api_secret + API_CONFIG.url_suffix + route}?${createQueryParamsString(tempParamsObject)}`;
	const shaObject = new jsSHA("SHA-512", "TEXT");
	shaObject.update(signature);
	tempParamsObject.signature = shaObject.getHash("HEX");

    if (LOGS.ENABLE_LOGS) {
        console.info(`${API_CONFIG.url + API_CONFIG.url_suffix + route}?${createQueryParamsString(tempParamsObject)}`);
    }
    return `${API_CONFIG.url + API_CONFIG.url_suffix + route}?${createQueryParamsString(tempParamsObject)}`;
}

function sortParams(paramsObject) {
	const keys = [];
	for (const i in paramsObject) {
		keys.push(i);
	}
	keys.sort();
	const sortedParams = {};
	for (let i = 0; i < keys.length; i++) {
		sortedParams[keys[i]] = paramsObject[keys[i]];
	}
	return sortedParams;
}

function baseRequest(paramsObject, route, params) {
    const urlWithParams = createQueryString(paramsObject, route);

    if (LOGS.ENABLE_LOGS) {
		console.info(`paramsObject =====> `, paramsObject);
		console.info(`route =====> `, route);
		console.info(`params =====> `, params);
		console.info(`urlWithParams =====> `, urlWithParams);
    }
    
    return fetch(urlWithParams, params)
        .then(response => 
            response.text().then((text) => {
                let parsed = null;
                try {
                    parsed = text ? JSON.parse(text) : {};
                }
                catch(error) {
                    console.info(`ERROR: while parsing response from route ${route}: `, text);
                    return;
                }
                if (parsed && parsed.m7 && parsed.m7.error) {
                    parsed.error = parsed.m7.error;
                }
                parsed.status = response.status;
                if (LOGS.ENABLE_LOGS) {
                    console.info(`Reponse from route ${route}: `, parsed);
                }
                return parsed;
            })
        )
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.info(`ERROR: In baseRequest when on route ${route}: `, error);
            return error;
        });
}