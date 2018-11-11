class Helper{
static baseURL() {
        return "https://api.foursquare.com/v2";
    }
}
export default class SquareAPI {
    static search(urlPrams){
        return Helper.simpleFetch("/venues/search", "GET",urlPrams);
    }
    static getVenueDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
    }
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");

    }
}