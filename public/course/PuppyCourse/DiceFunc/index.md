# 関数化してみよう

関数は、式の一部をパラメータ化して計算可能にする手段です。

```
f(x) = x + 1
```

Puppy/Python では、次のように関数を定義することができます。

```python:関数定義
def ＜関数名＞(＜パラメータ＞):
  return ＜関数の結果を計算する式＞

def f(x):
  return x + 1
```

一旦、関数定義を定義すれば、関数を呼ぶだけで計算できるようになり、
何度も同じことを書かなくて済むようになります。

### 練習

つまりパラメータとして最大の目の数を与えられるサイコロを
関数として定義してみよう。


