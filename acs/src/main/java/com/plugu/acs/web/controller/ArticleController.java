package com.plugu.acs.web.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plugu.acs.data.articles.ArticleDispoDTO;
import com.plugu.acs.data.articles.ArticleResaDTO;
import com.plugu.acs.data.reservations.ReservationDTO;
import com.plugu.acs.web.service.ArticleService;

@RestController
@RequestMapping("/articles")
public class ArticleController {
	
	@Autowired
	ArticleService articleService;

	@GetMapping("/articledispo")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<ArticleDispoDTO> getArticleDispos(@RequestParam String debut, @RequestParam String fin) throws ParseException {
		
		////récupération liste des articles disponibles
		return articleService.listerArticleDispoInListArticleDispo(debut, fin);
	}
	
	@PostMapping(value="/validate")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Boolean> validerArticles(@RequestBody ReservationDTO reservation) throws ParseException {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String debut = formatter.format(reservation.getDateEmprunt());
		String fin =formatter.format(reservation.getDateRestitution());
		List<ArticleResaDTO> articles = reservation.getArticleResaDto();
		return ResponseEntity.ok(articleService.verifierArticles(debut, fin, articles));
    }
}
