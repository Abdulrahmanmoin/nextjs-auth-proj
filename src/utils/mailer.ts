import nodemailer from "nodemailer"
import crypto from "crypto"
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true, // Enable connection pooling
  maxConnections: 5, // Limit simultaneous connections
  maxMessages: 10, // Limit messages per connection
});


// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(receiverEmail: string, subject: string) {
  // send mail with defined transport object

  await connectDB();
  
  const generateToken = () => {
    return crypto.randomBytes(32).toString("hex");
  };

  const token = generateToken();

  let emailHtmlRoute;


  if (subject === "Verify your email") {
    emailHtmlRoute = "verifyemail";

    const start = Date.now();

    console.log('Start database query findone-emailand update(send mail)');

    const user = await User.findOneAndUpdate({ email: receiverEmail }, { verifyToken: token, verifyTokenExpiry: Date.now() + 7200000 }, { new: true })

    const findOneEmailQueryTime = Date.now() - start;
    console.log(`Database query of findone-emailand update(send mail) completed in ${findOneEmailQueryTime}ms`);


    if (!user) {
      return NextResponse.json({ message: "Check your email" }, { status: 400 });
    }

  }

  else if (subject === "Reset password") {
    emailHtmlRoute = "resetpassword";

    const start = Date.now();

    console.log('Start database query findone-emailand update(send mail)');

    const user = await User.findOneAndUpdate({ email: receiverEmail }, { forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 7200000 }, { new: true })

    const findOneEmailQueryTime = Date.now() - start;
    console.log(`Database query of findone-emailand update(send mail) completed in ${findOneEmailQueryTime}ms`);


    if (!user) {
      return NextResponse.json({ message: "Check your email" }, { status: 400 });
    }

  }


  const htmlBody = `<p>Click <a href=${process.env.DOMAIN}/${emailHtmlRoute}?token=${token}>here</a> to ${subject} or copy and paste the link below in the browser.</p> <br> <a href=${process.env.DOMAIN}/${emailHtmlRoute}?token=${token}>${token}</a>`

  const start = Date.now();

  console.log('Start database query info(send mail)');

  const info = await transporter.sendMail({
    from: 'iam.armoin@gmail.com', // sender address
    to: receiverEmail,
    subject: subject,
    html: htmlBody,
  });



  const findOneEmailQueryTime = Date.now() - start;
  console.log(`Database query of info(send mail) completed in ${findOneEmailQueryTime}ms`);


  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);
