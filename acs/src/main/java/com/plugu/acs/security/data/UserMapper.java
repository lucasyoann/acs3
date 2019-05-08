package com.plugu.acs.security.data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.plugu.acs.security.repository.RoleRepository;

public class UserMapper {
	
	@Autowired
	RoleRepository roleRepository;
	
	public UserMapper() {
		super();
	}
	
	public UserDTO userToUserDTO(User user) {
		if(user==null) {
			return null;
		}
		
		UserDTO userDto = new UserDTO();
		List<String> rolesDto =new ArrayList<>();
		
		userDto.setId(user.getId());
		userDto.setEmail(user.getEmail());
		userDto.setUsername(user.getUsername());
		userDto.setPassword(user.getPassword());
		
		for(Role role : user.getRoles()) {
			rolesDto.add(role.getName().name());
		}
		userDto.setRoles(rolesDto);
		return userDto;
	}
	
	public User updateUserWithUserDTO(User user,UserDTO userDto, List<Role> rolesEnBase) {
	
		if(userDto==null || user == null) {
			return null;
		}
		boolean verifroleAdmin = false;
		boolean verifroleUser = false;
		user.setUsername(userDto.getUsername());
		user.setPassword(userDto.getPassword());
		user.setEmail(userDto.getEmail());
		Set<Role> roles = new HashSet<>();
		for(String roleDto : userDto.getRoles()) {
			if("ROLE_ADMIN".equalsIgnoreCase(roleDto)) {
				for(Role role : rolesEnBase) {
					if("ROLE_ADMIN".equalsIgnoreCase(role.getName().name())){
						roles.add(role);
					}
				}
			}else {
				for(Role role : rolesEnBase) {
					if("ROLE_USER".equalsIgnoreCase(role.getName().name())){
						roles.add(role);
					}
				}
			}
		}
		user.setRoles(roles);
		
		return user;
	}
}
