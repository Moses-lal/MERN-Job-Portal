import jwt from "jsonwebtoken";

export const genauthtoken = (user, res) => {
  try {
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("tokencookie", token, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: isProduction,       // true on Render
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return token;

  } catch (error) {
    console.log("token creation error:", error);
  }
};