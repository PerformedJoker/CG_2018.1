






document.getElementById('pegaArquivo').onclick = function() {
    document.getElementById('escolheArquivo').click();
    //alert("ëntrou aq");
	};






var leitorDeCanvas = new FileReader();



window.onload = function init() {
	leitorDeCanvas.onload = leCanvas;
	desenhaGrid();
}

function pegaDesenho(inputFile) {
	
	var file = inputFile.files[0];
 	leitorDeCanvas.readAsText(file);
}

function leCanvas(evt) {

	var fileArr = evt.target.result.split('\n');
	
	console.log(fileArr);
	var result,titulo,descricao = 0;
	var vetor = [];
	vetor.length=0;
	for (var i=0; i<fileArr.length; i++) { //pegar quantas linhas tem
		var fileLine = fileArr[i].split(',');
		console.log(fileLine);
			for (var j=0; j<fileLine.length; j++) { //iterar sobre cada linha
				result = checkNumber(fileLine[j].trim())
				if(result){
						vetor[j] = fileLine[j].trim(); //recebe os valores de cada linha apos checar se é numero 
						//console.log("valor de j: "+j);
				}else{
					if(titulo == "texto" && checaTitulo(fileLine[0].trim())){
						console.log("titulo é texto, e recebeu a string "+ fileLine[0].trim());
						vetor[j]=fileLine[0].trim();
					}else{
						titulo = fileLine[0].trim();//recebe o título
					}
				}
			}
			// console.log("valor de i é: "+i);
			if((i%2)==1){
				console.log("Entrou na função de desenho com :"+ titulo + vetor);
				fazDesenhos(titulo,vetor);
				limpaVetor(vetor);	
			}
	}
	
}

function checaTitulo(descricao){

	switch(descricao){
		case "ponto":
			
			return false;
		case "reta":
			return false;
			
		case "poligono":
			return false;
		case "bezier":
			return false;
		case "arco":
			return false;
		case "texto":
			return false;
		default :
			return true;
	};

}

function fazDesenhos(descricao, pontos){

	switch(descricao){
		case "ponto":
			desenhaPonto(descricao,pontos);
			break;
		case "reta":
			desenhaReta(descricao,pontos);
			break;
		case "poligono":
			desenhaPoligono(descricao,pontos);
			break;
		case "bezier":
			desenhaBezier(descricao,pontos);
			break;
		case "arco":
			desenhaArcoCirco(descricao,pontos);
			break;
		case "texto":
			desenhaTexto(descricao,pontos);
			break;
	};

}


function desenhaReta(nome, coords) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
   	var ctx = canvas.getContext('2d');
    // if(coords.length!=0){
    // 	alert("Desenhado : "+ nome + "nas coordenadas  X: "+ coords[0] +",Y: "+ coords[1]);		
    // }
    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(coords[0],coords[1]);
    ctx.lineTo(coords[2],coords[3]);
    //ctx.lineTo(coords[2],coords[3]);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
  }
}

function desenhaPoligono(nome, coords) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(coords[0],coords[1]);
    ctx.lineTo(coords[2],coords[3]);
    ctx.lineTo(coords[4],coords[5]);
 //    ctx.beginPath();
	// ctx.moveTo(100, 100);
	// ctx.lineTo(100, 200);
	// ctx.lineTo(200, 150);
	 ctx.closePath();
   // ctx.lineTo(coords[0],coords[1]);
    //ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
    
function desenhaArcoCirco(nome, coords) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    
    // Stroked triangle
    
    ctx.beginPath();
    //ctx.moveTo(coords[0], coords[1]);
    // ctx.arc(300,75,30,0,Math.PI);
    ctx.arc(coords[0], coords[1], coords[2], 0, Math.PI);
    ctx.stroke();
    // ctx.fill();
    //ctx.closePath();
    
  }
}


function desenhaBezier(nome, coords) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    
    // Stroked triangle
    
    ctx.beginPath();
	//ctx.moveTo(230,30);
	// ctx.bezierCurveTo(200,100,400,100,200,20);
	ctx.bezierCurveTo(coords[0], coords[1], coords[2], coords[3],coords[4],coords[5]);
	//ctx.closePath()
	//ctx.fill();
	ctx.stroke();   
  }
}



var posicaoTextoX = 10,posicaoTextoY = 400;
function desenhaTexto(titulo,descricao){
var canvas = document.getElementById('canvas');
  if (canvas.getContext){
  	var ctx = canvas.getContext('2d');
	ctx.font = "italic 20pt Calibri";
	// var end = descricao;
	//ctx.fillStyle = "fuchsia";
	ctx.fillText(descricao, posicaoTextoX, posicaoTextoY);
	posicaoTextoY+= 25;
	console.log("posicao em Y:"+ posicaoTextoY);
	}
}



function checkNumber(valor) {
  var regra = /^[0-9]+$/;
  if (valor.match(regra)) {
    console.log("Numero: "+valor);
    return true;
  }else{
    console.log("String!" + valor);
	return false;
  }
};  



//Função para Limpar o vetor de strings e tudo mais
function limpaVetor(vetor){
	// for (var i = 0; i < vetor.length; i++) {
	// 	vetor[i]=0;
	// }

	vetor.length = 0;
}


/*FUNÇÃO FUNCIONANDO
function leCSV(evt) {

	var fileArr = evt.target.result.split('\n');
	
	console.log(fileArr);
	var result,titulo,x1,x2;

	for (var i=0; i<fileArr.length; i++) {
		

		var fileLine = fileArr[i].split(',');
		console.log(fileLine);
			for (var j=0; j<fileLine.length; j++) {
				result = checkNumber(fileLine[j].trim())
				if(result){
					if((j%2)==0){
						x1 = fileLine[j].trim();
					}else
						x2 = fileLine[j].trim();
				}else{
					titulo = fileLine[j].trim();
				}
			}
		
	}
	
	var texto ="<p>"+ "titulo: "+ titulo +"<p>"+ "valor de x1: "+ x1 + "<p>"+"valor de X2 :"+ x2;
	
	var CSVsaida = document.getElementById('CSVsaida');
		CSVsaida.innerHTML = texto;
}
*/


function desenhaGrid(){
	var c_canvas = document.getElementById("canvas");

var context = c_canvas.getContext("2d");
	var tamanhoX = c_canvas.width;
	var tamanhoY = c_canvas.height;

	console.log("largura e altura respectivamente: "+ tamanhoX+", "+tamanhoY);

	console.log("desenhando o grid");
	for (var x = 1; x < tamanhoX; x += 10) {
	  context.moveTo(x, 0);
	  context.lineTo(x,tamanhoY);
	}

	for (var y = 1; y < tamanhoY; y += 10)	 {
	  context.moveTo(0, y);
	  context.lineTo(tamanhoX, y);
	  	}
	
	context.strokeStyle = "#eee";
	  

	context.stroke();
}






function sobreOAutor(){
	alert("Trabalho Desenvolvido por Alexsandro da Silva Saraiva para a disciplina de Computação Grafica\nMaticula: 2013002955  UFMA 2018.1");
}

function sobreOTrabalho(){
	alert("Trabalho utilizando o canvas html5 para criação de pontos, formas, retas e desenhos em 2D através do JavaScript");
}


function limpaCanvas(){
	//var canvas = getElementById('canvas');
const context = canvas.getContext('2d');

context.clearRect(0, 0, canvas.width, canvas.height);
desenhaGrid();

}





