package extraction.restController;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import extraction.entities.RegistrationRequest;
import extraction.entities.User;
import extraction.entities.VerificationToken;
import extraction.repository.UserRepository;
import extraction.repository.VerificationTokenRepository;
import extraction.services.UserService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;





@RestController

public class UserRestController {
	@Autowired
	UserRepository userRep;
	
	@Autowired
	UserService userService;

	
	
	@Autowired
	VerificationTokenRepository verificationTokenRepo;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	
	@RequestMapping(path = "/all",method = RequestMethod.GET)
	public List<User> getAllUsers() {
		return userRep.findAll();
	 }
	
	

	
	
	@PostMapping("/register")
	public User register(@RequestBody RegistrationRequest request) {
	    String matricule = generateUniqueMatricule(); // Générer le code de matricule unique
	    request.setMatricule(matricule); // Affecter le code de matricule à la demande d'enregistrement
	    return userService.registerUser(request); // Appeler la méthode de service pour enregistrer l'utilisateur
	}
	
	
	@PutMapping(path="/updateUser")
	public ResponseEntity<User> updateUserById(@RequestBody User updatedUser) {
	    
	    Optional<User> optionalUser = userRep.findById(updatedUser.getId());

	    if (optionalUser.isPresent()) {
	        User existingUser = optionalUser.get();
	        
	        // Update username
	        if (updatedUser.getUsername() != null) {
	            existingUser.setUsername(updatedUser.getUsername());
	        }
	        
	        // Update email
	        if (updatedUser.getEmail() != null) {
	            existingUser.setEmail(updatedUser.getEmail());
	        }
	        
	        // Update isActive
	        if (updatedUser.getIsActive() != null) {
	            existingUser.setIsActive(updatedUser.getIsActive());
	        }
	        
	        // Update roles
	        if (updatedUser.getRoles() != null) {
	            existingUser.setRoles(updatedUser.getRoles());
	        }
	        
	        // Update other fields if provided
	        if (updatedUser.getName() != null) {
	            existingUser.setName(updatedUser.getName());
	        }
	        if (updatedUser.getAddress() != null) {
	            existingUser.setAddress(updatedUser.getAddress());
	        }
	        if (updatedUser.getLastName() != null) {
	            existingUser.setLastName(updatedUser.getLastName());
	        }
	        if (updatedUser.getMatricule() != null) {
	            existingUser.setMatricule(updatedUser.getMatricule());
	        }
	        if (updatedUser.getTel() != null) {
	            existingUser.setTel(updatedUser.getTel());
	        }
	        
	        // Update profile image if provided
	        if (updatedUser.getProfileImg() != null) {
	            existingUser.setProfileImg(updatedUser.getProfileImg());
	        }
	        
	        // Save and return the updated user
	        User updatedUtilisateur = userService.saveUser(existingUser);
	        return ResponseEntity.ok(updatedUtilisateur);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}


	
	
	
	@PutMapping(path="/verif")
	public  ResponseEntity<User>  verifyPassword(@RequestBody User user) {
		
	    Optional<User> optionalUser = userRep.findUserByUsername(user.getUsername());

	    if (!optionalUser.isPresent()) {
	    	
	    	return ResponseEntity.notFound().build();
	    	}
	    
	        User existingUser = optionalUser.get();
	     // Assuming you have the hashed password retrieved from the database stored in a variable named hashedPassword
	        String hashedPassword = existingUser.getPassword();

	        // Check if the user's input password matches the hashed password retrieved from the database
	        boolean passwordMatches = bCryptPasswordEncoder.matches(user.getPassword(), hashedPassword);

	        if (passwordMatches) {
	        	
	        	
	        	return ResponseEntity.ok(existingUser);
	        	
	        } else {
	        	
	        	return ResponseEntity.notFound().build();
	        }
	    
	        
	      
	}
	

	

	@PutMapping(path="/updatePassword")
	public ResponseEntity<User> updatePassword(@RequestBody User updatedUser) {
		
	    Optional<User> optionalUser = userRep.findById(updatedUser.getId());

	    if (optionalUser.isPresent()) {
	        User existingUser = optionalUser.get();
	        // Check if the password is provided in the user object
		    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
		        // Encode and update the password
		    	existingUser.setPassword(bCryptPasswordEncoder.encode(updatedUser.getPassword()));
		    }
	        User updatedUtilisateur = userService.saveUser(existingUser);
		   
	        return ResponseEntity.ok(updatedUtilisateur);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}
	
	@GetMapping("/getbyid/{id}")
	public User getUserById(@PathVariable("id") Long id) {	
		return userService.getUserById(id);
    }
	
	@GetMapping("/getbyUsername/{username}")
	public User getUserByUsername(@PathVariable("username") String username) {	
		return userService.findUserByUsername(username);
    }
	private String generateUniqueMatricule() {
	    String matricule;
	    boolean unique = false;
	    do {
	        // Générer l'année courante
	        int year = Calendar.getInstance().get(Calendar.YEAR);
	        // Générer 4 chiffres aléatoires
	        Random random = new Random();
	        int randomDigits = 1000 + random.nextInt(9000);
	        // Concaténer l'année avec les 4 chiffres aléatoires
	        matricule = String.valueOf(year) + String.valueOf(randomDigits);
	        // Vérifier si la matricule est unique
	        if (userRep.findByMatricule(matricule) == null) {
	            unique = true;
	        }
	    } while (!unique);
	    return matricule;
	}
	
	@PostMapping("/addUser")
	public User createUser(@RequestBody User user) {
		return userService.saveUser(user);
	}

	@RequestMapping(path = "/delete/{user_id}", method = RequestMethod.DELETE)
	public void deleteUser(@PathVariable Long user_id) {
	    userService.deleteUserRole(user_id);
	}
	
/*	@RequestMapping(path = "/deleteToken/{token}", method = RequestMethod.DELETE)
	public void deleteToken(@PathVariable String token) {
	    userService.deletetoken(token);
	}
	*/
	
	@GetMapping("/recuperer/{username}")
	public User recuperer ( @PathVariable(value = "username") String username) {
	    try {
	    	User user = userService.findUserByUsername(username);
	    	String code =userService.generateCode();
	    	
	    	userService.sendEmailUser(user,  code);
	    	 VerificationToken token = new VerificationToken(code, user);
			 verificationTokenRepo.save(token);
	    } catch (Exception e) {
	        System.out.println("An error occurred: " + e.getMessage());
	        
	    }
	    return userService.findUserByUsername(username);
	}
	
	@PostMapping("/{username}/roles/{roleNames}")
	public ResponseEntity<User> addRolesToUser(@PathVariable("username") String username, @PathVariable("roleNames") String roleNames) {
	    // Divisez la chaîne de noms de rôles en une liste de noms de rôles
	    List<String> roles = Arrays.asList(roleNames.split(","));

	    try {
	        User updatedUser = userService.addRolesToUser(username, roles);
	        return ResponseEntity.ok(updatedUser);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
	}

	
	   @DeleteMapping("/{username}/rolesdelete/{roleName}")
	    public ResponseEntity<?> removeRoleFromUser(@PathVariable("username") String username,
	                                                 @PathVariable("roleName") String roleName) {
	        try {
	            User updatedUser = userService.removeRoleFromUser(username, roleName);
	            return ResponseEntity.ok(updatedUser);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }
	
	   
	    @DeleteMapping("/{username}/roles")
	    public ResponseEntity<?> removeAllRolesFromUser(@PathVariable("username") String username) {
	        try {
	            User updatedUser = userService.removeAllRolesFromUser(username);
	            return ResponseEntity.ok(updatedUser);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }
	    @PostMapping("/{username}/roles")
	    public ResponseEntity<User> updateRolesForUser(
	            @PathVariable("username") String username, 
	            @RequestBody List<String> roleNames) {
	        try {
	            User updatedUser = userService.updateRolesForUser(username, roleNames);
	            return ResponseEntity.ok(updatedUser);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	    }

}