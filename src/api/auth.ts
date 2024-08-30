import axios from 'axios';

export const signup = async (info: Object) => {
  return await axios
    .post(`${process.env.REACT_APP_LOCAL_SERVER_URL}/auth`, info)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error.response;
    });
};

export const login = async (info: Object) => {
  return await axios
    .post(`${process.env.REACT_APP_LOCAL_SERVER_URL}/auth/login`, info)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error.response;
    });
};

export const getInfo = async () => {
  return await axios
    .get(`${process.env.REACT_APP_LOCAL_SERVER_URL}/auth/me`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error.response;
    });
};
