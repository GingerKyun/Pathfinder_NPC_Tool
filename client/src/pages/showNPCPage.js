import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material'

export default function ShowNPC() {

  const [activeNPC, setActiveNPC] = React.useState({
    name: '',
    age: '',
    location: '',
    race: '',
    backstory: '',
    languages: '',
    skills: '',
    additionalDetails: ''
})

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  

    const [filter, setFilter] = useState({
      name: '',
      age: '',
      location: '',
      race: '',
    })
    const [npcList, setNPCList] = useState([])

    React.useEffect(() => {
        getList();
        // eslint-disable-next-line
    }, [filter])

    const getList = () => {
      axios.post(`http://localhost:5000/npclist/`, filter).then((allNPC) => {
          setNPCList(allNPC.data);
        })
    }

    const deleteNPC = (id) => {
        axios.delete(`http://localhost:5000/npclist/${id}`).then(() => {
          getList();
        })
      }

      const updateNPC = (id) => {
        axios({
          method: 'PUT',
          url: `http://localhost:5000/npclist/${id}`,
          data: activeNPC
      }).then( () => {
        getList();
          handleClose();
      })
      }

      const updateModal = (modalNPC) => {
        setActiveNPC(modalNPC);
        handleOpen();
      }


    return  (
    <>
        <h2>All NPC</h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><TextField onChange={(event) => {setFilter({...filter, name: event.target.value})}} value={filter.name} label="Name" variant="outlined" /></TableCell>
            <TableCell align="right"><TextField onChange={(event) => {setFilter({...filter, age: event.target.value.toString()})}} value={filter.age} label="Age" variant="outlined" /></TableCell>
            <TableCell align="right"><TextField onChange={(event) => {setFilter({...filter, location: event.target.value})}} value={filter.location} label="Location" variant="outlined" /></TableCell>
            <TableCell align="right"><TextField onChange={(event) => {setFilter({...filter, race: event.target.value})}} value={filter.race} label="Race" variant="outlined" /></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {npcList.map((npc, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => updateModal(npc)}
            >
              <TableCell component="th" scope="row">
                {npc.name}
              </TableCell>
              <TableCell align="right">{npc.age}</TableCell>
              <TableCell align="right">{npc.location}</TableCell>
              <TableCell align="right">{npc.race}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteNPC(npc._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <TextField id="outlined-basic" label="Name" style={{marginBottom: '10px'}} variant="outlined" value={activeNPC.name} onChange={(event) => {
                  setActiveNPC({...activeNPC, name: event.target.value})
              }}/>
              <TextField id="outlined-basic" label="Age" style={{marginBottom: '10px'}} variant="outlined" value={activeNPC.age} onChange={(event) => {
                  setActiveNPC({...activeNPC, age: event.target.value.toString()})
              }}/>
                            <TextField
                id="outlined-multiline-flexible"
                label="Backstory"
                multiline
                maxRows={4}
                style={{marginBottom: '10px'}} 
                value={activeNPC.backstory}
                onChange={(event) => {
                    setActiveNPC({...activeNPC, backstory: event.target.value})
                }}/>
              <TextField
                id="outlined-multiline-flexible"
                label="Languages"
                multiline
                maxRows={4}
                style={{marginBottom: '10px'}} 
                value={activeNPC.languages}
                onChange={(event) => {
                    setActiveNPC({...activeNPC, languages: event.target.value})
                }}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id="outlined-basic" label="Location" style={{marginBottom: '10px'}} variant="outlined" value={activeNPC.location} onChange={(event) => {
                  setActiveNPC({...activeNPC, location: event.target.value})
              }}/>
              <TextField id="outlined-basic" label="Race" style={{marginBottom: '10px'}} variant="outlined" value={activeNPC.race} onChange={(event) => {
                  setActiveNPC({...activeNPC, race: event.target.value})
              }}/>
              <TextField
                id="outlined-multiline-flexible"
                label="Skills"
                multiline
                maxRows={4}
                style={{marginBottom: '10px'}} 
                value={activeNPC.skills}
                onChange={(event) => {
                    setActiveNPC({...activeNPC, skills: event.target.value})
                }}/>
              <TextField
                id="outlined-multiline-flexible"
                label="Additional Information"
                multiline
                maxRows={4}
                style={{marginBottom: '10px'}} 
                value={activeNPC.additionalDetails}
                onChange={(event) => {
                  setActiveNPC({...activeNPC, additionalDetails: event.target.value})
                }}/>
                </Grid>
              </Grid>
              <Button variant="contained" onClick={() => updateNPC(activeNPC._id)}>Update NPC Data</Button>
        </Box>
      </Modal>
  

    </>
    )
}