package ms_auth_server.auth_server;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Disabled;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Disabled("Falla en entorno Docker-in-Docker por Testcontainers")
@Import(TestcontainersConfiguration.class)
@SpringBootTest
class AuthServerApplicationTests {

	@Test
	void contextLoads() {
	}

}
