package config_server.config_server;

import org.springframework.boot.SpringApplication;

public class TestConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.from(ConfigServerApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
