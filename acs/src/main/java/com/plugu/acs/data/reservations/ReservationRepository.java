package com.plugu.acs.data.reservations;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation,Integer>{
	
	@Query("select r from Reservation r where ((r.dateEmprunt between :debut and :fin)"
			+ "or (r.dateRestitution between :debut and :fin)) and r.active=true")
	List<Reservation> findBetweenDate(Date debut, Date fin);
	
	@Query("select r from Reservation r where ((r.dateEmprunt between :debut and :fin)"
			+ "or (r.dateRestitution between :debut and :fin)) and r.active=true and r.asso='1'")
	List<Reservation> findBetweenDateAsso(Date debut, Date fin);

	@Query("select r from Reservation r where ((r.dateEmprunt between :debut and :fin)"
			+ "or (r.dateRestitution between :debut and :fin)) and r.active=true order by r.creerLe desc")
	List<Reservation> findBetweenDateOrderBy(Date debut, Date fin);

}