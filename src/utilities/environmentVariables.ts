import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

type EnvironmentVariables = {
  env_variables: {
    [key: string]: any
  }
}

export const loadEnvironmentVariables = (filePath: string) => {
  const environmentVariables: EnvironmentVariables = yaml.safeLoad(
    fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
  )

  Object.keys(environmentVariables.env_variables).map(environmentVariable => {
    process.env[environmentVariable] =
      environmentVariables.env_variables[environmentVariable]
  })
}
