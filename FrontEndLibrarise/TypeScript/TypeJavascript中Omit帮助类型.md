<!--
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2022-02-10 16:09:22
 * @LastEditors: yzf
 * @LastEditTime: 2022-02-10 16:21:24
 * @FilePath: \vue3-composition-admin-mainh:\gitHub\days_blog\FrontEndLibrarise\TypeScript\TypeJavascript中Omit帮助类型.md
-->
# Typescript 中Omit帮助类型的用法


## 一、Omit类型 是什么
Omit<K,T>类型让我们可以从另一个对象类型中剔除某些属性，并创建一个新的对象类型：
K：是对象类型名称，T：是剔除K类型中的属性名称

## 1.1 示例

```
type UserProps={
	name?:string;
	age?:number;
	sex?:string;
}
// 但是我不希望有sex这个属性我就可以这么写

type NewUserProps=Omit<UserProps,'sex'>

//等价于
type NewUserProps={
	name?:string;
	age?:number;
}
```

## 1.2 运用场景
忽略类型中的某个属性值的时候，例如一个自定的InputProps类型，要继承input元素的所有属性和方法，但是InputProps中也有和input元素属性一样的类型，此时，我们想用InputProps类型里的属性，就可以选择Omit类型移除input元素里相同的类型；
```
import React ,{ReactElement,InputHTMLAttributes} from 'react'

type inputSize='lg'|'sm'
export interface InputProps extends Omit<InputHTMLAttributes,'size'>{
	size?:inputSize,
	disabled?:boolean,
}
```