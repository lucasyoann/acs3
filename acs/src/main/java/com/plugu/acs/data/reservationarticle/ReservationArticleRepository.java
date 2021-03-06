package com.plugu.acs.data.reservationarticle;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationArticleRepository extends CrudRepository<ReservationArticle,ReservationArticleId>{
	
	@Modifying
	@Query(value="DELETE FROM ReservationArticle ra WHERE ra.primaryKey.article.id=:articleId and"
			+ " ra.primaryKey.reservation.id=:reservationId")
	public void deleteReservationArticle(int articleId, int reservationId);
	
	@Modifying
	@Query(value="SELECT ra from ReservationArticle ra WHERE ra.primaryKey.article.id=:articleId")
	public List<ReservationArticle> getReservations(int articleId);
}
