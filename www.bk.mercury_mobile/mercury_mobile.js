
var daily = "";
var total_Favorite = 1;
var remove_from_Favorite = 0;
var war = "";
var drillmap = "";
var totalDailyRegion = "";
var currentDailyRegion = "";
var dailyDateHeader = "";
var MTDDateHeader = "";
var current_period = "daily";
var array_Favorite = new Array();


var jqo_Report_Data = jQuery("<div style='height: 40px;width: 300px;float: right; font-size: 10pt;font-style: italic;color: blue;'><a onclick=parseDailyData_adjusted() href='#'></a></div>")
.append("<div style='left = 5px;height: 40px;width: 50pxpx;float: left; font-size: 8pt;font-style: italic;'> Powered by Mercury Mobile</div>")
.append("<div style='left = 5px;height: 40px;width: 100px;float: left; font-size: 10pt;font-style: italic;color: blue;'><a href=mailto:" + $('#cuid').val() + "@att.com> Email Report </a></div>")
.append("<div style='left = 5px; height: 100px;width: 100px;float: center; font-size: 10pt;font-style: italic;color: blue;'><a onclick='addToFavorite()' href='#'> Add to Favorite </a></div>");

var jqo_total_adjusted = jQuery("<div style='height: 40px;width: 300px;float: right; font-size: 10pt;font-style: italic;color: blue;'><a onclick=parseDailyData() href='#'> Show Non-adjusted Values </a></div>")
.append("<div style='left = 5px;height: 40px;width: 50pxpx;float: left; font-size: 8pt;font-style: italic;'> </div>")
.append("<div style='left = 5px;height: 40px;width: 100px;float: left; font-size: 10pt;font-style: italic;color: blue;'><a href=mailto:" + $('#cuid').val() + "@att.com> Email Report </a></div>");                        


var jqo_total = jQuery("<div style='height: 40px;width: 300px;float: right; font-size: 10pt;font-style: italic;color: blue;'><a onclick=parseDailyData_adjusted() href='#'> Show Adjusted Values </a></div>")
.append("<div style='left = 5px;height: 40px;width: 50pxpx;float: left; font-size: 8pt;font-style: italic;'> </div>")
.append("<div style='left = 5px;height: 40px;width: 100px;float: left; font-size: 10pt;font-style: italic;color: blue;'><a href=mailto:" + $('#cuid').val() + "@att.com> Email Report </a></div>");                           


var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper', { scrollbarClass: 'myScrollbar' });
    myScroll = new iScroll('wrapper_cluster', { scrollbarClass: 'myScrollbar' });
    myScroll = new iScroll('wrapper_geography', { scrollbarClass: 'myScrollbar' });
    
}
function clusterLoad(){
    myScroll = new iScroll('wrapper_cluster', { scrollbarClass: 'myScrollbar' });
}
$('wrapper').bind('touchstart',function (e) { e.preventDefault(); }, false);
$('wrapper_cluster').bind('touchstart',function (e) { e.preventDefault(); }, false);
$('wrapper_geography').bind('touchstart',function (e) { e.preventDefault(); }, false);


var jQT = new $.jQTouch({
                        icon: 'jqtouch.png',
                        statusBar: 'black-translucent',
                        addGlossToIcon: true,
                        startupScreen: 'jqt_startup.png',
                        preloadImages: [
                                        
                                        'bar_img/ajax.png',
                                        'bar_img/animation.png',
                                        'bar_img/demos.png',
                                        'bar_img/events.png',
                                        'bar_img/extensions.png',
                                        'bar_img/iphone.png',
                                        'bar_img/jqt.png',
                                        'bar_img/video.png',
                                        'bar_img/ajax@2x.png',
                                        'bar_img/animation@2x.png',
                                        'bar_img/demos@2x.png',
                                        'bar_img/events@2x.png',
                                        'bar_img/extensions@2x.png',
                                        'bar_img/iphone@2x.png',
                                        'bar_img/jqt@2x.png',
                                        'bar_img/video@2x.png'
                                        ],
                        useFastTouch: true
                        
                        });
$(document).ready(function () {
                  
                  loaded(); // for instantiating iscroll
                  var aiBlackGear = new activityIndicator($('#BlackGear'));
                  $('#login').bind("tap",function(e,
                                                  data){
                                   $('#infoLabel').html('');
                                   //                                                aiBlackGear.draw(0);
                                   aiBlackGear.start(); 
                                   //alert($('#cuid').val());
                                   //Start Ajax request////
                                   $.ajax({
                                          type:'GET',
                                          dataType:'xml',
                                          url:'https://attdashboard.wireless.att.com/EDSGateway/ForwardHTTPRequest?reqtype=login&version=1.0.3',
                                          error: function(){
                                          aiBlackGear.stop();
                                          $('#infoLabel').html('Login Failed');
                                          },
                                          beforeSend:function(xmlHttpRequest){
                                          xmlHttpRequest.setRequestHeader('Att_eds_applicationname','MercuryReports');
                                          xmlHttpRequest.setRequestHeader('ATTGlobalLogonUserId',$('#cuid').val());
                                          xmlHttpRequest.setRequestHeader('ATTGlobalLogonPassword',$('#pwd').val());
                                          xmlHttpRequest.setRequestHeader('Att_eds_targetKey','ReportList');
                                          //xmlHttpRequest.setRequestHeader('Access-Control-Allow-Origin','*');
                                          xmlHttpRequest.setRequestHeader('Att_eds_applicationversion','1.0');
                                          xmlHttpRequest.setRequestHeader('Att_eds_deviceUDID','2D36CC76-3C7A-5173-A6B1-7D56DAD13F4B');
                                          },
                                          success:
                                          
                                          parseXml/*function(data,textStatus){
                                                   xmlDoc = $.parseXML( data );
                                                   alert(xmlDoc);
                                                   }*/
                                          
                                          });
                                   });
                  
                  $('#dailyButton').bind("tap",function(e, data){
                                         
                                         parseDailyData(current_period);          
                                         
                                         }); 
                  $('#ReportBack').bind("tap",function(e, data){
                                        $('#ReportData').html("");
                                        currentDailyRegion = "";
                                        totalDailyRegion = "";
                                        jQT.goTo("#myMenus");          
                                        
                                        });
                  
                  $('#totalReportBack').bind("tap",function(e, data){
                                             $('#ReportData').html("");
                                             currentDailyRegion = "";
                                             totalDailyRegion = "";
                                             jQT.goTo("#myMenus");          
                                             
                                             });
                  
                  var generatedRows = 0;
                  
                  setTimeout(function() {
                             $(window).resize();
                             
                             setTimeout(function() {
                                        $(window).resize();
                                        }, 1500);
                             }, 50);
                  
                  },false);


function goToReport(){
    total_Favorite = 0;
    $('#ReportData').find('a:contains("Add to Favorite")').attr('onclick','').unbind('click').bind('click',addToFavorite);
    $('#ReportData').find('a:contains("Remove from Favorite")').attr('onclick','').unbind('click').bind('click',removeFromFavorite);
    jQT.goTo("#Report");
}

function goToTotal(){
    total_Favorite = 1;
    $('#loadDaily').find('a:contains("Add to Favorite")').attr('onclick','').unbind('click').bind('click',addToFavoriteTotal);
    $('#loadDaily').find('a:contains("Remove from Favorite")').attr('onclick','').unbind('click').bind('click',removeFromFavorite);
    jQT.goTo("#dailyReport");
    
}

function goToTotal_adjusted(){
    total_Favorite = 1;
    $('#loadDaily').find('a:contains("Add to Favorite")').attr('onclick','').unbind('click').bind('click',addToFavoriteTotal_adjusted);
    $('#loadDaily').find('a:contains("Remove from Favorite")').attr('onclick','').unbind('click').bind('click',removeFromFavorite);
    jQT.goTo("#dailyReport");
    
}

function addToFavorite(){
    
    var Favorite_html = $('#Favorites').html();
    var jQ_fav = $("<li> <a onclick='drawTable(this)' href='#' style='height=10%;width:98%;position:absolute;left:10'>"+currentDailyRegion+"</a> </li>");
    $('#thelist').prepend(jQ_fav).andSelf();
    array_Favorite.push(currentDailyRegion.trim());
    $('#ReportData').find('a:contains("Add to Favorite")').html("Remove from Favorite");
    
    goToReport();
}

function removeFromFavorite(){
    
    if(total_Favorite)
    {
        
        var index = -1;
        if((index = array_Favorite.indexOf(totalDailyRegion)) != -1)
        {
            array_Favorite.splice(index,1);
        }
        else
        {
            alert("error in deleting from array_Favorite");
        }
        
        $('#Favorites a:contains('+totalDailyRegion+')').parent().remove();
        
        $('#loadDaily').find('a:contains("Remove from Favorite")').html("Add to Favorite");
        if(totalDailyRegion == 'AT&T Mobility (adjusted)')
        {
            goToTotal();
        }
        else
        {
            goToTotal_adjusted();
        }
        
    }
    else
    {
        var index = -1;
        if((index = array_Favorite.indexOf(currentDailyRegion)) != -1)
        {
            array_Favorite.splice(index,1);
        }
        else
        {
            alert("error in deleting from array_Favorite");
        }
        
        var temp_html = $('#Favorites a:contains('+currentDailyRegion+')').parent().remove();
        $('#ReportData').find('a:contains("Remove from Favorite")').html("Add to Favorite");
        goToReport();
        
    }
}

function addToFavoriteTotal_adjusted(){
    var Favorite_html = $('#Favorites').html();
    Favorite_html += "<div > <a onclick='parseDailyData_adjusted()' href='#' style='height=10%;width:98%;position:absolute;left:10'>"+"AT&T Mobility (adjusted)" + "</a> </div >"
    $('#Favorites').html(Favorite_html);
    array_Favorite.push(totalDailyRegion.trim());
    $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite");
    goToTotal_adjusted();
}

function addToFavoriteTotal(){
    var Favorite_html = $('#Favorites').html();
    Favorite_html += "<div > <a onclick='parseDailyData()' href='#' style='height=10%;width:98%;position:absolute;left:10'>"+"AT&T Mobility"+"</a> </div >"
    $('#Favorites').html(Favorite_html);
    array_Favorite.push(totalDailyRegion.trim());
    $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite");
    goToTotal();
}

function parseDailyData(){
    if(daily!=''){
        
        $.ajax({
               type: "GET",
               url: "drillmap.xml", 
               dataType: "xml", 
               complete: function(data) {
               drillmap = $.xml2json(data.responseXML); 
               
               showRegions(drillmap); 
               totalDailyRegion = 'AT&T Mobility';//This is when the app loads the first time and Total at&t is selected by default
               totalattinnerHTML = getReport(totalDailyRegion,current_period);
               $('#totalHeaderInitial').html(totalDailyRegion);
               $('#tab_1').removeClass('enabled');
               $('#tab_2').removeClass('enabled');
               $('#tab_3').removeClass('enabled');
               $('#tab_0').addClass('enabled');
               $('#totalHeader').html("Daily activity - "+dailyDateHeader); 
               $('#loadDaily').html(totalattinnerHTML).append(jqo_total);
               $('#loadDaily').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
               if(array_Favorite.indexOf(totalDailyRegion.trim()) != -1)
               {
               $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
               
               }
               goToTotal();
               }
               });
    }else{
        $('#loadDaily').html('<h2 align=center>Daily Data is still loading. Go back and click Daily Subscriber Reports again</h2>')
    }
}


function parseDailyData_adjusted(){
    if(daily!=''){
        
        $.ajax({
               type: "GET",
               url: "drillmap.xml", 
               dataType: "xml", 
               complete: function(data) {
               drillmap = $.xml2json(data.responseXML); 
               
               showRegions(drillmap); 
               totalDailyRegion = 'AT&T Mobility (adjusted)';//This is when the app loads the first time and Total at&t is selected by default
               $('#totalHeaderInitial').html(totalDailyRegion);
               totalattinnerHTML = getReport(totalDailyRegion,current_period);
               $('#tab_1').removeClass('enabled');
               $('#tab_2').removeClass('enabled');
               $('#tab_3').removeClass('enabled');
               $('#tab_0').addClass('enabled');
               $('#totalHeader').html("Daily activity - "+dailyDateHeader); 
               $('#loadDaily').html(totalattinnerHTML).append(jqo_total_adjusted);
               $('#loadDaily').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
               if(array_Favorite.indexOf(totalDailyRegion.trim()) != -1)
               {
               $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
               
               }
               goToTotal_adjusted();
               }
               });
    }else{
        $('#loadDaily').html('<h2 align=center>Daily Data is still loading. Go back and click Daily Subscriber Reports again</h2>')
    }
}

function goThere(obj){
    $('#loadClusters ul').html('');
    var nodePos = 0;
    
    // var nodePos = drillmap.level[0].level.indexOf("name", $(obj).siblings('a').text());
    for(var i=0;i<drillmap.level[0].level.length;i++){
        
        if(drillmap.level[0].level[i].name == $(obj).siblings('a').text()){
            
            nodePos = i;
        }
    }
    //var innerHTML = "";
    for (var i=0;i<drillmap.level[0].level[nodePos].level.length;i++){ 
        //innerHTML+= "<li onclick='drawTable(this)'>"+drillmap.level[0].level[nodePos].level[i].name+"</li>";
        $('#loadClusters ul').prepend($("<li onclick='drawTable(this)'>"+drillmap.level[0].level[nodePos].level[i].name+"</li>"));
    }
    //innerHTML +="</ul>";
    //$('#loadClusters').html(innerHTML);
    clusterLoad();
    jQT.goTo("#Clusters");
    alert("#Clusters ul".html());
} 



function drawTable(obj){
    // alert(obj.firstChild);
    currentDailyRegion = obj.innerText;
    //alert(currentDailyRegion); 
    var tableHTML =  getReport(currentDailyRegion,'daily');
    $('#reportHeaderInitial').html(currentDailyRegion);
    $('#reportHeader').html("Daily activity - "+dailyDateHeader); 
    
    $('#ReportData').html(tableHTML).append(jqo_Report_Data);
    $('#ReportData').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
    // the statement in the next if will not be able to find the appropriate anchor element
    
    if(array_Favorite.indexOf(currentDailyRegion.trim()) != -1)
    {
        $('#ReportData').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
        
    }
    //alert($('#ReportData').andSelf().html());
    $('#tab_2').removeClass('enabled');
    $('#tab_1').addClass('enabled');
    goToReport();
    //alert(obj.text);
}

function getMTDTable(str,region)
{
    var tableHTML =  getReport(str,'MTD');
    //alert(tableHTML);
    if(region=="other"){
        total_Favorite = 0;
        current_period = "MTD";
        $('#reportHeader').html(MTDDateHeader);
        
        $('#ReportData').html(tableHTML).append(jqo_Report_Data);
        $('#ReportData').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
        // the statement in the next if will not be able to find the appropriate anchor element
        
        if(array_Favorite.indexOf(currentDailyRegion.trim()) != -1)
        {
            $('#ReportData').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
            
        }
        
        goToReport();
    }else{
        total_Favorite = 1;
        $('#totalHeader').html(MTDDateHeader); 
        $('#totalHeaderInitial').html(str);
        current_period = "TotalMTD";
        if(str == 'AT&T Mobility (adjusted)')
        {
            $('#loadDaily').html(tableHTML).append(jqo_total_adjusted);
            $('#loadDaily').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
            if(array_Favorite.indexOf(totalDailyRegion.trim()) != -1)
            {
                $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
                
            }
            goToTotal_adjusted();
            
        }
        else if(str == 'AT&T Mobility')
        {
            $('#loadDaily').html(tableHTML).append(jqo_total);
            $('#loadDaily').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
            if(array_Favorite.indexOf(totalDailyRegion.trim()) != -1)
            {
                $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
                
            }
            goToTotal();
            
        }
        
        
    }
    
}

function getDailyTable(str,region){
    
    var tableHTML =  getReport(str,'daily');
    if(region=="other"){
        total_Favorite = 0;
        current_period = "TotalDaily";
        $('#reportHeader').html("Daily activity - "+dailyDateHeader); 
        
        $('#ReportData').html(tableHTML).append(jqo_Report_Data);  
        $('#ReportData').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
        // the statement in the next if will not be able to find the appropriate anchor element
        
        if(array_Favorite.indexOf(currentDailyRegion.trim()) != -1)
        {
            $('#ReportData').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
            
        }
        
        goToReport();
        
    }else{
        total_Favorite = 1;
        $('#totalHeader').html("Daily activity - "+dailyDateHeader);
        $('#totalHeaderInitial').html(str);
        current_period = "daily";
        if(str == 'AT&T Mobility (adjusted)')
        {
            $('#loadDaily').html(tableHTML).append(jqo_total_adjusted);
            $('#loadDaily').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
            if(array_Favorite.indexOf(totalDailyRegion.trim()) != -1)
            {
                $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
                
            }
            goToTotal_adjusted();
            
        }
        else if(str == 'AT&T Mobility')
        {
            $('#loadDaily').html(tableHTML).append(jqo_total);
            $('#loadDaily').find('a:contains("Remove from Favorite")').html("Add to Favorite"); // change all to add to favorite, without this statement
            if(array_Favorite.indexOf(totalDailyRegion.trim()) != -1)
            {
                $('#loadDaily').find('a:contains("Add to Favorite")').html("Remove from Favorite"); // change the specific one to remove from favorite as the ReportData corresponds to currentDailyRegion
                
            }
            goToTotal();
            
        }
        
        
    }
}

var keyArray;
function getReport(name,period){
    var nodePos;
    
    for(var i=0;i<daily.Region.length;i++){
        if(name==daily.Region[i].RegionName[0].text){
            //alert(daily.Region[i].RegionName);
            nodePos = i;
        }
        
    }
    //alert(nodePos);
    keyArray = new Array();
    var p = daily.Region[nodePos].DailyActivity[0];
    
    for (var key in p) {
        keyArray.push(key);
    }
    // alert(daily.Region[nodePos].DailyActivity[0].Total[0].GrossAdds[0].text);
    //alert(jsonParsed);
    // alert(daily.Region[nodePos].firstChild().nodeName());
    //window.prompt("p",JSON.stringify(daily));
    
    var tableHTML = "";
    tableHTML += "<table style='width:100%;font-size: 9pt;'>";
    tableHTML += "<tr style='background:#bcc9d6'><thead><td style='background:#bcc9d6'></td>";
    tableHTML += "<TD style='background:#bcc9d6'><strong>Gross<BR>Adds</TD><TD style='background:#bcc9d6'><strong>Deacts</strong></TD><TD style='background:#bcc9d6'><strong>Net<BR>Adds</strong></TD><TD style='background:#bcc9d6'><strong>Total<BR>Churn</strong></TD><TD style='background:#bcc9d6'><strong>EOP<BR>Subs</strong></TD></THEAD>";
    tableHTML += "</tr>";
    tableHTML += "<tr>";
    tableHTML += "<td><strong>Total</strong></td>";
    tableHTML += returnHTMLValues(nodePos,'Total',period);
    tableHTML += "</tr>";
    tableHTML += "<tr style='background:#bcc9d6'>";
    tableHTML += "<td><strong>Branded GoPhone</strong></td>";
    tableHTML += returnHTMLValues(nodePos,'BrandedGoPhone',period);
    tableHTML += "</tr>";
    tableHTML += "<tr>";
    tableHTML += "<td><strong>Branded Postpaid</strong></td>";
    tableHTML += returnHTMLValues(nodePos,'BrandedPostPaid',period);
    tableHTML += "</tr>";
    tableHTML += "<tr style='background:#bcc9d6'>";
    tableHTML += "<td><strong>Total Branded</strong></td>";
    tableHTML += returnHTMLValues(nodePos,'TotalBranded',period);
    tableHTML += "</tr>";
    tableHTML += "<tr>";
    tableHTML += "<td><strong>Connected Devices</strong></td>";
    tableHTML += returnHTMLValues(nodePos,'ConnectedDevices',period);
    tableHTML += "</tr>";
    tableHTML += "<tr  style='background:#bcc9d6'>";
    tableHTML += "<td><strong>Reseller</strong></td>";
    tableHTML += returnHTMLValues(nodePos,'Reseller',period);
    tableHTML += "</tr>";
    tableHTML += "</table>"; 
    return tableHTML;
    //alert($('#TotalTab').attr('class'));
    
}
window.undefined = 'undef';
function returnHTMLValues(nodePos,type,period){
    var innerHTML = "";
    
    //daily.Region[nodePos].DailyActivity[0].Total[0].GrossAdds[0].text);
    if(keyArray.indexOf(type)!=-1){
        
        if(period=='daily'){
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].DailyActivity[0].'+type+'[0].GrossAdds[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].DailyActivity[0].'+type+'[0].Deactivations[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].DailyActivity[0].'+type+'[0].NetAdds[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].DailyActivity[0].'+type+'[0].TotalChurn[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].DailyActivity[0].'+type+'[0].Customers[0].text'))+"</td>";
        }
        else{
            
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].MonthlyActivity[0].'+type+'[0].GrossAdds[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].MonthlyActivity[0].'+type+'[0].Deactivations[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].MonthlyActivity[0].'+type+'[0].NetAdds[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].MonthlyActivity[0].'+type+'[0].TotalChurn[0].text'))+"</td>";
            innerHTML += "<td>"+CheckFormat(eval('daily.Region[nodePos].MonthlyActivity[0].'+type+'[0].Customers[0].text'))+"</td>";
        }
        innerHTML = innerHTML.replace(/undefined/g,"");
    }
    return innerHTML;
} 

function CheckFormat(str){
    if(parseFloat(str)<0){
        str = str.split("-")[1];
        str = "<font color='red'>("+str+")</font>";
    }
    return str;
}

function showRegions(json){
    var innerHTML = "";
    innerHTML +="<ul class='rounded'>";
    for (var i=0;i<json.level[0].level.length;i++){
        innerHTML+= "<li><a onclick='drawTable(this)' style='width:70%;position:absolute;left:10'>"+json.level[0].level[i].name+"</a><a onclick='goThere(this)'  style='position:absolute;width:15%;right:15'><img src='themes/apple/img/chevron.png'></img></a></li>";
        
    }
    innerHTML +="</ul>";
    // alert(innerHTML);
    $('#loadRegions').html(innerHTML);
}

function getDailyXML(){
    $.ajax({
           type:'GET',
           dataType:'xml',
           url:'https://attdashboard.wireless.att.com/EDSGateway/ForwardHTTPRequest?file=adsr.xml',
           error: function(){
           //ShowStatus( "AJAX - error()" );
           
           // Load the content in to the page.
           //jContent.html( "<p>Page Not Found!!</p>" );
           $('#infoLabel').html('Login Failed');
           },
           beforeSend:function(xmlHttpRequest){
           xmlHttpRequest.setRequestHeader('Att_eds_applicationname','MercuryReports');
           xmlHttpRequest.setRequestHeader('ATTGlobalLogonUserId',$('#cuid').val());
           xmlHttpRequest.setRequestHeader('ATTGlobalLogonPassword',$('#pwd').val());
           xmlHttpRequest.setRequestHeader('Att_eds_targetKey','Report');
           //xmlHttpRequest.setRequestHeader('Att_eds_applicationname','MercuryReports');
           xmlHttpRequest.setRequestHeader('Att_eds_applicationversion','1.0');
           xmlHttpRequest.setRequestHeader('Att_eds_deviceUDID','2D36CC76-3C7A-5173-A6B1-7D56DAD13F4B');
           },
           complete:function(data) {
           
           daily = $.xml2json(data.responseXML,true); //Please notice that we use responseXML here which is DOMDocument object
           dailyDateHeader = daily.Date ;
           MTDDateHeader = daily.MTD;
           }        				
           });	           	
}    



function getWarXML(){
    $.ajax({
           type:'GET',
           dataType:'xml',
           url:'https://attdashboard.wireless.att.com/EDSGateway/ForwardHTTPRequest?file=war.xml',
           error: function(){
           //ShowStatus( "AJAX - error()" );
           
           // Load the content in to the page.
           //jContent.html( "<p>Page Not Found!!</p>" );
           //alert("Unable to get war XML");
           $('#infoLabel').html('Login Failed');
           },
           beforeSend:function(xmlHttpRequest){
           xmlHttpRequest.setRequestHeader('Att_eds_applicationname','MercuryReports');
           xmlHttpRequest.setRequestHeader('ATTGlobalLogonUserId',$('#cuid').val());
           xmlHttpRequest.setRequestHeader('ATTGlobalLogonPassword',$('#pwd').val());
           xmlHttpRequest.setRequestHeader('Att_eds_targetKey','Report');
           //xmlHttpRequest.setRequestHeader('Att_eds_applicationname','MercuryReports');
           xmlHttpRequest.setRequestHeader('Att_eds_applicationversion','1.0');
           xmlHttpRequest.setRequestHeader('Att_eds_deviceUDID','2D36CC76-3C7A-5173-A6B1-7D56DAD13F4B');
           },
           complete:function(data) {
           //alert("Done War");
           war = $.xml2json(data.responseXML);
           
           }
           
           });
}




function ToggleData(period){
    if(period=='Daily'){
        //alert("In Daily");
        
        $('#DailyButton').removeAttr('disabled');
        $('#MTDButton').attr('disabled', 'disabled');
        getDailyTable(currentDailyRegion,'other');
    }else if(period=='MTD'){
        
        $('#MTDButton').removeAttr('disabled');
        $('#DailyButton').attr('disabled', 'disabled');
        getMTDTable(currentDailyRegion,'other');
    }else if(period=='TotalDaily'){
        //alert("In Daily");
        
        $('#TotalDailyButton').removeAttr('disabled');
        $('#TotalMTDButton').attr('disabled', 'disabled');
        getDailyTable(totalDailyRegion,'total');
    }else if(period=='TotalMTD'){
        //alert("In Daily");
        
        $('#TotalMTDButton').removeAttr('disabled');
        $('#TotalDailyButton').attr('disabled', 'disabled');
        getMTDTable(totalDailyRegion,'total');
    }
}


function parseXml(xml)

{
    
    $(xml).find("iphone").each(function()
                               {
                               //alert($(this).find("returncode").text());
                               if($(this).find("access").text().search(new RegExp(/daily/i))<0){
                               $('#Daily').hide(); 
                               }else{
                               getDailyXML();
                               }
                               if($(this).find("access").text().search(new RegExp(/war/i))<0){
                               $('#war').hide(); 
                               }else{
                               getWarXML();
                               }
                               jQT.goTo("#myMenus");
                               
                               });
    
    
}