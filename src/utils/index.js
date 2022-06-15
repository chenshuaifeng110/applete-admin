function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result;

	const later = function() {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp;

		// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last);
		} else {
			timeout = null;
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			}
		}
	};

	return function(...args) {
		context = this;
		timestamp = +new Date();
		const callNow = immediate && !timeout;
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait);
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}

		return result;
	};
}

// 数组去重
const unique = arr => {
	const res = [];
	const json = {};
	for (let i = 0; i < arr.length; i++) {
		if (!json[arr[i]]) {
			res.push(arr[i]);
			json[arr[i]] = 1;
		}
	}
	return res;
};

/**
 * @description 拆分路由路径
 * @exmple /menu/level/submenu-1 => ['/menu', '/menu/level/', '/menu/level/submenu-1']
 */
 const splitRoute = (path) => {
	let resArry = [];
	let subItem = ''
    path = path.substr(1)
	let arr1 = path.split('/')
	arr1.forEach(item => {
		subItem = subItem +'/'+ item
		resArry.push(subItem)
	});
	return resArry
} 

export { unique, debounce, splitRoute };
