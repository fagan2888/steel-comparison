export class TradeRepository {

    constructor(url, apiKey) {
        this.url = url;
        this.apiKey = apiKey;
    }

    async _getAggregations(trade_flow, reporters="", partners="") {
        return fetch(`${this.url}?&reporter_countries=${reporters}&partner_countries=${partners}&trade_flow=${trade_flow}&api_key=${this.apiKey}`)
        // .then(console.log(`${this.url}?&reporter_countries=${reporters}&partner_countries=${partners}&trade_flow=${trade_flow}&api_key=${this.apiKey}`))
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    async _getData(searchQuery) {
        return fetch(`${this.url}${searchQuery}&api_key=${this.apiKey}&size=20`)
        .then(response => response.json())
        .catch(error => console.log(error))
    }

}