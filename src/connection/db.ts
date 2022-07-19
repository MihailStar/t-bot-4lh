import { Sequelize } from 'sequelize';
import { configuration } from '../common/configuration';

const options = configuration.isDevelopment ? {} : { logging: false };
const sequelize = new Sequelize(configuration.DB_URL, options);

export { sequelize };
