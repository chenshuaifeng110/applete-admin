import echarts from 'echarts';

 export const trendOption = {
	backgroundColor: '#fff',
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross'
		},
		padding: [5, 10]
	},
	// tab
	legend: {
		// top: 20,
		icon: 'rect',
		itemWidth: 14,
		itemHeight: 5,
		itemGap: 13,
		right: '2%',
		textStyle: {
			fontSize: 12,
			color: '#57617B'
		}
	},

	// 图表
	grid: {
		top: 80,
		left: '2%',
		right: '2%',
		bottom: '6%',
		containLabel: true
	},
	// x轴
	xAxis: [
		{
			type: 'category', //分类
			boundaryGap: false,
			axisLine: {
				lineStyle: {
					color: '#57617B'
				}
			},
			data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
		}
	],
	yAxis: [
		{
			type: 'value',
			name: '(%)',
			axisTick: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: '#57617B'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 14
				}
			}
		}
	],
	series: [
		{
			name: '销售额',
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 5,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 1
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(137, 189, 27, 0.3)'
						},
						{
							offset: 0.8,
							color: 'rgba(137, 189, 27, 0)'
						}
					]),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: 'rgb(137,189,27)',
					borderColor: 'rgba(137,189,2,0.27)',
					borderWidth: 12
				}
			},
			data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
		},
		{
			name: '订单数',
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 5,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 1
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(0, 136, 212, 0.3)'
						},
						{
							offset: 0.8,
							color: 'rgba(0, 136, 212, 0)'
						}
					]),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: 'rgb(0,136,212)',
					borderColor: 'rgba(0,136,212,0.2)',
					borderWidth: 12
				}
			},
			data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
		},
		{
			name: '会员数',
			type: 'line',
			smooth: true,
			symbol: 'circle',
			symbolSize: 5,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 1
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(219, 50, 51, 0.3)'
						},
						{
							offset: 0.8,
							color: 'rgba(219, 50, 51, 0)'
						}
					]),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: 'rgb(219,50,51)',
					borderColor: 'rgba(219,50,51,0.2)',
					borderWidth: 12
				}
			},
			data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
		}
	]
};

export const analyseBarOption = {
	backgroundColor: '#fff',
	tooltip: {
		trigger: 'axis'
	},
    legend: {
        data: ['蒸发量', '降水量'],
		icon: 'rect',
		itemWidth: 14,
		itemHeight: 5,
		itemGap: 13,
		right: '2%',
		textStyle: {
			fontSize: 12,
			color: '#57617B'
		}
	},
	grid: {
		top: 80,
		left: '2%',
		right: '2%',
		bottom: '6%',
		containLabel: true
	},
	// x轴
	xAxis: [
		{
			type: 'category', //分类
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		}
	],
	yAxis: [
		{
			type: 'value',
			axisLabel: {
				formatter: '{value} mm'
			}
		}
	],
	series: [
		{
			name: '蒸发量',
			type: 'bar',
			data: [8.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
			markPoint: {
				data: [{ type: 'max', name: '最大值' }, { type: 'min', name: '最小值' }]
			},
			markLine: {
				data: [{ type: 'average', name: '平均值' }]
			},
			itemStyle: {
				normal: {
					// 设置柱状图颜色
					color: '#1890FF',
					// 以下为是否显示，显示位置和显示格式的设置了
					label: {
						show: true,
						position: 'top',
						formatter: '{c}'
						// formatter: '{b}\n{c}'
					}
				}
			}
			// 设置柱的宽度，要是数据太少，柱子太宽不美观~
			// barWidth:100
		},
		{
			name: '降水量',
			type: 'bar',
			data: [10.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
			markPoint: {
				data: [{ name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 }, { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }]
			},
			markLine: {
				data: [{ type: 'average', name: '平均值' }]
			},
			itemStyle: {
				normal: {
					// 设置柱状图颜色
					color: '#001529'
				}
			}
		}
	]
};

export const  analysePieOption = {
	backgroundColor: '#fff',
	title: {
		text: '饼图',
		textStyle: {
			fontWeight: 'normal',
			fontSize: 12,
			color: '#57617B'
		},
		left: 'left'
	},
	color: ['#001529', '#1890FF'],
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)'
	},
	legend: {
		data: ['电费', '水费'],
		icon: 'rect',
		itemWidth: 14,
		// itemHeight: 5,
		// itemGap: 13,
		right: '2%',
		textStyle: {
			fontSize: 12,
			color: '#57617B'
		}
	},
	series: [
		{
			name: '费用支出',
			label: {
				position: 'inside'
			  },
			type: 'pie',
			radius: ['40%', '70%'],
			data: [{ value: 100, name: '电费' }, { value: 50, name: '水费' }]
		}
	]
};