package com.plugu.acs.data.reservations;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.articles.ArticleDTO;
import com.plugu.acs.data.articles.ArticleMapper;
import com.plugu.acs.data.articles.ArticleResaDTO;
import com.plugu.acs.data.reservationarticle.ReservationArticle;
import com.plugu.acs.web.service.ArticleService;

public class ReservationMapper {
	
	private ArticleMapper articleMapper = new ArticleMapper();
	
	@Autowired
	private ArticleService articleService;
	
	public ReservationMapper() {
		super();
	}
	
	public ReservationDTO reservationToReservationDTO(Reservation reservation) {
		if(reservation == null) {
			return null;
		}
		ReservationDTO reservationDto = new ReservationDTO();
		Set<ArticleDTO> listArticlesDto = new HashSet<>();
		reservationDto.setId(reservation.getId());
		reservationDto.setDateEmprunt(reservation.getDateEmprunt());
		reservationDto.setDateRestitution(reservation.getDateRestitution());
		reservationDto.setCreerPar(reservation.getCreerPar());
		reservationDto.setCreerLe(reservation.getCreerLe());
		reservationDto.setValideLe(reservation.getValideLe());
		reservationDto.setValidePar(reservation.getValidePar());
		reservationDto.setNom(reservation.getNom());
		reservationDto.setPrenom(reservation.getPrenom());
		reservationDto.setAsso(reservation.getAsso());
		reservationDto.setActive(reservation.getActive());
		reservationDto.setCommentaire(reservation.getCommentaire());
		for(ReservationArticle reservationArticle : reservation.getReservationArticles()) {
			listArticlesDto.add(articleMapper.articleToArticleDTO(reservationArticle.getArticle()));
		}
		reservationDto.setArticles(listArticlesDto);
		return reservationDto;
		
	}
	
	public Reservation updateReservationwithReservationDTO(Reservation reservation, ReservationDTO reservationDto) {
		if(reservationDto == null || reservation == null) {
			return null;
		}
		if(reservation.getId()!=0) {
			reservation.setId(reservationDto.getId());
			reservation.setCreerLe(reservationDto.getCreerLe());
			reservation.setValideLe(reservationDto.getValideLe());
		}else {
			Date timestamp = Calendar.getInstance().getTime();
			reservation.setCreerLe(timestamp);
			reservation.setValideLe(timestamp);
			
		}
		Date dateEmprunt = reservationDto.getDateEmprunt();
		Calendar cal = Calendar.getInstance();  
        cal.setTime(dateEmprunt);  
        cal.set(Calendar.HOUR_OF_DAY, 12);  
        cal.set(Calendar.MINUTE, 1);  
        cal.set(Calendar.SECOND, 1);
        dateEmprunt = cal.getTime();
        
        Date dateRestitution = reservationDto.getDateRestitution();
        cal.setTime(dateRestitution);
        cal.set(Calendar.HOUR_OF_DAY, 11);  
        cal.set(Calendar.MINUTE, 59);  
        cal.set(Calendar.SECOND, 58);
        dateRestitution = cal.getTime();
        
		reservation.setDateEmprunt(dateEmprunt);
		reservation.setDateRestitution(dateRestitution);
		reservation.setCreerPar(reservationDto.getCreerPar());
		
		reservation.setValidePar(reservationDto.getValidePar());
		reservation.setNom(reservationDto.getNom());
		reservation.setPrenom(reservationDto.getPrenom());
		reservation.setAsso(reservationDto.getAsso());
		reservation.setActive(reservationDto.getActive());
		reservation.setCommentaire(reservationDto.getCommentaire());
		for(ArticleResaDTO articleResaDto : reservationDto.getArticleResaDto()) {
			ReservationArticle reservationArticle = new ReservationArticle();
			Article article = articleService.getArticleById(articleResaDto.getArticleId());
			if(article==null) {
				throw new IllegalStateException("Article inconnu dans les stocks");
			}
			reservationArticle.setArticle(article);
			reservationArticle.setReservation(reservation);
			reservationArticle.setQuantite(articleResaDto.getQuantite());
			reservation.addReservationArticle(reservationArticle);
		}
	
		return reservation;
		
	}

}
