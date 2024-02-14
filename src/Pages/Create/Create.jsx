import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme();

const Create = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "auth_token",
    "user_id",
  ]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState();
  const [election, setElection] = useState({
    post: "",
    term: "",
    timeLimit: "",
    candidates: [],
  });
  const [candidates, setCandidates] = useState([{ name: "", sign: "" }]);

  const handleInputChange = (e) => {
    const { name } = e.target.name;
  };

  const addHandler = () => {
    let candidatesTemp = [...candidates];
    candidatesTemp.push({ name: "", sign: "" });
    setCandidates(candidatesTemp);
  };

  const removeHandler = (index) => {
    let candidatesTemp = [...candidates];
    candidatesTemp.splice(index, 1);
    setCandidates(candidatesTemp);
  };

  const handleCandidateChange = (event, index) => {
    const { name, value } = event.target;
    let candidatesTemp = [...candidates];
    candidatesTemp[index].name = value;
    console.log(candidatesTemp)
    setCandidates(candidatesTemp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  useEffect(() => {
    const isLoggedIn = cookies.auth_token;
    if (isLoggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [cookies]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#525252" }}>
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create new Election
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="post"
                  name="post"
                  required
                  fullWidth
                  id="post"
                  label="Post"
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="term"
                  label="Term"
                  name="term"
                  autoComplete="term"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="timeLimit"
                  label="Time Limit(in milliseconds)"
                  name="timeLimit"
                  autoComplete="timeLimit"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                {candidates.map((e, index) => (
                  <div className="flex space-x-2">
                    <TextField
                      required
                      fullWidth
                      value={e.name}
                      name="candidateName"
                      label="Candidates Name"
                      type="candidateName"
                      id="candidateName"
                      onChange={(event) => {
                        handleCandidateChange(event, index);
                      }}
                      autoComplete="candidateName"
                    />
                    <TextField
                      required
                      fullWidth
                      value={e.sign}
                      onChange={(event) => {
                        handleCandidateChange(event, index);
                      }}
                      name="sign"
                      label="Sign"
                      type="sign"
                      id="sign"
                      autoComplete="sign"
                    />
                    <div className="my-auto">
                      {index === candidates.length - 1 && (
                        <div className="cursor-pointer" onClick={addHandler}>
                          <AddIcon />
                        </div>
                      )}
                      {candidates.length > 1 && (
                        <div
                          className="cursor-pointer"
                          onClick={() => removeHandler(index)}
                        >
                          <RemoveIcon />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "#525252" }}
            >
              Create
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
};

export default Create;
