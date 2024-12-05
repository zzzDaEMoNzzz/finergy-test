import { createServer } from 'miragejs';

import { Server, ServerConfig } from 'miragejs/server';
import { AnyFactories, AnyModels } from 'miragejs/-types';

import { setupStudentsServer } from './students';

const routesHandlers: ((this: Server) => void)[] = [];

export const makeMirageServer = () => {
  const config: ServerConfig<AnyModels, AnyFactories> = {
    models: {},
    fixtures: {},
    routes() {
      this.namespace = 'api';
      routesHandlers.forEach((handler) => {
        handler.call(this);
      });
    },
  };
  setupStudentsServer(config, routesHandlers);
  return createServer(config);
};
