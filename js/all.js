

//用data去判別每一個顏色是怎樣

var height_data = document.getElementById('height');

var weight_data = document.getElementById('weight') ;

var btn = document.querySelector('.result');

var result = document.querySelector('.check') ;

var datalist = JSON.parse(localStorage.getItem('BMIData')) || [] ;

var  reset = document.querySelector('.loop') ;

var listData = document.querySelector('.list') ;

var statusItem = document.querySelector('#statusText') ;

var statecolor = "" ;
var stateData = "";
var BMI = 0;

updatelist();
btn.addEventListener("click",calculate) ;
//氣泡停止
reset.addEventListener("click", refresh);

listData.addEventListener("click", deleteData);

function deleteData(e){
    e.preventDefault() ;
    if(e.target.nodeName !== 'A'){return;}
    var index= e.target.dataset.num;
    datalist.splice(index,1);
    localStorage.setItem("BMIData", JSON.stringify(datalist));
    updatelist();
}

function refresh(e){

    e.stopPropagation() ;
    btn.style.height = '120px';
    btn.style.width = '120px';
    reset.style.display = "none";
    btn.style.border = "none";
    height_data.value = "";
    weight_data.value = "";
    result.innerHTML = '看結果';
    result.style.color = '#424242';
    document.querySelector('.label').style.color = ' #424242';
    document.querySelector('.check').style.paddingTop =  "48px";
    
}

// listData.addEventListener('load', ,false)

function calculate(){

    var h = height_data.value / 100 ;
    var w = weight_data.value ;

    if(h=="" || w== "") 
    {
        alert("請填入資料！！")
        return ;
    }

    BMI =(w / (h*h)).toFixed(2) ;
    result.innerHTML = BMI;

    state();
    addData();
}

function addData(){

    var newBMI = 
        {
            height : height_data.value ,
            weight : weight_data.value ,
             BMI   : BMI, 
            State  : stateData  ,
            color  : statecolor ,
            DATE : DateType
        }

    datalist.push(newBMI);
    localStorage.setItem("BMIData", JSON.stringify(datalist));

     updatelist();

     
}

var date = new Date() ;

var DateType = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear() ;


function updatelist(){

    var str = "";

    var length = datalist.length;

    for( i = 0 ; i < length ; i++){
        str += "<li class='"+datalist[i].color+"' data-num='"+i+"'><div class='STATE'><span class='state'>" + datalist[i].State +"</span></div>"
        +"<div class='bmiTitle'> BMI: <span class='bmiDATA'>  "+datalist[i].BMI+"</span></div>"
        +"<div class='wTitle'> weight: <span class='wDATA'> "+ datalist[i].weight + "</span>kg</div>" 
        +"<div class='hTitle'> height: <span class='hDATA'> "+datalist[i].height+ "</span>cm</div>"
        +"<div class='Date'><span class='date'>"+datalist[i].DATE+"</span></div>"
        +"<div class='Delete'><a href='#'>刪除</a></div></li>"  ;

    
    }

    document.querySelector('.list').innerHTML = str;
    
}


function state(){

    result.style.paddingTop = "42px";
    btn.style.height = "123px";
    btn.style.width = "123px";
    reset.style.display = "block";

    if(BMI < 18.5 && BMI > 16){
        
        statecolor = "blue";
        stateData = "過輕";
        statusItem.innerHTML = '過輕' ;
        statusItem.style.color = "#31BAF9" ;
        reset.style.color = "#31BAF9" ;
        btn.style.border = "6px solid #31BAF9" ;
        document.querySelector('.label').style.color = "#31BAF9";
        result.style.color = "#31BAF9";

    }else if(BMI > 18.5 && BMI < 25){

        statecolor = "green";
        stateData = '理想';
        statusItem.innerHTML = '理想' ;
        statusItem.style.color = "#86D73E" ;
        // document.querySelector('.table .list li').style.borderLeft = "2px solid #86D73E";
        reset.style.background = "#86D73E" ;
        btn.style.border = "6px solid #86D73E" ;
        document.querySelector('.label').style.color = "#86D73E";
        result.style.color = "#86D73E";
        //18.5 < BMI < 25
    }else if(BMI >25 && BMI < 30){

        statecolor = "orange";
        stateData = '過重';
        statusItem.innerHTML = stateData ;
        statusItem.style.color = "#FF6C02" ;
        reset.style.background = "#FF6C02" ;
        btn.style.border = "6px solid #FF6C02" ;
        document.querySelector('.label').style.color = "#FF6C02";
        result.style.color = "#FF6C02";

    }else if(BMI >30 && BMI < 35){

        statecolor = "orange";
        stateData = '中等肥胖';
        statusItem.innerHTML = stateData ;
        statusItem.style.color = "#FF6C02" ;
        reset.style.background = "#FF6C02" ;
        btn.style.border = "6px solid #FF6C02" ;
        document.querySelector('.label').style.color = "#FF6C02";
        result.style.color = "#FF6C02";
        
    }else if(BMI >35 && BMI < 40){

        statecolor = "orange";
        stateData = '嚴重肥胖';
        statusItem.innerHTML = stateData ;
        statusItem.style.color = "#FF6C02" ;
        reset.style.background = "#FF1200" ;
        btn.style.border = "6px solid #FF1200" ;
        document.querySelector('.label').style.color = "#FF1200";
        result.style.color = "#FF1200";
        
    }

}