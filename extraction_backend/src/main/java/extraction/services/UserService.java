package extraction.services;

import jakarta.servlet.Registration;

import java.util.List;

import extraction.entities.RegistrationRequest;
import extraction.entities.Role;
import extraction.entities.User;
import extraction.entities.VerificationToken;
public interface UserService {
	User saveUser(User user);
	User findUserByUsername (String username);
	Role addRole(Role role);
	User addRoleToUser(String username, String rolename);
	List<User> findAllUsers();
	User updateUser(User user);
	User getUserById(Long id);
	void deleteUserRole(Long id);
	
	User registerUser(RegistrationRequest request);
	public String generateCode();
	public void sendEmailUser(User u, String code);
	public User validateToken(String code);
	User removeRoleFromUser(String username, String roleName);
	User removeAllRolesFromUser(String username);
	User addRolesToUser(String username, List<String> roleNames);
	User updateRolesForUser(String username, List<String> roleNames);
	
	



	

}