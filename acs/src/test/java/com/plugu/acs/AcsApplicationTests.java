package com.plugu.acs;

import static org.junit.Assert.assertEquals;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import com.plugu.acs.data.articles.ArticleDTO;
import com.plugu.acs.data.reservations.ReservationDTO;
import com.plugu.acs.web.controller.ReservationController;
import com.plugu.acs.web.service.ReservationService;

//@DataJpaTest
//@RunWith(SpringRunner.class)
//@SpringBootTest
public class AcsApplicationTests {

//	@Test
//	public void contextLoads() {
//	}
//	ReservationService reservationService = new ReservationService();
	
//	@Test
//	public void testCreationResa() throws ParseException {
//		ReservationDTO reservationTest = new ReservationDTO();
//		Date creerLe = new Date();
//		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
//		Date dateEmprunt = simpleDateFormat.parse("30/12/2018");
//		Date dateRetour = simpleDateFormat.parse("31/12/2018");
//		reservationTest.setAsso("NON");
//		reservationTest.setCreerLe(creerLe);
//		reservationTest.setCreerPar("JJLUCAS");
//		reservationTest.setDateEmprunt(dateEmprunt);
//		reservationTest.setDateRestitution(dateRetour);
//		reservationTest.setNom("DUPONT");
//		reservationTest.setPrenom("PATRICK");
//		reservationTest.setValideLe(creerLe);
//		reservationTest.setValidePar("JJLUCAS");
//		
//		List<ArticleDTO> articles = new ArrayList<>();
//		
//		ArticleDTO article = new ArticleDTO(52, "BARNUM", "BARNUM 7.5 x 5",
//				"Barnum bleu mono pente de 7.5m par 5m",
//				1, "ASSOCIATION");
//		articles.add(article);
//		
//		reservationTest.setArticles(articles);
//		
//		String response = reservationController.createOrUpdateReservation(reservationTest);
//		assertEquals("OK",response);
//	}

//	@Test
//	public void testfindReservation() throws ParseException {
//		List<ReservationDTO> listeReservations = reservationService.listerResa("30/12/2018", "31/12/2018");
//		assertEquals(listeReservations.size(),0);
//	}
}

