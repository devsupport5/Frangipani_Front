//
const isProduction = false;
const devAPIBaseURL = 'http://localhost:3000/';
const prodAPIBaseURL = 'https://www.infoanalytica.com/';
const S3BaseURL = 'https://s3-us-west-1.amazonaws.com/tcc-prod/';

var config = {
	isProduction: isProduction,
	APIBaseURL: isProduction ? prodAPIBaseURL : devAPIBaseURL,
	S3BaseURL: S3BaseURL
};

export default config;
