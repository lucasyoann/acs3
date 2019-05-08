package com.plugu.acs.security.data;

public class RoleMapper {

	private static final String ROLE_USER="ROLE_USER";
	
	public RoleMapper() {
		super();
	}
	
	public RoleDTO roleToRoleDTO(Role role) {
		if(role==null) {
			return null;
		}
		
		RoleDTO roleDto = new RoleDTO();
		roleDto.setId(role.getId());
		roleDto.setName(role.getName().name());
		
		return roleDto;
	}
	
	public Role roleDtoToRole(RoleDTO roleDto) {
		if(roleDto==null) {
			return null;
		}
		 Role role = new Role();
		 role.setId(roleDto.getId());
		 if(ROLE_USER.equalsIgnoreCase(roleDto.getName())) {
			 role.setName(RoleName.ROLE_USER);
		 }else {
			 role.setName(RoleName.ROLE_ADMIN);
		 }
		 return role;		 
	}
}
