var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var drawBuffer = [];
var drawPoint = false;
var drawLine = 0;
var drawArc = 0;
var drawBezier = 0;
var drawArea = 0;
var drawPoligono = 0;
var tol = 10;
var linhaTD = 0;
	




drawCall = function ()
{
	// var td_checkbox = ;
		//console.log(document.getElementById('TD').checked);
	if ($("#tD").is(":checked")){
	console.log("Modo Tô Doidão Ativado");

		//alert("Entrou no checado");
	}else{
		// context.fillRect(0, 0, canvas.width, canvas.height);
		
	context.fillStyle = "rgb(255,255,255)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	desenhaGrid();
		// alert("Não consegiu passar, mas entrou na funcao");
	}

	//console.log("o tamanho do drawBuffer.length é :"+drawBuffer.length);
	if(drawBuffer.length > 0){
		for (var i = 0; i < drawBuffer.length; i++){
			//context.setLineDash([0,0]);
			//if(scale != 2 && drawBuffer[i] != pick){
				drawBuffer[i].draw(context);
				
			//}
		}
	}

}



getColor = function() 
{
	return document.getElementById("colorwheel").value;
}

setAllFalse = function()
{
	drawPoint = false;
	drawLine = 0;
	drawArc = 0;
	drawBezier = 0;
	drawArea = 0;
	scale = 0
	rotation = 0
}

generateNewPoint = function()
{
	if(drawPoint == false){
		setAllFalse();
		drawPoint = true;
	}
	else{
		drawPoint = false;
	}
}

generateNewLine = function()
{
	if(drawLine == 0){
		setAllFalse();
		drawLine = 1;
		linhaTD = 0;
	}
	
}

generateNewArc = function()
{
	if(drawArc == 0){
		setAllFalse();
		drawArc = 1;
	}
}

generateNewBezier = function()
{
	if(drawBezier == 0){
		setAllFalse();
		drawBezier = 1;
	}
}
generateNewPoligono = function(){

	if(drawPoligono == 0){
		setAllFalse();
		drawPoligono = 1;
	}
}


generateNewArea = function()
{
	if(drawArea == 0){
		setAllFalse();
		drawArea = 1;
	}
}
scaleFlag = function()
{
	if(scale == 0){
		setAllFalse();
		scale = 1;
	}
}

rotationFlag = function()
{
	if(rotation == 0 && pick != null){
		setAllFalse();
		rotation = 1;
	}
}

drawCall();