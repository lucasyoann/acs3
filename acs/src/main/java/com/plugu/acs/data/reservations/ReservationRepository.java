package com.plugu.acs.data.reservations;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation,Integer>{
	
	@Query("select r from Reservation r where (DATE(r.dateEmprunt) between :debut and :fin)"
			+ "or (DATE(r.dateRestitution) between :debut and :fin)")
	List<Reservation> findBetweenDate(Date debut, Date fin);

}
