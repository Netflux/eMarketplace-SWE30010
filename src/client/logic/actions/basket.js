export const FETCH_BASKET = 'FETCH_BASKET'
export const RECEIVE_BASKET = 'RECEIVE_BASKET'
export const RECEIVE_BASKET_ERROR = 'RECEIVE_BASKET_ERROR'

export const fetchBasket = ($store, $http) => {
	const isFetching = $store.getState().basket.isFetching

	if (!isFetching) {
		$store.update({
			type: FETCH_BASKET
		})
		$http.get('/api/basket')
			.then(function success(response) {
				$store.update({
					type: RECEIVE_BASKET,
					data: response.data.data
				})
			}, function failure() {
				$store.update({
					type: RECEIVE_BASKET_ERROR
				})
			})
	}
}

export const findBasketDetails = (basket, products) => {
    var basketitems = []
    for (var j = 0; j < basket.items.length; j++){ 
        for (var i = 0; i < products.items.length; i++){
             if (products.items[i].productKey == basket.items[j].productKey){
                basketitems.push({
                    productKey: products.items[i].productKey,
                    title: products.items[i].title,
                    images: products.items[i].images[0].imageUrl,
                    shipping: products.items[i].shippingPrice,
                    price: products.items[i].price,
                    sumprice: products.items[i].price * basket.items[j].quantity,
                    quantity: basket.items[j].quantity
                }) 
            }    
        } 
    }
    return basketitems
}

export const calculateTotalPrice = (basket, products, basketitems) => {
    var totalprice = 0
    for (var j = 0; j < basket.items.length; j++){
        for (var i = 0; i < products.items.length; i++){
            if (products.items[i].productKey == basket.items[j].productKey){
                totalprice += basketitems[j].sumprice + basketitems[j].shipping
            }
        }
    }
    return totalprice
}
