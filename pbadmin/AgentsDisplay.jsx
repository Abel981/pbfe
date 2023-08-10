import axios from "axios";
import { useState, useEffect } from "react";
import queryString from "query-string";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

function AgentsDisplay({ country, state, city, gender, agentType, phone }) {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const query = queryString.stringify({
      country,
      state,
      city,
      gender,
      agentType,
      phone,
    });
    console.log(query);

    function fetchAgents() {
      console.log("agent fetch run");

      console.log(query);
      //
      axios
        .get(`https://localhost:3000/admin/resource/agents?${query}`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .then((agents) => setAgents(agents))
        .catch((err) => console.log(err));
    }
    fetchAgents();
  }, [country, state, city, gender, agentType]);

  function handleAgentClick(user) {
    setSelectedAgent(user);
  }

  function handleCloseModal() {
    setSelectedAgent(null);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Agents list:</h2>
      <div>Total Agents {agents.length}</div>
      <Grid container spacing={2}>
        {agents.map((agent) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={agent.id}
            style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)" }}
          >
            <ListItem
              key={agent.id}
              component="button"
              onClick={() => handleAgentClick(agent)}
            >
              <ListItemText
                primary={`${agent.firstName} ${agent.middleName} ${agent.lastName}`}
                secondary={`phone: ${agent.phone}`}
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={!!selectedAgent}
        onClose={handleCloseModal}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* <div className='flex flex-row justify-center items-center w-full h-full bg-orange-600'> */}
          <Card
            style={{
              width: "60%",
              height: "50%",
              overflow: "hidden",
              "@media (max-width: 600px)": {
                width: "100%",
              },

              padding: "6",
            }}
          >
            <CardContent>
              {selectedAgent && (
                <div style={{ overflow: "auto" }}>
                  <h2 className="mb-3">
                    Full Name:{" "}
                    {`${selectedAgent.firstName} ${selectedAgent.middleName} ${selectedAgent.lastName}`}
                  </h2>
                  <p className="mb-3 ">Phone: {selectedAgent.phone}</p>
                  <p className="mb-3 ">user code: {selectedAgent.userId}</p>
                  <p className="mb-3">Country: {selectedAgent.country}</p>
                  <p className="mb-3">State: {selectedAgent.state}</p>
                  <p className="mb-3">City: {selectedAgent.city}</p>
                  <p className="mb-3">Agent Type: {selectedAgent.agentType}</p>
                  <p className="mb-3">idUrl: {selectedAgent.idUrl}</p>
                  {selectedAgent.agentType == "detailed" && (
                    <p className="mb-3">tradeUrl: {selectedAgent.tradeUrl}</p>
                  )}
                </div>
              )}
              <CardActions>
                <Button size="small" onClick={() => setSelectedAgent(null)}>
                  OK
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
}

export default AgentsDisplay;
