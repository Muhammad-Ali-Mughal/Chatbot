import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      toast?.loading("Signing In...", { id: "login" });
      const resultAction = dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        toast.success("Signed In Successfully!", { id: "login" });
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message, { id: "login" });
    }
  };

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box
        padding={8}
        mt={8}
        display={{ md: "flex", sm: "none", xs: "none" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img
          src="../../public/openai.png"
          alt="Robot"
          style={{ width: "400px" }}
          className="image-inverted"
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "midnightblue",
                ":hover": {
                  bgcolor: "darkslateblue",
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
