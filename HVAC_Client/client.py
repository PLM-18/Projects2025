import hvac

class VaultClient:
    def __init__(self, url='http://localhost:8200', token='root'):
        self.client = hvac.Client(url=url, token=token)
        assert self.client.is_authenticated()

    def write_private_key(self, username, private_key):
        path = f'userkeys/{username}'
        self.client.secrets.kv.v2.create_or_update_secret(
            path=path,
            secret={'private_key': private_key}
        )

    def read_private_key(self, username):
        path = f'userkeys/{username}'
        read_response = self.client.secrets.kv.v2.read_secret_version(path=path)
        return read_response['data']['data']

if __name__ == "__main__":
    vault = VaultClient()
    vault.write_private_key('alice', 'some_private_hashed_key_value')
    print(vault.read_private_key('alice'))
    vault.write_private_key('bob', 'bob_private_key')
    print(vault.read_private_key('bob'))
