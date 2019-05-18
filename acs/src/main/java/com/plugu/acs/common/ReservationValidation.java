package com.plugu.acs.common;

import com.plugu.acs.data.reservations.ReservationDTO;

public class ReservationValidation {

	ReservationDTO reservationDto;
	boolean asso;
	public ReservationDTO getReservationDto() {
		return reservationDto;
	}
	public void setReservationDto(ReservationDTO reservationDto) {
		this.reservationDto = reservationDto;
	}
	public boolean isAsso() {
		return asso;
	}
	public void setAsso(boolean asso) {
		this.asso = asso;
	}
	
	
}
