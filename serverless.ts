import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-helloworld-ts',
  },
  frameworkVersion: '2',
  custom: {
    prune: {
      automatic: true,
      number: 3,
    },
    pseudoParameters: {
      allowReferences: false,
    },
    corsValue: {
      origin: '*',
      allowCredentials: true,
      headers: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
      ],
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-prune-plugin',
    'serverless-pseudo-parameters',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: "${opt:region, 'ap-southeast-1'}",
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
            cors: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
