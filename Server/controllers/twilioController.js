import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } =
  process.env;

const twilioClient =
  TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
    ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    : null;

const ensureTwilioConfigured = () => {
  if (!twilioClient || !TWILIO_FROM_NUMBER) {
    throw new Error("Twilio credentials are not configured.");
  }
};

const sanitizeMessage = (message) => {
  const fallback =
    "Emergency alert from Zarva. Please reach out to the user immediately.";
  const content = message?.trim() || fallback;
  return content.replace(/[<>]/g, "");
};

const formatIndianNumber = (input) => {
  if (!input) {
    return null;
  }

  const digitsOnly = input.replace(/\D/g, "");
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    return `+${digitsOnly}`;
  }

  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  }

  return null;
};

export const initiateTwilioCall = async (req, res) => {
  const { to, message } = req.body;

  const formattedTo = formatIndianNumber(to);
  if (!formattedTo) {
    return res.status(400).json({
      error:
        "Invalid 'to' phone number. Provide a valid 10-digit Indian mobile number.",
    });
  }

  try {
    ensureTwilioConfigured();

    const twiml = `<Response><Say>${sanitizeMessage(message)}</Say></Response>`;
    const call = await twilioClient.calls.create({
      twiml,
      to: formattedTo,
      from: TWILIO_FROM_NUMBER,
    });

    return res.status(200).json({
      sid: call.sid,
      to: formattedTo,
    });
  } catch (error) {
    console.error("Twilio call error:", error);
    return res.status(500).json({
      error:
        error?.message || "Failed to create the call. Please try again later.",
    });
  }
};

export const sendTwilioMessage = async (req, res) => {
  const { to, messageText } = req.body;

  const formattedTo = formatIndianNumber(to);
  if (!formattedTo) {
    return res.status(400).json({
      error:
        "Invalid 'to' phone number. Provide a valid 10-digit Indian mobile number.",
    });
  }

  try {
    ensureTwilioConfigured();

    const message = await twilioClient.messages.create({
      body: sanitizeMessage(messageText),
      to: formattedTo,
      from: TWILIO_FROM_NUMBER,
    });

    return res.status(200).json({
      sid: message.sid,
      to: formattedTo,
    });
  } catch (error) {
    console.error("Twilio message error:", error);
    return res.status(500).json({
      error:
        error?.message ||
        "Failed to send the SMS. Please verify the number and try again.",
    });
  }
};
