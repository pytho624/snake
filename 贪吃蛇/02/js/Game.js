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

    this.init();
}
//定义初始化的方法
Game.prototype.init = function () {
    this.renderMap();
    this.renderFood();
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
    this.map.arr[row][col].style.backgroundColor = "red";
}