import Knex from 'knex'
import KnexFile from '../../../knexfile'

// Load Knex configuration based on development environment
const env = process.env.NODE_ENV || 'development'
const config = env === 'production' ? KnexFile.production : KnexFile.development

export default Knex(config)
