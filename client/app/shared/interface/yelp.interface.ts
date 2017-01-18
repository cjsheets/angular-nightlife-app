export interface YelpResponse {
    businesses: Object[],
    region: Object,
    total: number
}

export interface YelpBusiness {
    id: string,
    image_url: string,
    name: string,
    url: string,
    google_url: string,
    coordinates: {
        latitude: number,
        longitude: number
    },
    // Extra metadata for view
    attendance: number
    attending: boolean
}