# Nginx try_files 指令


try_files 用于指定文件的查找规则，可以配置多个规则，会按顺序执行查找规则，若找到文件则中断查找并返回文件，若找不到则返回404响应。

## 配置语法

```
Syntax: try_files file ... uri;
		try_files file ... =code;
Default: -
Context: server, location
```

## 示例
```
location / {
	root html;
	index index.html;
	try_files $uri $uri/ /index.html;
}
```

- 解释配置

  **root指令** : 设置**静态根目录**为html

  **index指令**：设置了**目录的默认文件**为index.html

  **try_files**指认：设置了文件查找规则为 $uri $uri/ /index.html. 即3个规则，先从$uri查找，再从$uri/目录中查找，最后查找/index.html.

## 举个例子

  针对上面的配置，当请求 http://localhost:8080/abc 时，则 $uri 为 /abc ，此时，try_files 的规则可以具体 为 /abc /abc/ /index.html ， / 表示根目录 html （由 root指令 指定）。 其具体的查找逻辑如下：

1. 检查 html 目录中是否存在 abc 文件（对应第1个规则） 如果存在，则返回文件 如果不存在，则继续下一步 
2. 检查 html 目录中是否存在 abc/ 目录（对应第2个规则） 如果存在，则再检查 abc/ 目录中是否存在 index.html 文件（由 index指令 指定） 如果存在，则返回文件 如果不存在，则默认返回403，因为目录不可访问； 如果不存在则继续下一步 
3. 检查 html 目录中是否存在 index.html 文件（对应第3个规则） 如果存在，则返回文件 如果不存在，则返回404 小结： 可以看到，try_files指令 的查找逻辑和 root指令、index指令 有很大的关系。 高级用法： 先在本地尝试查找文件，找不到则重定向到其他地

**小结： 可以看到，try_files指令 的查找逻辑和 root指令、index指令 有很大的关系。**

**高级用法**：

 先在本地尝试查找文件，找不到则重定向到其他地址

```
location / {
 try_files $uri $uri.html $uri/ @mongrel;
}
location @mongrel {
 proxy_pass http://mongrel;
}

```

