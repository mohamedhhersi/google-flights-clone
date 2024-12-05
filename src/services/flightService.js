import axios from "axios";

class Flightservice {
  constructor() {
    this.api = axios.create({
      baseURL: "https://sky-scraper.p.rapidapi.com",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
    });
  }
  async searchFlights(params) {
    const {
      origin,
      destination,
      departureDate,
      returnDate = null,
      passengers = 1,
    } = params;

    try {
      const response = await this.api.get("/flights", {
        params: {
          origin,
          destination,
          date: departureDate,
          return_date: returnDate,
          adults: passengers,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Flight Search Error:", error);

      // Fallback mock data in case of API Failure

      return {
        flights: [
          {
            id: "1",
            airline: "Example Airlines",
            price: 250,
            departureTime: "2024-01-15T08:00:00",
            ArrivalTime: "2024-01-15t10:00:00",
            origin: origin,
            destination: destination,
          },
        ],
      };
    }
  }

  async getAirportSuggestions(query) {
    try {
      const response = await this.api.get("/airports", {
        params: { query },
      });
      return response.data.airports || [];
    } catch (error) {
      console.error("Airport suggestions Error:", error);
      return [];
    }
  }
}

export default new flightService();
