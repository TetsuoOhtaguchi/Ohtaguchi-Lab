# Ohtaguchi Lab

## deploy の手順

1. build コマンドを実行する
2. .output/server/chunks/nitro/firebase-gen-default.mjs のコードの書き換えを行う
3. deploy コマンドを実行する

```bash
# buildコマンドを実行する
yarn build

# .output/server/chunks/nitro/firebase-gen-default.mjsのコードの書き換えを行う
# こちらを
const server = functions.region(firebaseConfig.region ?? functions.RESET_VALUE).runWith(firebaseConfig.runtimeOptions ?? functions.RESET_VALUE).https.onRequest(toNodeListener(nitroApp.h3App));
# 以下に変更
const server = functions.region('asia-northeast1').https.onRequest(toNodeListener(nitroApp.h3App));

# deployコマンドを実行する
firebase deploy
```
