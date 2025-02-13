module.exports = async function (context, req) {
    const headers = req.headers;
    const ipv4 = headers["x-forwarded-for"]?.split(",")[0] || "Unknown";
    const ipv6 = headers["x-client-ip"] || headers["x-forwarded-for"] || "Unknown";

    if (headers["user-agent"]?.includes("curl")) {
        if (headers["ipv6"]) {
            context.res = { body: ipv6 };
        } else if (headers["ipv4"]) {
            context.res = { body: ipv4 };
        } else {
            context.res = { body: ipv4 };  // Default to IPv4 if no specific header
        }
    } else {
        context.res = {
            headers: { "Content-Type": "text/html" },
            body: `<html><body><h1>Your IP Address:</h1><p>IPv4: ${ipv4}</p><p>IPv6: ${ipv6}</p></body></html>`
        };
    }
};