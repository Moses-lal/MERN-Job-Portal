import jwt from "jsonwebtoken";

export const genauthtoken = (user, res) => {
  try {

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("tokencookie", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });


  } catch (error) {
    console.log("token creation error ", error);
  }
};
