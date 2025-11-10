interface Window {
    gtag: (
        command: 'event',
        action: 'conversion',
        params: {
            send_to: string;
            transaction_id?: string;
            event_callback?: () => void;
        }
    ) => void;
}