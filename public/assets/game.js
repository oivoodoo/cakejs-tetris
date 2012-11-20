Block=Klass(CanvasNode,{backgroud:"rgb(0, 0, 0)",opacity:0.8,size:20,map:{x:0,y:0},initialize:function(a){CanvasNode.initialize.call(this);if(a.size!=null){this.size=a.size}this.shape=new Rectangle(this.size,this.size,{fill:a.color,stroke:"cyan",strokeWidth:1,rx:2,ry:2});this.x=a.x;this.y=a.y;this.append(this.shape)},set_map:function(a){this.map=a}});Shape=Klass(CanvasNode,{degree:0,map:[],step:1,blocks:[],MAX_STEP:15,box_size:Block.size,initialize:function(a){CanvasNode.initialize.call(this);this.setup(a);this.render_shape();if(this.color!=null){this.set_color(this.color)}this.backup_step=this.step},setup:function(a){if(a!=null){this.container=a.container;if(a.map!=null){this.map=a.map}if(a.x!=null){this.x=a.x}if(a.y!=null){this.y=a.y}if(a.degree!=null){this.degree=a.degree}if(a.color!=null){this.color=a.color}if(a.id!=null){this.id=a.id}if(a.step!=null){this.step=a.step}if(a.box_size!=null){this.box_size=a.box_size}}},update_onframe:function(){this.move(GameContainer.ENSURE_POSITION)},rotate:function(){this.degree=this.ensure_degree(this.degree+1);this.removeAllChildren();this.render_shape()},set_color:function(a){for(var b=0;b<this.childNodes.length;b++){this.childNodes[b].fill=a}},ensure_degree:function(a){if(a>=this.map.length||a<0){a=0}return a},render_shape:function(){if(this.childNodes.length==0){for(var b=0;b<this.map[this.degree].length;b++){for(var a=0;a<this.map[this.degree][b].length;a++){if(this.map[this.degree][b][a]==1){var c=new Block({x:a*this.box_size,y:b*this.box_size,color:this.color,size:this.box_size});this.blocks.push(c);this.append(c)}}}}},move:function(b,a){var c=this;switch(b){case GameContainer.LEFT:this.check_move(c,this.x-Block.size,this.y,false,function(){c.x-=Block.size});break;case GameContainer.RIGHT:this.check_move(c,this.x+Block.size,this.y,false,function(){c.x+=Block.size});break;case GameContainer.BOTTOM:this.step=this.MAX_STEP;break;case GameContainer.RESTORE_STEP:this.step=this.backup_step;break;case GameContainer.ENSURE_POSITION:this.check_move(c,this.x,this.y+this.step,true,function(){c.y+=c.step});break;case GameContainer.SPACE:var e=this.degree;this.rotate();this.check_move(c,this.x,this.y,false,null,function(){c.degree=e-1;c.rotate()});break;case GameContainer.BOTTOM_BLOCK:var d=1;if(typeof(a)!=="undefined"){d=a.count}this.y+=Block.size*d;break}},check_collision:function(a,e){for(var b=0;b<this.childNodes.length;b++){var d=this.get_coords(a+this.childNodes[b].x,e+this.childNodes[b].y);if(this.container.map[d.x][d.y].id>0){return false}}return true},get_coords:function(b,a){return{x:Math.ceil(a/Block.size),y:Math.ceil(b/Block.size)}},check_move:function(e,a,j,g,f,b){if(e.check_borders(a,j)&&e.check_collision(a,j)){if(f!=null){f.call()}}else{if(g){for(var d=0;d<e.childNodes.length;d++){var h=e.get_coords(e.x+e.childNodes[d].x,e.y+e.childNodes[d].y);e.container.map[h.x][h.y]={id:e.id,position:d,shape:e};e.childNodes[d].set_map({x:h.x,y:h.y})}var h=e.get_coords(e.x,e.y);e.x=h.y*Block.size;e.y=h.x*Block.size;e.removeFrameListener(Shape.update_onframe);e.container.check_rows();e.container.next_shape()}else{if(b!=null){b.call()}}}},check_borders:function(a,b){return !(a<0||b<0||(a+this.width()>GameContainer.width)||(b+this.height()>GameContainer.height))},remove_block:function(c){var e=this.childNodes[c.position];this.container.map[e.map.x][e.map.y]={id:0};this.childNodes[c.position].removeSelf();if(this.childNodes.length!=0){for(var d=c.position;d<this.childNodes.length;d++){var a=this.childNodes[d];if(this.container.map[a.map.x][a.map.y].position>0){this.container.map[a.map.x][a.map.y].position-=1}}}else{this.removeSelf();this.container.shapes.remove(this)}},width:function(){return this.map[this.degree][0].length*Block.size},height:function(){return this.map[this.degree].length*Block.size}});NextShape=Klass(CanvasNode,{width:80,height:50,background:"#FFFFFF",initialize:function(a){CanvasNode.initialize.call(this);this.canvas=new Canvas(a);this.canvas.frameDuration=40;this.canvas.append(this);this.container=new Rectangle(this.width,this.height,{fill:this.background,rx:2,ry:2,x:0,y:0});this.append(this.container)},set_shape:function(b,a){this.shape=b;if(this.current_shape!=null){this.current_shape.removeSelf()}this.current_shape=new Shape({map:b.map,degree:b.degree,color:b.color,x:0,y:0,box_size:12});this.container.append(this.current_shape)}});ScorePanel=Klass(CanvasNode,{container_id:"#scores_number",scores:0,shapes:[{map:[[[1,1],[1,1]]]},{map:[[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]],[[0,1],[0,1],[1,1]],[[1,0,0],[1,1,1]]]},{map:[[[1,1],[0,1],[0,1]],[[1,1,1],[1,0,0]],[[1,0],[1,0],[1,1]],[[0,0,1],[1,1,1]]]},{map:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]]},{map:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]]},{map:[[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]],[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]]]},{map:[[[1,1,1,1]],[[1],[1],[1],[1]]]}],colors:["#FF0000","#338000","#005544","#00AAD4","#D400AA"],initialize:function(a,b){CanvasNode.initialize.call(this);this.parent=a;this.next_shape_panel=b},next:function(){var a=Math.floor(this.scores/1000);if(a==0){a=1}else{a+=0.5}$("#level_number").html(Math.floor(this.scores/1000)+1);if(this.next_shape==null){this.next_shape=this.get_shape()}this.current_shape=new Shape({map:this.next_shape.map,degree:this.next_shape.degree,color:this.next_shape.color,x:GameContainer.width/2,step:a,y:0,container:this.parent,id:this.parent.shapes.length+1});this.next_shape=this.get_shape();this.next_shape_panel.set_shape(this.next_shape);return this.current_shape},get_shape:function(){var a=Math.floor(Math.random()*this.shapes.length);var b=Math.floor(Math.random()*this.shapes[a].map.length);return{map:this.shapes[a].map,color:this.get_color(),degree:b}},get_color:function(){var a=Math.floor(Math.random()*this.colors.length);return this.colors[a]},update_scores:function(a){this.scores+=a;$(this.container_id).html(this.scores)}});GameContainer=Klass(CanvasNode,{background:"#FFFFFF",nwidth:16,nheight:24,width:Block.size*16,height:Block.size*24,map:[],shapes:[],SCORE_STEP:100,RIGHT:68,LEFT:65,PAUSE:80,SPACE:32,BOTTOM:83,BEGIN:66,RESTART:82,RESUME:71,RIGHT_A:39,LEFT_A:37,SPACE_A:38,BOTTOM_A:40,BOTTOM_BLOCK:998,ENSURE_POSITION:999,GAME_ON:101,GAME_OFF:102,GAME_PAUSE:103,RESTORE_STEP:997,initialize:function(a,d,b){CanvasNode.initialize.call(this);this.next_shape_panel=d;this.setup();this.game_state=this.GAME_OFF;this.canvas=new Canvas(a);this.canvas.frameDuration=40;this.canvas.append(this);this.container=new Rectangle(this.width,this.height,{fill:this.background,rx:2,ry:2,x:0,y:0});this.append(this.container);this.create_score_panel();var c=this;$(document).keydown((function(e){this.context=e;return{keydown:function(f){c.move_shape_by_keyboard(f,c)}}})(this).keydown);$(document).keyup((function(e){this.context=e;return{keyup:function(f){c.container_keyup(f,c)}}})(this).keyup)},create_score_panel:function(){if(!!this.score){this.score.removeSelf()}this.score=new ScorePanel(this,this.next_shape_panel);this.append(this.score);$("#scores_number").html(0);$("#level_number").html(0)},setup:function(){for(var b=0;b<this.nheight;b++){this.map.push([]);for(var a=0;a<this.nwidth;a++){this.map[b].push({id:0,position:0,shape:null})}}},container_keyup:function(c,b){var a=b.score.current_shape;if(c.keyCode==b.BOTTOM||c.keyCode==b.BOTTOM_A){a.move(b.RESTORE_STEP)}},move_shape_by_keyboard:function(c,b){var a=b.score.current_shape;if(a!=null&&b.game_state!=b.GAME_PAUSE){if(c.keyCode==b.RIGHT||c.keyCode==b.RIGHT_A){a.move(b.RIGHT)}else{if(c.keyCode==b.LEFT||c.keyCode==b.LEFT_A){a.move(b.LEFT)}else{if(c.keyCode==b.SPACE||c.keyCode==b.SPACE_A){a.move(b.SPACE)}else{if(c.keyCode==b.BOTTOM||c.keyCode==b.BOTTOM_A){a.move(b.BOTTOM)}}}}}if(c.keyCode==b.PAUSE&&b.game_state==b.GAME_ON){b.pause()}else{if(c.keyCode==b.BEGIN&&b.game_state==b.GAME_OFF){b.start()}else{if(c.keyCode==b.RESTART){b.restart()}else{if(c.keyCode==b.PAUSE&&b.game_state==b.GAME_PAUSE){b.resume()}}}}},next_shape:function(){var a=this.score.next();if(!a.check_collision(a.x,a.y+a.step)){this.gameover()}else{a.addEventListener("keypress",this.move_shape);a.addFrameListener(a.update_onframe);this.shapes.push(a);this.append(a)}},check_rows:function(){var c,b,a;var f=[];for(c=0;c<this.nheight;c++){var d=0;for(b=0;b<this.nwidth;b++){if(this.map[c][b].id>0){d++}}if(d==this.nwidth){for(a=0;a<this.nwidth;a++){this.map[c][a].shape.remove_block(this.map[c][a])}f.push({p:c,c:this.map[c]})}}for(var b=0;b<f.length;b++){this.map.remove(f[b].c);this.map.unshift([]);for(var h=0;h<this.nwidth;h++){this.map[0].push({id:0})}}for(var c=0;c<this.map.length;c++){for(var b=0;b<this.map[c].length;b++){var g=this.map[c][b];if(g.id>0){var e=g.shape.childNodes[g.position].map.x;g.shape.childNodes[g.position].set_map({x:c,y:b});if(e!=c){g.shape.childNodes[g.position].y+=Block.size*(c-e)}}}}if(f.length>0){this.score.update_scores(f.length*this.SCORE_STEP)}},start:function(){this.restart();this.game_state=this.GAME_ON;this.next_shape()},pause:function(){this.game_state=this.GAME_PAUSE;this.score.current_shape.removeFrameListener(Shape.update_onframe)},resume:function(){this.game_state=this.GAME_ON;this.score.current_shape.addFrameListener(Shape.update_onframe)},restart:function(){this.game_state=this.GAME_OFF;for(var a=0;a<this.shapes.length;a++){this.shapes[a].removeSelf()}this.map=[];this.shapes=[];this.setup();this.create_score_panel()},gameover:function(){this.pause();this.game_state=this.GAME_OFF;this.scores=this.score.scores;$("#scores").html(this.score.scores);$("#game_over").fadeIn()}});Array.prototype.remove=function(){var e,c=arguments,b=c.length,d;while(b&&this.length){e=c[--b];while((d=this.indexOf(e))!=-1){this.splice(d,1)}}return this};var are=new Array(33,34,35,36,37,38,39,40);$(function(){$(document).keydown(function(b){var a=b.which;if($.inArray(a,are)>-1){b.preventDefault();return false}return true})});init=function(){var f=E.canvas(GameContainer.width,GameContainer.height);var e=E("div",{id:"container"});e.appendChild(f);document.getElementById("game_container").appendChild(e);var b=E.canvas(80,50);document.getElementById("current_shape_container").appendChild(b);var a=new GameContainer(f,new NextShape(b));(function(d){Playtomic.Log.View("951461","b039ded4f41e4a97","079d4a76cbde49baaac6272e783772",document.location);d("#new_button").click(function(g){g.preventDefault();a.restart();a.start()});d("#save_button").click(function(g){g.preventDefault();var h={Name:d("#username").val(),Points:a.scores};if(h.Name!==""&&!!h.Name){Playtomic.Leaderboards.Save(h,"highscores",function(i){if(i.Success){c()}else{console.log("You got an error on saving scores!")}})}d("#game_over").fadeOut()});d("#close_button").click(function(){d("#game_over").fadeOut();return false});function c(){var g=d("#scores_table");g.html("");Playtomic.Leaderboards.List("highscores",function(m,n,h){if(h.Success){var k=[];for(var j=0;j<m.length;j++){if(j===50){break}var l=m[j];k.push("<li>"+l.Name+": "+l.Points+" - "+l.RDate+"</li>")}g.html(k.join(""))}else{console.log("You can't get highscores from the playtomic server")}})}c()})($)};