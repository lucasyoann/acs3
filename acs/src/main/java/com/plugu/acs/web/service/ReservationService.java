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
		dateEmprunt = dateEmprunt.concat(" 12:00:01");
		dateRetour = dateRetour.concat(" 11:59:59");
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date datedebut = simpleDateFormat.parse(dateEmprunt);
		Date datefin = simpleDateFormat.parse(dateRetour);
		List<ReservationDTO> result = new ArrayList<>();
        for(Reservation reserv : reservationRepository.findBetweenDate(datedebut,datefin)) {
        	result.add(reservationMapper.reservationToReservationDTO(reserv));
        }
        return result;
	}
	
	public String createOrUpdateResa(ReservationDTO reservationDto) {
		String response = "";
		Optional<Reservation> resaOptional = reservationRepository.findById(reservationDto.getId());
		Reservation resa = new Reservation();
		if(resaOptional.isPresent()) {
			//Cas d'une création
			resa = resaOptional.get();
		}
		Reservation reservationWithArticle = reservationMapper.updateReservationwithReservationDTO(resa, reservationDto);
		reservationRepository.save(reservationWithArticle);
		response="OK";
		return response;
	}

}
