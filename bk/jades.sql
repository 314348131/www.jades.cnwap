set names utf8;
drop database if exists jades;
create database jades charset = utf8;
use jades;

create table ja_users (
	user_id int primary key auto_increment, #用户id
	uname varchar
(20),   #用户姓名
	email varchar
(32),  #用户邮箱
	upwd varchar
(20),   #用户密码
	#phone char
(11) DEFAULT NULL,#用户手机号
	#user_name varchar
(16), # 用户真实姓名
	ustatus tinyint default 0#用户登录状态  0 是未登录  1 是登录
);

insert into ja_users
values(null, "yangshuang", "1876484@qq.com", "123456", 0),
	(null, "yangfan", "1876484@qq.com", "123456", 0),
	(null, "yangzeng", "1876484@qq.com", "123456", 0),
	(null, "yangli", "1876484@qq.com", "123456", 0);




create table ja_class(
    id int primary key auto_increment,
	class_id int,#分类ID
	cname varchar
(30),#分类名字
	cpic varchar
(50),#分类图片
	islocal int # 是否在头部的分类 
);
insert into ja_class
values(null, 0, '和田玉', 'http://jades.applinzi.com/img/tab/hetianyu.png', 1),
	(null, 1, '独山玉', 'http://jades.applinzi.com/img/tab/dushanyu.png', 1),
	(null, 2, '翡翠', 'http://jades.applinzi.com/img/tab/hetianyu.png', 1),
	(null, 3, '玛瑙', 'http://jades.applinzi.com/img/tab/feicui.png', 1),
	(null, 4, '水晶', 'http://jades.applinzi.com/img/tab/shuijing.png', 1),
	(null, 5, '碧玉', '', 0),
	(null, 6, '手镯', '', 0),
	(null, 7, '挂件', '', 0),
	(null, 8, '玉牌', '', 0),
	(null, 9, '手链', '', 0),
	(null, 10, '佩饰', '', 0);

create table ja_product(
	product_id int primary key auto_increment, #商品id
	title varchar
(30), #商品标题
	price decimal
(7,2),#原始商品价格
	pic varchar
(100),#商品图片
	class_id int, #商品分类id
	category varchar
(10), #商品热门分类  
	specification varchar
(100), #商品规格
	details varchar
(300), #商品描述
	images varchar
(2000), #商品详情图片
	pageView int #商品浏览量
);



insert into ja_product
values
	(null, '《恋》手把件', 4400.00, 'http://jades.applinzi.com/img/pro/110_06506498043757746_360.jpg', '0', '', '货号：21518|重量：745克(g)|尺寸：13*10*5(mm)|颜色：白色,紫色（酱独玉）,黄色|材质：可可可乐|产地：南阳|作者：刘晓波', '', 'https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498043757746_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498434677649_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498459504717_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498395303271_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498365948979_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498341082505_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498307329569_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498284426007_720.jpg', 1233),
	(null, '狮子章', 1950.00, 'http://jades.applinzi.com/img/pro/110_06506496596854287_360.png', '0', '', '货号：21515|颜色：绿白,天蓝,紫色（酱独玉）|材质：独山玉|产地：南阳', '', 'https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498043757746_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498434677649_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498459504717_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498395303271_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498365948979_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498341082505_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498307329569_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498284426007_720.jpg', 113),
	(null, '天蓝方章', 1700.00, 'http://jades.applinzi.com/img/pro/110_06506492716002481_360.jpg', '0', '', '货号：21514|重量：291.7克(g)|尺寸：37*36*7(mm)|颜色：天蓝材质：可可可乐|产地：南阳', '', 'https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498043757746_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498434677649_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498459504717_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498395303271_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498365948979_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498341082505_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498307329569_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498284426007_720.jpg', 123),
	(null, '《清香》', 2500.00, 'http://jades.applinzi.com/img/pro/110_06506487936360932_360.jpg', '3', '', '货号：21512|重量：69.07克(g)|尺寸：38*1*65(mm)|颜色：白色,绿白,青色,黑色（黑花）|材质：独山玉|产地：南阳', '', 'https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498043757746_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498434677649_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498459504717_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498395303271_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498365948979_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498341082505_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498307329569_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498284426007_720.jpg', 123),
	(null, '四季平安', 4400.00, 'http://jades.applinzi.com/img/pro/110_06505692353585947_360.png', '4', '', '货号：21511|颜色：白色,绿白|材质：独山玉|产地：南阳', '', 'https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498043757746_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498434677649_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498459504717_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498395303271_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498365948979_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498341082505_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498307329569_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498284426007_720.jpg', 12),
	(null, '福寿吉祥', 15600.00, 'http://jades.applinzi.com/img/pro/110_06505689399247512_360.jpg', '5', '', '货号：21510|重量：3640克(g)|尺寸：160*100*270(mm)|颜色：绿白,黑色（黑花）|材质：独山玉|产地：南阳|作者：刘晓波', '', 'https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498043757746_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498434677649_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498459504717_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498395303271_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498365948979_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498341082505_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498307329569_720.jpg|https://www.jades.cn/data/upload/shop/store/goods/110/2020/08/13/110_06506498284426007_720.jpg', 12);

create table ja_shopping(
		sid int primary key auto_increment, #购物车编号
		 user_id int ,#用户id
		 product_id int,  #商品id
		 count int  #商品数量
		 
);



