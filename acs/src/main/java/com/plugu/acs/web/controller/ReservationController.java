package com.plugu.acs.web.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plugu.acs.data.reservations.Reservation;
import com.plugu.acs.data.reservations.ReservationDTO;
import com.plugu.acs.data.reservations.ReservationMapper;
import com.plugu.acs.data.reservations.ReservationRepository;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

	@Autowired
	private ReservationRepository reservationRepository;
	
	private ReservationMapper reservationMapper = new ReservationMapper();
	
	@GetMapping(value="/")
    public List<ReservationDTO> listeReservations(@RequestParam String debut, @RequestParam String fin) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date datedebut = new Date();
		Date datefin = new Date();
		try {
			datedebut = simpleDateFormat.parse(debut);
			datefin = simpleDateFormat.parse(fin);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<ReservationDTO> result = new ArrayList<>();
        for(Reservation reserv : reservationRepository.findBetweenDate(datedebut,datefin)) {
        	result.add(reservationMapper.reservationToReservationDTO(reserv));
        }
        return result;
    }
	
}
