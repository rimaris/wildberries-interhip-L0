import Event from "./event.js";

class Model {
    constructor() {
        this.items = [
            {
                id: 1,
                title: "Футболка UZcotton мужская",
                properties: [
                    {
                        title: "Цвет",
                        value: "Белый"
                    },
                    {
                        title: "Размер",
                        value: "56",
                    }
                ],
                location: "Коледино WB",
                seller: {
                    title: "ООО Вайлдберриз",
                    address: "Москва",
                    ogrn: "123",
                },
                stockQuantity: 2,
                selectedQuantity: 1,
                price: {
                    onePiecePrice: 522,
                    onePieceOldPrice: 1051,
                    finalPrice: 522,
                    oldPrice: 1051,
                    discounts: [
                        {title: "Скидка 55%", sum: 300},
                        {title: "Скидка покупателя 10%", sum: 30}
                    ]
                }
            },
            {
                id: 2,
                title: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
                properties: {
                    title: "Цвет",
                    value: "Прозрачный"
                },
                location: "Коледино WB",
                seller: {
                    title: "ООО Мегапрофстиль",
                    address: "Москва",
                    ogrn: "123",
                },
                stockQuantity: null,
                selectedQuantity: 200,
                price: {
                    onePiecePrice: 10500,
                    onePieceOldPrice: 11500,
                    finalPrice: 2100000,
                    oldPrice: 2300047,
                    discounts: [
                        {title: "Скидка 55%", sum: 300},
                        {title: "Скидка покупателя 10%", sum: 30}
                    ]
                },   
            },
            {
                id: 3,
                title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
                properties: {
                    title: "Цвет",
                    value: "Прозрачный"
                },
                location: "Коледино WB",
                seller: {
                    title: "ООО Вайлдберриз",
                    address: "Москва",
                    ogrn: "123",
                },
                stockQuantity: 2,
                selectedQuantity: 2,
                price: {
                    onePiecePrice: 247,
                    onePieceOldPrice: 475,
                    finalPrice: 494,
                    oldPrice: 950,
                    discounts: [
                        {title: "Скидка 55%", sum: 300},
                        {title: "Скидка покупателя 10%", sum: 30}
                    ]
                },   
            },
            {
                id: 4,
                title: "Футболка UZcotton мужская",
                properties: [
                    {
                        title: "Цвет",
                        value: "Белый"
                    },
                    {
                        title: "Размер",
                        value: "56",
                    }
                ],
                location: "Коледино WB",
                seller: {
                    title: "ООО Вайлдберриз",
                    address: "Москва",
                    ogrn: "123",
                },
                stockQuantity: 0,
                selectedQuantity: 0
            },
            {
                id: 5,
                title: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
                properties: {
                    title: "Цвет",
                    value: "Прозрачный"
                },
                location: "Коледино WB",
                seller: {
                    title: "ООО Мегапрофстиль",
                    address: "Москва",
                    ogrn: "123",
                },
                stockQuantity: 0,
                selectedQuantity: 0
            },
            {
                id: 6,
                title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
                properties: {
                    title: "Цвет",
                    value: "Прозрачный"
                },
                location: "Коледино WB",
                seller: {
                    title: "ООО Вайлдберриз",
                    address: "Москва",
                    ogrn: "123",
                },
                stockQuantity: 0,
                selectedQuantity: 0
            },
        ];

        this.paymentInfo = {
            availableMethods: [
                {
                    id: 1,
                    type: "mir",
                    cardNumber: "1234 56•• •••• 1234",
                    expiry: "01/30",
                },
                {
                    id: 2,
                    type: "visa",
                    cardNumber: "1234 56•• •••• 1234",
                    expiry: "01/29",
                },
                {
                    id: 3,
                    type: "mc",
                    cardNumber: "1234 56•• •••• 1234",
                    expiry: "01/25",
                },
                {
                    id: 4,
                    type: "maestro",
                    cardNumber: "1234 56•• •••• 1234",
                    expiry: "05/30",
                },
            ],
            selectedMethodId: 1,
            payNow: false,
        };

        this.deliveryInfo = {
            addresses: [
                {
                    id: 1,
                    type: "pickUpPoint",
                    address:  "г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
                    rating: "4.99",
                    
                },
                {
                    id: 2,
                    type: "pickUpPoint",
                    address:  "г. Бишкек, улица Табышалиева, д. 57",
                    rating: "4.55",
                },
                {
                    id: 3,
                    type: "personal",
                    address: "Бишкек, улица Табышалиева, 57",
                },
                {
                    id: 4,
                    type: "personal",
                    address: "Бишкек, улица Жукеева-Пудовкина, 77/1",
                },
                {
                    id: 5,
                    type: "personal",
                    address: "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1"
                }
            ],
            selectedAddress: 1,
        };

        this.calculateTotal()
        
        this.paymentMethodUpdated = new Event();
        this.addressUpdated = new Event();
        this.itemListUpdated = new Event();
        this.totalUpdated = new Event();
    }

    updateAddress(id) {
        const address = this.getAddressById(id);
        if (address === null) {
            return;
        }
        this.deliveryInfo.selectedAddress = id;
        this.addressUpdated.emit(address);
    }


    updatePaymentMethod(id) {
        const paymentMethod = this.getPaymentMethodById(id)
        if (paymentMethod === null) {
            return;
        }
        this.paymentInfo.selectedMethodId = id;
        this.paymentMethodUpdated.emit(paymentMethod);
    }

    incrementItemQty(id) {
        const item = this.getItemById(id);
        this.setItemQty(item, item.selectedQuantity + 1);
    }

    decrementItemQty(id) {
        const item = this.getItemById(id);
        this.setItemQty(item, item.selectedQuantity - 1);
    }

    setItemQtyById(id, qty) {
        const item = this.getItemById(id);
        this.setItemQty(item, qty);
    }

    setItemQty(item, qty) {
        if (item === null) {
            return
        }
        if (item.stockQuantity !== null && qty >= item.stockQuantity) {
            qty = item.stockQuantity;
        }
        if (qty < 1) {
            qty = 1;
        }
        item.selectedQuantity = qty;
        item.price.finalPrice = item.price.onePiecePrice * qty;
        item.price.oldPrice = item.price.onePieceOldPrice * qty;
        this.itemListUpdated.emit(this.items);
        this.calculateTotal()
        this.totalUpdated.emit(this.total);
    }

    removeItem(itemId) {
        let idx = null;
        this.items.forEach((item, index) => {
            if (item.id == itemId) {
                idx = index;
            }
        })
        if (idx === null) {
            return;
        }
        this.items.splice(idx, 1);

        this.calculateTotal();
        
        this.itemListUpdated.emit(this.items);
        this.totalUpdated.emit(this.total);
    }

    calculateTotal() {
        const total = {
            itemsCnt: 0,
            sum: 0,
            discountSum: 0,
            deliveryPrice: 0,
        }

        for (let item of this.items) {
            if (item.selectedQuantity === 0 || item.price === undefined) {
                continue;
            }
            total.itemsCnt += item.selectedQuantity;
            total.sum += item.price.finalPrice;
            total.discountSum += item.price.finalPrice - item.price.oldPrice;
        }

        this.total = total;
    }

    getItemById(id) {
        for (let item of this.items) {
            if (item.id == id) {
                return item;
            }
        }
        return null;
    }

    getPaymentMethodById(id) {
        for (let paymentMethod of this.paymentInfo.availableMethods) {
            if (paymentMethod.id == id) {
                return paymentMethod;
            }
        }
        return null
    }

    getAddressById(id) {
        for (let address of this.deliveryInfo.addresses) {
            if (address.id == id) {
                return address;
            }
        }
        return null
    }


}

export default Model;