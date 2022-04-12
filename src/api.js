import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import jsonData from './mockApi/api1';
import xmlData from './mockApi/api2.xml';

const mock = new MockAdapter(axios);

const withDelay = (delay, response) => () => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(response);
    }, delay);
  });
};

mock.onGet('/api1').reply(withDelay(5000, [200, jsonData]));
mock.onGet('/api2').reply(withDelay(10000, [200, xmlData]));

export const fetchJsonData = async () => {
  try {
    const response = await axios.get('/api1');
    return await response.data.person;
  } catch (error) {
    console.error('Something is went wrong');
  }
};

export const fetchXmlData = async () => {
  try {
    const response = await axios.get('/api2');
    return await response.data;
  } catch (error) {
    console.error('Something is went wrong');
  }
};
