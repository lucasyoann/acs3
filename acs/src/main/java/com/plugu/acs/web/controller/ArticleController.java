package com.plugu.acs.web.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plugu.acs.data.articles.ArticleDispoDTO;
import com.plugu.acs.web.service.ArticleService;

@RestController
@RequestMapping("/articles")
public class ArticleController {
	
//	@Autowired
//	ArticleService articleService;
//
//	@GetMapping("/articledispo")
//	public List<ArticleDispoDTO> getArticleDispos(@RequestParam String debut, @RequestParam String fin) throws ParseException {
//		
//		////récupération liste des articles disponibles
//		return articleService.listerArticleDispo(debut, fin);
//	}
}
