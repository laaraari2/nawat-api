export default function handler(req, res) {
    // تفعيل الـ CORS لتفادي أي حظر من طرف التطبيق
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    // التعامل مع طلبات Preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const url = req.url;
    console.log(`طلب جديد: ${req.method} ${url}`);

    // 1. محاكاة مسار تسجيل الدخول الخاص بـ Odoo
    if (url.includes('/web/session/authenticate')) {
        return res.status(200).json({
            jsonrpc: "2.0",
            id: req.body?.id || null,
            result: {
                username: "admin",
                name: "User Test",
                user_context: { lang: "fr_FR", tz: "Africa/Casablanca" },
                uid: 2,
                company_id: 1,
                session_id: "mock_session_id_nawat_2026",
                company_name: "Nawat School",
                is_system: false
            }
        });
    }

    // 2. محاكاة مسارات التحقق العامة الأخرى
    if (url.includes('/api/clients/search') || url.includes('/authorized')) {
        return res.status(200).json({
            status: "success",
            authorized: true,
            user: {
                id: 1,
                name: "Developer Test"
            }
        });
    }

    // 3. رد افتراضي لأي مسار آخر
    return res.status(200).json({
        status: "success",
        message: "Nawat Mock API is running successfully!",
        requested_url: url,
        method: req.method
    });
}
