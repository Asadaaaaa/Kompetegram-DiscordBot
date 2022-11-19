import { MongoClient } from 'mongodb';

class ModelHandler {
  constructor(server) {
    this.server = server;
  }

  async connect(auth) {
    this.client = new MongoClient(auth);

    await this.client.connect();

    this.db = this.client.db('kompetegram');
  }
};

export default ModelHandler;