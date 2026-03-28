package ms_appointment_scheduler.appointment_scheduler.Controller;

import ms_appointment_scheduler.appointment_scheduler.model.Appointment;
import ms_appointment_scheduler.appointment_scheduler.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    @PostMapping("/create")
    public Appointment book(@RequestBody Appointment appointment, @RequestParam Long productId) {
        return service.createAppointment(appointment, productId);
    }
}