package notification.notification.service;

import notification.notification.model.NotificationRequest;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendSimpleMessage(NotificationRequest request) {
        System.out.println("ENVIANDO EMAIL A: " + request.getRecipient());
        System.out.println("ASUNTO: " + request.getSubject());
        System.out.println("CUERPO: " + request.getMessage());
        System.out.println("Estado: Enviado con éxito.");
    }
}