import './user.less';
import {useState,useMemo,useRef} from 'react';
import { Button, Layout, Menu,Collapse,Result,Tabs } from 'antd';
import {DndProvider,useDrag ,useDrop,DropTargetMonitor} from 'react-dnd';
import{ HTML5Backend } from 'react-dnd-html5-backend';
import GridLayout, { WidthProvider, Responsive } from 'react-grid-layout';
import template from '@/materials/base/template';
import schemaH5 from '@/materials/schema';
import DynamicEngine, { componentsType } from '@/core/DynamicEngine';
import SourceBox from "@/core/SourceBox";
import TargetBox from "@/core/TargetBox";
import FormRender from "@/core/renderer/FormRender"
import Calibration from '@/component/Calibration';
import ProgressLayout from '@/component/Progress';
import {connect} from 'umi'
import {
  HighlightOutlined,
  PieChartOutlined,
  GithubOutlined,
  PlayCircleOutlined,
  AppstoreOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const {Panel}=Collapse
const { TabPane } = Tabs;
 // 指定画布的id
 let canvasId = 'js_canvas';

function Editer(props) {
  const [dragstate,setDragState] = useState({x:0,y:0});
  const [collapsed,setCollapsed]=useState(false);
  const [rightColla,setRightColla]=useState(true);
  const {pstate,cstate,dispatch}=props;
  const pointData=pstate?pstate.pointData:[];
  const cpointData=cstate?cstate.pointData:[];
  const curPoint=pstate?pstate.curPoint:{};

  const CpIcon={
    base:<HighlightOutlined/>,
    media:<PlayCircleOutlined/>,
    visible:<PieChartOutlined />,
    shop:<AppstoreOutlined/>
  }

  const generateHeader=useMemo(()=>{
    return (type,text)=>{
      return(
        <div>
          {CpIcon[type]}{text}
        </div>
      )
    }
  },[CpIcon]);

  const changeCollapse = useMemo(()=>{
    return(c)=>{
      setCollapsed(c)
    }
  },[])
  const changeRightCollapse=useMemo(()=>{
    return (c)=>{
      setRightColla(c);
    }
  },[])
  const handleFormSave=useMemo(()=>{
    return (data)=>{
      let config={...curPoint.item.config,...data}
      dispatch({
        type:'editorModal/modPointData',
        payload:{...curPoint,item:{...curPoint.item,config:config}}
      })
    };
  },[curPoint,dispatch])
  const handleDel=useMemo(()=>{
    return (id)=>{
      dispatch({
        type:'editorModal/delPointData',
        payload:{id}
      })
    }
  },[dispatch])

 
  const ref=useRef(null)
  const renderRight=useMemo(()=>{
    return(
      <div
        ref={ref}
        className="attrSetting"
        style={{
          //transition: 'all ease-in-out 0.5s',
          //transform: rightColla ? 'translate(100%,0)' : 'translate(0,0)',
        }}
      >
        {pointData.length&&curPoint?(
          <>
            <div className="tit">属性设置</div>
            <FormRender
              config={curPoint.item.editableEl}
              uid={curPoint.id}
              defaultValue={curPoint.item.config}
              onSave={handleFormSave}
              onDel={handleDel}
              rightPannelRef={ref}
            />
          </>
        ):(
        <div style={{paddingTop:'100px'}}>
          <Result status='404' title="还没有数据哦"  subTitle="赶快拖拽组件来生成你的H5页面吧"/>
        </div>)}
      </div>
    )
  },[pointData,curPoint])
  
  const collapseRender=useMemo(()=>{
    if(collapsed){
      return (<>
       <Panel header="基础组件" key="1"></Panel>
       <Panel header="媒体组件" key="2">
          <p>test2</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>test3</p>
        </Panel>
      </>)
    }else{
      return (<>
      <Panel header="基础组件" key="1">
        {template.map((value, i) =>        
        <SourceBox  item={value} key={i} canvasId={canvasId}>
          <DynamicEngine {...value}
           config={schemaH5[value.type as keyof typeof schemaH5].config}
           componentsType="base"
           category="base"
           isTpl={true}
         /></SourceBox>
        )}
        
          <p>test1</p>
        </Panel>
        <Panel header="媒体组件" key="2">
          <p>test2</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>test3</p>
        </Panel>
      </>)
    }
  },[collapsed])
  const tabRender=useMemo(()=>{
    if(collapsed){
      return (<>
      <TabPane tab={generateHeader("base","")} key="1"/>
      <TabPane tab={generateHeader("media","")} key="2"/>
      <TabPane tab={generateHeader("visible","")} key="3"/>
      <TabPane tab={generateHeader("shop","")} key="4"/>
      </>)
    }else{
      return (<>
      <TabPane tab={generateHeader("base","")} key="1">
        <div className={StyleSheet.ctitle}>基楚组件</div>
        {template.map((value, i) =>        
        <SourceBox  item={value} key={i} canvasId={canvasId}>
          <DynamicEngine {...value}
           config={schemaH5[value.type as keyof typeof schemaH5].config}
           componentsType="base"
           category="base"
           isTpl={true}
         /></SourceBox>
        )}        
      </TabPane>
      <TabPane tab={generateHeader("media")} key="2"/>
      <TabPane tab={generateHeader("visible")} key="3"/>
      <TabPane tab={generateHeader("shop")} key="4"/>
      </>)
    }
  },[collapsed])
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <DndProvider backend={ HTML5Backend }>
    <Layout className="page-wrap">
      <Header>
        <div className="wd-header">
          <div className="logo">Chart Design</div>
          <div>
            <Menu mode="horizontal">
              <Menu.Item key="todo">
                <a
                  href="https://github.com/wstreet/chart-design/blob/main/TODO.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TODO
                </a>
              </Menu.Item>
              <Menu.Item icon={<GithubOutlined />}>
                <a
                  href="https://github.com/wstreet/chart-design"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Header>
      <Layout id="main">
      <Sider className="siderBg" width={350}>
        <div className='componentList'>
            <Tabs tabPosition="left">
          {tabRender}
            </Tabs>
        </div>
     
      </Sider>
        <Content>         
        <Layout className="main-content">        
        <Content>
          <div className="tickMark">
            <div className="tickMarkTop">
            <Calibration direction="up"  multiple={1}/>
            </div>
            <div className="tickMarkLeft">
            <Calibration direction="left"  multiple={1}/>
            </div>
            <TargetBox canvasId={canvasId}/>     
          </div>
               
        </Content>
        <Sider className="siderBg">{renderRight}</Sider>
      </Layout></Content>
       
      </Layout>
    </Layout>
    </DndProvider>
  );
}

export default connect((state)=>{return {pstate:state.editorModal,cstate: {}}})(Editer)
