const categoryList = [
	{
		categoryId: 1,
		title: 'Jewellery',
		imageUrl: '/images/uploads/category_jewellery_thumb.png',
		bannerUrl: '/images/uploads/category_jewellery_banner.png',
		validFrom: 0
	},
	{
		categoryId: 2,
		title: 'Soft Toys',
		imageUrl: '/images/uploads/category_softtoy_thumb.png',
		bannerUrl: '/images/uploads/category_softtoy_banner.png',
		validFrom: 0
	},
	{
		categoryId: 3,
		title: 'Handmade items',
		imageUrl: '/images/uploads/category_handmade_thumb.png',
		bannerUrl: '/images/uploads/category_handmade_banner.png',
		validFrom: 0
	},
	{
		categoryId: 4,
		title: 'Room decor',
		imageUrl: '/images/uploads/category_deco_thumb.png',
		bannerUrl: '/images/uploads/category_deco_banner.png',
		validFrom: 0
	},
	{
		categoryId: 5,
		title: 'Vintage goods',
		imageUrl: '/images/uploads/category_vintage_thumb.png',
		bannerUrl: '/images/uploads/category_vintage_banner.png',
		validFrom: 0
	},
	{
		categoryId: 6,
		title: 'Clothings',
		imageUrl: '/images/uploads/category_clothing_thumb.png',
		bannerUrl: '/images/uploads/category_clothing_banner.png',
		validFrom: 0
	}
]
const productList = [
	{
		productId: 1,
		userId: 2,
		categoryId: 1,
		productKey: 'ProductKey1',
		title: 'Silver Pendants Pearl',
		description: 'B.Catcher Jewelry is the beauty catcher who creates fine and fashion jewelry out of Silver, Stone, Pearl: catch the eye and capture the heart. B.Catcher Jewelry chooses the best materials with distinctive design and meticulous cut, presents a fashion style. It is your perfect choice. Material&Quality: Rhodium-plated 925 Genuine sterling silver & AAA-quality CZ stones with meticulous cut gives a shiny white gold fashion look. Passed strict skin test grants allergy free, nickel-free and lead-free; Jewelry box included makes it perfect gift. Warranty&Support: We provide 90-day warranty and please email us if you have any questions.Note: The image may show slight differences to the actual item in size,color and texture.',
		price: 50.00,
		shippingPrice: 25.00,
		discount: 10,
		validFrom: 0
	},
	{
		productId: 2,
		userId: 2,
		categoryId: 1,
		productKey: 'ProductKey2',
		title: 'FENDINA Jewelry 18K',
		description: 'FENDINA is a fashion jewelry leader that equip with a collection of exclusive design, fine production and sales. We focus on the unique style of jewelry design, strictly control the quality of products and keeping up with fashion trends from 1993. Being the focus with the FENDINA in the wedding,engagement,cocktail,graduation, prom or other parties, FENDINA fashion jewelry, provide you an excellent gifts idea on Valentines Day, Mothers Day, Christmas or jewelry gifts for her. Exquisite appearance with the cant beat price, choose FENDINA engagement rings wedding band, vintage crystal bracelets,CZ earrings pretty pendant necklace and jewelry sets. FENDINA, More than you expect!',
		price: 25.50,
		shippingPrice: 10.25,
		discount: 0,
		validFrom: 0
	},
	{
		productId: 3,
		userId: 3,
		categoryId: 2,
		productKey: 'ProductKey3',
		title: 'Choo Choo Elephant',
		description: 'Choo Choo express plush dunphy the elephant measures approximately 9" long x 8.5" wide, when sitting down. It is made of 100% polyester. Care instructions: machine wash in gentle cycle, tumble dry low and remove promptly.',
		price: 77.77,
		shippingPrice: 33.33,
		discount: 50,
		validFrom: 0
	},
	{
		productId: 4,
		userId: 2,
		categoryId: 2,
		productKey: 'ProductKey4',
		title: 'Ikea Panda Soft Toy',
		description: 'Ikea KRAMIG 902.213.18 Panda, Soft Toy, White, Black, 12.5 Inch, Stuffed Animla Plush Bear.',
		price: 30.23,
		shippingPrice: 10.33,
		discount: 20,
		validFrom: 0
	},
	{
		productId: 5,
		userId: 2,
		categoryId: 3,
		productKey: 'ProductKey5',
		title: 'Wiggle Eyes Pieces',
		description: 'Contains 100 paste-on Wiggle Eyes in an assortment of sizes and colors. Allows young creative minds to flourish. "Wiggle-Eye" your projects and crafts with ease. Bring personality to projects and household items',
		price: 15.50,
		shippingPrice: 10.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 6,
		userId: 3,
		categoryId: 3,
		productKey: 'ProductKey6',
		title: 'Recycled Craft Rolls',
		description: 'Smooth, thick, plain cardboard rolls ready for crafting at school, in the classroom, or at home. 4 1/2" art rolls are stronger than standard toilet paper tubes. Use for constructing and building for STEM, art, and engineering projects. Brown craft rolls are durable, smooth, free from surface debris, and easy to cut.',
		price: 7.00,
		shippingPrice: 10.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 7,
		userId: 2,
		categoryId: 4,
		productKey: 'ProductKey7',
		title: 'Lightingsky 3D Lamp',
		description: 'Lamp is actual flat, just give you a 3D effect on visual. Light made from Acrylic GLASS board. Light Base made from ABS material. Note: There is protective film on both sides of the acrylic board. Powered by 85V-265V plug cable. Fully color customizable by smart touch button with 3-color display: red, blue, purple, color changing. Can be used in Nursery, beside the bed crib, playroom, kids bedroom or used as home decoration lamp or party decoration',
		price: 105.50,
		shippingPrice: 6.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 8,
		userId: 2,
		categoryId: 4,
		productKey: 'ProductKey8',
		title: 'Diamond Shaped Lamp',
		description: '.Decorative lights with Diamond, romantic room decor with 11 LED warm white lights. Decorations Light size (L x W x D): 10.6" x 10.6" x 1.4". .The back hanger hooks for hanging on the wall, table, head of the bed, or the ceiling, creating a sense of waste in the sky. Used as a daily home decoration, such as rooms, frescoes, or stationary items. .On/off button. Requires 2 "AA" batteries, not include.',
		price: 209.50,
		shippingPrice: 5.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 9,
		userId: 3,
		categoryId: 5,
		productKey: 'ProductKey9',
		title: 'Vintage Classic Notebook',
		description: 'This is PU Faux leather journal. If you’re looking for a refillable PU leather bound notebook to organize your class notes and/or thoughts, then this vintage looking notebook made out of faux leatheristhe right choice for you. The cover includes a cord to keep your writing journal closed when not in use. Enjoy the new collection of notebooks and journals from our school & office suppliesrange including everything you need for back to school, university essentials or daily use. Turn this PU leather hardcover journal into your desired 2016 daily diary or personal sketchbook making it the perfect travel companion. This traveler’s notebook was especially designed to create the typical middle ages atmosphere while you let your creativity flow or use it as a planner/meeting organizer. Details: Lined width 7mm. Cover Material: PU leather. Not loose leaf pages. Both lined and blank refills are available. Lined pages’ journal, no bid rings, no spiral, no loose leaf pages. Refillable for the whole pages’ part. Page Size: W 5.62’, L 8.22’. Book Size: W 6.2’, L 8.54’ (inches). Include 160 sheets and 320 pages. Acid free paper thicker, larger and sturdier.',
		price: 75.50,
		shippingPrice: 15.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 10,
		userId: 3,
		categoryId: 5,
		productKey: 'ProductKey10',
		title: 'Vintage Bracelet Storage',
		description: 'Perfect for storing and displaying your favourtie jewelry, bracelet, earrings, necklace, brooch, hair clip or more and keep jewelry clean and protected. It is also a beautiful ornament decoration on your dressing table or as gift to your friends. Material used is wooden. Color as picture shows. Dimension is 8cm x 6.5cm x 6cm.',
		price: 55.50,
		shippingPrice: 8.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 11,
		userId: 2,
		categoryId: 6,
		productKey: 'ProductKey11',
		title: 'Baby Girl Summer Short',
		description: 'Summer short sleeves princess skirt with flower patterns and laces. Color available are rose, pink and purple. Size recommendation would be children less than 7 years old.',
		price: 65.50,
		shippingPrice: 8.00,
		discount: 10,
		validFrom: 0
	}
	,
	{
		productId: 12,
		userId: 3,
		categoryId: 6,
		productKey: 'ProductKey12',
		title: 'Fashion Blue Casual Shirts',
		description: 'Gingham shirts made by 85% cotton. Has variety of colors such as Black, White, Wine, Red, Navy Blue and Royal blue. Preferred wearing occasion will be office, meeting, business. This shirt is famous during Spring, Summer and Fall. For Men only.',
		price: 125.50,
		shippingPrice: 0,
		discount: 10,
		validFrom: 0
	}
]
const productStockList = [
	{
		productKey: 'ProductKey1',
		stock: 100
	},
	{
		productKey: 'ProductKey2',
		stock: 0
	},
	{
		productKey: 'ProductKey3',
		stock: 15
	},
	{
		productKey: 'ProductKey4',
		stock: 5
	},
	{
		productKey: 'ProductKey5',
		stock: 13
	},
	{
		productKey: 'ProductKey6',
		stock: 4
	},
	{
		productKey: 'ProductKey7',
		stock: 9
	},
	{
		productKey: 'ProductKey8',
		stock: 100
	},
	{
		productKey: 'ProductKey9',
		stock: 5
	},
	{
		productKey: 'ProductKey10',
		stock: 30
	},
	{
		productKey: 'ProductKey11',
		stock: 0
	},
	{
		productKey: 'ProductKey12',
		stock: 10
	}
]

const productImage = [
	{
		productKey: 'ProductKey1',
		imageUrl: 'images/uploads/product_jewellery_1.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey2',
		imageUrl: 'images/uploads/product_jewellery_2.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey3',
		imageUrl: 'images/uploads/product_softtoy_1.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey4',
		imageUrl: 'images/uploads/product_softtoy_2.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey5',
		imageUrl: 'images/uploads/product_homemade_1.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey6',
		imageUrl: 'images/uploads/product_homemade_2.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey7',
		imageUrl: 'images/uploads/product_deco_1.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey8',
		imageUrl: 'images/uploads/product_deco_2.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey9',
		imageUrl: 'images/uploads/product_vintage_1.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey10',
		imageUrl: 'images/uploads/product_vintage_2.png',
		validFrom: '0'
	},
	{
		productKey: 'ProductKey11',
		imageUrl: 'images/uploads/product_clothing_2.png',
		validFrom: '0'
	}
	,{
		productKey: 'ProductKey12',
		imageUrl: 'images/uploads/product_clothing_1.png',
		validFrom: '0'
	}
]

exports.seed = knex => {
	return knex('ProductImage').del()
		.then(() => knex('ProductStock').del())
		.then(() => knex('Product').del())
		.then(() => knex('Category').del())
		.then(() => knex('Category').insert(categoryList))
		.then(() => knex('Product').insert(productList))
		.then(() => knex('ProductStock').insert(productStockList))
		.then(() => knex('ProductImage').insert(productImage))
}
