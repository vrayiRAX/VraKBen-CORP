package ms_auth_server.auth_server.controller;

import jakarta.validation.Valid;
import ms_auth_server.auth_server.dto.LoginRequestDTO;
import ms_auth_server.auth_server.dto.LoginResponseDTO;
import ms_auth_server.auth_server.dto.UserRegisterDTO;
import ms_auth_server.auth_server.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = authService.login(request);
        if (response != null) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDTO request) {
        boolean success = authService.register(request);
        if (success) {
            return ResponseEntity.ok("Usuario registrado exitosamente");
        }
        return ResponseEntity.badRequest().body("Usuario ya existe");
    }
}
