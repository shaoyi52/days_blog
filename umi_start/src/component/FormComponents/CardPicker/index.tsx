import { memo ,useState} from "react";
import classnames from 'classnames';
import Icon from '@/materials/base/Icon';
import styles from  './index.less';
import { useEffect } from "react";
export default memo((props)=>{
    const {type,icons,onChange}=props;
    const [selected,setSelected]=useState(type);
    
    handlePicker=(v)=>{
        if(onChange){
            onChange(v);
            return;
        }
        setSelected(v)
    }
    useEffect(()=>{
        setSelected(type);
    },[type])

    return (
        <div className={styles.pickerWrap}>
            {icons.map((item,i)=>{
                return (
                    <span
                        className={classnames(styles.picker,selected ===item?styles.selected:'')}
                        onClick={()=>handlePicker(item)}
                        key={i}
                    >
                        <Icon type={item} size={20} color='#4091f7' spin={false}/>
                    </span>
                )
            })}
        </div>
    )
})