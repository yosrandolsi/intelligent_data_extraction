package extraction.security;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import extraction.entities.User;
import extraction.services.UserService;


@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserService userService;
	
@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	User user = userService.findUserByUsername(username);
	
if (user==null) 
    throw new UsernameNotFoundException("Utilisateur introuvable !");
if (!user.getIsActive()) {
    throw new DisabledException("Votre compte n'est pas activé. Veuillez contacter l'administrateur.");
}
	List<GrantedAuthority> auths = new ArrayList<>();
	
	 user.getRoles().forEach(role -> {
		 GrantedAuthority auhority = new SimpleGrantedAuthority(role.getRole());
		 auths.add(auhority);
	 });
	
	return new org.springframework.security.core.
			userdetails.User(user.getUsername(),user.getPassword(),user.getIsActive(),true,true,true,auths);
  }
}