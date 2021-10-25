import { dynamic } from '@umijs/runtime';
import React, {useMemo,memo,FC} from 'react';
import Loading from '../component/LoadingCp';

export type componentsType= 'media'|'base'|'visible'|'shop';

type DynamicType = {
    isTpl: boolean;
    config: {[key:string]:any};
    type:string;
    componentsType:componentsType;
    category:string;
} 

const DynamicFunc=(type:string,componentsType:string)=>{
    return dynamic({
        loader: async function() {         
          const { default: Graph } = await import(`@/materials/${componentsType}/${type}`);
          const Component = Graph;
          return (props: DynamicType) => {
            const { config, isTpl } = props;
            return <Component {...config} isTpl={isTpl} />;
          };
        },
        loading: () => (
          <div style={{ paddingTop: 10, textAlign: 'center' }}>
            <Loading />
          </div>
        ),
      });
}

const DynamicEngine = memo((props:DynamicType)=>{
    console.log(props)
    const {type,config,category}=props;
    const Dynamic = useMemo(()=>{
        return (DynamicFunc(type,category) as unknown) as FC<DynamicType>;
    },[config])
    return <Dynamic {...props}/>
})

export default DynamicEngine;