package ms_auth_server.auth_server.service;

import ms_auth_server.auth_server.dto.LoginRequestDTO;
import ms_auth_server.auth_server.dto.LoginResponseDTO;
import ms_auth_server.auth_server.dto.UserRegisterDTO;
import ms_auth_server.auth_server.model.User;
import ms_auth_server.auth_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginRequestDTO request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            String token = jwtService.generateToken(user.getUsername(), user.getRoles());
            return new LoginResponseDTO(token, user.getUsername(), "Login exitoso");
        }
        return null;
    }

    public boolean register(UserRegisterDTO request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return false;
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        // Rol por defecto si no lo envían
        if (request.getRoles() == null || request.getRoles().isEmpty()) {
            user.setRoles(java.util.Set.of("USER"));
        } else {
            user.setRoles(request.getRoles());
        }
        
        userRepository.save(user);
        return true;
    }

    public UserRegisterDTO getUserByUsername(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            UserRegisterDTO dto = new UserRegisterDTO();
            dto.setUsername(user.getUsername());
            dto.setRoles(user.getRoles());
            return dto;
        }
        return null;
    }
}
