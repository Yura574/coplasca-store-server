import { config } from 'dotenv';

config();

export type EnvironmentVariable = { [key: string]: string | undefined };

export type EnvironmentsTypes =
  | 'DEVELOPMENT'
  | 'STAGING'
  | 'PRODUCTION'
  | 'TESTING';
export const Environments = ['DEVELOPMENT', 'STAGING', 'PRODUCTION', 'TESTING'];

export class EnvironmentSettings {
  constructor(private env: EnvironmentsTypes) {}

  getEnv() {
    console.log(process.env.NODE_ENV);
    return this.env;
  }

  isProduction() {
    return this.env === 'PRODUCTION';
  }

  isStaging() {
    return this.env === 'STAGING';
  }

  isDevelopment() {
    console.log(process.env.NODE_ENV);
    return this.env === 'DEVELOPMENT';
  }

  isTesting() {
    return this.env === 'TESTING';
  }
}

class AppSettings {
  constructor(public env: EnvironmentSettings, public api: APISettings) {}
}

class APISettings {
  // Application
  public readonly APP_PORT: number;

  // Database
  public readonly MONGO_CONNECTION_URI: string;
  public readonly MONGO_CONNECTION_URI_FOR_DEVELOP: string;

  constructor(private readonly envVariables: EnvironmentVariable) {
    // Application
    this.APP_PORT = this.getNumberOrDefault(
      this.envVariables.APP_PORT as string,
      5000,
    );

    // Database
    this.MONGO_CONNECTION_URI =
      this.envVariables.MONGO_CONNECTION_URI ?? 'mongodb://localhost/nest';
    this.MONGO_CONNECTION_URI_FOR_DEVELOP =
      this.envVariables.MONGO_CONNECTION_URI_FOR_DEVELOP ??
      'mongodb://localhost/test';
  }

  private getNumberOrDefault(value: string, defaultValue: number): number {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return defaultValue;
    }

    return parsedValue;
  }
}
console.log('process.env.ENV =', process.env.ENV);
const env = new EnvironmentSettings(
  (Environments.includes((process.env.ENV as string)?.trim())
    ? (process.env.ENV as string).trim()
    : 'PRODUCTION') as EnvironmentsTypes,
);

const api = new APISettings(process.env);

export const appSettings = new AppSettings(env, api);
