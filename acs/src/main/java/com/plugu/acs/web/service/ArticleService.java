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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.articles.ArticleDTO;
import com.plugu.acs.data.articles.ArticleDispoDTO;
import com.plugu.acs.data.articles.ArticleMapper;
import com.plugu.acs.data.articles.ArticleRepository;
import com.plugu.acs.data.articles.ArticleResaDTO;
import com.plugu.acs.data.reservationarticle.ReservationArticleRepository;
import com.plugu.acs.data.reservations.Reservation;
import com.plugu.acs.data.reservations.ReservationDTO;
import com.plugu.acs.data.reservations.ReservationMapper;
import com.plugu.acs.data.reservations.ReservationRepository;
import com.plugu.acs.security.message.response.ResponseMessage;
import com.plugu.acs.data.reservationarticle.ReservationArticle;
import com.plugu.acs.data.reservationarticle.ReservationArticleId;

@Service
public class ArticleService {
	
	public ArticleService() {
		
	}
	
	@Autowired
	ReservationService reservationService;
	
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	ArticleRepository articleRepository;
	
	@Autowired
	ReservationArticleRepository reservationArticleRepository;
	
	private ArticleMapper articleMapper = new ArticleMapper();
	
	private ReservationMapper reservationMapper = new ReservationMapper();
	
	public List<ArticleDTO> listerArticle(){
		List<ArticleDTO> listArticles = new ArrayList<>();
		for(Article article : articleRepository.findAll()) {
			listArticles.add(articleMapper.articleToArticleDTO(article));
		}
		return listArticles;
	}
	
	public ResponseEntity<?> createOrUpdateArticle(ArticleDTO articleDto) {
		Optional<Article> articleOptional = articleRepository.findById(articleDto.getId());
		Article article =new Article();
		if(articleOptional.isPresent()) {
			article = articleOptional.get();
		}
		article.setIntitule(articleDto.getIntitule().toUpperCase());
		article.setType(articleDto.getType().toUpperCase());
		article.setDescription(articleDto.getDescription());
		article.setQuantite(articleDto.getQuantite());
		articleRepository.save(article);
		return ResponseEntity.ok(articleMapper.articleToArticleDTO(article));
	}
	
	public List<ArticleDispoDTO> listerArticleDispoInListArticleDispo(String dateDebut, String dateRetour,boolean AssoEt3Mois) throws ParseException{
		
		List<ArticleDispoDTO> result= new ArrayList<>();
		List<ArticleDispoDTO> listArticleReserv = listerArticlesReservesPourDates(dateDebut, dateRetour,AssoEt3Mois);
		for(Article articleEnStock : articleRepository.findAll()) {
			for(ArticleDispoDTO articleReserves : listArticleReserv) {
				if(articleEnStock.getId()==articleReserves.getId()) {
					articleEnStock.setQuantite(articleEnStock.getQuantite()-articleReserves.getQuantiteMax());
					break;
				}
			}
			ArticleDispoDTO articleDispo = new ArticleDispoDTO(articleEnStock.getId(),articleEnStock.getIntitule(),
					articleEnStock.getType(),articleEnStock.getQuantite());
			result.add(articleDispo);	
		}
		return result;
	}

	
	public boolean verifierArticles(String dateDebut, String dateRetour, List<ArticleResaDTO> listArticles, boolean assoEt3Mois) throws ParseException{
		boolean valid = true;
		Map<Integer, Integer> listArticleReserv = listerArticleDispoInMap(dateDebut, dateRetour,assoEt3Mois);
		for(ArticleResaDTO articlesReservation : listArticles) {
			if(articlesReservation.getQuantite() > listArticleReserv.get(articlesReservation.getArticleId())) {
				valid=false;
			}
			listArticleReserv.replace(articlesReservation.getArticleId(), listArticleReserv.get(articlesReservation.getArticleId()) - articlesReservation.getQuantite());
		}
		return valid;
	}
	
	public ResponseEntity<?> verifierArticlesAssoEt3Mois(String dateDebut, String dateRetour, List<ArticleResaDTO> listArticles, List<ReservationDTO> listReservationDto) throws ParseException{
		List<String> listMessageErreur = new ArrayList<>();
		Map<Integer, Integer> listArticleReserv = listerArticleDispoInMap(dateDebut, dateRetour,false);
		for(ArticleResaDTO articlesReservation : listArticles) {
			if(articlesReservation.getQuantite() > listArticleReserv.get(articlesReservation.getArticleId())) {
				int qteAEliminer = articlesReservation.getQuantite() - listArticleReserv.get(articlesReservation.getArticleId());
				for(ReservationDTO resaDto : listReservationDto){
					for(ArticleResaDTO resaArticle:resaDto.getArticleResaDto()) {
						if(resaArticle.getArticleId()==articlesReservation.getArticleId()) {
							int quantite = resaArticle.getQuantite();
							Article article = getArticleById(articlesReservation.getArticleId());
							if(article==null) {
								return new ResponseEntity<>(new ResponseMessage("Fail -> Article doesn't exist!"),
										HttpStatus.BAD_REQUEST);
							}
							if(qteAEliminer<=quantite) {
								int newQuantite = quantite - qteAEliminer;
								resaArticle.setQuantite(newQuantite);
								listMessageErreur.add("La reservation au nom de "+resaDto.getNom()+" a été modifiée.La quantité de "+ article.getIntitule() + 
										" est passé de " +quantite + " à " + newQuantite);
								qteAEliminer=0;
							}else {
								resaArticle.setQuantite(0);
								qteAEliminer=qteAEliminer-quantite;
								listMessageErreur.add("La reservation au nom de "+resaDto.getNom()+" a été modifiée.La quantité de "+ article.getIntitule() + 
										" est passé de " +quantite + " à 0");
							}
							ReservationArticle resaArticleModifiee= new ReservationArticle();
							
							resaArticleModifiee.setArticle(article);
							Optional<Reservation> resaOptional = reservationRepository.findById(resaDto.getId());
							if(!resaOptional.isPresent()) {
								return new ResponseEntity<>(new ResponseMessage("Fail -> Reservation doesn't exist!"),
										HttpStatus.BAD_REQUEST);
							}
							resaArticleModifiee.setReservation(resaOptional.get());
							resaArticleModifiee.setQuantite(resaArticle.getQuantite());
							Optional<ReservationArticle> reservationArticleOpt = reservationArticleRepository.findById(resaArticleModifiee.getPrimaryKey());
							if(!reservationArticleOpt.isPresent()) {
								return new ResponseEntity<>(new ResponseMessage("Fail -> Reservation doesn't exist!"),
										HttpStatus.BAD_REQUEST);
							}
							resaArticleModifiee=reservationArticleOpt.get();
							resaArticleModifiee.setQuantite(resaArticle.getQuantite());
							reservationArticleRepository.save(resaArticleModifiee);
							break;
						}
					}
					if(qteAEliminer==0) {
						break;
					}
				}
			}
		}
		return ResponseEntity.ok(listMessageErreur);
	}
	
	public Article getArticleById(int id) {
		Optional<Article> article = articleRepository.findById(id);
		if(article.isPresent()) {
			return article.get();
		}else {
			return null;
		}
	}
	

	
	private List<ArticleDispoDTO> listerArticlesReservesPourDates(String dateDebutString, String dateRetourString, boolean assoEt3Mois) throws ParseException{
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
	        
	        for(ReservationDTO resa : reservationService.listerResaDuJour(date, datePlusUn, assoEt3Mois)) {
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
	
	private Map<Integer, Integer> listerArticleDispoInMap(String dateDebut, String dateRetour,boolean assoEt3Mois) throws ParseException{
		
		Map<Integer, Integer> result = new HashMap<>();
		List<ArticleDispoDTO> listArticleReserv = listerArticlesReservesPourDates(dateDebut, dateRetour,assoEt3Mois);
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
	
	public List<ArticleResaDTO> listArticleToCheck(ReservationDTO reservation){
		List<ArticleResaDTO> listeArticleTemp = new ArrayList<>();
		ReservationDTO resaEnBase = reservationService.getReservationById(reservation.getId());
		if(resaEnBase!=null) {
			for(ArticleResaDTO articleResaDemande : reservation.getArticleResaDto()) {
				boolean toSave=true;
				for(ArticleResaDTO articleResaEnBase : resaEnBase.getArticleResaDto()) {
					if(articleResaEnBase.getArticleId()== articleResaDemande.getArticleId()) {
						if(articleResaEnBase.getQuantite()>=articleResaDemande.getQuantite()) {
							toSave=false;
						}else {
							articleResaDemande.setQuantite(articleResaDemande.getQuantite() - articleResaEnBase.getQuantite());
						}
					}
							
				}
				if(toSave) {
					listeArticleTemp.add(articleResaDemande);
				}
			}
			return listeArticleTemp;
		}else {
			return reservation.getArticleResaDto();
		}
		
	}
}
