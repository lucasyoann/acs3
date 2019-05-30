package com.plugu.acs.data.reservations;

public class ReservationModifieeDTO {
	
	private ReservationDTO reservationDto;
	
	private String messageErreur;

	public String getMessageErreur() {
		return messageErreur;
	}

	public void setMessageErreur(String messageErreur) {
		this.messageErreur = messageErreur;
	}

	public ReservationDTO getReservationDto() {
		return reservationDto;
	}

	public void setReservationDto(ReservationDTO reservationDto) {
		this.reservationDto = reservationDto;
	}

}
