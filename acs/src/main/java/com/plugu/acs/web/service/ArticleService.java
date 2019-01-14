package com.plugu.acs.web.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.articles.ArticleDTO;
import com.plugu.acs.data.articles.ArticleDispoDTO;
import com.plugu.acs.data.articles.ArticleRepository;
import com.plugu.acs.data.reservations.ReservationDTO;

@Service
public class ArticleService {
	
	@Autowired
	ReservationService reservationService;
	
	@Autowired
	ArticleRepository articleRepository;
	
	public List<ArticleDispoDTO> listerArticleDispo(String dateDebut, String dateRetour) throws ParseException{
		List<ArticleDTO> listArticleReserv = new ArrayList<>();
		List<ArticleDispoDTO> result= new ArrayList<>();
		//on parcourt l'ensemble des resa à ces dates et on établit une liste des articles réservés
		for(ReservationDTO resa : reservationService.listerResa(dateDebut, dateRetour)) {
			for(ArticleDTO article :  resa.getArticles()) {
				boolean alreadyListe = false;
				for(ArticleDTO articleliste : listArticleReserv) {
					//si l'article est déjà présent parmi les articles réservés alors on additionne les quantités
					if(article.getId()==articleliste.getId()) {
						alreadyListe=true;
						articleliste.setQuantite(articleliste.getQuantite() + article.getQuantite());
						break;
					}
				}
				//si l'article n'est pas déjà listé alors on l'ajoute à la liste
				if(!alreadyListe) {
					listArticleReserv.add(article);
				}
			}
		}
		for(Article articleEnStock : articleRepository.findAll()) {
			for(ArticleDTO articleReserv : listArticleReserv) {
				if(articleEnStock.getId()==articleReserv.getId()) {
					articleEnStock.setQuantite(articleEnStock.getQuantite()-articleReserv.getQuantite());
					break;
				}
			}
			ArticleDispoDTO articleDispo = new ArticleDispoDTO(articleEnStock.getId(),articleEnStock.getDescription(),
					articleEnStock.getType(),articleEnStock.getQuantite());
			result.add(articleDispo);	
		}
		return result;
	}

}
