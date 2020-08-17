// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const isProduction = false;
const devAPIBaseURL = 'http://localhost:8080/springboot-crud-rest/api/';
const prodAPIBaseURL = 'http://frangipanibookstest.com/api/';
const prodProjectName = '';
const devProjectName = '';

export const environment = {
  production: false,
  APIBaseURL: isProduction ? prodAPIBaseURL : devAPIBaseURL,
  ProjectName : isProduction ? prodProjectName : devProjectName,
};


 