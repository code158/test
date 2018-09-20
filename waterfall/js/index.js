function fall(mw, mh) {
	var wp = document.documentElement,
		w = wp.offsetWidth,
		ul = document.getElementById('wrapper-ul'),
		li = ul.getElementsByTagName('li'),
		iw = li[0].offsetWidth + mw, //计算数据块之间的宽度
		c = Math.floor(w / iw); //计算列数
	ul.style.width = iw * c - mw + 'px';

	var arr = []; //储存加载完后图片的高度

	for (var i in li) {
		arr.push(li[i].offsetHeight);
	}

	var oArr = [];

	//初始化第一排
	for (var i = 0; i < c; i++) {
		li[i].style.top = '0';
		li[i].style.left = iw * i + 'px';
		li[i].style.opacity = '1';

		oArr.push(arr[i]);
	}
	for (var i = c; i < li.length; i++) {
		var index = _getMin(oArr);
		li[i].style.top = oArr[index] + mh + 'px';
		li[i].style.left = iw * index + 'px';
		li[i].style.opacity = '1';

		oArr[index] = arr[i] + oArr[index] + mh; //更新该列的高度
	}
}

function _getMin(arr) {
	var a = arr[0],
		b = 0;
	for (var k in arr) {
		if (arr[k] < a) {
			a = arr[k];
			b = k;
		}
	}

	return b;
}

var $$ = function(id) {
	return document.getElementById(id);
}

var getStyle = function(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

var move = function(obj, json, fn) {
	var timer = null;
	var speed = 0;
	var cus = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var attr;
		var bStop = true;
		for (attr in json) {
			cus = parseInt(getStyle(obj, attr));
			speed = (json[attr] - cus) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (Math.abs(cus - json[attr]) >= 1) {
				bStop = false;
			} else {}
			obj.style[attr] = cus + speed + "px";
		}
		if (bStop == true) {
			clearInterval(obj.timer);
			obj.style[attr] = json[attr] + "px";
			if (fn) {
				fn();
			}
		}
	}, 10);
}

window.onload = function() {
	fall(10, 10);
	var oUl = $$("wrapper-ul");
	var aLi = oUl.getElementsByTagName("li");
	var iMinzIndex = 2;

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].style.left = aLi[i].offsetLeft + "px";
		aLi[i].style.top = aLi[i].offsetTop + "px";
	}
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].style.position = "absolute";
		aLi[i].style.margin = 0;
	}

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseover = function() {
			this.style.zIndex = iMinzIndex++;
			move(this, {
				width: 360,
				marginLeft: -50,
				marginTop: -50
			});
		}

		aLi[i].onmouseout = function() {
			move(this, {
				width: 180,
				marginLeft: 0,
				marginTop: 0
			});
		}
	}
}

var re;
//用定时器防止 resize 时的卡顿
window.onresize = function() {
	clearTimeout(re);
	re = setTimeout(function() {
		fall(10, 10);
	}, 100);
}


//下拉构造数据...
//TODO
