
var canv = document.getElementById('canvas'),
  g = canv.getContext('2d')
var scrollingElement = (document.scrollingElement || document.body);
scrollingElement.scrollTop = scrollingElement.scrollHeight;

var scx = 1080;
var scy = 3240;

function rct(x, y, xx, yy, c){
  g.fillStyle = c;
  g.fillRect(x, y, xx, yy);
}
class rect {
  constructor(x, y, xx, yy) {
    this.x = x;
    this.y = y;
    this.xx = xx;
    this.yy = yy;
  }
}
class block {
  constructor(x, y, xx, yy,type) {
    this.x = x;
    this.y = y;
    this.xx = xx;
    this.yy = yy;
    this.colors = ["#704c4c", "#92b045", "#696969", "#a1cfc6"]
    this.c1 = this.colors[type-1];
    this.t = type;
  }
  draw(){
    rct(this.x, this.y, this.xx, this.yy, this.c1);
  }
  touch(coll){
    if (this.x > coll.x - this.xx && this.x < coll.x + coll.xx && this.y > coll.y - this.yy && this.y < coll.y + coll.yy){
      return true;
    }
  }
}
class slime {
  constructor(x, y, xx, yy) {
    this.x = x;
    this.y = y;
    this.xx = xx;
    this.yy = yy;
    this.sz = 25;
    this.c1 = "#7ba355";
    this.c2 = "#5f853c";
    this.g = 0;
    this.s = 6;
    this.t = false;
    this.mx = 0;
    this.pt = false;
    this.mt = false;
  }
  move(x, y){
    this.x += x;
    this.y += y;
  }
  gravity(){
    if(this.g<20){
      this.g++;
    }
    if(this.t){
      this.g =0;
    }
    this.move(0, this.g);
  }
  draw(){
    rct(this.x, this.y, this.xx, this.yy, this.c1);
    rct(this.x+this.sz, this.y+this.sz, this.xx-(this.sz*2), this.yy-(this.sz*2), this.c2);
  }
  die(){
    this.c1 = "#ad4949"
    this.c2 = "#994949"
    this.s = 0;
  }
  rnd(cols){
    this.t = false
    this.pt = false;
    this.mt = false;
    for (let i = 0; i < cols.length; i++){
      if (cols[i].touch(new rect(this.x+this.sz, this.y+this.yy-this.sz, this.xx-(this.sz*2), this.sz))){
        if (cols[i].t == 1) {
          this.t = true;
        }
        else if(cols[i].t == 2) {
          if (this.g == 20){
            this.g = -40
          }
        }
        else if(cols[i].t == 3) {
            this.die();
            this.t = true;
        }
      }
      if (cols[i].touch(new rect(this.x+this.sz, this.y, this.xx-(this.sz*2), this.sz))){
        if (cols[i].t == 1) {
          this.t = false;
          this.g = 1;
        }
        else if(cols[i].t == 2) {
          if (this.g == 20){
            this.g = -40
          }
        }
        else if(cols[i].t == 3) {
            this.die();
            this.t = true;
        }
      }
      if (cols[i].touch(new rect(this.x+this.xx+this.sz, this.y+this.sz, this.sz, this.yy-(this.sz*2)))){
        if (cols[i].t == 1) {
          this.pt = true;
        }
        else if(cols[i].t == 4) {
          this.mx = -8;
          this.g = -20;
        }
      }
      if (cols[i].touch(new rect(this.x, this.y+this.sz, this.sz, this.yy-(this.sz*2)))){
        if (cols[i].t == 1) {
          this.mt = true;
        }
        else if(cols[i].t == 4) {
          this.mx = 8;
          this.g = -20;
        }
      }
    }
    this.gravity();
    this.move(this.mx, 0);
    this.draw();
  }
  ks(key){
    if (key == "d"&&this.pt==false){
      this.mx = this.s;
      console.log("d");
    }
    if (key == "a"&&this.mt==false){
      this.mx = -this.s;
      console.log("a");
    }
    if (key == "w"){
      if(this.t){
        this.t = false;
        this.g = -15;
        this.gravity();
        console.log("w");
      }
    }
  }
  unks(key){
    if (key == "d"){
      this.mx = 0;
      //console.log("d");
    }
    if (key == "a"){
      this.mx = 0;
      //console.log("a");
    }
  }
}
var sl = new slime(100, 3000, 100, 100);
var blocks = [new block(0, 3100, 300, 50, 1), new block(420, 3000, 200, 50, 1),
new block(100, 2900, 200, 50, 1), new block(420, 2800, 300, 50, 1), new block(840, 2700, 100, 50, 1),
 new block(940, 3100, 200, 50, 2), new block(340, 2400, 600, 50, 1), new block(0, 2500, 940, 50, 3),
 new block(840, 2800, 50, 200, 3), new block(240, 2200, 50, 50, 4), new block(500, 2150, 300, 50, 1)];
function mianloop(){
  rct(0, 0, scx, scy, "#6c8fa3");
  sl.rnd(blocks);
  for (let i = 0; i < blocks.length; i++){
    blocks[i].draw();
  }
  requestAnimationFrame(mianloop);
}
document.addEventListener('keyup', function(event){
    sl.unks(event.key);
    //mianloop(sl);
});
document.addEventListener('keydown', function(event){
    sl.ks(event.key);
});
mianloop(sl);
