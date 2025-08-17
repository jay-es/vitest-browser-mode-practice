それぞれ Ubuntu on WSL で 5 回ずつ実行した中央値

## Vue

- 通常（@vue/test-utils） 48ms
- ブラウザー（playwright） 362ms

## React

- 通常（@testing-library/react） 209ms\*
- ブラウザー（playwright） 306ms

\*Windows ネイティブだとなぜか 800ms くらいかかる
