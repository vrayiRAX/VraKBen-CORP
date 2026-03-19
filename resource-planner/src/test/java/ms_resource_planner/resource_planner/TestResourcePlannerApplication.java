package ms_resource_planner.resource_planner;

import org.springframework.boot.SpringApplication;

public class TestResourcePlannerApplication {

	public static void main(String[] args) {
		SpringApplication.from(ResourcePlannerApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
