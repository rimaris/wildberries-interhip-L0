import Event from './event.js';
import {getCardLogo} from './assets.js';

class Accordion {
    constructor(el, open) {
        this.el = el;
        this.open = open;

        el.querySelector(".accordion__btn").addEventListener("click", () => {
            this.open = !this.open;
            this.render();
        });
    }
    render() {
        if (this.open) {
            this.el.classList.remove("accordion_closed");
        } else {
            this.el.classList.add("accordion_closed");
        }
    }
}

class Dialog {
    constructor(modal) {
        this.modal = modal;
        this.dialog = modal.querySelector(".dialog");
        this.isOpen = false;

        this.itemSelectedEvent = new Event();
        
        this.dialog.querySelector(".dialog__close-btn").addEventListener('click', () => this.close());
        this.dialog.querySelector(".dialog__select-btn").addEventListener('click', () => this.selectClicked());
    }

    selectClicked() {
        const checkedRadio = this.dialog.querySelector(".radio-form__radio:checked");
        if (checkedRadio !== null) {
            this.itemSelectedEvent.emit(checkedRadio.dataset.id);
        }
        this.close();
    }

    open() {
        this.isOpen = true;
        this.render();
    }

    close() {
        this.isOpen = false;
        this.render();
    }


    render() {
        if (this.isOpen) {
            this.modal.classList.add("modal_shown");
            document.body.classList.add("has-modal");
        } else {
            this.modal.classList.remove("modal_shown");
            document.body.classList.remove("has-modal");
        }
    }
}


class View {
    constructor() 
    {
        this.itemPlusClicked = new Event();
        this.itemMinusClicked = new Event();
        this.itemPlusClicked = new Event();
        this.itemRemoveClicked = new Event();
        this.itemCountInput = new Event();

        document.querySelectorAll("a").forEach((e) => {
            e.onclick = function(e) {
                e.preventDefault();
                return false;
            }
        })        
        this.deliveryBlock = document.querySelector(".delivery");
        this.paymentSettingsBlock = document.querySelector(".payment-settings");
        this.sidebarBlock = document.querySelector(".sidebar");
        this.itemListItems = document.querySelector(".item-list__items");
        this.itemListMissingItems = document.querySelector('.item-list_missing .item-list__items');
        this.paymentDialog = new Dialog(document.querySelector("#payment-modal"));
        this.deliveryDialog = new Dialog(document.querySelector("#delivery-modal"));
        this.accordions = []
        document.querySelectorAll(".accordion").forEach((el) => {
            this.accordions.push(new Accordion(el, true));
        });
        this.deliveryBlock.querySelector(".edit-btn").addEventListener('click', () => this.deliveryDialog.open());
        this.sidebarBlock.querySelector('.sidebar__edit-delivery-btn').addEventListener('click', () => this.deliveryDialog.open());
        this.paymentSettingsBlock.querySelector(".edit-btn").addEventListener('click', () => this.paymentDialog.open());
        this.sidebarBlock.querySelector(".delivery__edit-payment-btn").addEventListener('click', () => this.paymentDialog.open());
        document.querySelectorAll(".item__count-btn-plus").forEach((btn) => {
            btn.addEventListener('click', (e) => this.itemBtnClicked(e, this.itemPlusClicked));
        });
        document.querySelectorAll(".item__count-btn-minus").forEach((btn) => {
            btn.addEventListener('click', (e) => this.itemBtnClicked(e, this.itemMinusClicked));
        });
        document.querySelectorAll(".item__remove-btn").forEach((btn) => {
            btn.addEventListener('click', (e) => this.itemBtnClicked(e, this.itemRemoveClicked));
        });
        document.querySelectorAll(".item__count-selector-input").forEach((input) => {
            input.addEventListener('input', (e) => {
                const parent = e.target.closest('.item');
                this.itemCountInput.emit({
                    itemId: Number(parent.dataset.id),
                    newCount: Number(e.target.value),
                })
            });
        });
    }

    itemBtnClicked(e, targetEvent) {
        const parent = e.target.closest(".item");
        targetEvent.emit(Number(parent.dataset.id));
    }

    updatePaymentMethod(paymentMethod) {
        this.updateCardInfo(this.paymentSettingsBlock.querySelector(".card-info"), paymentMethod);
        this.updateCardInfo(this.sidebarBlock.querySelector(".card-info"), paymentMethod);
    }

    updateCardInfo(cardInfoEl, paymentMethod) {
        const cardLogoEl = cardInfoEl.querySelector(".card-info__logo");
        const cardNumberEl = cardInfoEl.querySelector(".card-info__number");
        const cardExpiryEl = cardInfoEl.querySelector(".card-info__expiry");
        
        cardLogoEl.src = getCardLogo(paymentMethod.type);
        cardNumberEl.textContent = paymentMethod.cardNumber;
        if (cardExpiryEl !== null) {
            cardExpiryEl.textContent = paymentMethod.expiry;
        }
    }

    updateAddress(address) {
        this.sidebarBlock.querySelector(".delivery-address").textContent = address.address;
        this.deliveryBlock.querySelector(".delivery__address").textContent = address.address;
        this.deliveryBlock.querySelector(".delivery__rating").textContent = address.rating;
    }

    updateAllItems(items) {
        this.updateItems(items.filter((item) => item.stockQuantity !== 0), this.itemListItems)
        this.updateItems(items.filter((item) => item.stockQuantity === 0), this.itemListMissingItems)
    }

    updateItems(items, itemListEl) {
        const ids = [];
        items.forEach((item) => ids.push(item.id));

        itemListEl.querySelectorAll('.item').forEach((item) => {
            if (!ids.includes(parseInt(item.dataset.id))) {
                itemListEl.removeChild(item);
            }
        });

        itemListEl.querySelectorAll('.item').forEach((itemEl) => {
            const item = items.filter((i) => i.id==itemEl.dataset.id)[0];

            const itemCountEl = itemEl.querySelector('.item__count-selector-input');
            const itemNewPriceEl = itemEl.querySelector('.item__new-price-value');
            const itemOldPriceEl = itemEl.querySelector('.item__old-price-value');
            if (itemCountEl !== null)
                itemCountEl.value = item.selectedQuantity;
            if (itemNewPriceEl !== null)
                itemNewPriceEl.textContent = formatPrice(item.price.finalPrice);
            if (itemOldPriceEl !== null)
                itemOldPriceEl.textContent = formatPrice(item.price.oldPrice);
        });
    }

    updateTotal(total) {
        this.sidebarBlock.querySelector('.sidebar__total-price').textContent = formatPrice(total.sum);
        this.sidebarBlock.querySelector('.sidebar__items-count').textContent = formatPrice(total.itemsCnt);
        this.sidebarBlock.querySelector('.sidebar__discount-sum').textContent = formatPrice(total.discountSum);
    }
}

function formatPrice(x) {
    if (Math.abs(x) <= 9999) {
        return x;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default View;