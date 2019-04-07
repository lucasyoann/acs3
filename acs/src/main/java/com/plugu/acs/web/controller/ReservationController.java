package com.plugu.acs.web.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plugu.acs.data.reservations.ReservationDTO;
import com.plugu.acs.web.service.ReservationService;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

	@Autowired
	ReservationService reservationService;
	
	@GetMapping(value="/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<ReservationDTO> listeReservations(@RequestParam("debut") String debut, @RequestParam("fin") String fin) throws ParseException {
		return reservationService.listerResa(debut, fin);
    }
	
	@PostMapping(value="/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> createOrUpdateResa(@RequestBody ReservationDTO reservationDto) {
		return reservationService.createOrUpdateResa(reservationDto);
	}
	
	@GetMapping(value="/id")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ReservationDTO getReservationById(@RequestParam("id") int id) {
		return reservationService.getReservationById(id);
    }
	
	@PostMapping(value="/delete")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> deleteResa(@RequestBody ReservationDTO reservationDto){
		return reservationService.updateStatutReservation(reservationDto);
	}
	
	
	
}
