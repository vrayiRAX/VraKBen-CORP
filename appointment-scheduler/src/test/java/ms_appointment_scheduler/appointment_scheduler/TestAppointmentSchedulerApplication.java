package ms_appointment_scheduler.appointment_scheduler;

import org.springframework.boot.SpringApplication;

public class TestAppointmentSchedulerApplication {

	public static void main(String[] args) {
		SpringApplication.from(AppointmentSchedulerApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
