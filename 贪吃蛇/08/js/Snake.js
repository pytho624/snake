function Snake(pic_obj) {
    //数组属性存放每一节蛇的身体
    this.arr = [
        {row: 4,col: 4},
        {row: 4,col: 5},
        {row: 4,col: 6},
        {row: 4,col: 7},
        {row: 4,col: 8}
    ];
    //方向属性
    this.direction = 39;//left 37 top 38 right 39 down 40
    //加一个锁
    this.lock = true;
    //定义蛇的头部图片
    this.head_pic = pic_obj.head_pic;
    //定义蛇的身体图片
    this.body_pic = pic_obj.body_pic;
    //定义蛇的尾部图片
    this.tail_pic = pic_obj.tail_pic;
    //定义头部索引
    this.head_idx = 2;
    //定义尾部索引
    this.tail_idx = 0;
}

//移动方法
Snake.prototype.move = function () {
    //创建新的头部
    var newHead = {
        row: this.arr[this.arr.length - 1].row,
        col: this.arr[this.arr.length - 1].col
    }
    //根据方向来添加，判断方向
    if(this.direction === 37){
        //表示向左，新的头部应该出现在老得头部的左边，行不变，列--
        newHead.col--;
    }
    if(this.direction === 38){
        //表示向上，新的头部应该出现在老得头部的上面，列不变，行--
        newHead.row--;
    }
    if(this.direction === 39){
        //表示向右，新的头部应该出现在老得头部的右边，行不变，列++
        newHead.col++;
    }
    if(this.direction === 40){
        //表示向下，新的头部应该出现在老得头部的下边，列不变，行++
        newHead.row++;
    }
    //将新的头部添加
    this.arr.push(newHead);
    //去掉尾部
    this.arr.shift();
    //开锁
    this.lock = true;

    //在move的时候改变尾巴的图片
    //获取蛇的尾部
    var tail = this.arr[0];
    //获取尾部的上一个
    var pg = this.arr[1];
    //判断尾部和pg之间的关系
    if(tail.row === pg.row){
        //此时说明在一行，要对列进行比较
        this.tail_idx = tail.col > pg.col ? 2 : 0;
    }else{
        //此时说明在一列，要对行进行比较
        this.tail_idx = tail.row > pg.row ? 3 : 1;
    }
}
//转向方法
Snake.prototype.change = function (direction) {
    if(!this.lock){
        return;
    }
    //关闭锁
    this.lock = false;
    //当用户按下的是与蛇相同或者相反方向的值的时候，此时蛇不应该有任何的操作
    var result = Math.abs(direction - this.direction);
    if(result ===0 || result ===2){
        return;
    }
    else{
        this.direction = direction;
    }
    //在change的时候改变头部图片
    //对蛇头进行判断
    if(direction === 37){
        this.head_idx = 0;
    }else if(direction === 38){
        this.head_idx = 1;
    }else if(direction === 39){
        this.head_idx = 2;
    }else if(direction === 40){
        this.head_idx = 3;
    }
}
//蛇变长的方法
Snake.prototype.growUp = function () {
    //蛇变长就是在蛇数组的最后一节，也就是第一个元素
    var dail = this.arr[0];
    this.arr.unshift(dail);
}