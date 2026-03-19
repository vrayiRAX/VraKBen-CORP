package ms_customer_profile.customer_profile;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class CustomerProfileApplicationTests {

	@Test
	void contextLoads() {
	}

}
