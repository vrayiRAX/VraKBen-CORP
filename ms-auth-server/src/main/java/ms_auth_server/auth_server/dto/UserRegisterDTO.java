package ms_auth_server.auth_server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDTO {
    private String username;
    private String password;
    // Add roles if needed, currently not used in MVP AuthController but it was in User entity
    private String roles;
}
