## 数と計算

数式を書けば計算することができます．
`print(<数式>)`と書けば，計算結果を出力できます．

```python
print(1+2*3)
```

|書き方  |意味           |
|---------|--------------|
|x + y　  | 加法（足し算）  |
|x - y　  | 減法（引き算）  |
|x * y　  | 乗法（掛け算）  |
|x / y　  | 除法（割り算)   |
|x // y　 | 除法（小数点以下切り捨て) |
|x % y　  | 余法（余り)   |

### 優先順位とグループ

優先順位は、通常の数式の計算にしたがいます。
ある演算を先に計算したいときは、() で囲みます。

```python
print(1+2*3)
print((1+2)*3)
```
### 練習

1. 1個が126円のりんごを6個買って，それを3人で等しく分けたときの1人分の代金を計算して出力してみましょう．
