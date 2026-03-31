package notification.notification.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {
    private String recipient;
    private String message;
    private String subject;
}