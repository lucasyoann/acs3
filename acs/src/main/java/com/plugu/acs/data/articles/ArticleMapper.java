package com.plugu.acs.data.articles;

public class ArticleMapper {
	
	public ArticleMapper() {
		super();
	}
	
	public ArticleDTO articleToArticleDTO(Article article) {
		if(article== null){
			return null;
		}
		ArticleDTO articleDto = new ArticleDTO();
		articleDto.setId(article.getId());
		articleDto.setDescription(article.getDescription());
		articleDto.setDestinataire(article.getDestinataire());
		articleDto.setIntitule(article.getIntitule());
		articleDto.setQuantite(article.getQuantite());
		articleDto.setType(article.getType());
		
		return articleDto;
	
	}

	
	public Article updateArticlewithArticleDTO(Article article, ArticleDTO articleDto) {
		if(articleDto == null || article == null) {
			return null;
		}
		if(article.getId()!=0) {
			article.setId(articleDto.getId());
		}
		article.setDescription(articleDto.getDescription());
		article.setDestinataire(article.getDestinataire());
		article.setIntitule(articleDto.getIntitule());
		article.setQuantite(articleDto.getQuantite());
		article.setType(articleDto.getType());
		
		return article;
	}
}
