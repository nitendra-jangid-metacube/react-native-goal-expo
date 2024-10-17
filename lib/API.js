import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"

const DEV = 'https://metacafe-dev'
const PROD = 'https://metacafe'
export const BASIC_URL = PROD;

const API = {
  API_URL: BASIC_URL + '-api.metacube.com/',
  acceptHeader: 'application/json',
  authorization: 'Authorization'
};
const Package = require('./../package.json');
const AppVersion = Package.version;
const URL = API.API_URL;

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data)
  } catch (e) {
    console.log('Failed to save the data to the storage', e, key)
  }
}

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.log('Failed to remove the data to the storage', e, key)
  }
}

export const readData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log('Failed to fetch the input from storage', key);
  }
};

export const instance = axios.create({
  baseURL: URL,
  timeout: Number(300000),
  headers: {
    Accept: API.acceptHeader,
  },
});

const getAccessTokenLocal = async () => {
  const userAccessData = await readData('access_token');
  if (userAccessData) {
    return userAccessData;
  }
  return null;
};

instance.interceptors.request.use(
  async config => {
    const accessToken = await getAccessTokenLocal();
    // console.log(Platform.Version)
    if (accessToken) {
      config.headers[API.authorization] = `Bearer ${accessToken}`;
      return config;
    }
    return config;
  },
  () => { },
);