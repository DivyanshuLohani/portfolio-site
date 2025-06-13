import { prompt } from "@/lib/ai-gen";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
    system: prompt,
    // tools: {
    //   addMessageContact: {
    //     execute: async (args) => {
    //       const googleFormUrl =
    //         "https://docs.google.com/forms/d/e/1FAIpQLSc7gyty4cm79pb9ml2DztGRHLjiNj-2GTddJXMrC8UBNuttyg/formResponse";
    //       const formEntries = {
    //         name: "entry.2005620554",
    //         email: "entry.1045781291",
    //         message: "entry.839337160",
    //       };
    //       const formParams = new URLSearchParams();
    //       formParams.append(formEntries.name, args.name);
    //       formParams.append(formEntries.email, args.email);
    //       formParams.append(formEntries.message, args.message);

    //       try {
    //         await fetch(googleFormUrl, {
    //           method: "POST",
    //           mode: "no-cors", // Google Forms doesn't allow CORS
    //           headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //           },
    //           body: formParams.toString(),
    //         });

    //         return true;
    //       } catch (error) {
    //         return false;
    //       }
    //     },

    //     description:
    //       "Add a message to the contact form with the user's name, email, and message",
    //     parameters: {
    //       type: "object",
    //       properties: {
    //         name: {
    //           type: "string",
    //           description: "The name of the person sending the message.",
    //         },
    //         email: {
    //           type: "string",
    //           description:
    //             "The email address of the person sending the message.",
    //         },
    //         message: {
    //           type: "string",
    //           description: "The message content.",
    //         },
    //       },
    //       required: ["name", "email", "message"],
    //     },
    //   },
    // },
  });

  return result.toDataStreamResponse();
}
