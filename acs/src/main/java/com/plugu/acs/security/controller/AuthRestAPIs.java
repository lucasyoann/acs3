package com.plugu.acs.security.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plugu.acs.security.data.Role;
import com.plugu.acs.security.data.RoleName;
import com.plugu.acs.security.data.User;
import com.plugu.acs.security.jwt.JwtProvider;
import com.plugu.acs.security.message.request.LoginForm;
import com.plugu.acs.security.message.request.SignUpForm;
import com.plugu.acs.security.message.response.JwtResponse;
import com.plugu.acs.security.message.response.ResponseMessage;
import com.plugu.acs.security.repository.RoleRepository;
import com.plugu.acs.security.repository.UserRepository;
 

 
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthRestAPIs {
 
	@Autowired
	AuthenticationManager authenticationManager;
 
	@Autowired
	UserRepository userRepository;
 
	@Autowired
	RoleRepository roleRepository;
 
	@Autowired
	PasswordEncoder encoder;
 
	@Autowired
	JwtProvider jwtProvider;
	
	private static final String jwtTokenCookieName = "JWT-TOKEN";
 
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginRequest) {
 
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
 
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
 
		String jwt = jwtProvider.generateJwtToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
 
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
	}
 
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}
 
		// Creating user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));
 
		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();
 
		strRoles.forEach(role -> {
			if("ROLE_ADMIN".equalsIgnoreCase(role)) {
				Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				roles.add(adminRole);
			}else {
				Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
						.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				roles.add(userRole);
			}
		});
 
		user.setRoles(roles);
		userRepository.save(user);
 
		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
	
	@PostMapping("/checkpassword")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
	public boolean checkPassword(@RequestBody LoginForm loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		if(authentication.isAuthenticated()) {
			return true;
		}else {
			return false;
		}
		
	}
	
	
	@PostMapping("/changepassword")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
	public ResponseEntity<?> changePassword(@RequestBody LoginForm loginRequest) {
		
		Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
		
		if(userOptional.get()==null) {
			throw new RuntimeException("Fail! -> Cause: L'utilisatuer n'existe pas");
		}
		User user = userOptional.get();
		user.setPassword(encoder.encode(loginRequest.getPassword()));
		
		userRepository.save(user);
 
		return new ResponseEntity<>(new ResponseMessage("Mot de passe modifié avec succès"), HttpStatus.OK);
	}
	
	@GetMapping("/validate")
	public boolean validateToken(String token) {
		boolean result = jwtProvider.validateJwtToken(token);
		return result;
	}
	
	@GetMapping("/logout")
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    if (auth != null) {
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }
	    return "redirect:/login?logout";//You can redirect wherever you want, but generally it's a good practice to show login screen again.
	}
	
}
