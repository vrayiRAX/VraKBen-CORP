package ms_auth_server.auth_server.controller;

import ms_auth_server.auth_server.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ms_auth_server.auth_server.repository.UserRepository userRepository;

    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> login(@RequestParam String username,
            @RequestParam String password) {
        var userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            String token = jwtService.generateToken(username);
            return org.springframework.http.ResponseEntity.ok(token);
        }
        return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED)
                .body("Credenciales inválidas");
    }

    @PostMapping("/register")
    public org.springframework.http.ResponseEntity<?> register(
            @RequestBody ms_auth_server.auth_server.model.User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return org.springframework.http.ResponseEntity.badRequest().body("Usuario ya existe");
        }
        // En producción se debe encriptar la contraseña, aquí la guardamos en texto
        // plano para el MVP
        userRepository.save(user);
        return org.springframework.http.ResponseEntity.ok("Usuario registrado exitosamente");
    }
}
