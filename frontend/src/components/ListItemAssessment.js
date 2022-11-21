import React from 'react';
import {Paper, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
const ListItemAssessment = ({data,OnRemove}) =>{
    return(
        <Paper elevation={3} style={{width:'80%',margin:15}}>
            <div style={{flexDirection:'row',display:'flex',padding:10}}>
                <Typography style={{flexGrow:1}} variant={'h6'}>{data.name}</Typography>
                <CloseIcon style={{marginTop:5,cursor:'pointer'}} onClick={()=>OnRemove(data)}/>
            </div>
        </Paper>
    )
}

export default ListItemAssessment;