package com.plugu.acs.web.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.articles.ArticleDTO;
import com.plugu.acs.data.articles.ArticleDispoDTO;
import com.plugu.acs.data.articles.ArticleRepository;
import com.plugu.acs.data.articles.ArticleResaDTO;
import com.plugu.acs.data.reservations.ReservationDTO;

@Service
public class ArticleService {
	
	public ArticleService() {
		
	}
	
	@Autowired
	ReservationService reservationService;
	
	@Autowired
	ArticleRepository articleRepository;
	
	public List<ArticleDispoDTO> listerArticleDispoInListArticleDispo(String dateDebut, String dateRetour) throws ParseException{
		
		List<ArticleDispoDTO> result= new ArrayList<>();
		List<ArticleDispoDTO> listArticleReserv = listerArticlesReservesPourDates(dateDebut, dateRetour);
		for(Article articleEnStock : articleRepository.findAll()) {
			for(ArticleDispoDTO articleReserves : listArticleReserv) {
				if(articleEnStock.getId()==articleReserves.getId()) {
					articleEnStock.setQuantite(articleEnStock.getQuantite()-articleReserves.getQuantiteMax());
					break;
				}
			}
			ArticleDispoDTO articleDispo = new ArticleDispoDTO(articleEnStock.getId(),articleEnStock.getDescription(),
					articleEnStock.getType(),articleEnStock.getQuantite());
			result.add(articleDispo);	
		}
		return result;
	}

	
	public boolean verifierArticles(String dateDebut, String dateRetour, List<ArticleResaDTO> listArticles) throws ParseException{
		boolean valid = true;
		Map<Integer, Integer> listArticleReserv = listerArticleDispoInMap(dateDebut, dateRetour);
		for(ArticleResaDTO articlesReservation : listArticles) {
			if(articlesReservation.getQuantite() > listArticleReserv.get(articlesReservation.getArticleId())) {
				valid=false;
			}
		}
		return valid;
	}
	
	public Article getArticleById(int id) {
		Optional<Article> article = articleRepository.findById(id);
		if(article.isPresent()) {
			return article.get();
		}else {
			return null;
		}
	}
	

	
	private List<ArticleDispoDTO> listerArticlesReservesPourDates(String dateDebutString, String dateRetourString) throws ParseException{
		//Par défaut une réservation commence à 12h et se termine à 11h59
		dateDebutString = dateDebutString.concat(" 12:00:01");
		dateRetourString = dateRetourString.concat(" 11:59:58");
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date dateDebut = simpleDateFormat.parse(dateDebutString);
		Date dateFin = simpleDateFormat.parse(dateRetourString);
		GregorianCalendar calendar = new java.util.GregorianCalendar();
		Map<Integer, ArticleDispoDTO> articlesPeriode = new HashMap<>();
		//Pour chaque jour de la période demandé on liste les réservation 
		for (Date date = dateDebut; !date.equals(dateFin);) {
			Map<Integer, ArticleDispoDTO> articlesDujour = new HashMap<>();
	        calendar.setTime(date);
	        calendar.add(Calendar.DATE, 1);
	        calendar.set(Calendar.HOUR_OF_DAY, 11);
	        calendar.set(Calendar.MINUTE, 59);
	        calendar.set(Calendar.SECOND, 58);
	        Date datePlusUn = calendar.getTime();
	        for(ReservationDTO resa : reservationService.listerResaDuJour(date, datePlusUn)) {
	        	if(resa.getArticles() != null) {
	        		//on liste les articles de chaque réservation
	        		for(ArticleDTO article :  resa.getArticles()) {
	        			if(articlesDujour.get(article.getId())==null) {
	        				int quantite=0;
	        				for(ArticleResaDTO articleResa : resa.getArticleResaDto()) {
	        					if(articleResa.getArticleId()==article.getId()) {
	        						quantite = articleResa.getQuantite();
	        						break;
	        					}
	        				}
	        				articlesDujour.put(article.getId(), new ArticleDispoDTO(article.getId(), article.getDescription(), article.getType(), quantite));
	        			}else {
	        				int quantite=0;
	        				for(ArticleResaDTO articleResa : resa.getArticleResaDto()) {
	        					if(articleResa.getArticleId()==article.getId()) {
	        						quantite = articleResa.getQuantite();
	        						break;
	        					}
	        				}
	        				
	        				int newQuantite = quantite + articlesDujour.get(article.getId()).getQuantiteMax();
	        				ArticleDispoDTO articleMisAJour = articlesDujour.get(article.getId());
	        				articleMisAJour.setQuantiteMax(newQuantite);
	        				articlesDujour.replace(article.getId(), articleMisAJour);
	        			}
	        		}	
	        	}
	        }
	        for (Map.Entry<Integer, ArticleDispoDTO> entry : articlesDujour.entrySet()) {
	        	if(articlesPeriode.get(entry.getKey())!=null) {
	        		if(entry.getValue().getQuantiteMax()>articlesPeriode.get(entry.getKey()).getQuantiteMax()) {
	        			articlesPeriode.replace(entry.getKey(), entry.getValue());
	        		}
	        	}else {
	        		articlesPeriode.put(entry.getKey(), entry.getValue());
	        	}
	        }
	        date = calendar.getTime();    
		}
		return new ArrayList<ArticleDispoDTO>(articlesPeriode.values());
		
	
	}
	
	private Map<Integer, Integer> listerArticleDispoInMap(String dateDebut, String dateRetour) throws ParseException{
		
		Map<Integer, Integer> result = new HashMap<>();
		List<ArticleDispoDTO> listArticleReserv = listerArticlesReservesPourDates(dateDebut, dateRetour);
		for(Article articleEnStock : articleRepository.findAll()) {
			for(ArticleDispoDTO articleReserves : listArticleReserv) {
				if(articleEnStock.getId()==articleReserves.getId()) {
					articleEnStock.setQuantite(articleEnStock.getQuantite()-articleReserves.getQuantiteMax());
					break;
				}
			}
			result.put(articleEnStock.getId(), articleEnStock.getQuantite());
		}
		return result;
	}
}
