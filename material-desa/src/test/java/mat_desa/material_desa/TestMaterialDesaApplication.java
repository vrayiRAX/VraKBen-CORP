package mat_desa.material_desa;

import org.springframework.boot.SpringApplication;

public class TestMaterialDesaApplication {

	public static void main(String[] args) {
		SpringApplication.from(MaterialDesaApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
