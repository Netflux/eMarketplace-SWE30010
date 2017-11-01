const getWeekStart = () => {
	const date = new Date()
	const dayOfWeek = (date.getDay() || 7) - 1
	return date.setHours(0, 0, 0, 0) - (dayOfWeek * 86400000)
}

const getMonthStart = () => {
	const date = new Date()
	date.setHours(0, 0, 0, 0)
	return date.setDate(1)
}

const salesanalysis = {
	templateUrl: 'templates/components/SalesAnalysis.html',
	controller: ['$http', function($http) {
		const ctrl = this
		ctrl.stats = { isLoading: true }
		ctrl.reload = () => {
			ctrl.stats.isLoading = true
			$http.get('/api/orders/sales')
				.then(function success(response) {
					const data = response.data.data
					const raw = {
						totalSold: 0,
						totalPrice: 0,
						totalShipping: 0,
						thisWeek: {
							totalSold: 0,
							totalPrice: 0,
							totalShipping: 0
						},
						thisMonth: {
							totalSold: 0,
							totalPrice: 0,
							totalShipping: 0
						}
					}
					const byMonth = {
						labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					}
					const byDay = {
						labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						data: [0, 0, 0, 0, 0, 0, 0]
					}

					data.forEach(stats => {
						const date = new Date(stats.date)
						byMonth.data[date.getMonth()] += 1
						byDay.data[date.getDay()] += 1

						raw.totalSold += stats.quantity
						raw.totalPrice += stats.price
						raw.totalShipping += stats.shippingPrice

						if (date.getTime() > getWeekStart()) {
							raw.thisWeek.totalSold += stats.quantity
							raw.thisWeek.totalPrice += stats.price
							raw.thisWeek.totalShipping += stats.shippingPrice
						}
						if (date.getTime() > getMonthStart()) {
							raw.thisMonth.totalSold += stats.quantity
							raw.thisMonth.totalPrice += stats.price
							raw.thisMonth.totalShipping += stats.shippingPrice
						}
					})

					ctrl.stats = {
						isLoading: false,
						error: false,
						raw,
						byMonth,
						byDay
					}
				}, function failure() {
					ctrl.stats = {
						isLoading: false,
						error: true
					}
				})
		}

		ctrl.reload()
	}]
}

export default salesanalysis
