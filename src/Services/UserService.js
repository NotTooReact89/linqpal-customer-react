//@flow

import apisauce from 'apisauce';
import AppConfig from '../Config/AppConfig';

const create = (baseURL = AppConfig.baseApiURL) => {
  const postUser = (action, headers) => {
    const api = apisauce.create({
      headers,
      baseURL,
      timeout: AppConfig.requestTimeout,
    });

    const { params } = action;

    const { firstName, lastName, fullAddress, telephoneNumber, ssn } = params;

    return api.post('user', {
      firstName: firstName,
      lastName: lastName,
      telephoneNumber: telephoneNumber,
      fullAddress: fullAddress,
      ssn: ssn,
    });
  };

  return {
    postUser,
  };
};

export default {
  create,
};
