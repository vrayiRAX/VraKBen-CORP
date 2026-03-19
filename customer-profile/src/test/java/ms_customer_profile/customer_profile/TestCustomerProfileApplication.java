package ms_customer_profile.customer_profile;

import org.springframework.boot.SpringApplication;

public class TestCustomerProfileApplication {

	public static void main(String[] args) {
		SpringApplication.from(CustomerProfileApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
