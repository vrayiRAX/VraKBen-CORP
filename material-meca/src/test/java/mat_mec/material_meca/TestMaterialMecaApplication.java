package mat_mec.material_meca;

import org.springframework.boot.SpringApplication;

public class TestMaterialMecaApplication {

	public static void main(String[] args) {
		SpringApplication.from(MaterialMecaApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
