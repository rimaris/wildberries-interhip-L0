class Controller {
    constructor(model, view) {
        this.model = model
        
        view.paymentDialog.itemSelectedEvent.addListener((id) => this.paymentMethodSelected(id));
        model.paymentMethodUpdated.addListener((paymentMethod) => view.updatePaymentMethod(paymentMethod));

        view.deliveryDialog.itemSelectedEvent.addListener((id) => this.addressSelected(id));
        model.addressUpdated.addListener((address) => view.updateAddress(address));

        view.itemPlusClicked.addListener((itemId) => model.incrementItemQty(itemId));
        view.itemMinusClicked.addListener((itemId) => model.decrementItemQty(itemId));
        view.itemRemoveClicked.addListener((itemId) => model.removeItem(itemId));
        view.itemCountInput.addListener((data) => model.setItemQtyById(data.itemId, data.newCount));

        model.itemListUpdated.addListener((itemList) => view.updateAllItems(itemList));
        model.totalUpdated.addListener((total) => view.updateTotal(total));
    }

    paymentMethodSelected(id) {
        this.model.updatePaymentMethod(id);
    }

    addressSelected(id) {
        this.model.updateAddress(id);
    }
}

export default Controller;