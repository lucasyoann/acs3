package com.plugu.acs.web.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.plugu.acs.data.articles.Article;
import com.plugu.acs.data.articles.ArticleResaDTO;
import com.plugu.acs.data.reservationarticle.ReservationArticle;
import com.plugu.acs.data.reservationarticle.ReservationArticleId;
import com.plugu.acs.data.reservationarticle.ReservationArticleRepository;
import com.plugu.acs.data.reservations.Reservation;
import com.plugu.acs.data.reservations.ReservationDTO;
import com.plugu.acs.data.reservations.ReservationMapper;
import com.plugu.acs.data.reservations.ReservationRepository;
import com.plugu.acs.security.message.response.ResponseMessage;

@Service
@Transactional
public class ReservationService {
	
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private ReservationArticleRepository reservationArticleRepository;
	
	@Autowired
	private ArticleService articleService;
	
	
	private ReservationMapper reservationMapper = new ReservationMapper();
	
	public List<ReservationDTO> listerResa(String dateEmprunt, String dateRetour) throws ParseException{
		dateEmprunt = dateEmprunt.concat(" 12:00:01");
		dateRetour = dateRetour.concat(" 11:59:59");
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date datedebut = simpleDateFormat.parse(dateEmprunt);
		Date datefin = simpleDateFormat.parse(dateRetour);
		List<ReservationDTO> result = new ArrayList<>();
        for(Reservation reserv : reservationRepository.findBetweenDate(datedebut,datefin)) {
        	result.add(reservationMapper.reservationToReservationDTO(reserv));
        }
        return result;
	}
	
	public List<ReservationDTO> listerResaDuJour(Date dateDebutJournee, Date dateFinJournee) throws ParseException{
		
		List<ReservationDTO> result = new ArrayList<>();
        for(Reservation reserv : reservationRepository.findBetweenDate(dateDebutJournee,dateFinJournee)) {
        	result.add(reservationMapper.reservationToReservationDTO(reserv));
        }
        return result;
	}
	
	public ResponseEntity<?> createOrUpdateResa(ReservationDTO reservationDto) {
		Optional<Reservation> resaOptional = reservationRepository.findById(reservationDto.getId());
		Reservation resa = new Reservation();
		if(resaOptional.isPresent()) {
			//Cas d'une création
			resa = resaOptional.get();
		}
		Reservation reservationWithArticle = reservationMapper.updateReservationwithReservationDTO(resa, reservationDto);
		List<ReservationArticleId> ListArticle = new ArrayList<>();
		for(ArticleResaDTO articleResaDto : reservationDto.getArticleResaDto()) {
			ReservationArticle reservationArticle = new ReservationArticle();
			Article article = articleService.getArticleById(articleResaDto.getArticleId());
			if(article==null) {
				return new ResponseEntity<>(new ResponseMessage("Fail -> Article doesn't exist!"),
						HttpStatus.BAD_REQUEST);
			}
			reservationArticle.setArticle(article);
			reservationArticle.setReservation(reservationWithArticle);
			reservationArticle.setQuantite(articleResaDto.getQuantite());
			reservationRepository.save(reservationWithArticle);
			
			Optional<ReservationArticle> reservationArticleOpt = reservationArticleRepository.findById(reservationArticle.getPrimaryKey());
			//cas de l'ajout d"un article
			if(!reservationArticleOpt.isPresent()) {
				ReservationArticle ajoutAjout = reservationArticleRepository.save(reservationArticle);
				ListArticle.add(ajoutAjout.getPrimaryKey());
				reservationWithArticle.addReservationArticle(reservationArticle);
			//cas de la modification d'un article
			}else {
				ReservationArticle resaArticle = reservationArticleOpt.get();
				if(ListArticle.contains(resaArticle.getPrimaryKey())) {
					resaArticle.setQuantite(resaArticle.getQuantite() + reservationArticle.getQuantite());
					reservationArticleRepository.save(resaArticle);
				}else if(resaArticle.getQuantite()!=reservationArticle.getQuantite()) {
					resaArticle.setQuantite(reservationArticle.getQuantite());
					reservationArticleRepository.save(resaArticle);
					
				}
				ListArticle.add(resaArticle.getPrimaryKey());
			}
			
		}
		
		//articles a supprimer
		if(resa!=null) {

			for(ReservationArticle resaArticleEnBase : resa.getReservationArticles()) {
				if(!ListArticle.contains(resaArticleEnBase.getPrimaryKey())){
					reservationArticleRepository.deleteReservationArticle(resaArticleEnBase.getPrimaryKey().getArticle().getId(),resaArticleEnBase.getPrimaryKey().getReservation().getId());

				}
			}
		}
		reservationRepository.save(reservationWithArticle);
		return ResponseEntity.ok(reservationMapper.reservationToReservationDTO(reservationWithArticle));
	}

	public ReservationDTO getReservationById(int id) {
		Optional<Reservation> reservation = reservationRepository.findById(id);
		if(reservation.isPresent()) {
			return reservationMapper.reservationToReservationDTO(reservation.get());
		}else {
			return null;
		}
	}
	
	public ResponseEntity<?> updateStatutReservation(ReservationDTO reservationDto){
		Optional<Reservation> resaOptional = reservationRepository.findById(reservationDto.getId());
		if(resaOptional.isPresent()) {
			Reservation resa = resaOptional.get();
			resa.setActive(false);
			reservationRepository.save(resa);
			return ResponseEntity.ok(reservationMapper.reservationToReservationDTO(resa));
		}else {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Reservation doesn't exist!"),
					HttpStatus.BAD_REQUEST);
		}
	}
}
