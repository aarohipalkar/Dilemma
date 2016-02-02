//variables
var clickCounter = 0;
var currentMadmanPosition;
var random;
var row = 10;
var col = 10;

$(document).ready(function()
{
	drawBoard();
	setMadman();
	
	//special effects
	$('.fieldElement').hover(
		function()
		{
			$(this).addClass("activeField");
		},
		function()
		{
			$(this).removeClass("activeField");
		}		 
	);
	$('.fieldElement').click(function()
	{
		clickCounter++;
		//if the clicked div has the madman
		if($(this).attr("id") === "madman" )
		{
			alert("YOU WIN!");
		}
		
		$(this).css({"background-color":"orange"});
		$(this).attr("id", "fire");
		
		if( clickCounter % 3 == 0 )
		{
			madmanBurn();
			removeMadman();
			setMadman();
		}	
	});
});

var boardData;
function drawBoard()
{
	var identity = 1;
	for( var i=0; i<row; i++)
	{
		 for( var j=0; j<col; j++ )
		 {
			$('<div class="fieldElement"></div>').attr('id', "div"+identity).appendTo('#container');
			identity++;
		 }
		 $('<div class="clear"></div>').appendTo('#container');
	}
}

function removeMadman()
{
	var $element = document.getElementById('madman');
	$($element).removeAttr("id", "madman");
	$($element).attr("id", "div"+currentMadmanPosition);
	//$($element).css({"background-color":"#99CCFF"});
}

function setMadman()
{
//	$("#div4").attr("id", "madman");
//	currentMadmanPosition = 4;
	random = Math.floor( Math.random()*row*col) + 1;
	console.log(random);
	var $element = document.getElementById('div'+random);
	if( available(random))
	{
		//$($element).css({"background-color":"red"});
		$($element).attr("id", "madman");
		currentMadmanPosition = random;
	}
	else
	{
		console.log( "hello" );
		setMadman();	
	}
//		$("#div100").attr( "id", "madman");
}

function available( position )
{
	console.log(position);
	if( document.getElementById("div"+(position)) === null )
		return false;	
		
	//check above div
	if( position > row )
	{
		if( document.getElementById("div"+(position-20)) === null )
			return false;
			
	}		
	if( position < (row*col-row) )
	{
		//check below div
		if( document.getElementById("div"+(position+20)) === null)
		{
			return false;
			
		}
			
	}		
	if( position % row != 0 )
		//check right div
		if( document.getElementById("div"+(position+1)) === null )
			return false;
	if( position % row != 1 )
		if( document.getElementById("div"+(position-1)) === null )
			return false;
	return true;		
	
}

function madmanBurn()
{
	for( var i = 0; i < 3; i++)
	{
		var something = 1;
		var check = true;
		do
		{
			something = Math.floor( Math.random()*row*col)+1;
			check = ( document.getElementById("div"+(something)) === null );
			console.log(something);
			if(!check)
			{
				$(document.getElementById('div'+something)).attr("id", "fire");
			}	
		}while(check);
	}
	
}

