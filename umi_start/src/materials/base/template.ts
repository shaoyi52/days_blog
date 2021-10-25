import Text from './Text/template';

let basicTemplate=[
    Text,
]

basicTemplate=basicTemplate.map(v=>{
    return {...v,category:'base'}
});

export default basicTemplate;
