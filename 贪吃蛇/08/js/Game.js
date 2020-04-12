/**
 * Game 整个游戏类
 * @param map 地图的实例
 * @param food 食物的实例
 * @param snake 蛇的实例
 * @param block 障碍物的实例
 * @constructor
 */

function Game(map,food,snake,block) {
    this.map = map;
    this.food = food;
    this.snake = snake;
    this.block =block;
    this.flag = null;
    this.timer = null;
    this.init();
}
//定义初始化的方法
Game.prototype.init = function () {
    this.renderMap();
    this.renderFood();
    this.renderSnake();
    this.bindEvent();
    this.start();
}
//渲染地图
Game.prototype.renderMap = function () {
    this.map.fill();
}
//渲染食物
Game.prototype.renderFood = function () {
    //渲染食物其实就是渲染食物在地图中的坐标系中的背景图案
    var row = this.food.row;
    var col = this.food.col;
    //this.map.dom.childNodes[row].childNodes[col].style.backgroundColor = "red";
    //arr数组的主要目的是用来简化代码的书写
    // this.map.arr[row][col].style.backgroundColor = "red";
    this.map.arr[row][col].style.backgroundImage = "url("+ this.food.img +")";
    this.map.arr[row][col].style.backgroundSize = "cover";
}

//渲染蛇的方法
Game.prototype.renderSnake = function () {
    //获取头部
    var head = this.snake.arr[this.snake.arr.length - 1];
    this.map.arr[head.row][head.col].style.backgroundImage = "url("+ this.snake.head_pic[this.snake.head_idx] +")";
    //渲染蛇就是在地图渲染蛇的每一节身体元素的背景图案
    for(var i = 1; i < this.snake.arr.length - 1 ; i++){
        var row = this.snake.arr[i].row;
        var col = this.snake.arr[i].col;
        // this.map.arr[row][col].style.backgroundColor = "green";
        //渲染背景图片
        this.map.arr[row][col].style.backgroundImage = "url("+ this.snake.body_pic[0] +")";
    }
    //获取尾部
    var tail = this.snake.arr[0];
    this.map.arr[tail.row][tail.col].style.backgroundImage = "url("+ this.snake.tail_pic[this.snake.tail_idx] +")";
}
//游戏开始
Game.prototype.start = function () {
    this.flag = true;
    //缓存this
    var me = this;
    this.timer = setInterval(function () {

        //移动方法
        me.snake.move();
        //检测是否撞墙
        me.checkMap();
        //检测是否吃到食物
        me.checkFood();
        //检测蛇是否吃到自己
        me.checkSnake();
        //检测蛇是否撞到障碍物
        me.checkBlock();
        //判断游戏是否在运行
        if(me.flag){
            //清屏
            me.map.clear();
            //渲染食物
            me.renderFood();

            //渲染蛇
            me.renderSnake();

            //渲染障碍物
            me.renderBlock();
        }
    },200)
}
//绑定事件
Game.prototype.bindEvent = function () {
    //缓存this
    var me = this;
    document.onkeydown = function (e) {
        //现获取用户按下的数字
        var code = e.keyCode;
        if(code === 37 || code === 38 || code === 39 || code === 40){
            me.snake.change(code);
        }
    }
}

//结束游戏
Game.prototype.gameOver = function () {
    this.flag = false;
    //停止定时器
    clearInterval(this.timer);
}
//检测是否超过边界
Game.prototype.checkMap = function () {
    //先获取蛇的头部
    var head = this.snake.arr[this.snake.arr.length - 1];
    if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col ){
        console.log("撞墙了");
        //游戏结束
        this.gameOver();
    }
}

//检测蛇是否吃到食物
Game.prototype.checkFood = function () {
    //先获取头部
    var head = this.snake.arr[this.snake.arr.length - 1];
    //获取食物的位置
    if(head.row === this.food.row && head.col === this.food.col){
        console.log("吃到食物了")
        //如果相等也就是吃到食物了，则蛇需要变长  也就是说需要调用蛇变长的方法
        this.snake.growUp();
        //重置食物
        this.resetFood();
    }

}

//重置食物方法
Game.prototype.resetFood = function () {
    var row = parseInt(Math.random() * this.map.row);
    var col = parseInt(Math.random() * this.map.col);
    //考虑到食物可能会重置到蛇的身上  所以需要做判断
    for(var i = 0;i < this.snake.arr.length ; i++){
        var one = this.snake.arr[i];
        if(one.row === row && one.col === col){
            alert("与蛇的身体重合了");
            //采用递归调用，当重置的食物再次出现在蛇的身上的时候，就可以再次判断，再次调用
            this.resetFood();
            return;
        }
    }
    //检测蛇与障碍物之间的关系
    for(var i = 0;i < this.block.arr.length ; i++){
        var one = this.block.arr[i];
        if(one.row === row && one.col === col){
            alert("与障碍物重合了");
            this.resetFood();
            return;
        }
    }
    this.food.reset(row,col);
}
//检测蛇是否吃到了自己
//其实就是判断自己的头是不是和身体有接触，有直接gameOver
Game.prototype.checkSnake = function () {
    //先获取头部
    var head = this.snake.arr[this.snake.arr.length - 1];
    for(var i = 0; i < this.snake.arr.length - 1 ; i++){
        var one = this.snake.arr[i];
        if(one.row === head.row && one.col === head.col){
            console.log("吃到自己了");
            //结束游戏
            this.gameOver();
        }
    }
}
//渲染障碍物
Game.prototype.renderBlock = function () {
    for(var i = 0; i < this.block.arr.length ; i++){
        var one = this.block.arr[i];
        row = one.row;
        col = one.col;
        this.map.arr[row][col].style.backgroundImage = "url("+ this.block.img +")";
        this.map.arr[row][col].style.backgroundSize = "cover";
    }
}

//检测蛇与障碍物之间的关系
Game.prototype.checkBlock = function () {
    //先获取头部
    var head = this.snake.arr[this.snake.arr.length - 1];
    for(var i = 0; i < this.block.arr.length - 1 ; i++){
        var one = this.block.arr[i];
        if(one.row === head.row && one.col === head.col){
            console.log("蛇撞到障碍物了");
            //结束游戏
            this.gameOver();
        }
    }
}