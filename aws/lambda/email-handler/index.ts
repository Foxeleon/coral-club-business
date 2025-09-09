import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SES } from 'aws-sdk';

const ses = new SES({ region: 'eu-central-1' });

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // TODO Для прода указать мой домен
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        if (!event.body) {
            return { statusCode: 400, headers, body: JSON.stringify({ message: 'Тело запроса отсутствует' }) };
        }

        console.log('Raw event body:', event.body);
        console.log('Is Base64 Encoded:', event.isBase64Encoded);

        const requestBody = event.isBase64Encoded
            ? Buffer.from(event.body, 'base64').toString('utf-8')
            : event.body;

        console.log('Processed request body:', requestBody);

        const parsedData = JSON.parse(requestBody);

        console.log('Parsed data:', parsedData);

        const { name, email, message, phone } = parsedData;

        if (!name || !email || !message) {
            return { statusCode: 400, headers, body: JSON.stringify({ message: 'Не заполнены обязательные поля: name, email, message' }) };
        }

        // Формирование HTML для письма. Данные уже в правильной кодировке.
        const htmlBody = `<!DOCTYPE html>
        <html lang="">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Coral Club Contact</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #2c5aa0;">🌊 Новая заявка с сайта Coral Club</h2>
                <table style="width: 100%; max-width: 600px;">
                    <tr><td style="width: 100px;"><strong>👤 Имя:</strong></td><td>${name}</td></tr>
                    <tr><td><strong>📧 Email:</strong></td><td>${email}</td></tr>
                    ${phone ? `<tr><td><strong>📱 Телефон:</strong></td><td>${phone}</td></tr>` : ''}
                    <tr><td colspan="2"><hr></td></tr>
                    <tr><td colspan="2"><strong>💬 Сообщение:</strong></td></tr>
                    <tr><td colspan="2" style="padding: 15px; background: #f9f9f9; border-radius: 5px;">${message}</td></tr>
                </table>
                <hr>
                <p style="font-size: 12px; color: #666; margin-top: 20px;">
                    <em>📅 Отправлено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Berlin' })}</em>
                </p>
            </body>
        </html>`;

        const textBody = `🌊 Новая заявка с сайта Coral Club\n\n👤 Имя: ${name}\n📧 Email: ${email}\n${phone ? `📱 Телефон: ${phone}\n` : ''}💬 Сообщение: ${message}\n\n📅 Отправлено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Berlin' })}`;

        const params = {
            Source: 'info.coralworld@gmail.com',
            Destination: { ToAddresses: ['info.coralworld@gmail.com'] },
            Message: {
                Subject: { Data: `🌊 Coral Club: заявка от ${name}`, Charset: 'UTF-8' },
                Body: {
                    Html: { Data: htmlBody, Charset: 'UTF-8' },
                    Text: { Data: textBody, Charset: 'UTF-8' }
                },
            },
            ReplyToAddresses: [email],
        };

        await ses.sendEmail(params).promise();

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
                error: error instanceof Error ? { name: error.name, message: error.message } : String(error)
            })
        };
    }
};