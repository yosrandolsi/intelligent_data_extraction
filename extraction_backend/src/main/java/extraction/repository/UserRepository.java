package extraction.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import extraction.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByUsername(String username);
	Optional<User> findByEmail(String email);
	Optional<User> findUserByUsername(String username);
	Object findByMatricule(String matricule);
}
