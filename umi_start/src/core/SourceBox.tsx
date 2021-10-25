import {useDrag} from 'react-dnd'
import {connect} from 'umi'
import schema from '@/materials/schema';
function SourceBox(props){
    console.log(props)
    const {children,item}=props
    const [{isDragging}, drag, preview] = useDrag(() => ({
        type: 'component',
        item:{
          type:item.type,
          config: schema[item.type as keyof typeof schema].config,
          h: item.h,
          editableEl: schema[item.type as keyof typeof schema].editData,
          category: item.category,
          x: item.x || 0,
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))
      return <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >{children}</div>
}
export default connect((state)=>{return {editortModal:state.editortModal}})(SourceBox)