import GridLayout,{ItemCallback} from 'react-grid-layout';
import styles from './viewRender.less';
import DynamicEngine from '@/core/DynamicEngine';
const ViewRender = (props)=>{
    const {pointData,pageData,width,dragStrop,onDragStart,onResizeStop}=props;

    return (
        <GridLayout
            cols={24}
            rowHeight={2}
            width={width}
            margin={[0,0]}
            onDragStop={dragStrop}
            onDragStart={onDragStart}
            onResizeStop={onResizeStop}
            style={{
                minHeight: '100vh',
                backgroundColor: pageData && pageData.bgColor,
                backgroundImage:
                  pageData && pageData.bgImage ? `url(${pageData.bgImage[0].url})` : 'initial',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
              }}
        >
            {pointData.map((value) => (
                <div key={value.id} data-grid={value.point} className={onDragStart && styles.dragItem}>
                <DynamicEngine {...(value.item as any)} isTpl={false} />
                </div>
            ))}
        </GridLayout>
    )
}

export default ViewRender;