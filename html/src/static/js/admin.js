  
/*菜单导航*/
function Hui_admin_tab(obj){
  var bStop = false,
    bStopIndex = 0,
    href = $(obj).attr('data-href'),
    title = $(obj).attr("data-title"),
    topWindow = $(window.parent.document),
    show_navLi = topWindow.find("#min_title_list li"),
    iframe_box = topWindow.find("#iframe_box");
  //console.log(topWindow);
  if(!href||href==""){
    alert("data-href不存在，v2.5版本之前用_href属性，升级后请改为data-href属性");
    return false;
  }if(!title){
    alert("v2.5版本之后使用data-title属性");
    return false;
  }
  if(title==""){
    alert("data-title属性不能为空");
    return false;
  }
  show_navLi.each(function() {
    if($(this).find('span').attr("data-href")==href){
      bStop=true;
      bStopIndex=show_navLi.index($(this));
      return false;
    }
  });
  if(!bStop){
    creatIframe(href,title);
    //min_titleList();
  }
  else{
    show_navLi.removeClass("active").eq(bStopIndex).addClass("active");     
    iframe_box.find(".show_iframe").hide().eq(bStopIndex).show().find("iframe").attr("src",href);
  } 
}

/*创建iframe*/
function creatIframe(href,titleName){
  var topWindow=$(window.parent.document),
    show_nav=topWindow.find('#min_title_list'),
    iframe_box=topWindow.find('#iframe_box'),
    iframeBox=iframe_box.find('.show_iframe'),
    $tabNav = topWindow.find(".acrossTab"),
    $tabNavWp = topWindow.find(".Hui-tabNav-wp"),
    $tabNavmore =topWindow.find(".Hui-tabNav-more");
  var taballwidth=0;
    
  show_nav.find('li').removeClass("active");  
  show_nav.append('<li class="active"><span data-href="'+href+'">'+titleName+'</span><i></i><em></em></li>');
  if('function'==typeof $('#min_title_list li').contextMenu){
    $("#min_title_list li").contextMenu('Huiadminmenu', {
      bindings: {
        'closethis': function(t) {
          var $t = $(t);        
          if($t.find("i")){
            $t.find("i").trigger("click");
          }
        },
        'closeall': function(t) {
          $("#min_title_list li i").trigger("click");
        },
      }
    });
  }else {
    
  } 
  var $tabNavitem = topWindow.find(".acrossTab li");
  if (!$tabNav[0]){return}
  $tabNavitem.each(function(index, element) {
        taballwidth+=Number(parseFloat($(this).width()+60))
    });
  $tabNav.width(taballwidth+25);
  var w = $tabNavWp.width();
  if(taballwidth+25>w){
    $tabNavmore.show()}
  else{
    $tabNavmore.hide();
    $tabNav.css({left:0})
  } 
  iframeBox.hide();
  iframe_box.append('<div class="show_iframe"><div class="loading"></div><iframe frameborder="0" src='+href+'></iframe></div>');
  var showBox=iframe_box.find('.show_iframe:visible');
  showBox.find('iframe').load(function(){
    showBox.find('.loading').hide();
  });
}


/*左侧菜单*/
  $.foldTab(".menu_dropdown dl dt",".menu_dropdown dl dd","fast",1,"click");

/*选项卡导航*/
$(".Hui-aside").on("click",".menu_dropdown a",function(){
  Hui_admin_tab(this);
});

/*选项卡显示页面*/
$(document).on("click","#min_title_list li",function(){
  var bStopIndex=$(this).index();
  var iframe_box=$("#iframe_box");
  $("#min_title_list li").removeClass("active").eq(bStopIndex).addClass("active");
  iframe_box.find(".show_iframe").hide().eq(bStopIndex).show();
});

$(document).on("click","#min_title_list li i",function(){
  var aCloseIndex=$(this).parents("li").index();
  $(this).parent().remove();
  $('#iframe_box').find('.show_iframe').eq(aCloseIndex).remove(); 
  $("#min_title_list li").removeClass("active").eq(aCloseIndex-1).addClass("active");
    $('#iframe_box').find('.show_iframe').eq(aCloseIndex-1).show(); 

  num==0?num=0:num--;
  tabNavallwidth();
});