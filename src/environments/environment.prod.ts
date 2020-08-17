const isProduction = true;
const devAPIBaseURL = 'http://localhost:8080/springboot-crud-rest/api/';
const prodAPIBaseURL = 'http://frangipanibookstest.com/api/';
const prodProjectName = 'manageFrangipanibooks';
const devProjectName = '';


export const environment = {
  production: true,
  APIBaseURL: isProduction ? prodAPIBaseURL : devAPIBaseURL,
  ProjectName : isProduction ? prodProjectName : devProjectName,
};
