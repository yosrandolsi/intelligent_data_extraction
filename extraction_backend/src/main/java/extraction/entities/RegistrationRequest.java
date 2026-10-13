package extraction.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    private String username;
    private String password;
    private String name; // Champ ajouté
    private String lastName; // Champ ajouté
    private String matricule; // Champ ajouté
    private String tel; // Champ ajouté
    private String email;
    private Boolean isActive; // Champ ajouté
    private String profileImg; // Champ ajouté pour l'image de profil
    private String address; 
    // Constructeur avec tous les champs
    public RegistrationRequest(String username, String password, String name, String lastName, String matricule,
            String tel, String email, Boolean isActive, String profileImg, String address) {
        super();
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.matricule = matricule;
        this.tel = tel;
        this.email = email;
        this.isActive = isActive;
        this.profileImg = profileImg;
        this.address = address;
    }

    // Getters et Setters pour profileImg
    public String getProfileImg() {
        return profileImg;
    }

    public void setProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    // Autres getters et setters...


	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMatricule() {
		return matricule;
	}
	public void setMatricule(String matricule) {
		this.matricule = matricule;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

    // Constructeur avec tous les champs
	public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
