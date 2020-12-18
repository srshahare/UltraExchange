import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './FormDialog.css';

import Switch from '@material-ui/core/Switch';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formControl: {
    margin: '1rem 0'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}> 
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Gift Card Details
            </Typography>
            <Button autoFocus color="inherit" onClick={props.handleProceed}>
              Proceed
            </Button>
          </Toolbar>
        </AppBar>
        <div className="MyDialog">
          <div className="MainInfo">
              <div className="Image">
                <img src={props.giftPreview} alt="Gift Card preview" />
              </div>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Select Brand of Gift Card</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="giftname"
                  value={props.age}
                  onChange={props.handleChange}
                >
                  {props.gifts.map(card => {
                  return(
                        <MenuItem value={card.uid}>{card.name}</MenuItem>
                      )
                  })}
                </Select>
              </FormControl>
              <input name="title" value={props.giftName} readonly/>
              <textarea name="desc" value={props.giftDesc} readonly/>
              <h3 style={{margin: "8px 0"}}>You will receive your money in following address.</h3>
              <input className="moneyInput" name="pay" onChange={props.inputChange} placeholder="Paypal, UPI Address"/>
          </div>
          <div className="AdditionalInfo">
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Type of Gift Card</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={props.age}
                  name="gifttype"
                  onChange={props.handleChange}
                >
                  <MenuItem value={"ECode"}>{"E-Code"}</MenuItem>
                  <MenuItem value={"Physical"}>{"Physical"}</MenuItem>
                </Select>
              </FormControl>
              {props.visiblePhysical?
                <div className="InputBox" style={{marginTop: '2rem'}}>
                  <p style={{margin: 0}}>Upload Image of Gift Card</p>
                  <input type='file' id='single' onChange={props.onFileChange} />
                </div>:
                ""
              }
            <input name="code" onChange={props.inputChange} placeholder="Gift Card Code" />
            <div className="switch"> 
                <p>Gift Card Pin (Optional)</p>
                <FormControlLabel
                  control={<Switch color="primary" checked={props.isFeature} onChange={props.handleChange} name="checkedPin" />}
                 
                />
                {/* <Switch
                      checked={props.isFeature}
                      onChange={props.handleChange}
                      name="checkedPin"
                      color="primary"
                    /> */}
            </div>
            {props.visiblePin?
            <input name="pin" onChange={props.inputChange} placeholder="Gift Card Pin" />:
            ""
            }
            <div className="switch"> 
                <p>CVV/Expirty Date (Optional))</p>
                <FormControlLabel
                  control={<Switch color="primary" checked={props.isFeature} onChange={props.handleChange} name="checkedCvv" />}
                 
                />
                {/* <Switch
                      checked={props.isFeature}
                      onChange={props.handleChange}
                      name="checkedCvv"
                      color="primary"
                    /> */}
            </div>
            {props.visibleCvv?
              <div className="CVV">
                <input name="cvv" onChange={props.inputChange} placeholder="CVV"/>
                <div className="Expiry">
                  <p>Expiry Date</p>
                  <input name="date" type="date" onChange={props.inputChange} placeholder="Expiry Date"/>
                </div> 
              </div>:
              ""
            }
          
            <div className="ValueForm">
              <p>Value of Gift Card & Currency</p>
              <input name="value" onChange={props.inputChange} placeholder="Gift Card Value" />
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Select Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="currency"
                  value={props.age}
                  onChange={props.handleChange}
                >
                  {props.curs.map(cur => {
                  return(
                        <MenuItem value={cur.uid}>{cur.symbol}</MenuItem>
                      )
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
