import dotenv from 'dotenv'

dotenv.config()


export const ENV_VARS= {
    MONGO_URI: process.env.MONGO_DB,
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
	TMDB_API_KEY: process.env.TMDB_API_KEY,
}