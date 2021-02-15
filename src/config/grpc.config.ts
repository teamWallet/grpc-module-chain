require('./dotenv-options');

export const GRPC = {
  PACKAGE: process.env.GRPC_PACKAGE || 'utu_module_chain',
  PROTO_PATH:
    process.env.GRPC_PROTO_PATH || '../src/protobufs/utu-module-chain.proto',
};
