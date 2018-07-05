var MODE = "normal";
var args = makeArgs();
/*
if(args["nv"] == "ff"){
	window.captureEvents(Event.CLICK);
}
*/
function makeArgs(){

	var myQuery,myStr,myArgs;
	myQuery = new Array();
	myStr = new Array();
	myArgs = new Array();

	myQuery = window.location.search.substr(1).split("&");
	for(k in myQuery){
		myStr = myQuery[k].split("=");
		myArgs[myStr[0]] = myStr[1];
	}
	return myArgs;
}
  
function DrawPuzzle(){
  
  var pTable;
  var oTr,oTd;
  var i,j,k;

  pTable = $("#puzzle");
/*
  if(args["nv"] == "ie"){pTable = pTable.firstChild}
*/
  
  //1行目
  oTr = document.createElement('tr');
  oTr.setAttribute("id", "trl00");
  
  oTd = createDot("0000");
  oTr.appendChild(oTd);
  
  for(i=1;i<=X;i++){
    
    oTd = createHLine(String(i + 100).substr(1) + "00");
    oTr.appendChild(oTd);
    
    oTd = createDot(String(i + 100).substr(1) + "00");
    oTr.appendChild(oTd);
  }
  pTable.appendChild(oTr);

  //2行目以降
  for(j=1;j<=Y;j++){
    //マス目のある行
    oTr = document.createElement('tr');
    oTr.setAttribute("id", "trl" + String(j + 100).substr(1));
    
    oTd = createVLine("00" + String(j + 100).substr(1));
    oTr.appendChild(oTd);
    
    for(i=1;i<=X;i++){
      
      oTd = createBox(String(i + 100).substr(1) + String(j + 100).substr(1));
      if(qNum[i][j] != undefined){oTd.innerHTML = qNum[i][j];}
      oTr.appendChild(oTd);
      
      oTd = createVLine(String(i + 100).substr(1) + String(j + 100).substr(1));
      oTr.appendChild(oTd);
    }
    pTable.appendChild(oTr);

    //横線がある行
    oTr = document.createElement('tr');
    oTr.setAttribute("id", "trb" + String(j + 100).substr(1));
    
    oTd = createDot("00" + String(j + 100).substr(1));
    oTr.appendChild(oTd);

    for(i=1;i<=X;i++){
      
      oTd = createHLine(String(i + 100).substr(1) + String(j + 100).substr(1));
      oTr.appendChild(oTd);
      
      oTd = createDot(String(i + 100).substr(1) + String(j + 100).substr(1));
      oTr.appendChild(oTd);
    }
    pTable.appendChild(oTr);
  }
}

function createDot(id){
  
	var oTd;
	var myId;
	myId = "dot".concat(id);
	
	oTd = document.createElement('td');
	with(oTd){
		setAttribute("id",myId);
		setAttribute("class","dot");
		style.width = "4px";
		style.height = "4px";
		style.backgroundColor = "black";
	}
  return oTd;
}

function createHLine(id){
	
	var oTd;
	var myId;
	myId = "hl".concat(id);
    
	oTd = document.createElement('td');
	with(oTd){
		setAttribute("id",myId);
	    setAttribute("class","hl");
	    setAttribute("status","white");
		with(style){
			width = "20px";
		    height = "4px";
		    backgroundColor = "white";
		    fontSize = "4px";
		    textAlign = "center";
		}
	}
	return oTd;
}

function createVLine(id){
	
	var oTd;
	var myId;
	myId = "vl".concat(id);
    
	oTd = document.createElement('td');
	with(oTd){
		setAttribute("id",myId);
	    setAttribute("class","hl");
	    setAttribute("status","white");
		with(style){
			width = "4px";
		    height = "20px";
		    backgroundColor = "white";
		    fontSize = "4px";
		    verticalAlign = "middle";
		}
	}
	return oTd;
}

function createBox(id){
  
	var oTd;
	var myId;
	myId = "box".concat(id);
	
	oTd = document.createElement('td');
	with(oTd){
		setAttribute("id",myId);
		setAttribute("class","box");
		with(style){
			width = "20px";
		    height = "20px";
		    backgroundColor = "white";
		    fontSize = "18px";
			fontWeight = "bold";
		    verticalAlign = "middle";
			textAlign = "center";
		}
	}
  return oTd;
}

function myOnClick(e){
 	
	var eId;
	if(args["nv"] == "ff"){
		eId = e.target.id;
	}else if(args["nv"] == "ie"){
		eId = window.event.srcElement.id;
	}
  
  switch (eId.substr(1,1)) {
  case "l":
    changeLine(eId);
    break;
  default:
    break;
  }
}

// クリックされた線の色を変える(トグル)
function changeLine(eId){
  var objLine;
  objLine = document.getElementById(eId);
	switch (MODE) {
	    case "normal":
			switch (objLine.getAttribute("status")) {
			  case "black":
			    objLine.style.backgroundColor = "#FFFFFF";
			    objLine.innerHTML = "×";
			    objLine.setAttribute("status","cross");
			    break;
			  case "cross":
			    objLine.style.backgroundColor = "#FFFFFF";
			    objLine.innerHTML = "";
			    objLine.setAttribute("status","white");
			    break;
			  case "white":
			    objLine.style.backgroundColor = "#000000";
			    objLine.setAttribute("status","black");
			    break;
			  case "red":
			    objLine.style.backgroundColor = "#FFFFFF";
			    objLine.style.color = "#000000";
			    objLine.innerHTML = "×";
			    objLine.setAttribute("status","cross");
				break;
			  case "green":
			    objLine.style.backgroundColor = "#FFFFFF";
			    objLine.style.color = "#000000";
			    objLine.innerHTML = "×";
			    objLine.setAttribute("status","cross");
				break;
			  case "gcross":
			    objLine.style.backgroundColor = "#FFFFFF";
			    objLine.innerHTML = "";
			    objLine.setAttribute("status","white");
				break;
			  default:
			    objLine.style.backgroundColor = "#FFFFFF";
			    objLine.setAttribute("status","white");
			    break;
			}
			break;
	    case "try":
			switch (objLine.getAttribute("status")) {
				case "black":
					break;
				case "cross":
					break;
				case "red":
					break;
				case "green":
				    objLine.style.backgroundColor = "#FFFFFF";
				    objLine.style.color = "#00FF00";
				    objLine.innerHTML = "×";
				    objLine.setAttribute("status","gcross");
				    break;
				case "gcross":
				    objLine.style.backgroundColor = "#FFFFFF";
				    objLine.innerHTML = "";
				    objLine.setAttribute("status","white");
				    break;
				case "white":
				    objLine.style.backgroundColor = "#00FF00";
				    objLine.setAttribute("status","green");
				    break;
				default:
				    objLine.style.backgroundColor = "#FFFFFF";
				    objLine.setAttribute("status","white");
				    break;
			}
			break;
	}
}

function check(){
	
	var ng;
	ng = false;
	
	// 線の赤くなっているところだけ黒くする
	changeAllLineColor("red","black");
	
	// 数字の周りの線の本数をチェックする
	if(checkAroundNumber()){
		alert("Not correct.");
		return;
	}

	// 行き止まりの線がないことをチェック
	// 交差や枝分かれがないかチェック
	if(checkAroundDot()){
		alert("Not correct.");
		return;
	}
	
	// 輪が複数ないかチェック
	if(checkDoubleLoop()){
		alert("Not correct.");
		return;
	}
	
	// おめでとう
	alert("Perfect!");
}

// 線の色を一斉に変える
function changeAllLineColor(boforeColor,afterColor){
	
	var objLine;
	
	for(i=1;i<=X;i++){
		for(j=0;j<=Y;j++){
			// 横線
			objLine = document.getElementById("hl" + String(i + 100).substr(1) + String(j + 100).substr(1));
			if(objLine.getAttribute("status") == boforeColor){
				objLine.style.backgroundColor = afterColor;
				objLine.setAttribute("status",afterColor);
			}
		}
	}
	for(i=0;i<=X;i++){
		for(j=1;j<=Y;j++){
			// 縦線
			objLine = document.getElementById("vl" + String(i + 100).substr(1) + String(j + 100).substr(1));
			if(objLine.getAttribute("status") == boforeColor){
				objLine.style.backgroundColor = afterColor;
				objLine.setAttribute("status",afterColor);
			}
		}
	}
}

// ×印のON/OFF
function clearAllLineCross(myStatus){
	
	var objLine;
	
	for(i=1;i<=X;i++){
		for(j=0;j<=Y;j++){
			// 横線
			objLine = document.getElementById("hl" + String(i + 100).substr(1) + String(j + 100).substr(1));
			if(objLine.getAttribute("status") == myStatus){
				objLine.style.backgroundColor = "white";
				objLine.setAttribute("status","white");
				objLine.innerHTML = "";
			}
		}
	}
	for(i=0;i<=X;i++){
		for(j=1;j<=Y;j++){
			// 縦線
			objLine = document.getElementById("vl" + String(i + 100).substr(1) + String(j + 100).substr(1));
			if(objLine.getAttribute("status") == myStatus){
				objLine.style.backgroundColor = "white";
				objLine.setAttribute("status","white");
				objLine.innerHTML = "";
			}
		}
	}
}

// ×印の色を変更
function changeAllLineCross(beforeStatus,afterStatus){
	
	var objLine;
	
	for(i=1;i<=X;i++){
		for(j=0;j<=Y;j++){
			// 横線
			objLine = document.getElementById("hl" + String(i + 100).substr(1) + String(j + 100).substr(1));
			if(objLine.getAttribute("status") == beforeStatus){
				if(afterStatus == "gcross"){
					objLine.style.color = "green";
				}else if(afterStatus == "cross"){
					objLine.style.color = "black";
				}
				objLine.setAttribute("status",afterStatus);
			}
		}
	}
	for(i=0;i<=X;i++){
		for(j=1;j<=Y;j++){
			// 縦線
			objLine = document.getElementById("vl" + String(i + 100).substr(1) + String(j + 100).substr(1));
			if(objLine.getAttribute("status") == beforeStatus){
				if(afterStatus == "gcross"){
					objLine.style.color = "green";
				}else if(afterStatus == "cross"){
					objLine.style.color = "black";
				}
				objLine.setAttribute("status",afterStatus);
			}
		}
	}
}

function checkAroundNumber(){
	
	var i,j;
	var objLine,objBox;
	var myId;
	myId = new Array();
	var cnt;
	var ng;
	
	ng = false;
	
	for(i=1;i<=X;i++){
		for(j=1;j<=Y;j++){
			
			cnt = 0;
			objBox = document.getElementById("box" + String(i + 100).substr(1) + String(j + 100).substr(1));
			objBox.style.color = "black";
			
			// hl(i,j-1)
			myId["up"] = "hl" + String(i     + 100).substr(1) + String(j - 1 + 100).substr(1);
			// hl(i,j)
			myId["dn"] = "hl" + String(i     + 100).substr(1) + String(j     + 100).substr(1);
			// vl(i-1,j)
			myId["lf"] = "vl" + String(i - 1 + 100).substr(1) + String(j     + 100).substr(1);
			// vl(i,j)
			myId["rt"] = "vl" + String(i     + 100).substr(1) + String(j     + 100).substr(1);
			
			for(m in myId){
				objLine = document.getElementById(myId[m]);
				if(objLine.getAttribute("status") == "black" || (objLine.getAttribute("status") == "red" || objLine.getAttribute("status") == "green")){
					cnt++;
				}
			}
			// count and check -> number red
			if(objBox.innerHTML == "" || objBox.innerHTML == cnt){
				//alert("OK");
			}else{
				//alert("NG");
				objBox.style.color = "red";
				ng = true;
			}
		}
	}
	return ng;
}

function checkAroundDot(){

	var i,j;
	var objLine;
	objLine = new Array();
	var myId;
	myId = new Array();
	var myCond;
	myCond = new Array();
	var cnt;
	var ng;
	
	ng = false;
	
	for(i=0;i<=X;i++){
		for(j=0;j<=Y;j++){
			
			cnt = 0;
			
			//vl(i,j)
			myCond["up"] = "j > 0";
			myId["up"] = "vl" + String(i     + 100).substr(1) + String(j     + 100).substr(1);
			//vl(i,j+1)
			myCond["dn"] = "j < Y";
			myId["dn"] = "vl" + String(i     + 100).substr(1) + String(j + 1 + 100).substr(1);
			//hl(i,j)
			myCond["lf"] = "i > 0";
			myId["lf"] = "hl" + String(i     + 100).substr(1) + String(j     + 100).substr(1);
			//hl(i+1,j)
			myCond["rt"] = "i < X";
			myId["rt"] = "hl" + String(i + 1 + 100).substr(1) + String(j     + 100).substr(1);
			
			for(l in myId){
				objLine[l] = null;
				if(eval(myCond[l])){
					objLine[l] = document.getElementById(myId[l]);
					if(objLine[l].getAttribute("status") == "red" || (objLine[l].getAttribute("status") == "black" || objLine[l].getAttribute("status") == "green")){
						cnt++;
					}
				}
			}
			// count and check -> line red
			if(cnt == 0 || cnt == 2){
				//alert("OK");
			}else{
				//alert("NG");
				for(k in objLine){
					if(objLine[k] && (objLine[k].getAttribute("status") == "black" || objLine[k].getAttribute("status") == "green")){
						objLine[k].style.backgroundColor = "red";
					    objLine[k].setAttribute("status","red");
					}
				}
				ng = true;
			}
		}
	}
	return ng;
}

function checkDoubleLoop(){
	var ng = false;
	var lineName;
	var objLine;
	var myStatus;
	var myAry = new Array();
	var flg1 = false;
	var flg2 = false;
	var hv,strX,strY,strX1,strY1,strX2,strY2,intX,intY,intX1,intY1,intX2,intY2;
	var myNext = new Array();
	var nextName;
	var myAryCnt = 0;
	var cnt = 0;
	var breaker = 0;
	var debug,objDebug;
	
//	objDebug = document.getElementById("footer");
	
	// 最初の黒線を探す
	for1:
	for(i=1;i<=X;i++){
		for(j=0;j<=Y;j++){
			// 横線
			lineName = "hl" + String(i + 100).substr(1) + String(j + 100).substr(1);
			objLine = document.getElementById(lineName);
			myStatus = objLine.getAttribute("status");
			if(myStatus == "black" || (myStatus == "green" || myStatus == "red")){
				myAry[lineName] = 1;
				myAryCnt++;
				break for1;
			}
		}
	}
	// 続く黒線を最初の黒線と比較しながら配列に入れていく
	while1:
	while(!flg2 && (breaker < 300)){
		breaker++;
		flg1 = false;
		hv = lineName.substr(0,2);
		strX1 = lineName.substr(2,1);
		strX2 = lineName.substr(3,1);
		strY1 = lineName.substr(4,1);
		strY2 = lineName.substr(5,1);
		intX1 = parseInt(strX1);
		intX2 = parseInt(strX2);
		intY1 = parseInt(strY1);
		intY2 = parseInt(strY2);
		intX = intX1 * 10 + intX2;
		intY = intY1 * 10 + intY2;
//		debug += "lineName->" + lineName + "<br>";
//		debug += "intX->" + intX + "<br>";
//		debug += "intY->" + intY + "<br>";
		
		if(hv == "hl"){
			// hl(x+1)y,hl(x-1)y,vl(x-1)y,vlxy,vl(x-1)(y+1),vlx(y+1)
			myNext[0] = new Array();
			myNext[0]["hv"] = "hl";
			myNext[0]["intX"] = intX + 1;
			myNext[0]["intY"] = intY;
			myNext[0]["strX"] = String(intX + 1 + 200).substr(1);
			myNext[0]["strY"] = String(intY + 200).substr(1);
			myNext[1] = new Array();
			myNext[1]["hv"] = "hl";
			myNext[1]["intX"] = intX - 1;
			myNext[1]["intY"] = intY;
			myNext[1]["strX"] = String(intX - 1 + 200).substr(1);
			myNext[1]["strY"] = String(intY + 200).substr(1);
			myNext[2] = new Array();
			myNext[2]["hv"] = "vl";
			myNext[2]["intX"] = intX - 1;
			myNext[2]["intY"] = intY;
			myNext[2]["strX"] = String(intX - 1 + 200).substr(1);
			myNext[2]["strY"] = String(intY + 200).substr(1);
			myNext[3] = new Array();
			myNext[3]["hv"] = "vl";
			myNext[3]["intX"] = intX;
			myNext[3]["intY"] = intY;
			myNext[3]["strX"] = String(intX + 200).substr(1);
			myNext[3]["strY"] = String(intY + 200).substr(1);
			myNext[4] = new Array();
			myNext[4]["hv"] = "vl";
			myNext[4]["intX"] = intX - 1;
			myNext[4]["intY"] = intY + 1;
			myNext[4]["strX"] = String(intX - 1 + 200).substr(1);
			myNext[4]["strY"] = String(intY + 1 + 200).substr(1);
			myNext[5] = new Array();
			myNext[5]["hv"] = "vl";
			myNext[5]["intX"] = intX;
			myNext[5]["intY"] = intY + 1;
			myNext[5]["strX"] = String(intX + 200).substr(1);
			myNext[5]["strY"] = String(intY + 1 + 200).substr(1);
		}else if(hv == "vl"){
			// vlx(y+1),vlx(y-1),hlx(y-1),hlxy,hl(x+1)(y-1),hl(x+1)y
			myNext[0] = new Array();
			myNext[0]["hv"] = "vl";
			myNext[0]["intX"] = intX;
			myNext[0]["intY"] = intY;
			myNext[0]["strX"] = String(intX + 200).substr(1);
			myNext[0]["strY"] = String(intY + 1 + 200).substr(1);
			myNext[1] = new Array();
			myNext[1]["hv"] = "vl";
			myNext[1]["intX"] = intX;
			myNext[1]["intY"] = intY;
			myNext[1]["strX"] = String(intX + 200).substr(1);
			myNext[1]["strY"] = String(intY - 1 + 200).substr(1);
			myNext[2] = new Array();
			myNext[2]["hv"] = "hl";
			myNext[2]["intX"] = intX;
			myNext[2]["intY"] = intY - 1;
			myNext[2]["strX"] = String(intX + 200).substr(1);
			myNext[2]["strY"] = String(intY - 1 + 200).substr(1);
			myNext[3] = new Array();
			myNext[3]["hv"] = "hl";
			myNext[3]["intX"] = intX;
			myNext[3]["intY"] = intY;
			myNext[3]["strX"] = String(intX + 200).substr(1);
			myNext[3]["strY"] = String(intY + 200).substr(1);
			myNext[4] = new Array();
			myNext[4]["hv"] = "hl";
			myNext[4]["intX"] = intX + 1;
			myNext[4]["intY"] = intY - 1;
			myNext[4]["strX"] = String(intX + 1 + 200).substr(1);
			myNext[4]["strY"] = String(intY - 1 + 200).substr(1);
			myNext[5] = new Array();
			myNext[5]["hv"] = "hl";
			myNext[5]["intX"] = intX + 1;
			myNext[5]["intY"] = intY;
			myNext[5]["strX"] = String(intX + 1 + 200).substr(1);
			myNext[5]["strY"] = String(intY + 200).substr(1);
		}
		for(i in myNext){
			nextName = myNext[i]["hv"] + myNext[i]["strX"] + myNext[i]["strY"];
//			debug += nextName + "<br>";
			objLine = document.getElementById(nextName);
			if(objLine){
				myStatus = objLine.getAttribute("status");
				if(myStatus == "black" || (myStatus == "green" || myStatus == "red")){
					if(nextName in myAry){
						if(!flg1){
							flg1 = true;
						}else{
							flg2 = true;
						}
					}else{
//						debug += "next->" + nextName + "<br>";
						myAry[nextName] = "1";
						myAryCnt++;
						lineName = nextName;
						continue while1;
					}
				}
			}
		}
//		debug += "----------<br>";
	}
//	objDebug.innerHTML = debug;
	// 黒線の本数を数える
	for(i=1;i<=X;i++){
		for(j=0;j<=Y;j++){
			// 横線
			lineName = "hl" + String(i + 100).substr(1) + String(j + 100).substr(1);
			objLine = document.getElementById(lineName);
			myStatus = objLine.getAttribute("status");
			if(myStatus == "black" || (myStatus == "green" || myStatus == "red")){
				cnt++;
			}
		}
	}
	for(i=0;i<=X;i++){
		for(j=1;j<=Y;j++){
			// 縦線
			lineName = "vl" + String(i + 100).substr(1) + String(j + 100).substr(1);
			objLine = document.getElementById(lineName);
			myStatus = objLine.getAttribute("status");
			if(myStatus == "black" || (myStatus == "green" || myStatus == "red")){
				cnt++;
			}
		}
	}
	// myAryの長さと黒線の本数を比較
	if(myAryCnt != cnt){
		ng = true;
	}
	
	return ng;
}

function myClear(){
	if (window.confirm("クリアしてよろしいですか？")) {
		changeAllLineColor("black","white");
		changeAllLineColor("red","white");
		changeAllLineColor("green","white");
		clearAllLineCross("cross");
		clearAllLineCross("gcross");
	}
}

function myTry(){
	if(MODE == "normal"){
		alert("normal->try");
		MODE = "try";
	}else if(MODE == "try"){
		alert("try->normal");
		MODE = "normal";
		changeAllLineColor("green","white");
		clearAllLineCross("gcross");
	}
}

function myFix(){
	changeAllLineColor("green","black");
	changeAllLineCross("gcross","cross");
	MODE = "normal";
}
