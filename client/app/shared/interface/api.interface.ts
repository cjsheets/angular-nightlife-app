export interface GetUserAttend {
  venue_id: string,
  user_id: string
}

export interface GetVenueAttend {
  venue_id: string,
  attendees: number
}