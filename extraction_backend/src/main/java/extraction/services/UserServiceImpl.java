package extraction.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import extraction.entities.RegistrationRequest;
import extraction.entities.Role;
import extraction.entities.User;
import extraction.entities.VerificationToken;
import extraction.exceptions.EmailAlreadyExistsException;
import extraction.exceptions.ExpiredTokenException;
import extraction.exceptions.InvalidTokenException;
import extraction.exceptions.UsernameAlreadyExistsException;
import extraction.repository.RoleRepository;
import extraction.repository.UserRepository;
import extraction.repository.VerificationTokenRepository;




@Transactional
@Service
public class UserServiceImpl  implements UserService{

	@Autowired
	UserRepository userRep;
	
	@Autowired
	RoleRepository roleRep;
	
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	VerificationTokenRepository verificationTokenRepo;
	
	
	@Override
	public User saveUser(User user) {
	
	    return userRep.save(user);
	}


	@Override
	public User addRolesToUser(String username, List<String> roleNames) {
	    // Recherche de l'utilisateur par son nom d'utilisateur
	    User user = userRep.findByUsername(username);
	    if (user == null) {
	        throw new IllegalArgumentException("Utilisateur non trouvé pour le nom d'utilisateur: " + username);
	    }

	    // Recherche des rôles par leur nom
	    List<Role> rolesToAdd = new ArrayList<>();
	    for (String roleName : roleNames) {
	        Role role = roleRep.findByRole(roleName);
	        if (role == null) {
	            throw new IllegalArgumentException("Rôle non trouvé pour le nom de rôle: " + roleName);
	        }
	        rolesToAdd.add(role);
	    }

	    // Ajout des rôles à la liste des rôles de l'utilisateur
	    List<Role> userRoles = user.getRoles();
	    userRoles.addAll(rolesToAdd);
	    user.setRoles(userRoles);

	    // Enregistrer l'utilisateur mis à jour dans la base de données
	    return userRep.save(user);
	}

	
	@Override
	public Role addRole(Role role) {
		return roleRep.save(role);
	}

	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
	@Override
	public User findUserByUsername(String username) {
		return userRep.findByUsername(username);
	}
	
	

	
	@Override
	public List<User> findAllUsers() {
		return userRep.findAll();
	}
	
	@Override
	public User updateUser(User user) {
	    Optional<User> userOptional = userRep.findById(user.getId());
	    if (userOptional.isPresent()) {
	        User existingUser = userOptional.get();
	        
	        // Update username, email, isActive, roles, etc. (your existing code)

	        // Update profile image if provided
	        if (user.getProfileImg() != null) {
	            try {
	                String base64Image = convertImageToBase64(new ByteArrayInputStream(user.getProfileImg().getBytes()));
	                existingUser.setProfileImg(base64Image);
	            } catch (IOException e) {
	                // Handle the exception (e.g., log the error)
	            }
	        }
	        
	        return userRep.save(existingUser);
	    }
	    return null;
	}

	private String convertImageToBase64(InputStream inputStream) throws IOException {
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	    byte[] buffer = new byte[4096];
	    int bytesRead;
	    while ((bytesRead = inputStream.read(buffer)) != -1) {
	        outputStream.write(buffer, 0, bytesRead);
	    }
	    byte[] imageBytes = outputStream.toByteArray();
	    return Base64.getEncoder().encodeToString(imageBytes);
	}

	
	


	@Override
	public User getUserById(Long id) {
		
		return  userRep.findById(id).get();
	}

	@Override
	public User registerUser(RegistrationRequest request) {
	    Optional<User> optionalUser = userRep.findByEmail(request.getEmail());
	    Optional<User> optionalUser2 = userRep.findUserByUsername(request.getUsername());
	    if (optionalUser.isPresent())
	        throw new EmailAlreadyExistsException("Email déjà existant !");
	    if (optionalUser2.isPresent())
	        throw new UsernameAlreadyExistsException("Nom d'utilisateur déjà existant !");

	    User newUser = new User();
	    newUser.setUsername(request.getUsername());
	    newUser.setEmail(request.getEmail());
	    newUser.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
	    newUser.setIsActive(false);
	    newUser.setName(request.getName());
	    newUser.setLastName(request.getLastName());
	    newUser.setTel(request.getTel());
	    newUser.setAddress(request.getAddress()); // Définir l'adresse

	    // Génération du matricule unique
	    String matricule = generateUniqueMatricule();
	    newUser.setMatricule(matricule);

	    Role r = roleRep.findByRole("USER");
	    List<Role> roles = new ArrayList<>();
	    roles.add(r);
	    newUser.setRoles(roles);

	    // Convertir et enregistrer l'image de profil en base64
	    if (request.getProfileImg() != null && !request.getProfileImg().isEmpty()) {
	        try {
	            String base64Image = convertImageToBase64(request.getProfileImg());
	            newUser.setProfileImg(base64Image);
	        } catch (IOException e) {
	            // Gérer l'exception, par exemple en journalisant l'erreur
	        }
	    }

	    return userRep.save(newUser);
	}


	// Méthode pour convertir une image en base64
	private String convertImageToBase64(String imageData) throws IOException {
	    byte[] decodedBytes = Base64.getDecoder().decode(imageData);
	    return new String(decodedBytes);
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


	public String generateCode() {
		 Random random = new Random();
		 Integer code = 100000 + random.nextInt(900000);
		 return code.toString();

	}
	
	




	
	

	
	


	@Override
	public void deleteUserRole(Long id) {
	    Optional<User> userOptional = userRep.findById(id);

	    if (userOptional.isPresent()) {
	        User user = userOptional.get();

	        // Supprimer l'utilisateur et les relations dans la table de jointure
	        user.getRoles().clear(); // Supprime toutes les relations ManyToMany

	        // Supprimer le token de vérification s'il existe
	     

	        // Supprimer l'utilisateur
	        userRep.deleteById(id);

	        System.out.println("User deleted");
	    } else {
	        System.out.println("User not found");
	    }
}


	@Override
	public void sendEmailUser(User u, String code) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public User validateToken(String code) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public User removeRoleFromUser(String username, String roleName) {
	    // Recherche de l'utilisateur par son nom d'utilisateur
	    User user = userRep.findByUsername(username);
	    if (user == null) {
	        throw new IllegalArgumentException("Utilisateur non trouvé pour le nom d'utilisateur: " + username);
	    }

	    // Recherche du rôle par son nom
	    Role role = roleRep.findByRole(roleName);
	    if (role == null) {
	        throw new IllegalArgumentException("Rôle non trouvé pour le nom de rôle: " + roleName);
	    }

	    // Supprimer le rôle de la liste des rôles de l'utilisateur
	    List<Role> userRoles = user.getRoles();
	    userRoles.remove(role);
	    user.setRoles(userRoles);

	    // Enregistrer l'utilisateur mis à jour dans la base de données
	    return userRep.save(user);
	}


	@Override
	public User removeAllRolesFromUser(String username) {
	    User user = userRep.findByUsername(username);
	    if (user == null) {
	        throw new IllegalArgumentException("Utilisateur non trouvé pour le nom d'utilisateur: " + username);
	    }
	    
	    // Supprimer tous les rôles de l'utilisateur
	    user.setRoles(new ArrayList<>());
	    
	    // Enregistrer l'utilisateur mis à jour dans la base de données
	    return userRep.save(user);
	}


	@Override
	public User addRoleToUser(String username, String rolename) {
		// TODO Auto-generated method stub
		return null;
	}


	
	@Override
	public User updateRolesForUser(String username, List<String> roleNames) {
	    User user = userRep.findByUsername(username);
	    if (user == null) {
	        throw new IllegalArgumentException("Utilisateur non trouvé pour le nom d'utilisateur: " + username);
	    }

	    // Recherche des rôles par leur nom
	    List<Role> rolesToAdd = new ArrayList<>();
	    for (String roleName : roleNames) {
	        Role role = roleRep.findByRole(roleName);
	        if (role == null) {
	            throw new IllegalArgumentException("Rôle non trouvé pour le nom de rôle: " + roleName);
	        }
	        rolesToAdd.add(role);
	    }

	    // Remplacer les anciens rôles par les nouveaux
	    user.setRoles(rolesToAdd);

	    // Enregistrer l'utilisateur mis à jour dans la base de données
	    return userRep.save(user);
	}

	
	
	
	
	
}
		
	

