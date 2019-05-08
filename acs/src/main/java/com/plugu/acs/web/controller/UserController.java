package com.plugu.acs.web.controller;

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

import com.plugu.acs.security.data.UserDTO;
import com.plugu.acs.web.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService userService;
	
	@GetMapping(value="/")
	@PreAuthorize("hasRole('SUPER_ADMIN')")
	public List<UserDTO> listerUsers(){
		return userService.listerUsers();
	}
	
	@GetMapping(value="/getuser")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
	public UserDTO getUser(@RequestParam("username") String userName) {
		return userService.getUser(userName);
	}
	
	@PostMapping(value="/")
	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
	public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDTO userDTO){
		return userService.createOrUpdateUser(userDTO);
	}
	
	@PostMapping(value="/delete")
	@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
	public ResponseEntity<?> deleteUser(@RequestBody UserDTO userDTO){
		return userService.deleteUser(userDTO);
	}
	
}
