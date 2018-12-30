package com.plugu.acs.data.reservations;

public class ReservationMapper {
	
	public ReservationMapper() {
		super();
	}
	
	public ReservationDTO reservationToReservationDTO(Reservation reservation) {
		if(reservation == null) {
			return null;
		}
		ReservationDTO reservationDto = new ReservationDTO();
		reservationDto.setId(reservation.getId());
		reservationDto.setQuantite(reservation.getQuantite());
		reservationDto.setDateEmprunt(reservation.getDateEmprunt());
		reservationDto.setDateRestitution(reservation.getDateRestitution());
		reservationDto.setCreerPar(reservation.getCreerPar());
		reservationDto.setCreerLe(reservation.getCreerLe());
		reservationDto.setValideLe(reservation.getValideLe());
		reservationDto.setValidePar(reservation.getValidePar());
		reservationDto.setClientId(reservation.getClientId());
		
		
		return reservationDto;
		
	}
	
	public Reservation updateReservationwithReservationDTO(Reservation reservation, ReservationDTO reservationDto) {
		if(reservationDto == null || reservation == null) {
			return null;
		}
		
		reservation.setQuantite(reservationDto.getQuantite());
		reservation.setDateEmprunt(reservationDto.getDateEmprunt());
		reservation.setDateRestitution(reservationDto.getDateRestitution());
		reservation.setCreerPar(reservationDto.getCreerPar());
		reservation.setCreerLe(reservationDto.getCreerLe());
		reservation.setValideLe(reservationDto.getValideLe());
		reservation.setValidePar(reservationDto.getValidePar());
		reservation.setClientId(reservationDto.getClientId());
	
		return reservation;
		
	}

}
