import crypto from "crypto";

const SECRET = "carrier-shared-secret-456";
const payload = JSON.stringify({ trackingId: "q2132424", status: "Delivered" });

const signature = crypto
  .createHmac("sha256", SECRET)
  .update(payload)
  .digest("hex");

const res = await fetch("http://localhost:3000/api/webhooks/carrier", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-webhook-signature": signature,
  },
  body: payload,
});

console.log("Status:", res.status);
console.log(await res.json());
