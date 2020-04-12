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
}