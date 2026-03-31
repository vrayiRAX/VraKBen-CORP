package ms_warehouse_location.warehouse_location;

import org.springframework.boot.SpringApplication;

public class TestWarehouseLocationApplication {

	public static void main(String[] args) {
		SpringApplication.from(WarehouseLocationApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
