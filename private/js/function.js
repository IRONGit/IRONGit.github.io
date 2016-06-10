documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04*documentWidth;

var startx=0;
var starty=0;
var endx=0;
var endy=0;

var board=new Array();
var hasConflicated=new Array();
var score=0;
$(function(){
	newgame();
});
function newgame(){
	prepareForMobile();
	//初始化布局
	initial();
	//随机生成两个数
	generateNumber();
	generateNumber();
}
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
        return true;
	}
	$('#gridContainer').css('width',gridContainerWidth-2*cellSpace);
	$('#gridContainer').css('height',gridContainerWidth-2*cellSpace);
	$('#gridContainer').css('padding',cellSpace);
	$('#gridContainer').css('border-radius',0.02*gridContainerWidth);

	$('.gridCells').css('width',cellSideLength);
	$('.gridCells').css('height',cellSideLength);
	//why bug
	// $('.gridCells').css('border-radius',0.02*cellSideLength);
	$('.gridCells').css('border-radius',"10px");
	// $('numberCells').css('Line-height',cellSideLength);
}
function initial(){
	//画出格子
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			// $('#gridContainer').append('<div class="gridCells" id ="gridCell-'+i+'-'+j+'">');
			var $gridCell=$('#gridCell-'+i+'-'+j);
			$gridCell.css('top',getPosTop(i,j));
			$gridCell.css('left',getPosLeft(i,j));
		}
	}
	//为每个格子赋值(board[i][j])
	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicated[i]=new Array();
		for(var j=0;j<4;j++){
			// if(i==2&&j==2){
			// 	board[i][j]=2;
			// 	continue;
			// }
			board[i][j]=0;
			hasConflicated[i][j]=false;
		}
	}
	score=0;
	updateBoardView();
}
function generateNumber(){
	//首先判断有没有空余的位置
	if(!spareCell()){
		return false;
	}
	//生成一个随机的位置(0-3)
	var randomx=Math.floor(Math.random()*4);
	var randomy=Math.floor(Math.random()*4);

	var times=0;
	while(times<50){
		if(board[randomx][randomy]==0){
			break;
		}
		randomx=Math.floor(Math.random()*4);
		randomy=Math.floor(Math.random()*4);
		times++;
	}
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randomx=i;
					randomy=j;
					break;
				}
			}
		}
	}
	//生成一个随机的数
	var number=Math.random()>0.5?2:4;
	board[randomx][randomy]=number;
	showNumberAnimation(randomx,randomy,number);
	// updateBoardView();
}

function showNumberAnimation(randomx,randomy,number){
	var $numberCell=$('#numberCell-'+randomx+'-'+randomy);
	$numberCell.css('background-color',getNumberBackgroundColor(number));
	$numberCell.css('color',getNumberColor(number));
	$numberCell.text(number);
	
	$numberCell.animate({
		//改动100px
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(randomx,randomy),
		left:getPosLeft(randomx,randomy)
	},500);
}

function spareCell(){
	//若没有空位置,返回false;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//只要有一个为0,就未满,返回true
			if(board[i][j]==0){
				return true;
			}
		}
	}
	return false;
}
//改动120,20
function getPosTop(i,j){
	return (cellSpace+cellSideLength)*i+cellSpace;
}
function getPosLeft(i,j){
	return (cellSpace+cellSideLength)*j+cellSpace;
}
function updateBoardView(){
	$('.numberCells').remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			hasConflicated[i][j]=false;
			$('#gridContainer').append('<div class="numberCells" id ="numberCell-'+i+'-'+j+'">');
			var $numberCell=$('#numberCell-'+i+'-'+j);
			if(board[i][j]==0){
				$numberCell.css('width','0px');
				$numberCell.css('height','0px');
				$numberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				$numberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
				// $numberCell.css('background-color','red');
			}else{	
				//改动100px
				$numberCell.css('width',cellSideLength);
				$numberCell.css('height',cellSideLength);
				$numberCell.css('top',getPosTop(i,j));
				$numberCell.css('left',getPosLeft(i,j));
				$numberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				$numberCell.css('color',getNumberColor(board[i][j]));
				// $numberCell.css('font-size',100);
				// $('.numberCells').css('font-size',getNumberFontSize(board[i][j])+'px');
				$numberCell.text(board[i][j]);
				// $('.numberCells').css('font-size',0.6*cellSideLength+'px');
			}
		}
	}
	$('.numberCells').css('line-height',cellSideLength+'px');
    $('.numberCells').css('font-size',0.6*cellSideLength+'px');
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]>512){
				$('#numberCell-'+i+'-'+j).css('font-size',0.4*cellSideLength+'px');
			}
		}
	}
}
// function getNumberFontSize(number){
// 	if(number<8){
// 		return 60;
// 	}else{
// 		// alert('x');
// 		return 40;
// 	}
// }
function getNumberBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}

$(document).keydown(function(e){
	e.preventDefault();
	var code=e.keyCode;
	switch(code){
		case 37:
				//左
				if(moveLeft()){
					setTimeout("generateNumber()",210);
					setTimeout("isGameOver()",300);
				}
				break;
		case 38:
				//上
				if(moveUp()){
					setTimeout("generateNumber()",210);
					setTimeout("isGameOver()",300);
				}
				break;
		case 39:
				//右
				if(moveRight()){
					setTimeout("generateNumber()",210);
					setTimeout("isGameOver()",300);
				}
				break;
		case 40:
				//下
				if(moveDown()){
					setTimeout("generateNumber()",210);
					setTimeout("isGameOver()",300);
				}
				break;
	}
});

document.addEventListener("touchstart",function(event){
	// event.preventDefault();
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});
document.addEventListener("touchmove",function(event){
	event.preventDefault();
});
document.addEventListener("touchend",function(event){
	// event.preventDefault();
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	var deltax=endx-startx;
	var deltay=endy-starty;
	// alert('startx: '+startx+" deltay: "+starty);
	// alert('deltax: '+deltax+" deltay: "+deltay);
    if( Math.abs( deltax ) < 0.2*documentWidth && Math.abs( deltay ) < 0.2*documentWidth )
        return;

	if(Math.abs(deltax)>=Math.abs(deltay)){
		//水平方向
		if(deltax>0){
			//right 
			// alert('右 '+deltax);
			if(moveRight()){
				setTimeout("generateNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}else{
			//left
			// alert('左 '+deltax);
			if(moveLeft()){
				setTimeout("generateNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}else{
		//竖直方向
		if(deltay>0){
			//down
			// alert('下 '+deltay);
			if(moveDown()){
				setTimeout("generateNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}else{
			//up
			// alert('上 '+deltay);
			if(moveUp()){
				setTimeout("generateNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
});
function moveLeft(){
	if(!canMoveLeft()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockH(i,j,k)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockH(i,j,k)&&!hasConflicated[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						
						score+=board[i][k];
						hasConflicated[i][k]=true;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function updateScore(score){
	$('#score').text(score);
}
function canMoveRight(){
	for(var j=2;j>=0;j--){
		for(var i=0;i<4;i++){
			if(board[i][j]!=0){
				if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
/*可能有问题*/
function moveRight(){
	if(!canMoveRight()){
		return false;
	}
	for(var j=2;j>=0;j--){
		for(var i=0;i<4;i++){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHR(i,j,k)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHR(i,j,k)&&!hasConflicated[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;

						score+=board[i][k];
						hasConflicated[i][k]=false;
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown(){
	if(!canMoveDown()){
		return false;
	}
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVD(i,j,k)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVD(i,j,k)&&!hasConflicated[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						// alert(board[k][j]);
						board[i][j]=0;

						hasConflicated[k][j]=true;
						score+=board[k][j];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()',200);
	return true;
}
function canMoveDown(){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveUp(){
	if(!canMoveUp()){
		return false;
	}
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					//垂直方向	
					if(board[k][j]==0&&noBlockV(i,j,k)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockV(i,j,k)&&!hasConflicated[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;

						hasConflicated[k][j]=true;
						score+=board[k][j];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function noBlockHR(i,j,k){
	for(j=j+1;j<k;j++){
		if(board[i][j]!=0){
			return false;
		}
	}
	return true;
}
function noBlockVD(i,j,k){
	//i是现在行数,j是现在列数,
	for(k=k-1;k>i;k--){
		if(board[k][j]!=0){
			return false;
		}
	}
	return true;
}
function noBlockV(i,j,k){
	for(k=k+1;k<i;k++){
		if(board[k][j]!=0){
			return false;
		}
	}
	return true;
}
function canMoveUp(){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function noBlockH(i,j,k){
	for(k=k+1;k<j;k++){
		if(board[i][k]!=0){
			return false;
		}
	}
	return true;
}
function canMoveLeft(){
	for(var j=1;j<4;j++){
		for(var i=0;i<4;i++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function showMoveAnimation(fromi,fromj,toi,toj){
	var $numberCell=$('#numberCell-'+fromi+'-'+fromj);
	// alert('x');
	//200改成50效果不好
	$numberCell.animate({
		top:getPosTop(toi,toj),
		left:getPosLeft(toi,toj)
	},200);
}
function noSpace(){
	if(!spareCell()){
		return true;
	}
	return false;
}
function isGameOver(){
	if(noSpace()&&noMove()){
		alert('game over');
		return true;
	}
	return false;
}
function noMove(){
	if(canMoveLeft()||canMoveUp()||canMoveDown()||canMoveRight()){
		return false;
	}
	return true;
}