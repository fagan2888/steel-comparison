export class TradeRepository {

    constructor(url, apiKey) {
        this.url = url;
        this.apiKey = apiKey;
    }

    async _getAggregations() {
        return fetch(`${this.url}?&api_key=${this.apiKey}`)
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    async _getData(searchQuery) {
        return fetch(`${this.url}${searchQuery}&api_key=${this.apiKey}&size=20`)
        .then(response => response.json())
        .catch(error => console.log(error))
    }

}