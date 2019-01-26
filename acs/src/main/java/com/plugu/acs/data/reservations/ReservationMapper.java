package com.plugu.acs.data.reservations;

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
		}
		reservation.setDateEmprunt(reservationDto.getDateEmprunt());
		reservation.setDateRestitution(reservationDto.getDateRestitution());
		reservation.setCreerPar(reservationDto.getCreerPar());
		reservation.setCreerLe(reservationDto.getCreerLe());
		reservation.setValideLe(reservationDto.getValideLe());
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
