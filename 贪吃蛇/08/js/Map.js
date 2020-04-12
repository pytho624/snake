/**
 * map 地图属性
 * @param 行属性
 * @param 列属性
 * @param 总宽
 * @param 总高
 * @constructor
 */
function Map(row,col,width,height) {
    this.arr = [];
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    //因为最终要渲染到页面中，所以需要创建一个元素
    this.dom = document.createElement("div");
}
//添加填充方法
Map.prototype.fill = function () {
    for(var j = 0;j < this.row; j++) {
        //因为要一行一行的创建，所以需要创建一个行容器
        //一行是一个div 同时用循环创建每一个小格子，最后在加入到div中
        var row_dom = document.createElement("div");
        //给每一行添加类名
        row_dom.className = "row";

        //创建一个行数组
        var row_arr = [];


        for (var i = 0; i < this.col; i++) {
            var col_dom = document.createElement("span");

            //给每一个小方格添加类名
            col_dom.className = "grid";
            row_dom.appendChild(col_dom);
            //追加到行数组中
            row_arr.push(col_dom);
        }
        this.dom.appendChild(row_dom);
        //将行数组放入到数组中
        this.arr.push(row_arr);
    }
    //给dom添加类名
    this.dom.className = "box";
    //上树
    document.body.appendChild(this.dom);
}

//清屏的方法
Map.prototype.clear = function () {
    for(var i = 0;i < this.arr.length ;i++){
        for(var j = 0;j < this.arr[i].length ;j++){
            // this.arr[i][j].style.backgroundColor = "white";
            this.arr[i][j].style.backgroundImage = "none";
        }
    }
}