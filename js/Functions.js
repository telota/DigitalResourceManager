var searchArray = [];
var multisearchArray = [];
var multisearch_obj = {};
var currenttag=""
var field=""
var relation="is"
var logic="AND"
var currentfilter=[]
var grids=["grid4a", "grid4b", "grid4c", "grid4d"]
var maprelation={"is":"ist", "contains":"beinhaltet", "begins with": "beginnt mit", "ends with":"endet mit", "not in": "ist nicht", "AND":"UND", "OR":"ODER"}
var arr = [
    {val : "", text: 'Alle Standorte'},
    {val : "Baden-Wuerttemberg_Lautenbach_Pfarrkirche.json", text: 'Lautenbach, Pfarrkirche, Baden-Württemberg'},
    {val : "Brandenburg_FrankfurtOder_St-Marien.json", text: 'Frankfurt a. d. Oder, Kirche St-Marien, Brandenburg'},
    //{val : "Sachsen-Anhalt_Hadmersleben_St-Peter-und-Paul.json", text: 'Hadmersleben, Kirche St. Peter und Paul, Sachsen-Anhalt'},
    {val : "Sachsen-Anhalt_Hadmersleben_Stadtkirche-Unser-Lieben-Frauen.json", text: 'Hadmersleben, Stadtkirche Unser lieben Frauen, Sachsen-Anhalt'},
    {val : "Sachsen-Anhalt_Halle-Saale_Moritzburg.json", text: 'Halle (Saale), Moritzburg, Sachsen-Anhalt'},
    {val : "Sachsen-Anhalt_Ilsenburg_Dorfkirche-St-Marien.json", text: 'Ilsenburg, Dorfkirche St. Marien, Sachsen-Anhalt'},
    {val : "Sachsen-Anhalt_Koethen_Kirche-St-Marien.json", text: 'Köthen, Kirche St. Marien, Sachsen-Anhalt'},
    {val : "3D_Hackaton_Wilsnack_St_Nikolai.json", text: 'Hackathon 2022'}
];

var parameters = getParameters();
var startmenu=$.parseJSON(getValue(parameters.menu));

var arrmenu=[
    {val : "", text: 'Menus'},
    {val : startmenu["Startmenus"]["Standard"], text: 'Standard'},
    {val : startmenu["Startmenus"]["Freiburg"], text: 'Freiburg'}
];

//console.log(startmenu)
function Volltextsuche() {
    let volltext=document.getElementById('suche').value;
    w2ui['grid1'].search('all', volltext);
};

function ClearVolltext() {
    w2ui['grid1'].searchReset(); 
    document.getElementById('suche').value="";
};


function SingleView() {
    
    w2ui["grid1"].multiSelect = false;
    w2ui['grid1'].selectNone();
    w2ui['grid1'].select(0);
    $('input[id^="logic"]').css("display", "none");
    $('#ex1').css("display","block");
    $('div[id^="div"]').css("display", "block");
    $('.hideFilter').css("display", "none");
    $('#changed1,#feldauswahl').css("display", "none");
    
    $('#divIconclassMotiv, #divIconclassCategory,#filtermenu').css("display", "none");
    $('input[id^="logic"], input[id^="modification"], .labels').css("display","none");
    
    
    
    var file = w2ui["grid1"].getSelection();
    console.log("file: ", file)
    var record = w2ui["grid1"].get([singlevalue]);
   
    $("#ex1image").attr("src", record[0]["Photolight"]);
    $("#ex1link").attr("href", record[0]["Photolight"].replace("/thumbs","").replace("dh=250","dh=950"));
    $.each(record[0], function( index, value) {
	$('#'+index).css("color", "green");
	$('#'+index).attr('value', value.toString());
    });
};

function Registration() 
{
    let path = prompt("Pfad angeben", "Europa/Deutschland/Brandenburg");
    let file = prompt("Dateinamen angeben", "Brandenburg_Kirche.json"); 
    var record= {"path": path, "file": file}
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });  
    
    $.ajax({
        type:'POST',
        url:"reg",
        dataType: 'JSON',
        data:Object.assign ({}, record),
        success:function(data){
            alert(data.success);
        }, 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
        }
    }); 
}

function getParameters()
{
    var parameterFragments = location.search.substr(1).split("&");
    var parameters = {}
    for(var i = 0; i < parameterFragments.length; i++)
    {
        var splittedParameter = parameterFragments[i].split("=");
        parameters[splittedParameter[0]] = decodeURIComponent(splittedParameter[1]);
    }
    return parameters;
}

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}


function BuildMenu() {

    
    


    //selatt.append($('<input type="text" name="format" value=""/>'));
    /*$('#werte1').on('change', function() {
	var value = $(this).val();
	if (field=="IconclassCategory" || field=="IconclassMotiv")
	{$("#iconclass").show(); $("#iconclass").val($.parseHTML(value)[0].outerText); $("#werteanzeige").hide();  $("#werteanzeige").val(value);}
	else {
	    $("#iconclass").hide();
	    $("#werteanzeige").show();
	    $("#werteanzeige").val(value)};
    });*/
};


//$('#first').editableSelect();
$("#grid2").hide()
$("#images").hide()
$("#main").hide()
$('#tableshide').hide();
$('#imagehide').hide();
      
function getValue(file){
    var value= $.ajax({ 
	url: file, 
	async: false
    }).responseText;
    return value;
}

function Bildergalerie(var1, var2, var3, var4, var5) {

    if (var1=="on") {
	
	gal='true'
	var selectionArray=[]
	var file=w2ui["grid1"].getSelection();
	var recordsimg1=[]
	if (file.length>0) {
	    $.each(file, function(index, value) {
		selectionArray.push(w2ui["grid1"].get(value)["FileName"]);
	    });
	    $.each(recordsimgklein, function(index, value) {
		if($.inArray(value["Filename"], selectionArray) !== -1) {
		    recordsimg1.push(value)}
	    });
	}
	else {
	    recordsimg1=var5
	}

	var interval=parseInt(recordsimg1.length/var3)+1
	var grids=["grid4a", "grid4b", "grid4c", "grid4d", "grid4e", "grid4f"];
	$("#grid4a,#grid4b").css("border-width","0px");
	var gridscompare=["gridV1", "gridV2"];

	$(function () {
	    $.each(grids.slice(0,var3), function(index, valuegrid) {
		var minimum=index*(parseInt(recordsimg1.length/var3)+1)
		var maximum=(index+1)*(parseInt(recordsimg1.length/var3)+1)
	    
		// IMAGE GALLERY
		if (w2ui[valuegrid] != null) {
		    w2ui[valuegrid].reset();
		    w2ui[valuegrid].destroy();
	    }
		
	    $('#'+valuegrid).w2grid({
	    name    : valuegrid,
	    recordHeight : var4,
		show: { 
		toolbar: false,
		footer: false,
		toolbarSave: false,
		selectColumn: true
	    },
		columns: columnsimg,
		records: recordsimg1.slice(minimum, maximum),
		//records: recordsval.slice(minimum, maximum),
		onClick: function (event) {

		  
		    $("#secondheaderimage").empty()
		    $("#secondheadertext").empty()
		    
		    if (details=="true") {
			$("#grid2").show()
			$("#grid2").css({"margin-left": "10px","width":"500px"})
			$("#grid1").css("width","1000px")
		    }

		    w2ui['grid2'].clear();
		    currentrecord=event.recid;
		    //var record = this.get(event.recid);
		    var record = recordsval[event.recid];
		    //console.log("Record")
		    //console.log(record)
		    $("#secondheaderimage").css("height","100px")
		    $("#secondheaderimage").css("margin-right","15px")
		    $("#secondheadertext").css("font-size","12px")
		    $("#secondheaderimage").append(record["Photo"])
		    if(standard=="false") {
		
			var secondgrid=[ ]
			$("#secondheadertext").append("<b>Einzelansicht (komplett)</b> <br/> Inventarnummer: "+record["Identifier"]+"</br> Dateiname: "+record["FileName"])
			$.each(metadata_liste[0], function( index, value ) {
			    if (mapping[index]!=undefined ) {
				//console.log("----")
				//console.log(value)
				//console.log(index)
				//console.log(record[index])
				secondgrid.push({"recid": counter, "name": mapping[index]["Mapping"], value:record[index],attr: 'align="center"' })
			    }
			    
			    else {
				if (index!="Photo") { 
				    secondgrid.push({"recid": counter, "name": index, value:record[index] })
				}
				else {
				    console.log(record["SourceFile"])
				    
				}
			    }
			    counter=counter+1
			});
			//console.log(secondgrid)
			w2ui['grid2'].add(secondgrid);
		    }

		    if(standard=="true") {
			var secondgrid=[ ]
			$("#secondheadertext").append("<b>Einzelansicht (CVMA Standard)</b> <br/> Inventarnummer: "+record["Identifier"]+"</br> Dateiname: "+record["FileName"])
			$.each(metadata_liste[0], function( index, value ) {
			    
			    
			    if (mapping[index]!=undefined && mapping[index]["Zuordnung"]=="Standard") {
				
				secondgrid.push({"recid": counter, "name": mapping[index]["Mapping"], value:record[index],attr: 'align="center"' })
			    }
			    
			    
			counter=counter+1
			});
			//console.log(secondgrid)
			w2ui['grid2'].add(secondgrid);
		    }
		}
	    });
	    });
	    
	    $.each(gridscompare, function(index, valuegrid) {
	    
            // IMAGE GALLERY
            if (w2ui[valuegrid] != null) {
                w2ui[valuegrid].reset();
                w2ui[valuegrid].destroy();
            }
            
            $('#'+valuegrid).w2grid({
            name    : valuegrid,
            recordHeight : var4,
                show: { 
                toolbar: false,
                footer: false,
                toolbarSave: false,
                selectColumn: true
            },
            columns: columnsimg,
		records: recordsimg1,
		onClick: function (event) {
		
		    $("#secondheaderimage").empty()
		    $("#secondheadertext").empty()
	      
	      if (details=="true") {
		  $("#grid2").show()
		  $("#grid2").css({"margin-left": "10px","width":"500px"})
		  $("#grid1").css("width","1000px")
		  
	      }
	      w2ui['grid2'].clear();
	      currentrecord=event.recid;
	      var record = this.get(event.recid);
	      
	      
	      $("#secondheaderimage").css("height","100px")
	      $("#secondheaderimage").css("margin-right","15px")
	      $("#secondheadertext").css("font-size","12px")
		    $("#secondheaderimage").append(record["Photo"])
		    
		    if(standard=="false") {
			var secondgrid=[ ]
			$("#secondheadertext").append("<b>Einzelansicht (komplett)</b> <br/> Inventarnummer: "+record["Identifier"]+"</br> Dateiname: "+record["FileName"])
			$.each(metadata_liste[0], function( index, value ) {
			    if (mapping[index]!=undefined ) {
				
				secondgrid.push({"recid": counter, "name": mapping[index]["Mapping"], value:record[index],attr: 'align="center"' })
			    }
			    
			    else {
				if (index!="Photo") { 
				    secondgrid.push({"recid": counter, "name": index, value:record[index] })
				}
				else {
				    console.log(record["SourceFile"])
			  
			      }
			    }
		  counter=counter+1
			});
		  //console.log(secondgrid)
			w2ui['grid2'].add(secondgrid);
	      }

		    if(standard=="true") {
			var secondgrid=[ ]
			$("#secondheadertext").append("<b>Einzelansicht (CVMA Standard)</b> <br/> Inventarnummer: "+record["Identifier"]+"</br> Dateiname: "+record["FileName"])
			$.each(metadata_liste[0], function( index, value ) {
			
			    if (mapping[index]!=undefined && mapping[index]["Zuordnung"]=="Standard") {
				secondgrid.push({"recid": counter, "name": mapping[index]["Mapping"], value:record[index],attr: 'align="center"' })
			    }
			    counter=counter+1
			});
			//console.log(secondgrid)
			w2ui['grid2'].add(secondgrid);
		    }
		}
	    });
	});
	});
	if(var3==1) {
	    if (var2=="true"){ 
		w2ui.layout.html('main', '<div style="position: relative; height: 1000px; width:100%; overflow-y: scroll; border:none; "><div id="grid4a" style=" border:none;  position: absolute; left: 0px; width: 99.5%; height:50000px;"></div></div>');
	    }
	    else {
		w2ui.layout.html('main', '<div style="position: relative; height: 1000px; width:100%; overflow-y:hidden;"><div id="gridV1" style="position: absolute; left: 0px; width: 49.5%; height:1000px;"></div><div id="gridV2" style="position: absolute; left: 49.5%; width: 49.5%; height:1000px;"></div></div>');
	    }
	}
	
	if(var3==2) {
            w2ui.layout.html('main', '<div style="position: relative; height: 1000px; width:100%; overflow-y: scroll; border:none; "><div id="grid4a" style=" border:none; position: absolute; left: 0px; width: 49.9%; height:150000px; overflow-y:hidden;"></div><div id="grid4b" style="position: absolute;  left: 49.9%; width: 49.9%; height:150000px; overflow-y:hidden;"></div></div>');
	    
        }
	
	if(var3==4) {
	    w2ui.layout.html('main', '<div style="position: relative; height: 1000px; width:100%; overflow-y: scroll;"><div id="grid4a" style="position: absolute; left: 0px; width: 24.9%;height:111000px;"></div><div id="grid4b" style="position: absolute; left: 24.9%; width: 24.9%;height:111000px;"></div><div id="grid4c" style="position: absolute; left: 49.6%; width: 24.9%;height:111000px;"></div><div id="grid4d" style="position: absolute; left: 74.7%; width: 24.9%;height:111000px;"></div></div>');
	}
	
	if(var3==6) {
            w2ui.layout.html('main', '<div style="font-size:10px; position: relative; height: 1000px; width:100%; overflow-y:scroll;  border:none !important; "><div id="grid4a" style="overflow-y: hidden;position: absolute; left: 0px; width: 16.5%;height:11000px;"></div><div id="grid4b" style="position: absolute; left: 16.5%; width: 16.5%;height:11000px;"></div><div id="grid4c" style="position: absolute; left: 33%; width: 16.5%;height:11000px;"></div><div id="grid4d" style="position: absolute; left: 49.5%; width: 16.5%;height:11000px;"></div><div id="grid4e" style="position: absolute; left: 66%; width: 16.5%;height:11000px;"></div><div id="grid4f" style="position: absolute; left: 82.5%; width: 16.5%;height:11000px;"></div></div>');

        }


	//setTimeout(function(){w2ui["grid4a"].search(searchArray, 'OR')}, 500);
	
	$(w2ui.layout.el('main'))
            .removeClass('w2ui-grid1')
            .css({ 
		'border-left': '1px solid silver'
            });
    }
    else {
	w2ui.layout.html('main', w2ui["grid1"]);
    }

   
}

function Dokumentation() {
    
    w2ui.layout.html('main', '<div style="padding: 10px">'+mappingfull["Metadaten"]["Dokumentation"]+'</div>');
    $(w2ui.layout.el('main'))
        .removeClass('w2ui-grid1')
        .css({ 
            'border-left': '1px solid silver'
        });
}

function Monitoring() {
    
    var monitoring_liste=$.parseJSON(getValue('/data/cvma_all.json'))
    var identifier=[]
    var filename=[]
    $.each(monitoring_liste, function( index, value ) {
	identifier.push(monitoring_liste[index]["Identifier"])
	filename.push([monitoring_liste[index]["Identifier"], monitoring_liste[index]["SourceFile"]])
	// find empty strings
    });

    
    var recipientsArray = identifier.sort()
    //console.log(recipientsArray) 
    var reportRecipientsDuplicate = [];
    var reportRecipientsMismatch = [];
    for (var i = 0; i < recipientsArray.length - 1; i++) {
	if (recipientsArray[i + 1] == recipientsArray[i] && recipientsArray[i]!=undefined) {
	    reportRecipientsDuplicate.push(recipientsArray[i] +"<br/>");
	}
    }
    
    for (var i = 0; i < filename.length - 1; i++) {
	if (filename[i][0] != undefined && filename[i][1].toString().indexOf(filename[i][0].toString()) < 0) {
	    reportRecipientsMismatch.push([filename[i][0].toString(), filename[i][1].toString()]+"<br/>");
	}
    }
    
    w2ui.layout.html('main', '<div style="padding: 10px"><h5>- Folgende Identifier sind nicht eindeutig: </h5>'+reportRecipientsDuplicate+'<h5>- Identifier stimmt nicht mit Dateinamen überein oder ist leer: </h5>'+reportRecipientsMismatch+'</div>');
    $(w2ui.layout.el('main'))
        .removeClass('w2ui-grid1')
        .css({ 
            'border-left': '1px solid silver'
        });
}

function GetSelection() {

    var sel1=w2ui.grid1.getSelection()
    //$("#images").show()
    
    $("#images").css("height","auto")
    $("#images").css("width","100%")
    $("#grid2").hide()
    $("#images").empty()
    $.each(sel1, function( index, value ) {
	$("#images").append("<div class='column'><figure><img src='http://localhost:8080/digilib/servlet/Scaler?fn=/"+metadata_liste[value]["SourceFile"].replace("/opt/SILO/cvma/","")+"&dw=420&dh=183'><br/><br/></img><figcaption><a style='font-size:14px;' target='_blank' href='http://localhost:8080/digilib/digilib.html?fn=/"+metadata_liste[value]["SourceFile"].replace("/opt/SILO/cvma/","")+"'>"+metadata_liste[value]["FileName"]+"</a></figcaption></figure></div>")
    });
}

function EditGrid() {
    var sel=w2ui.grid1.getSelection()
}

function showChanged() {
    console.log(w2ui['grid1'].getChanges()); 
    //w2alert('Changed records are displayed in the console');
}

//+++++++++++++++++
//    S U C H E   +
//+++++++++++++++++

function NegativeResult(var1, var2) {
    w2ui['grid1'].search([{ field: var1, value: var2, operator: 'not in'}], 'AND');
}

$("input:radio[name=options1]").click(function()
{
    logic=$(this).val();
    //if (currentfilter.length>1) {
    w2ui.layout3.html('right', '<div><span style="font-weight: bold;">Filtermenu: </span>'+currentfilter.join(' ')+'<span>Logische Verknüpfung: '+maprelation[logic]+'</span></div>');
    //}
});

$('.werte').click(function() {
	alert("akt: ", $(this).attr("value"))
        currenttag=$(this).attr("value");
});



function DropList()
{
    w2ui.layout3.html("right", '<div><span style="font-weight: bold;">Filtermenu: </span>'+currentfilter.join(' ')+'<span>Logische Verknüpfung: '+maprelation[logic]+'</span></div>');
}

function Search(var1)
{
    multisearchArray=[];
    let values=$("#RestorationHistory").val();
    let multisearch_obj ="";
    let condition="contains";
    $.each(unique(aktuelleFelder), function(key, value) {
	if ($('#logic' + value).is(":checked")==true){
	    condition="is"
	}
	else
	{condition="contains"};
	multisearch_obj = {
	    field: value.toString(),
	    value: $("#"+value).val().toString(),
	    operator: condition
	}
    multisearchArray.push(multisearch_obj);
    });
    w2ui['grid1'].searchReset();
    w2ui["grid1"].search(multisearchArray, 'AND')
    
};

function Execute() {
    
    var sel=w2ui.grid1.getSelection()
    currenttag=document.getElementById('werteanzeige').value
    
    for ( var u = 0; u < sel.length; u ++ )
    {
	var t={}
	t[field]=currenttag
	w2ui['grid1'].set(sel[u],t);
    }
}

function Append() {
    
    var sel=w2ui.grid1.getSelection()
   
    currenttag=document.getElementById('werteanzeige').value
    
    for ( var u = 0; u < sel.length; u ++ )
    {
	var t={}
	var oldvalue=w2ui['grid1'].get(sel[u])[field]
	t[field]=oldvalue+' '+currenttag
	w2ui['grid1'].set(sel[u],t);
    }
}

function Prepend() {
    var sel=w2ui.grid1.getSelection()
    currenttag=document.getElementById('werteanzeige').value
    for ( var u = 0; u < sel.length; u ++ )
    {
	var t={}
	var oldvalue=w2ui['grid1'].get(sel[u])[field]
	t[field]=currenttag+' '+oldvalue
	w2ui['grid1'].set(sel[u],t);
    }
}



function ExpertModus(var1,var2)
{
    console.log("aktuelles var: ",var2)
    if(var2=="off") {

	$("#expert"+var1).css("display", "block");
	$("#closeexpert"+var1).css("display", "none");
	$("#lab"+var1).empty();
    }
    else {
	
	$("#expert"+var1).css("display", "none");
	$("#closeexpert"+var1).css("display", "block");
	$.each(unique(aktuelleFelder), function(key, value) {
	    $("#lab"+var1).empty();
	    $("#lab"+var1).append("<span style='margin-left:10px;'></span><input id='wert"+var1+"' placeholder='current value' style='position:relative; bottom:16px;'></input><input id='ersetzen"+var1+"' placeholder='new value' style='position:relative; bottom:16px;'></input><button title='Teilstrings ersetzen' id='change1' style='margin-left:5px; bottom:12px;' class='bearbeiten' onclick='ChangeValue(\"replace\",\""+var1+"\")' >Replace</button><span style='bottom:12px; position:relative;'> | </span><button title='Teilstrings voran stellen' id='change2' style='margin-left:5px; bottom:12px;' class='bearbeiten' onclick='ChangeValue(\"prepend\",\""+var1+"\")' >Prepend</button><span style='bottom:12px; position:relative;'> | </span><button title='String anhängen' id='change3' style='margin-left:5px; bottom:12px;' class='bearbeiten' onclick='ChangeValue(\"append\",\""+var1+"\")' >Append</button><span style='bottom:12px; position:relative;'> | </span><button title='Letzte Änderung verwerfen' id='change4' style='margin-left:5px; bottom:12px;' class='bearbeiten' onclick='ChangeValue(\"reset\",\""+var1+"\")' >RLC</button><span style='position:relative; left:50px;'> | </span><button title='letzten gespeicherten Wert übernehmen' id='change13' style='left:60px; bottom:12px;' class='bearbeiten' onclick='ChangeValue(\'lastsave\',\''+index+'\')' >LSV</button>")
	});
    }
};

let wert="";
let ersetzen="";
let neu="";
let tempold=[];
let tempvalue={};


function ChangeValue(var1,var2) {

    console.log("Change Val", var1)
    $( document ).ready(function() {
	var iconclass_liste=$.parseJSON(getValue('iconclass_deutsch_komplett.json'))
	var newvalue="";
	var sel=w2ui.grid1.getSelection();
	//$.each(unique(aktuelleFelder), function(key, value) {
	for ( var u = 0; u < sel.length; u ++ )
	{

	    var oldvalue="";
	    var t={}
	    if (w2ui['grid1'].get(sel[u])[var2]!=undefined) { 
		oldvalue=w2ui['grid1'].get(sel[u])[var2]
		
	    }
	    else {oldvalue=""};
	    console.log("oldvalue", oldvalue) 
	    if(var1=="replace") {
		wert=$("#wert"+var2).val().toString();
		ersetzen=$("#ersetzen"+var2).val().toString();
		if (wert=="") {
		    if(confirm('Bist du sicher, dass du einen leeren String (current value) ersetzen willst?')) {
			// Save it!
			newvalue=oldvalue.replace(wert, ersetzen);
		    }
		    else {
			// Do nothing!
			console.log('abgebrochen');
		    }
		}
		newvalue=oldvalue.replace(wert, ersetzen);
		tempvalue[u].push(oldvalue);
	    };
	    
	    if(var1=="append") {
		wert=$("#wert"+var2).val().toString();
		ersetzen=$("#ersetzen"+var2).val().toString();
		    
		if (wert=="") {
		    newvalue=oldvalue.replace(oldvalue, oldvalue+''+ersetzen);
		    tempvalue[u].push(oldvalue);
		    
		}else {
		    newvalue=oldvalue.replace(wert, wert+''+ersetzen);
		    tempvalue[u].push(oldvalue);
		}
	    };
	    
	    if(var1=="prepend") {
		wert=$("#wert"+var2).val().toString();
		ersetzen=$("#ersetzen"+var2).val().toString();
		newvalue=oldvalue.replace(wert, ersetzen+''+wert);
		tempvalue[u].push(oldvalue);
	    };
	    
	    if(var1=="new") {
		neu=$("#"+var2).val().toString();
                newvalue=neu;
		tempold.push(oldvalue)
		tempvalue[u]=tempold;
	    };
	    
	    if(var1=="reset") {
		console.log("letzte Änderungen: ", tempvalue) 
		newvalue=tempvalue[u].slice(-1);
	    };
	    
	    if(var1=="lastsave") {
		
		newvalue=tempvalue[u][0];
	      };
	    
	    t[var2]=newvalue
	    w2ui['grid1'].set(sel[u],t);
	    
	    
		if (field=="IconclassNotation") {
		    console.log(newvalue)
		    if (newvalue==undefined || newvalue=="" ) {
			t["IconclassMotiv"]='<span>Wert leer oder nicht gefunden</span>';
			t["IconclassCategory"]='<span>Wert leer oder nicht gefunden</span>';
		    }
		    else
		    {
			t["IconclassMotiv"]='<a target="_blank" href="https://iconclass.org/de/'+newvalue+'">'+iconclass_liste[newvalue]+'</a>';
			try {
			    t["IconclassCategory"]='<a target="_blank" href="https://iconclass.org/de/'+newvalue.substring(0,3)+'">'+iconclass_liste[newvalue.substring(0,3)]+'</a>';
		    }
			catch(err){
			t["IconclassCategory"]='<span>Wert leer oder nicht gefunden</span>';
			}
		    };
		    if ($('#modification' + value).is(":checked")==true){
			$('#div'+value).css("background-color","green");
			w2ui['grid1'].set(sel[u],t);
		    };
		};
		w2ui["grid1"].refresh();
	    }
	    //});
	    //wert=document.getElementById('werteanzeige').value
	    let value="test"
	    //ersetzen=document.getElementById('ersetzen').value
	});
}

    function ReturnData(var1,var2) {
	var time=new Date().getTime();

	if (var2=="exif") {
	    var data = w2ui['grid1'].records;
	    var records= {"name": var1.replace("?cache","").replace(".json","")+"_"+time+".json", "ort":var1.replace("?cache",""), "daten": JSON.stringify(data)}
	    console.log(var2, records) 
	    $.ajaxSetup({
		headers: {
		    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	    });
	    
	    $.ajax({
		type:'POST',
		url:"metadata",
		dataType: 'JSON',
		data:Object.assign ({}, records),
		success:function(data){
		    alert(data.success);
	    }, 
		error: function(jqXHR, textStatus, errorThrown) {
		    console.log(jqXHR.status);
		}
	    });
	    
	    
	    var sel=w2ui.grid1.getSelection();
	    data = w2ui['grid1'].get(sel);
	    for (let i = 0; i < data.length; i++) {
		delete data[i]['SourceFile'] 
		delete data[i]['Photolight']
		delete data[i]['Photo']
		delete data[i]['recid']
	    } 
	    records= {"name": var1.replace("?cache","").replace(".json","")+"_"+time+".json", "ort":var1.replace("?cache",""), "daten": JSON.stringify(data)}

	    $.ajaxSetup({
		headers: {
		    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	    });
       
	console.log(var2, records)
	$.ajax({
	    type:'POST',
	    url:"exif",
	    dataType: 'JSON',
	    data:Object.assign ({}, records),
            success:function(data){
		alert(data.success);
	    }, 
	    error: function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR.status);
	    }
	})
    }
    else {
	var data = w2ui['grid1'].records;
	var records= {"name": var1.replace("?cache","").replace(".json","")+"_"+time+".json", "ort":var1.replace("?cache",""), "daten": JSON.stringify(data)}
	console.log(var2, records) 
	$.ajaxSetup({
	    headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
	});
	
	$.ajax({
	type:'POST',
	url:"metadata",
	dataType: 'JSON',
	data:Object.assign ({}, records),
        success:function(data){
	    alert(data.success);
	}, 
	error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
	}
    })
    };
}

function ReturnMetadata(var1) {
  var record= {"file": parameters.datafile.replace("data/","")}
  $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
  });  
    
  if (var1=="json") {
  $.ajax({
       type:'POST',
       url:"data",
       dataType: 'JSON',
       data:Object.assign ({}, record),
       success:function(data){
           console.log("ok");

       }, 
       error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
        }
    });
}
    
  if (var1=="csv") {
  $.ajax({
       type:'POST', 
       url:"metacsv",
       dataType: 'JSON',
       data:Object.assign ({}, record),
       success:function(data){
            window.open("https://telotawebdev.bbaw.de/cvma/zip", '_blank'); 

       }, 
       error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
        }
    });  
}
}

function ShowChanges() {
   //data = w2ui['grid1'].save().records;
   console.log( w2ui['grid1'].getChanges() );
   //console.log(data);

}

function SaveMetadata() {
   data = w2ui['grid1'].update();
   console.log(data.records);

}

function ReturnImages(var1)
{ 
    var record={}
    var sel=[]
    var data=[]
    var time=new Date().getTime();
    

    if (gal!='true') {
	sel=w2ui.grid1.getSelection()
	data = w2ui['grid1'].get(sel);
        for (let i = 0; i < data.length; i++) {

        delete data[i]['SourceFile'] 
        delete data[i]['Photo']
        delete data[i]['recid']
	} 
	

	record= {"name": time, "data": data, "selection": var1}
        console.log("images")
        console.log(record)
    }

    if (gal=="true") {
	
	var search_obj = [];
	var grids=["grid4a", "grid4b", "grid4c", "grid4d"]
	var searchImageArray=[]
	$.each(grids, function(index, valuegrid) {
	    searchImageArray.push(w2ui[valuegrid].getSelection())
	});
	
	data = w2ui['grid1'].get(searchImageArray.flat());
	record= {"name": time, "data": data, "selection": var1}
    }
        

    $.ajaxSetup({
	headers: {
	    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
    });
    

    $.ajax({
	type:'POST',
	url:"fotomanager",
	dataType: 'JSON',
	data:Object.assign ({}, record),
        success:function(data){
	   console.log("SUCCESS")
           window.open("https://telotawebdev.bbaw.de/cvma/zip", '_blank'); 
	}, 
	error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
	}
    });
   
    
   
}

function SaveData() {
    w2ui['grid1'].stateSave()
}

function SelectSingle(var1) {

    $('#imagegalleryhide').hide(); $('#imagegalleryshow').show();
    $('#imagehide').hide(); $('#imageshow').show();
    w2ui.layout.html('main', w2ui["grid1"]);
    w2ui['grid1'].search("FileName", var1);
}

function ShowTable()
{
    var grids=["grid4a", "grid4b", "grid4c", "grid4d", "grid4e", "grid4f"]
    var search_obj = {};
    searchArray=[]
    
    $.each(grids, function(index, valuegrid) {

	var file=w2ui["grid1"].getSelection()
	
    $.each(file, function(index, value) {
	console.log(w2ui[valuegrid].get(value)["FileName"])
	search_obj = {
	    field: "FileName",
	    value: w2ui[valuegrid].get(value)["FileName"],
	    operator: 'is'
	}
	searchArray.push(search_obj);
    });
    });
    

    $('#imagegalleryhide').hide(); $('#imagegalleryshow').show();
    $('#imagehide').hide(); $('#imageshow').show();
    //w2ui.layout.html('main',function(){w2ui["grid1"].search(searchArray, 'OR')});
    w2ui.layout.html('main', w2ui["grid1"]);
    setTimeout(function(){w2ui["grid1"].search(searchArray, 'OR')}, 200);
}

function GetURL()
{
    var url=$(location).attr('href')+"&filter="+JSON.stringify(multisearchArray);
    window.open(url, '_blank');
}

$( document ).ready(function() {
    setTimeout(function(){if (parameters.filter != undefined && $.parseJSON(parameters.filter).length>0) {
	multisearchArray=$.parseJSON(parameters.filter)
	Search('AND')
    }}, 300);
    
})

