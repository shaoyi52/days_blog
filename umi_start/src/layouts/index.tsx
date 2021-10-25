import { IRouteComponentProps } from 'umi'
import React, { useEffect, useMemo, useRef } from 'react';
import GlobalFooter from '@/component/GlobalFooter'
export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  return <>
  <div>header</div>
  {children}
  <GlobalFooter  
    links={[{"key":"1",title:'百度',herf:'http://www.baidu.com',blankTarget:true}]}
    copyright={<div>网易公司版权所有©1997-2021</div>}
  />
  </>
}