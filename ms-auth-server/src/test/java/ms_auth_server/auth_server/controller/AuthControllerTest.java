package ms_auth_server.auth_server.controller;

import ms_auth_server.auth_server.dto.LoginRequestDTO;
import ms_auth_server.auth_server.model.User;
import ms_auth_server.auth_server.repository.UserRepository;
import ms_auth_server.auth_server.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginSuccess() {
        // Preparación
        LoginRequestDTO request = new LoginRequestDTO("user", "password");
        User user = new User();
        user.setUsername("user");
        user.setPassword("hashedPassword");

        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "hashedPassword")).thenReturn(true);
        when(jwtService.generateToken("user")).thenReturn("jwt-token-123");

        // Ejecución
        ResponseEntity<?> response = authController.login(request);

        // Verificación
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(jwtService, times(1)).generateToken("user");
    }

    @Test
    void testLoginInvalidCredentials() {
        // Preparación
        LoginRequestDTO request = new LoginRequestDTO("user", "wrongpassword");
        User user = new User();
        user.setUsername("user");
        user.setPassword("hashedPassword");

        when(userRepository.findByUsername("user")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongpassword", "hashedPassword")).thenReturn(false);

        // Ejecución
        ResponseEntity<?> response = authController.login(request);

        // Verificación
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Credenciales inválidas", response.getBody());
    }

    @Test
    void testRegisterSuccess() {
        // Preparación
        User newUser = new User();
        newUser.setUsername("newuser");
        newUser.setPassword("password");

        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password")).thenReturn("hashedPassword");

        // Ejecución
        ResponseEntity<?> response = authController.register(newUser);

        // Verificación
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Usuario registrado exitosamente", response.getBody());
        verify(userRepository, times(1)).save(newUser);
        assertEquals("hashedPassword", newUser.getPassword()); // Verifica que se seteó el hash
    }

    @Test
    void testRegisterUserAlreadyExists() {
        // Preparación
        User existingUser = new User();
        existingUser.setUsername("existing");

        when(userRepository.findByUsername("existing")).thenReturn(Optional.of(existingUser));

        // Ejecución
        ResponseEntity<?> response = authController.register(existingUser);

        // Verificación
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Usuario ya existe", response.getBody());
        verify(userRepository, never()).save(any());
    }
}
