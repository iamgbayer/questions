import {
  SecretsManagerClient,
  GetSecretValueCommand
} from '@aws-sdk/client-secrets-manager'

export class GetSecret {
  public async execute(key: string): Promise<string> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const client = new SecretsManagerClient({ region: 'us-east-1' })
      const command = new GetSecretValueCommand({
        SecretId: key
      })

      const response = await client.send(command)

      if (response.SecretString) {
        resolve(response.SecretString)
      } else {
        reject('No secret found')
      }
    })
  }
}
