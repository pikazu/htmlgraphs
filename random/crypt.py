from Crypto.Cipher import AES
import base64

import secret

def encrypt(key, iv, mode, plaintxt):
    cipher = AES.new(key, mode, iv)
    msg = iv + cipher.encrypt(plaintxt)
    print('Encrypted msg:\n{}'.format(base64.b64encode(msg)))
    return msg

def decrypt(key, mode, ciphertxt):
    # Assumes IV is 16 bytes long
    decipher = AES.new(key, mode, ciphertxt[:16])
    msg = decipher.decrypt(ciphertxt[16:])
    print('Decrypted msg:\n{}'.format(msg))
    return msg

key = secret.key.encode()
iv = secret.iv.encode()
mode = secret.mode
plaintxt = secret.plaintxt
ciphertxt = base64.b64decode('')

if plaintxt:
    m = encrypt(key, iv, mode, plaintxt)
    print(m)

print()

if ciphertxt:
    m = decrypt(key, mode, iv + ciphertxt)

