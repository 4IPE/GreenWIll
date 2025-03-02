package ru.GreenWill.server.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    @Value("${mail.activate}")
    private String email;

    public void sendEmail(String to, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            String emailContent = """
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                font-family: Arial, sans-serif;
                                background-color: #f5f5f5;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                padding: 30px;
                                background-color: #ffffff;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 30px;
                            }
                            .header h2 {
                                color: #333;
                                margin: 0;
                                padding: 0;
                                font-size: 24px;
                            }
                            .content {
                                text-align: center;
                                margin: 20px 0;
                            }
                            .code-container {
                                margin: 30px auto;
                                text-align: center;
                            }
                            .code {
                                display: inline-block;
                                font-size: 32px;
                                font-weight: bold;
                                letter-spacing: 8px;
                                padding: 15px 30px;
                                background-color: #f8f9fa;
                                border-radius: 8px;
                                border: 1px solid #e9ecef;
                                color: #333;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 30px;
                                padding-top: 20px;
                                border-top: 1px solid #eee;
                                color: #666;
                                font-size: 14px;
                            }
                            .warning {
                                margin: 20px 0;
                                padding: 15px;
                                background-color: #fff3cd;
                                border-left: 4px solid #ffc107;
                                color: #856404;
                                text-align: left;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>Код подтверждения</h2>
                            </div>
                            <div class="content">
                                <p>Здравствуйте!</p>
                                <p>Для подтверждения вашей учетной записи используйте следующий код:</p>
                                <div class="code-container">
                                    <div class="code">%s</div>
                                </div>
                                <div class="warning">
                                    <strong>Важно:</strong> Код действителен в течение 10 минут
                                </div>
                                <p>Если вы не запрашивали этот код, пожалуйста, проигнорируйте это письмо.</p>
                            </div>
                            <div class="footer">
                                <p>Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
                                <p>&copy; 2025 GreenWill. Все права защищены.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                    """.formatted(code);
            log.info("Отправляем на такой email {}", to);
            helper.setFrom(email);
            helper.setTo(to);
            helper.setSubject("Ваш код: " + code + " для подтверждения в сервисе GreenWill");
            helper.setText(emailContent, true);
            mailSender.send(message);
            log.info("Я отправил письмо с кодом" + code);
        } catch (MessagingException e) {
            log.error("Ошибка в отправке сообщения: {} ", e.getMessage());
        }
    }


}
