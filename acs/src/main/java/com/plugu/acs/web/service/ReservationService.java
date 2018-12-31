package com.plugu.acs.web.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plugu.acs.data.reservations.Reservation;
import com.plugu.acs.data.reservations.ReservationDTO;
import com.plugu.acs.data.reservations.ReservationMapper;
import com.plugu.acs.data.reservations.ReservationRepository;

@Service
public class ReservationService {
	
	@Autowired
	private ReservationRepository reservationRepository;
	
	private ReservationMapper reservationMapper = new ReservationMapper();
	
	public List<ReservationDTO> listerResa(String dateEmprunt, String dateRetour) throws ParseException{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date datedebut = new Date();
		Date datefin = new Date();
		datedebut = simpleDateFormat.parse(dateEmprunt);
		datefin = simpleDateFormat.parse(dateRetour);
		List<ReservationDTO> result = new ArrayList<>();
        for(Reservation reserv : reservationRepository.findBetweenDate(datedebut,datefin)) {
        	result.add(reservationMapper.reservationToReservationDTO(reserv));
        }
        return result;
	}
	
	public String createOrUpdateResa(ReservationDTO resaDto) {
		String response = "";
		Optional<Reservation> resaOptional = reservationRepository.findById(resaDto.getId());
		if(!resaOptional.isPresent()) {
			Reservation resa = new Reservation();
			Reservation reservation = reservationMapper.updateReservationwithReservationDTO(resa, resaDto);
			reservationRepository.save(reservation);
			response="OK";
		}else {
			response="KO";
		}
		return response;
	}

}
