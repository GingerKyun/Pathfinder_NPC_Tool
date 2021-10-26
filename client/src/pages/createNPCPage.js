import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function CreateNPC() {

    const [npc, setNPC] = React.useState({
        name: '',
        age: '',
        location: '',
        race: '',
        backstory: '',
        languages: '',
        skills: '',
        additionalDetails: ''
    })

    const createNPC = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/npclist',
            data: npc
        }).then( () => {
            window.location.reload(false)
        })
    }
        return (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="outlined-basic" label="Name" variant="outlined" value={npc.name} onChange={(event) => {
                  setNPC({...npc, name: event.target.value})
              }}/>
              <TextField id="outlined-basic" label="Age" variant="outlined" value={npc.age} onChange={(event) => {
                  setNPC({...npc, age: event.target.value.toString()})
              }}/>
              <TextField id="outlined-basic" label="Location" variant="outlined" value={npc.location} onChange={(event) => {
                  setNPC({...npc, location: event.target.value})
              }}/>
              <TextField id="outlined-basic" label="Race" variant="outlined" value={npc.race} onChange={(event) => {
                  setNPC({...npc, race: event.target.value})
              }}/>
              <TextField
                id="outlined-multiline-flexible"
                label="Backstory"
                multiline
                maxRows={4}
                value={npc.backstory}
                onChange={(event) => {
                    setNPC({...npc, backstory: event.target.value})
                }}/>
              <TextField
                id="outlined-multiline-flexible"
                label="Languages"
                multiline
                maxRows={4}
                value={npc.languages}
                onChange={(event) => {
                    setNPC({...npc, languages: event.target.value})
                }}/>
              <TextField
                id="outlined-multiline-flexible"
                label="Skills"
                multiline
                maxRows={4}
                value={npc.skills}
                onChange={(event) => {
                    setNPC({...npc, skills: event.target.value})
                }}/>
              <TextField
                id="outlined-multiline-flexible"
                label="Additional Information"
                multiline
                maxRows={4}
                value={npc.additionalDetails}
                onChange={(event) => {
                  setNPC({...npc, additionalDetails: event.target.value})
                }}/>
              </div>
              <Button variant="contained" onClick={createNPC}>Create</Button>
          </Box>
        );
      }