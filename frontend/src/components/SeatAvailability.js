import React from "react"
import Seat from './Seat'

const SeatAvailability = () => {
	return (
		<div className="row container-fluid mt-3 mb-1">
			<div className="offset-2 col-6">Available: </div><Seat seatColor="seat-grey" />
			<div className="offset-2 col-6">Booked: </div><Seat seatColor="seat-grey" />
			<div className="offset-2 col-6">Selected: </div><Seat seatColor="seat-grey" />
		</div>
	)
}

export default SeatAvailability
