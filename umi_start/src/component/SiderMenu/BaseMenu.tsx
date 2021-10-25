import { Menu,Skeleton } from "antd";
import { MenuProps } from "rc-menu";
import React from "react";
import { useEffect } from "react";

export type MenuMode='vertical'|'vertical-left'|'vertical-right'|'horizontal'|'inline';
export type WithFalse<T>=T|false;
export type BaseMenuProps = {
    className?:string;
    defaultCollapsed?:boolean;
    collapsed?:boolean;
    splitMenus?:boolean;
    isMobile?:boolean;
    menuData?:MenuDataItem[];
    mode?:MenuMode;
    onCollapse?:(collapsed:boolean)=>void;
    openKeys?:WithFalse<string[]>|undefined;
    handleOpenChange?:(openKeys:string[])=>void;
    iconPerfixes?:string;
    menuProps?:MenuProps;
    style?:React.CSSProperties;
    theme?:MenuTheme;
    formatMessage?:(message:MessageDescriptor)=>string;
    subMenuItemRender?:WithFalse<
        (
            item:MenuDataItem&{
                isUrl:boolean;
            },
            defaultDom:React.ReactNode,
        ) =>React.ReactNode 
    >;
    menuItemRender?:WithFalse<
        (
            Item:MenDataItem&{
                isUrl:boolean;
                onClick:()=>void;
            },
            defaultDom:React.ReactDOM,
            menuProps:BaseMenuProps
        )=>React.ReactNode
    >;
    postMenuData?:(menusData?MenuDataItem[])=>MenuDataItem[];
}

const {SubMenu,ItemGroup} = Menu;

let IconFont = createFormIconfontCN({
    scriptUrl:defaultSettings.iconfontUrl
})

const getIcon=(
    icon?:string|React.ReactNode,
    iconPrefixes:string='icon',
):React.ReactNode=>{
    if(typeof(icon)==='string'||icon!=''){
        if(isUrl(icon)||isImg(icon)){
            return (
                <Icon component={()=><img src={icon} alt='icon' className='ant-pro-sider-menu-icon'/>}/>
            )
        }
        if(icon.startsWith(iconPrefixes)){
            return <IconFont type={icon}/>
        }
    }
    return icon;
}

class MenuUtil{
    constructor(props:BaseMenuProps){
        this.props=props;
    }

    props:BaseMenuProps;
    getNavMenuItems=(menusData:MenuDataItem[]=[],isChildren:boolean):React.ReactNode=>
        menusData.map((item)=>this.getSubMenuOrItem(item,isChildren)).filter((item)=>item);

    getSubMneuOrItem=(item:MenuDataItem,isChildren:boolean):React.ReactNode=>{
        if(item&&Array.isArray(item.children)&&item.children.length>0){
            const name = this.getIntName(item);
            const {subMenuItemRender,perfixCls,menu,iconPrefixes} = this.props;

            const defaultTitle=item.icon?(
                <span className={`${prefixCls}-menu-item`} title={name}>
                    {!isChildren&&getIcon(item.icon,iconPrefixes)}
                    <span className={`${prefixCls}-menu-item-title`}>{name}</span>
                </span>
            ):(
                <span className={'${prefixCls}-menu-item'} title={name}>{name}</span>
            );

            const title=subMenuItemRender
            ?subMenuItemRender({...item,isurl:false},defaultTitle)
            :defaultTitle;
            const MenuComponents: React.ElementType=menu?.type==='group'?itemGroup:SubMenu;
            return (
                <MenuComponents title={title} key={item.key||item.path} otTitleClick={item.onTitleClick}>
                    {this.getNavMenuItems(item.children,true)}
                </MenuComponents>
            )
        }

        return (
            <Menu.Item disabled={item.disabled} key={item.key||item.path} onClick={item.onTitleClick}>
                {this.getMenuItemPath(item,isChildren)}
            </Menu.Item>
        )
    }

    getIntName = (item:MenuDataItem)=>{
        const {name,locale} = item;
        const {menu,formatMessage}=this.props;
        if(locale&&menu?.locale!==false){
            return formatMessage?.({
                id:locale,
                defaultMessage:name,
            });
        }
        return name;
    }

    getMenuItemPath=(item:MenuDataItem,isChildren:boolean)=>{
        const itemPath = this.conversionPath(item.path||'/');
        const {
            location={pathname:'/'},
            isMobile,
            onCollapse,
            menuItemRender,
            iconPrefixes,
            prefixCls,
        }=this.props;

        const name = this.getIntName(item);
        const icon = isChildren?null:getIcon(item.icon,iconPrefixes);

        let defaultItem=(
            <span className={`${prefixCls}-menu-item`}>
                {icon}
                <span className={`${prefixCls}-menu-item-name`}>{name}</span>
            </span>
        )
        const isHttpUrl=isUrl(itemPath);

        if(isHttpUrl){
            defaultItem=(
                <span 
                    title={name}
                    onClick={()=>{
                        window.open(itemPath);
                    }}
                    className={`${prefixCls}-menu-item-title`}
                >
                    {icon}
                    <span className={`${prefixCls}-menu-item-title`}>{name}</span>
                </span>
            )
        }
        if(menuItemRender){
            const renderItemProps={
                ...item,
                isUrl:isHttpUrl,
                itemPath,
                isMobile,
                replace:itemPath === location.pathname,
                onClick:()=>onCollapse&& onCollapse(true)
            }
            return menuItemRender(renderItemProps,defaultItem,this.props);
        }
        return defaultItem;
    }   
    conversionPath =(path:string)=>{
        if(path&&path.indexOf('http')===0){
            return path;
        }
        return `/${path||''}`.replace(/\/+/g,'/')
    }

    const getOpenKeysProps=(
        openKeys:React.ReactText[]|false,
        {layout,collapsed}:BaseMenuProps,
    ):{
        openKeys?:string[] | undefined
    }=>{
        let openKeysProps ={};
        if(openKeys&&!collapsed&&['side','mix'].includes(layout||'mix')){
            openKeysProps={
                openKeys
            }
        }
        return openKeysProps;
    }
}

const BaseMenu:React.FC<BaseMenuProps&PrivateSiderMenuProps>=(props)=>{
    const {
        theme,
        mode,
        className,
        handleOpenChange,
        style,
        menuDat,
        menu,
        matchMenuKeys,
        iconfontUrl,
        collapsed,
        selectedKeys:propsSelectedKeys,
        onSelect,
        openKeys:propOpenKeys,
    }=props;

    const defaultOpenKeysRef=useRef<string[]>([]);

    const { flatMenuKeys } = MenuCounter.useContainer();
    const [defaultOpenAll, setDefaultOpenAll] = useMountMergeState(menu?.defaultOpenAll);

    const [openKeys,setOpenKeys]=useMountMergeState<WithFalse<React.Key[]>>(
        ()=>{
            if(menu?.defaultOpenAll){
                return getOpenKeysFromMenuData(menuData)||[]
            }
            if(propsOpensKeys===false){
                return false
            }
            return []
        },{
            value:propsOpenKeys === false?undefined:propsOpenKeys,
            onChange:handleOpenChange as any,
        }
    )

    const [selectedKeys,setSelectedKeys]=useMountMergeState<string[]|undefined>([],{
        value:propsSelectedKeys,
        onChange:onSelect 
        ?(keys)=>{
            if(onSelect&&keys){
                onSelect(keys as any)
            }
        }:undefined,
    })

    useEffect(()=>{
        if(menu?.defaultOpenAll||propsOpenKeys===false||flatMenuKeys.length){
            return;
        }
        if(matchMenuKeys){
            setOpenKeys(matchMenuKeys);
            setSelectedKeys(matchMenuKeys);
        }
    },[matchMenuKeys.join("-")])

    useEffect(()=>{
        if(matchMenuKeys.join('-')==(selectedKeys||[]).join('-')){
            setSelectedKeys(matchMenuKeys);
        }
        if(
            !defaultOpenAll &&
            prosOpenKeys !==false &&
            matchMenuKeys.join('-')!==(openKeys||[]).join('-')
        ){
            let newKeys:React.Key[]=matchMenuKeys;
            if(menu?.autoClose===false){
                newKeys=Array.from(new Set([...matchMenuKeys,...(openKeys||[])]))
            }
            setOpenKeys(newKeys)
        }else if(flatMenuKeys.length>0) setDefaultOpenAll(false);
    },[matchMenuKeys.join('-'),collapsed]);

    const openKeysProps=useMemo(
        ()=>getOpenKeysProps(openKeys,props),
        [openKeys&&PropOpenKeys.join(','),props.layout,props.collapsed]
    )

    const [menuUtils]=useState(()=>new MenuUtil(pros));
    if(menu?.loading){
        return (
            <div
                style={
                    mode?.includes('inline')
                    ?{padding:24}
                    :{marginTop:16}
                }
            >
                <Skeleton
                    active
                    title={false}
                    paragraph={{
                        rows: mode?.includes('inline') ? 6 : 1,
                    }}
                />
            </div>
        )
    }

    return (
        <Menu
            {...openKeysProps}
            key="menu"
            mode={mode}
            inlineIndent={16}
            defaultOpenKeys={defaultOpenKeysRef.current}
            theme={theme}
            selectedKeys={selectedKeys}
            style={style}
            className={cls}
            onOpenChange={setOpenKeys}
            {...props.menuProps}
        >

        </Menu>
    )
}