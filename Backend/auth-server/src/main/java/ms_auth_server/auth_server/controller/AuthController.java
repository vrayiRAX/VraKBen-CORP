package ms_auth_server.auth_server.controller;

import ms_auth_server.auth_server.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        // Aquí deberías validar contra la DB, por ahora generamos el token
        return jwtService.generateToken(username);
    }
}
