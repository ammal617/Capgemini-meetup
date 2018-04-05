import AWS from 'aws-sdk';

AWS.config.update({region: 'eu-west-1', credentials: {
  aws_access_key_id = 'AKIAIVPSO7WV2REW3VLA',
  aws_secret_access_key = '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'
}});
var lambda = new AWS.Lambda({ region: "eu-west-1", apiVersion: "2015-03-31" });

