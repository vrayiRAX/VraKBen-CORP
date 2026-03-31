package notification.notification.controller;

import notification.notification.model.NotificationRequest;
import notification.notification.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String send(@RequestBody NotificationRequest request) {
        emailService.sendSimpleMessage(request);
        return "Notificación procesada para: " + request.getRecipient();
    }
}