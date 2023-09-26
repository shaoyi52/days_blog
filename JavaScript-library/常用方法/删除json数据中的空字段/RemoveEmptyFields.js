// 定义类型
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const nullTag = '[object Null]'
const undefinedTag = '[object Undefined]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
// 需要深度循环
const deep = [arrayTag, objectTag]
/**
 * 优化
 * 使用while来实现一个通用的forEach遍历
 * @param {array} array
 * @param {func} iteratee
 */
function forEach(array, iteratee) {
    let index = -1
    const length = array.length
    while (++index < length) {
        iteratee(array[index], index)
    }
    return array
}
//  获取类型
function getType(target) {
    return Object.prototype.toString.call(target)
}
// 删除
function canIRemove(target, type) {
    switch (type) {
        case nullTag:
        case undefinedTag:
            return true
        case stringTag:
            return target.trim().length < 1
        case objectTag:
            return Object.keys(target).length === 0
        case arrayTag:
            return target.length === 0
        case numberTag:
            return isNaN(target)
        default:
            return false
    }
}
// 删除空格
function RemoveEmptyFields(obj) {
    const type = getType(obj)
    const keys = type === arrayTag ? undefined : Object.keys(obj)
    // 循环
    forEach(keys || obj, (value, key) => {
        if (keys) {
            key = value
        }
        if (canIRemove(obj[key], getType(obj[key]))) {
            delete obj[key]
        } else {
            // 循环数组、对象
            if (deep.includes(getType(obj[key]))) {
                RemoveEmptyFields(obj[key])
                if (isEmpty(obj[key])) {
                    delete obj[key]
                }
            }
        }
    })
    return obj
}
// 是否为空
function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }
    return true
}

const json = {
    first_name: 'Sunnie',
    last_name: '',
    email: 'sunniejs@163.com',
    phone: undefined,
    gender: null,
    age: NaN,
    emptyArr: [],
    emptyObj: { from: '', code: null },
    emptyArr1: [[{ from: '', code: null }], {}],
    invitations: [{ from: '', code: null }],
    company: { name: '', industries: ['E-commerce', 'finance'], quit: false },
    address: {
        city: 'ShangHai',
        street: ' ',
        zip: '',
        street: {
            value1: 'PuDong',
            value2: ' ',
            value3: '',
        },
    },
    date: new Date(),
    interest: ['english', 'running', 'cycling'],
    settle: true,
}

export default RemoveEmptyFields