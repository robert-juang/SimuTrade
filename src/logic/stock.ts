class TradeObject {
    symbol: string;
    current_price: number;
    purchase_price: number;
    quantity: number;
    trade_action: string;
    PnL: number;
    totalCost: number;

    constructor(symbol: string, current_price: number, purchase_price: number, quantity: number, trade_action: string) {
        this.symbol = symbol;
        this.current_price = current_price;
        this.purchase_price = purchase_price;
        this.quantity = quantity; 
        this.trade_action = trade_action;
        this.PnL = quantity * (current_price - purchase_price);
        this.totalCost = purchase_price * quantity;
    }

    // Getters and setters
    getSymbol() { return this.symbol; }
    setSymbol(symbol: string) { this.symbol = symbol; }

    getCurrentPrice() { return this.current_price; }
    setCurrentPrice(current_price: number) { this.current_price = current_price; }

    getPurchasePrice() { return this.purchase_price; }
    setPurchasePrice(purchase_price: number) { this.purchase_price = purchase_price; }

    getQuantity() { return this.quantity; }
    setQuantity(quantity: number) { this.quantity = quantity; }

    getTradeAction() { return this.trade_action; }
    setTradeAction(trade_action: string) { this.trade_action = trade_action; }

    getPnL() { return this.PnL }
    setPnL(pnl: number) { this.PnL = pnl }

    findPnLPercent() {
        return (((this.current_price - this.purchase_price) / this.purchase_price) * 100.0);
    }

    findCurrentValue() {
        return this.quantity * this.current_price;
    }
}

class StocksObject {
    trades: TradeObject[];
    portfolio: number; 

    constructor(portfolio: number) {
        this.trades = [];
        this.portfolio = portfolio
    }

    // Getters and setters
    getTrades() { return this.trades; }
    setTrades(trade: TradeObject[]) { this.trades = trade; }

    addTrades(trade: TradeObject) { this.trades.push(trade) }

    combine() {
        let combined: { [key: string]: TradeObject } = {};

        this.trades.forEach(trade => {
            let key = trade.symbol + '-' + trade.trade_action;
            if (combined[key]) {
                combined[key].quantity += trade.quantity;
            } else {
                combined[key] = new TradeObject(trade.symbol, 100, trade.purchase_price, trade.quantity, trade.trade_action);
            }
        });

        this.trades = Object.values(combined).filter(trade => trade.quantity !== 0);
    }

    getBuy() {
        return this.trades.filter(trade => trade.trade_action === 'buy');
    }

    getSell() {
        return this.trades.filter(trade => trade.trade_action === 'sell');
    }

    //check if the stock is able to be bought
    canBuy(stock : string){

    }

    //check if stock is able to be sold 
    canSell(stock: string){
        // return this.trades.filter(trade => trade.)
    }

    getPortfolio(portfolio: any) {
        // To be implemented
    }
}

export {
    TradeObject,
    StocksObject
}
