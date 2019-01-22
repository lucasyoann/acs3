package com.plugu.acs.data.reservationarticle;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.reservations.Reservation;

@Embeddable
public class ReservationArticleId implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@ManyToOne(cascade = CascadeType.ALL)
	private Reservation reservation;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Article article;
	
	
	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article=article;
	}
	
	
	public Reservation getReservation() {
		return reservation;
	}
	
	public void setReservation(Reservation reservation) {
		this.reservation=reservation;
	}
	
}
