
$(document).ready(function(){
	
try {
	
	
var btn = $.fn.button.noConflict(); // reverts $.fn.button to jqueryui btn
$.fn.btn = btn; // assigns bootstrap button functionality to $.fn.btn


$( "#sendEmail" ).dialog({
      resizable: false,
      height:300,
      width: 400,
      modal: true,
      autoOpen: false,
      buttons: {
        "Send": function() {
        		sendEmail(); 
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
});

$(".navLink").click(function() {
	$("#myNavList li").removeClass("active");	
	$(this).parent().addClass("active");
});

resizeDiv();

$('#content').enscroll({
    showOnHover: true,
    verticalTrackClass: 'track3',
    verticalHandleClass: 'handle3'
});

window.onresize = function(event) {
resizeDiv();
}

} catch(err) {
	//alert(err);
}

});



function resizeDiv() {
var vpw = $(window).width();
var vph = $(window).height() - 10;
var navH = $("#myNavBar").height();
$("#content").css({"height": (vph - navH) + "px"});
$("#content").css({"top": navH + "px"});
$("#content").css({"width": "50em"});
}


function sendEmail() {
	var name = checkField("fromName","Name")	
	if (name == "")
		return;
	var email = checkField("fromEmail","Email");
	if (email == "")
		return;
	var content = checkField("emailContent","Details");
	if (content == "")
		return;		
		
	var url = "../cv/email.php?fromName="+name;
			url += "&fromEmail="+email;
			url += "&emailContent="+content;
	//alert(url);
	var response = serverGet(url);
	alert(response);
 	$( "#sendEmail" ).dialog( "close" );
}

function checkField(id,txt) {
	var val = $("#"+id).val();
	if (val == "") {
		alert(txt+" Missing.");
		$("#"+id).focus();
		return "";
	}
	return val;
}

function emailForm() {
	$( "#sendEmail" ).dialog( "open" );
}

function serverGet(page) {
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
	} else {// code for IE6, IE5
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	page+="&tok="+rand();
	 
	xmlhttp.open("GET",page,false);
	xmlhttp.send(null);

	return xmlhttp.responseText;
}


function rand() {
	return randomise(50);
}

function randomise(n) {
	var token="";
	var abc="abcdefghijklmnopqrstuvwxyz";
	for (i=1;i<n;i++) {
		if (getRandomInt(1,2) == 1) {
			token+=getRandomInt(1,9).toString();
		} else{
			tmp=getRandomInt(1,26)-1;
			token+=abc.substring(tmp,tmp+1);
		}
	}
	return token;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
