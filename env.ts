import dotenv from 'dotenv'
dotenv.config()

const REQUIRED_ENV_VARS = ['JWT_SECRET', 'PORT'];
for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) throw new Error(`${envVar} must be provided`)
}
