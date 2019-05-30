package com.plugu.acs.web.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.plugu.acs.security.data.Role;
import com.plugu.acs.security.data.User;
import com.plugu.acs.security.data.UserDTO;
import com.plugu.acs.security.data.UserMapper;
import com.plugu.acs.security.message.response.ResponseMessage;
import com.plugu.acs.security.repository.RoleRepository;
import com.plugu.acs.security.repository.UserRepository;

@Service
@Transactional
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	private UserMapper userMapper= new UserMapper();

	public UserService() {
		
	}
	
	public List<UserDTO> listerUsers(){
		List<UserDTO> result = new ArrayList<>();
		for(User user : userRepository.findAll()) {
			result.add(userMapper.userToUserDTO(user));
		}
		return result;
	}
	
	public UserDTO getUser(String userName) {
		Optional<User> userOptional = userRepository.findByUsername(userName);
		if(userOptional.isPresent()) {
			return userMapper.userToUserDTO(userOptional.get());
		}else {
			return null;
		}
	}
	
	public ResponseEntity<?> createOrUpdateUser(UserDTO userDto) {
		User user = new User();
		Optional<User> userOptional = userRepository.findByUsername(userDto.getUsername());
		List<Role> roles = roleRepository.findAll();
		if(userOptional.isPresent()) {
			user = userOptional.get();
		}
		User userUpdated = userMapper.updateUserWithUserDTO(user, userDto,roles);
		userRepository.save(userUpdated);
		return ResponseEntity.ok(userMapper.userToUserDTO(userUpdated));
		
	}
	
	public ResponseEntity<?> deleteUser(UserDTO userDto) {
		User user = new User();
		Optional<User> userOptional = userRepository.findByUsername(userDto.getUsername());
		if(!userOptional.isPresent()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> User doesn't exist!"),
					HttpStatus.BAD_REQUEST);
		}
		user = userOptional.get();
		userRepository.delete(user);
		return ResponseEntity.ok(userMapper.userToUserDTO(user));
	}
 }
