package extraction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import extraction.entities.Role;
import extraction.entities.User;
import extraction.services.UserService;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class MedcontrollerApplication {

	
	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(MedcontrollerApplication.class, args);
	}
	
	
	/* @PostConstruct
	    void init_users() {
	        // Ajouter les rôles
	        userService.addRole(new Role(null, "ADMIN"));
	        userService.addRole(new Role(null, "USER"));

	        // Ajouter les utilisateurs avec leurs informations
	        userService.saveUser(new User(null, null, "admin", "Admin", "Admin", "123", "admin@example.com", null, null, true, null));
	        userService.saveUser(new User(null, null, "nadhem", "Nadhem", "User", "123", "nadhem@example.com", null, null, true, null));
	        userService.saveUser(new User(null, null, "yassine", "Yassine", "User", "123", "yassine@example.com", null, null, true, null));

	        // Ajouter les rôles aux utilisateurs
	        userService.addRoleToUser("admin", "ADMIN");
	        userService.addRoleToUser("admin", "USER");

	        userService.addRoleToUser("nadhem", "USER");
	        userService.addRoleToUser("yassine", "USER");
	    }*/

	

}
