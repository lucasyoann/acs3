package com.plugu.acs;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.plugu.acs.security.data.Role;
import com.plugu.acs.security.data.RoleName;
import com.plugu.acs.security.data.User;
import com.plugu.acs.security.repository.RoleRepository;
import com.plugu.acs.security.repository.UserRepository;

@SpringBootApplication
public class AcsApplication extends SpringBootServletInitializer{
	
	private static final Set<String> USER_ADMIN_ROLES = new HashSet<>(Arrays.asList("admin", "user","super_admin"));
	
	@Value("${userAdmin.name}")
	private String userName;
	
	@Value("${userAdmin.password}")
	private String userPassword;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(AcsApplication.class);
	  }

	public static void main(String[] args) {
		SpringApplication.run(AcsApplication.class, args);
	}
	
	@EventListener(ApplicationReadyEvent.class)
	public void createUserAdmin() {
		if (!userRepository.existsByUsername(userName)) {
			User user = new User(userName, userName.concat("@acs.com"),
					userPassword);
			
			Set<Role> roles = new HashSet<>();
			 
			USER_ADMIN_ROLES.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
					roles.add(adminRole);
	 
					break;
				case "super_admin":
					Role pmRole = roleRepository.findByName(RoleName.ROLE_SUPER_ADMIN)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
					roles.add(pmRole);
	 
					break;
				default:
					Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
					roles.add(userRole);
				}
			});
	 
			user.setRoles(roles);
			userRepository.save(user);
		}
		
	}
}

