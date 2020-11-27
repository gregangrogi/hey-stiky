
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
  constructor(x, y, xx, yy, c) {
    this.x = x;
    this.y = y;
    this.xx = xx;
    this.yy = yy;
    this.c1 = c;
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
  rnd(cols){
    this.t = false
    this.pt = false;
    this.mt = false;
    for (let i = 0; i < cols.length; i++){
      if (cols[i].touch(new rect(this.x+this.sz, this.y+this.yy-this.sz, this.xx-(this.sz*2), this.sz))){
        this.t = true;
      }
      if (cols[i].touch(new rect(this.x+this.sz, this.y, this.xx-(this.sz*2), this.sz))){
        this.t = false;
        this.g = 1;
      }
      if (cols[i].touch(new rect(this.x+this.xx+this.sz, this.y+this.sz, this.sz, this.yy-(this.sz*2)))){
        this.pt = true;
      }
      if (cols[i].touch(new rect(this.x, this.y+this.sz, this.sz, this.yy-(this.sz*2)))){
        this.mt = true;
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
var sl = new slime(100, 2980, 100, 100);
var blocks = [new block(0, 3100, 300, 50, "#704c4c"), new block(420, 3000, 200, 50, "#704c4c"),
new block(100, 2900, 200, 50, "#704c4c"), new block(420, 2800, 300, 50, "#704c4c"), new block(840, 2700, 200, 50, "#704c4c")];
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
