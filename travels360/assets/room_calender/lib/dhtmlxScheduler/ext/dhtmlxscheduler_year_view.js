/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.config.year_x=4,e.config.year_y=3,e.xy.year_top=0,e.templates.year_date=function(t){return e.date.date_to_str(e.locale.labels.year_tab+" %Y")(t)},e.templates.year_month=e.date.date_to_str("%F"),e.templates.year_scale_date=e.date.date_to_str("%D"),e.templates.year_tooltip=function(e,t,a){return a.text},function(){var t=function(){return"year"==e._mode};e.dblclick_dhx_month_head=function(a){if(t()){var i=a.target||a.srcElement,n=e._getClassName(i.parentNode);if(-1!=n.indexOf("dhx_before")||-1!=n.indexOf("dhx_after"))return!1;
for(var r=i;r&&(!r.hasAttribute||!r.hasAttribute("date"));)r=r.parentNode;if(r){var s=this.templates.xml_date(r.getAttribute("date"));s.setDate(parseInt(i.innerHTML,10));var o=this.date.add(s,1,"day");!this.config.readonly&&this.config.dblclick_create&&this.addEventNow(s.valueOf(),o.valueOf(),a)}}};var a=e.changeEventId;e.changeEventId=function(){a.apply(this,arguments),t()&&this.year_view(!0)};var i=e.render_data,n=e.date.date_to_str("%Y/%m/%d"),r=e.date.str_to_date("%Y/%m/%d");e.render_data=function(e){
if(!t())return i.apply(this,arguments);for(var a=0;a<e.length;a++)this._year_render_event(e[a])};var s=e.clear_view;e.clear_view=function(){if(!t())return s.apply(this,arguments);var a=e._year_marked_cells,i=null;for(var n in a)a.hasOwnProperty(n)&&(i=a[n],i.className="dhx_month_head",i.setAttribute("date",""));e._year_marked_cells={}},e._hideToolTip=function(){this._tooltip&&(this._tooltip.style.display="none",this._tooltip.date=new Date(9999,1,1))},e._showToolTip=function(t,a,i,n){if(this._tooltip){
if(this._tooltip.date.valueOf()==t.valueOf())return;this._tooltip.innerHTML=""}else{var r=this._tooltip=document.createElement("DIV");r.className="dhx_year_tooltip",document.body.appendChild(r),r.onclick=e._click.dhx_cal_data}for(var s=this.getEvents(t,this.date.add(t,1,"day")),o="",d=0;d<s.length;d++){var _=s[d];if(this.filter_event(_.id,_)){var l=_.color?"background:"+_.color+";":"",c=_.textColor?"color:"+_.textColor+";":"";o+="<div class='dhx_tooltip_line' style='"+l+c+"' event_id='"+s[d].id+"'>",
o+="<div class='dhx_tooltip_date' style='"+l+c+"'>"+(s[d]._timed?this.templates.event_date(s[d].start_date):"")+"</div>",o+="<div class='dhx_event_icon icon_details'>&nbsp;</div>",o+=this.templates.year_tooltip(s[d].start_date,s[d].end_date,s[d])+"</div>"}}this._tooltip.style.display="",this._tooltip.style.top="0px",document.body.offsetWidth-a.left-this._tooltip.offsetWidth<0?this._tooltip.style.left=a.left-this._tooltip.offsetWidth+"px":this._tooltip.style.left=a.left+n.offsetWidth+"px",this._tooltip.date=t,
this._tooltip.innerHTML=o,document.body.offsetHeight-a.top-this._tooltip.offsetHeight<0?this._tooltip.style.top=a.top-this._tooltip.offsetHeight+n.offsetHeight+"px":this._tooltip.style.top=a.top+"px"},e._year_view_tooltip_handler=function(a){if(t()){var a=a||event,i=a.target||a.srcElement;"a"==i.tagName.toLowerCase()&&(i=i.parentNode),-1!=e._getClassName(i).indexOf("dhx_year_event")?e._showToolTip(r(i.getAttribute("date")),getOffset(i),a,i):e._hideToolTip()}},e._init_year_tooltip=function(){e._detachDomEvent(e._els.dhx_cal_data[0],"mouseover",e._year_view_tooltip_handler),
dhtmlxEvent(e._els.dhx_cal_data[0],"mouseover",e._year_view_tooltip_handler)},e.attachEvent("onSchedulerResize",function(){return t()?(this.year_view(!0),!1):!0}),e._get_year_cell=function(e){var t=e.getMonth()+12*(e.getFullYear()-this._min_date.getFullYear())-this.week_starts._month,a=this._els.dhx_cal_data[0].childNodes[t],e=this.week_starts[t]+e.getDate()-1;return a.querySelector(".dhx_year_body").firstChild.rows[Math.floor(e/7)].cells[e%7].firstChild},e._year_marked_cells={},e._mark_year_date=function(t,a){
var i=n(t),r=this._get_year_cell(t),s=this.templates.event_class(a.start_date,a.end_date,a);e._year_marked_cells[i]||(r.className="dhx_month_head dhx_year_event",r.setAttribute("date",i),e._year_marked_cells[i]=r),r.className+=s?" "+s:""},e._unmark_year_date=function(e){this._get_year_cell(e).className="dhx_month_head"},e._year_render_event=function(e){var t=e.start_date;for(t=t.valueOf()<this._min_date.valueOf()?this._min_date:this.date.date_part(new Date(t));t<e.end_date;)if(this._mark_year_date(t,e),
t=this.date.add(t,1,"day"),t.valueOf()>=this._max_date.valueOf())return},e.year_view=function(t){var a;if(t&&(a=e.xy.scale_height,e.xy.scale_height=-1),e._els.dhx_cal_header[0].style.display=t?"none":"",e.set_sizes(),t&&(e.xy.scale_height=a),e._table_view=t,!this._load_mode||!this._load())if(t){if(e._init_year_tooltip(),e._reset_year_scale(),e._load_mode&&e._load())return void(e._render_wait=!0);e.render_view_data()}else e._hideToolTip()},e._reset_year_scale=function(){this._cols=[],this._colsS={};
var t=[],a=this._els.dhx_cal_data[0],i=this.config;a.scrollTop=0,a.innerHTML="";var n=Math.floor(parseInt(a.style.width)/i.year_x),r=Math.floor((parseInt(a.style.height)-e.xy.year_top)/i.year_y);190>r&&(r=190,n=Math.floor((parseInt(a.style.width)-e.xy.scroll_width)/i.year_x));var s=n-11,o=0,d=document.createElement("div"),_=this.date.week_start(e._currentDate());this._process_ignores(_,7,"day",1);for(var l=7-(this._ignores_detected||0),c=0,h=0;7>h;h++)this._ignores&&this._ignores[h]||(this._cols[h]=Math.floor(s/(l-c)),
this._render_x_header(h,o,_,d),s-=this._cols[h],o+=this._cols[h],c++),_=this.date.add(_,1,"day");d.lastChild.className+=" dhx_scale_bar_last";for(var h=0;h<d.childNodes.length;h++)this._waiAria.yearHeadCell(d.childNodes[h]);for(var u=this.date[this._mode+"_start"](this.date.copy(this._date)),v=u,f=null,h=0;h<i.year_y;h++)for(var g=0;g<i.year_x;g++){f=document.createElement("DIV"),f.style.cssText="position:absolute;",f.setAttribute("date",this.templates.xml_format(u)),f.innerHTML="<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>"+d.innerHTML+"</div><div class='dhx_year_body'></div></div>";
var p=f.querySelector(".dhx_year_month"),m=f.querySelector(".dhx_year_grid"),y=f.querySelector(".dhx_year_week"),x=f.querySelector(".dhx_year_body"),b=e.uid();this._waiAria.yearHeader(p,b),this._waiAria.yearGrid(m,b),p.innerHTML=this.templates.year_month(u);for(var w=this.date.week_start(u),k=(this._reset_month_scale(x,u,w,6),x.querySelectorAll("td")),E=0;E<k.length;E++)this._waiAria.yearDayCell(k[E]);a.appendChild(f),y.style.height=y.childNodes[0].offsetHeight+"px";var D=Math.round((r-190)/2);f.style.marginTop=D+"px",
this.set_xy(f,n-10,r-D-10,n*g+5,r*h+5+e.xy.year_top),t[h*i.year_x+g]=(u.getDay()-(this.config.start_on_monday?1:0)+7)%7,u=this.date.add(u,1,"month")}this._els.dhx_cal_date[0].innerHTML=this.templates[this._mode+"_date"](v,u,this._mode),this.week_starts=t,t._month=v.getMonth(),this._min_date=v,this._max_date=u};var o=e.getActionData;e.getActionData=function(a){if(!t())return o.apply(e,arguments);var i=a?a.target:event.srcElement,n=e._get_year_month_date(i),r=e._get_year_month_cell(i),s=e._get_year_day_indexes(r);
return s&&n?(n=e.date.add(n,s.week,"week"),n=e.date.add(n,s.day,"day")):n=null,{date:n,section:null}},e._get_year_day_indexes=function(t){var a=e._get_year_el_node(t,this._locate_year_month_table);if(!a)return null;for(var i=0,n=0,i=0,r=a.rows.length;r>i;i++){for(var s=a.rows[i].getElementsByTagName("td"),n=0,o=s.length;o>n&&s[n]!=t;n++);if(o>n)break}return r>i?{day:n,week:i}:null},e._get_year_month_date=function(t){var t=e._get_year_el_node(t,e._locate_year_month_root);if(!t)return null;var a=t.getAttribute("date");
return a?e.date.week_start(e.date.month_start(r(a))):null},e._locate_year_month_day=function(t){return-1!=e._getClassName(t).indexOf("dhx_year_event")&&t.hasAttribute&&t.hasAttribute("date")};var d=e._locate_event;e._locate_event=function(t){var a=d.apply(e,arguments);if(!a){var i=e._get_year_el_node(t,e._locate_year_month_day);if(!i||!i.hasAttribute("date"))return null;var n=r(i.getAttribute("date")),s=e.getEvents(n,e.date.add(n,1,"day"));if(!s.length)return null;a=s[0].id}return a},e._locate_year_month_cell=function(e){
return"td"==e.nodeName.toLowerCase()},e._locate_year_month_table=function(e){return"table"==e.nodeName.toLowerCase()},e._locate_year_month_root=function(e){return e.hasAttribute&&e.hasAttribute("date")},e._get_year_month_cell=function(e){return this._get_year_el_node(e,this._locate_year_month_cell)},e._get_year_month_table=function(e){return this._get_year_el_node(e,this._locate_year_month_table)},e._get_year_month_root=function(e){return this._get_year_el_node(this._get_year_month_table(e),this._locate_year_month_root);
},e._get_year_el_node=function(e,t){for(;e&&!t(e);)e=e.parentNode;return e}}()});