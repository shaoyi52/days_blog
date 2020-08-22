# python  基楚语法
1. 命令行参数;
2. python 标识符
3. python 保留字符
4. 行和缩进
5. 多行语句
6. 注释
7. python 空行
8. 等待用户输入
9. 同一行显示多条语句
10. print输出
11. 多语句代码组成

## 命令行参数
```
python -h
```
## python 标识符
> 标识符由字母、数字、下划线组成;
+ 标识符是区分大小写的
+ 以下划线开头的标识符是有特殊意义
    + 以单下划线开头 _foo 的代表不能直接访问的类属性，需通过类提供的接口进行访问，不能用 from xxx import * 而导入。
    + 以双下划线开头的 \__foo 代表类的私有成员，以双下划线开头和结尾的 \__foo\__ 代表 Python 里特殊方法专用的标识，如 \__init\__() 代表类的构造函数
##  python 保留字符

| 　and      | exec  |  not |
| --------   | -----  | ----  |
| assert      | finally   |   or     |
| break        |  for    |   pass   |
| class        |    from    |  print  |
|continue	|global	|raise|
|def|	if|	return|
|del|	import|	try|
|elif|	in|	while|
|else|	is|	with|
|except|	lambda|	yield|
## 行和缩进
Python 的代码块用相同的缩进空白数量来控制类，函数以及其他逻辑判断
```
if True:
    print ("True")
else:
    print ("False")
```
## 多行语句
> Python语句中一般以新行作为语句的结束符
* 使用斜杠（ \）将一行的语句分为多行显示
```
total = item_one + \
        item_two + \
        item_three
```
* 语句中包含 [], {} 或 () 括号就不需要使用多行连接符
```
days = ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday']
```
Python 引号
> Python 可以使用引号( ' )、双引号( " )、三引号( ''' 或 """ ) 来表示字符串，引号的开始与结束必须是相同类型的;**三引号可以由多行组成，编写多行文本的快捷语法，常用于文档字符串，在文件的特定地点，被当做注释**
```
word = 'word'
sentence = "这是一个句子。"
paragraph = """这是一个段落。
包含了多个语句"""
```

## Python注释
1. python中单行注释采用 # 开头。
```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
# 文件名：test.py

# 第一个注释
print ("Hello, Python!")  # 第二个注释
```
2. python 中多行注释使用三个单引号(''')或三个双引号(""")。
```
#!/usr/bin/python
# -*- coding: UTF-8 -*-
# 文件名：test.py


'''
这是多行注释，使用单引号。
这是多行注释，使用单引号。
这是多行注释，使用单引号。
'''

"""
这是多行注释，使用双引号。
这是多行注释，使用双引号。
这是多行注释，使用双引号。
"""
```
## Python空行
* 函数之间或类的方法之间用空行分隔，表示一段新的代码的开始
* 类和函数入口之间也用一行空行分隔，以突出函数入口的开始
* 但是空行的作用在于分隔两段不同功能或含义的代码，便于日后代码的维护或重构。
* 空行也是程序代码的一部分
## 等待用户输入
```
#!/usr/bin/python
# -*- coding: UTF-8 -*-

python2 raw_input("按下 enter 键退出，其他任意键显示...\n")
python3 input() 
```
## 同一行显示多条语句
> Python可以在同一行中使用多条语句，语句之间使用分号(;)分割

```
#!/usr/bin/python

import sys; x = 'runoob'; sys.stdout.write(x + '\n')
```
## print输出
print 默认输出是换行的，如果要实现不换行需要在变量末尾加上逗号 ,
```
#!/usr/bin/python
# -*- coding: UTF-8 -*-

x="a"
y="b"
# 换行输出
print x
print y

print '---------'
# 不换行输出
print x,
print y,

# 不换行输出
print x,y
```
## 多个语句构成代码组
* 缩进相同的一组语句构成一个代码块，我们称之代码组
* if、while、def和class这样的复合语句，首行以关键字开始，以冒号( : )结束，该行之后的一行或多行代码构成代码组
* if、while、def和class这样的复合语句，首行以关键字开始，以冒号( : )结束，该行之后的一行或多行代码构成代码组