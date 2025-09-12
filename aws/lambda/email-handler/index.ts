import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const sesClient = new SESv2Client({ region: 'eu-central-1' });

export const handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // TODO Для прода указать мой домен
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.requestContext.http.method === 'OPTIONS') {
        return { statusCode: 204, headers }; // 204 No Content для OPTIONS
    }

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: 'Тело запроса отсутствует (Request body is missing)' })
            };
        }

        console.log('Raw event body:', event.body);

        const requestBody = event.isBase64Encoded
            ? Buffer.from(event.body, 'base64').toString('utf-8')
            : event.body;

        const parsedData = JSON.parse(requestBody);
        const { name, email, message, phone } = parsedData;

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: 'Не заполнены обязательные поля (Required fields are missing)' })
            };
        }

        const htmlBody = `<!DOCTYPE html>
        <html lang="">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Coral Club Contact</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #2c5aa0;">🌊 Новая заявка с сайта Coral Club</h2>
                <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>👤 Имя:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>📧 Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td></tr>
                    ${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>📱 Телефон:</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td></tr>` : ''}
                    <tr><td colspan="2" style="padding: 16px 0;"><strong>💬 Сообщение:</strong></td></tr>
                    <tr><td colspan="2" style="padding: 15px; background: #f9f9f9; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</td></tr>
                </table>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #666;">
                    📅 Отправлено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Berlin' })}
                </p>
            </body>
        </html>`;

        const textBody = `🌊 Новая заявка Business Coral Club\n\n👤 Имя: ${name}\n📧 Email: ${email}\n${phone ? `📱 Телефон: ${phone}\n` : ''}💬 Сообщение: ${message}\n\n📅 Отправлено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Berlin' })}`;

        const command = new SendEmailCommand({
            FromEmailAddress: 'CoralWorldInfo@coralworld.eu',
            Destination: { ToAddresses: ['info.coralworld@gmail.com'] },
            Content: {
                Simple: {
                    Subject: { Data: `🌊 Business Coral Club: заявка от ${name}`, Charset: 'UTF-8' },
                    Body: {
                        Html: { Data: htmlBody, Charset: 'UTF-8' },
                        Text: { Data: textBody, Charset: 'UTF-8' }
                    }
                }
            },
            ReplyToAddresses: [email],
        });

        await sesClient.send(command);

        const clientHtmlBody = `<!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Ваша заявка в Coral Club Business принята</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h2 style="color: #2c5aa0;">✅ Уважаемый(ая) ${name}, ваша заявка принята!</h2>
                    <p>Благодарим за ваш интерес к Coral Club. Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
                    
                    <p><strong>Копия вашего сообщения:</strong></p>
                    <div style="padding: 15px; background: #f9f9f9; border-radius: 5px; border-left: 3px solid #2c5aa0;">
                        <p style="margin: 0;"><em>"${message.replace(/\n/g, '<br>')}"</em></p>
                    </div>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    
                    <p style="font-size: 14px;">С наилучшими пожеланиями,<br>Команда Coral World</p>
                    <p style="font-size: 12px; color: #777;">
                        <a href="https://coralworld.eu" style="color: #2c5aa0;">coralworld.eu</a>
                    </p>
                </div>
            </body>
            </html>`;
        const clientTextBody = `Уважаемый(ая) ${name}, ваша заявка принята!\n\nБлагодарим за ваш интерес к Coral Club. Мы получили ваше сообщение и свяжемся с вами в ближайшее время.\n\nКопия вашего сообщения:\n"${message}"\n\nС наилучшими пожеланиями,\nКоманда Coral World\nhttps://coralworld.eu`;
        const clientCommand = new SendEmailCommand({
            FromEmailAddress: 'CoralWorldInfo@coralworld.eu',
            Destination: { ToAddresses: [email] },
            Content: {
                Simple: {
                    Subject: { Data: `✅ Ваша заявка в Coral Club Business принята!`, Charset: 'UTF-8' },
                    Body: {
                        Html: { Data: clientHtmlBody, Charset: 'UTF-8' },
                        Text: { Data: clientTextBody, Charset: 'UTF-8' }
                    }
                }
            },
            ReplyToAddresses: ['info.coralworld@gmail.com'],
        });

        await sesClient.send(clientCommand);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Email успешно отправлен!' })
        };
    } catch (error) {
        console.error('=== LAMBDA ERROR ===', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: 'Внутренняя ошибка сервера.',
                error: error instanceof Error ? error.message : String(error)
            })
        };
    }
};