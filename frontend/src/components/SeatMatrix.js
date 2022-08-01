import React from "react"
import Seat from './Seat'
import './styles/Seat.css'
import steering from '../assets/steering.svg'

const GenerateSeats = (seatNumbers) => {
	return (
		<div className="row">
			{
				seatNumbers.map((seatNumber) => {
					return <Seat seatno={seatNumber} key={seatNumber}/>
				})
			}
		</div>
	)
}

const SeatMatrix = () => {
	return (
		<div className="movie-complex">
			
			<div className="row"><div className="steering offset-6 Scol-2"><img src={steering}></img></div></div>
			<div className="container row movie-layout">
				
				<div className="movie-column-1">
					
					{GenerateSeats([1,2])}
					{GenerateSeats([3,4])}
					{GenerateSeats([5,6])}
					{GenerateSeats([7,8])}
					{GenerateSeats([9,10])}
					{GenerateSeats([11,12])}
					{GenerateSeats([13,14])}
					{GenerateSeats([15,16])}
					{GenerateSeats([17,18])}
					{GenerateSeats([19,20])}
			
				</div>
				<div className="movie-column-2">
				
					{GenerateSeats([21,22])}
					{GenerateSeats([23,24])}
					{GenerateSeats([25,26])}
					{GenerateSeats([27,28])}
					{GenerateSeats([29,30])}
					{GenerateSeats([31,32])}
					{GenerateSeats([33,34])}
					{GenerateSeats([35,36])}
					{GenerateSeats([37,38])}
					{GenerateSeats([39,40])}

				</div>
				{/* <div className="movie-column-3">
					{GenerateSeats([33,34,35,36])}
					{GenerateSeats([37,38,39,40])}
				</div> */}
			</div>
		</div>
	)
}

export default SeatMatrix
