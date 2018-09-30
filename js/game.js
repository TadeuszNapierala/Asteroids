
//inicjuje grę po załadowaniu całej strony
window.onload = function(){
	Game.init();
}
// obiekt, w którym będą przechowywane podręczne wartości
VAR = {
	fps:60, 
	W:0,
	H:0,
	lastTime:0,
	lastUpdate:-1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min*1))+min;
	}
}
// obiekt zawierający bazowe funkcje związane z grą
Game = {
	init:function(){
		//canvas
		Game.canvas = document.createElement('canvas');
		Game.hit_canvas = document.createElement('canvas');
		//kontekst 2d do zmiennej ctx
		Game.ctx = Game.canvas.getContext('2d');
		Game.hit_ctx = Game.hit_canvas.getContext('2d');
		//odpalenie metody obiektu game
		Game.layout(); 
		//canvas ma odpowiednie parametry 
		window.addEventListener('resize', Game.layout, false); 
		// (up)dopasowuje canvas do wielkości okna
		// document.body.appendChild(Game.hit_canvas);
		document.body.appendChild(Game.canvas);
		for(var i=0; i<4; i++){
			new Rock(2);
		}
		Game.ship = new Ship();


		window.addEventListener('keydown', Game.onKey, false);
		window.addEventListener('keyup', Game.onKey, false);
		// rozpoczęcie pętli gry

		Game.animationLoop(); 

		//odpalenie animation loop



	},
	stop:function(){
		window.removeEventListener('keydown', Game.onKey, false);
		window.removeEventListener('keyup', Game.onKey, false);
	},
	onKey:function(event){
		if(event.keyCode==32 || event.keyCode==37 || event.keyCode==38 || event.keyCode==39){
			event.preventDefault();
			// Game.key_32 = false;
			if(event.type=='keydown' && !Game['key_'+event.keyCode]){
				Game['key_'+event.keyCode] = true;
				if(event.keyCode==37){
					Game.key_39 = false;
				}else if(event.keyCode==39){
					Game.key_37 = false;
				}else if(event.keyCode==32){
					new Bullet();
				}
			}else if(event.type=='keyup'){
				Game['key_'+event.keyCode] = false;
			}
		
		}
	},
	layout:function(ev){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		// zawsze się dopasowują
		VAR.d = Math.min(VAR.W, VAR.H);
		// przypisanie do canvas
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;
		// zmiana wielkości sprawdzacza
		Game.hit_canvas.width = VAR.W;
		Game.hit_canvas.height = VAR.H;
		Game.hit_ctx.fillStyle = 'red';
		//style
		Game.ctx.fillStyle = 'white'
		Game.ctx.strokeStyle = 'white'
		Game.ctx.lineWidth = 3
		Game.ctx.lineJoin = 'round' 
	},
	// ta funkcja na dole służy do odpalenia akcji na stronie
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;

			Game.ctx.clearRect(0,0,VAR.W, VAR.H);
			// czyszczenie
			Game.ship.draw();
			//

			Rock.draw();

			//
			Bullet.draw();

			// 
			Dot.draw();
		}
	}
}









